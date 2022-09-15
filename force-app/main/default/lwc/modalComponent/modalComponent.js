import { api, LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


import createShops from "@salesforce/apex/ShopsController.insertShops";
import getStates from "@salesforce/apex/ShopsController.getStates";
//import getTypes from "@salesforce/apex/ShopsController.getTypes";
import updateShops from "@salesforce/apex/ShopsController.updateShop";
export default class ModalComponent extends LightningElement {
    header = 'Create Shop';

    
    @track stateList=[];
    // @api record = '';
    @api shoprecord={};
    @api editable = false;
    @api showmodal = false;
    
    @track shop={
        Id : null,
        Name : '',
        Shop_Code__c : '',
        Shop_Type__c : '',
        Owner_Name__c : '',
        Annual_Turnover__c : '',
        Address__c : ''

    };

    @track addr={
        Id:null,
        City__c:'',
        Pincode__c:'',
        State__c:'',
        Street__c:'',
        Full_Address__c:''
    };

   @track options=[];
   @track types = [];

   handleDialogClose()
   {
    this.showmodal=false;
   }
    @api setShopRecord(shopRecord, addrRecord){
        if(this.editable)
        {
            //console.log('got from parent:'+this.shoprecord.Shop_Code__c+';'+this.shoprecord.Annual_Turnover__c);
            this.shop = JSON.parse(shopRecord);
            this.addr = JSON.parse(addrRecord);
            console.log('addr: ', this.addr);
            console.log('current shop:',this.shop.Annual_Turnover__c);
        }
    }
    connectedCallback()
    {
        getStates({objectName:'Address__c', fieldName:'State__c'}).then(result=>{
            this.stateList = result;
            for (var key in result) {
                // Here key will have index of list of records starting from 0,1,2,....
                this.options.push({ label: result[key], value: result[key]  });

                // Here Name and Id are fields from sObject list.
            }
            console.log('states:'+this.stateList);
            console.log('options', this.options);
        })
        .catch(error=>{
            console.log('states error:',error);
        })
        getStates({objectName:'Shop__c', fieldName:'Shop_Type__c'}).then(result=>{
            //this.stateList = result;
            for (var key in result) {
                // Here key will have index of list of records starting from 0,1,2,....
                this.types.push({ label: result[key], value: result[key]  });

                // Here Name and Id are fields from sObject list.
            }
            console.log('states:'+this.stateList);
            console.log('options', this.options);
        })
        .catch(error=>{
            console.log('states error:',error);
        })

        

    }
   
    

    handleInput(event){
        console.log("In handleInput");
        try{
        if(event.target.name==="name"){
            this.shop.Name = event.target.value;
            console.log('shopName--->'+this.shop.Name);
        }
        else if(event.target.name==="code"){
            this.shop.Shop_Code__c = event.target.value;
        }
        else if(event.target.name==="owner"){
            this.shop.Owner_Name__c = event.target.value;
        }
        else if(event.target.name==="type"){
            this.shop.Shop_Type__c = event.target.value;
        }
        else if(event.target.name==="turnover"){
            this.shop.Annual_Turnover__c = event.target.value;
        }
        else if(event.target.name==="street"){
            this.addr.Street__c = event.target.value;
        }
        else if(event.target.name==="state"){
            this.addr.State__c = event.target.value;
            console.log('addr state', this.addr.State__c)
        }
        else if(event.target.name==="city"){
            this.addr.City__c = event.target.value;
        }
        else if(event.target.name==="pincode"){
            this.addr.Pincode__c= event.target.value;
        }
    }
    catch(e){
        console.log(e.message);
        // console.log(e.trace)
    }
    }   
    closeHandler()
    {
        this.showmodal = false;
    }
    showError(message)
    {
        this.dispatchEvent(
            new ShowToastEvent({
                title: "Error",
                message: message,
                variant: "error",
            })
        );
    }
    saveRecord()
    {

        if(this.shop.Name==='')
        {
            this.showError('Name cannot be null.');
        }
        else if(this.addr.Pincode__c.length!=6)
        {
            this.showError('Pincode should have 6 digits.');
        }
        else if(this.addr.State__c==='')
        {
            this.showError('Please Select the State');
        }
        else
        {
            console.log('create...'+this.shop);
            if(this.editable)
            {
                console.log('IN edit');
                console.log('got from parent:'+this.shoprecord);
                //this.shop = this.shoprecord;
                console.log('current shop:'+this.shop);
                updateShops({s:this.shop, addr:this.addr}).then(result=>{
                    console.log(result);
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Success",
                            message: 'New Shop Record Created - :' + result,
                            variant: "success",
                        })
                    );
                    this.showmodal = false;
                    this.editable = false;
                    
                    const c1 = new CustomEvent('refreshtable');
                    this.dispatchEvent(c1);
                })
                .catch(Error=>{
                    console.log('error in updating:',Error);
                })
            }
            else
            {
                console.log('In create');
                createShops({s:this.shop, addr:this.addr}).then(result=>{
                    console.log(result);
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Success",
                            message: 'New Shop Record Created - :' + result,
                            variant: "success",
                        })
                    );
                    this.showmodal = false;
                    const c1 = new CustomEvent('refreshtable');
                    this.dispatchEvent(c1);
            
                })
                .catch(error=>{
                    console.log(error);
                });
            }
            this.shop={
                Id : null,
                Name:'',
                Shop_Code__c:0,
                Owner_Name__c:'',
                Shop_Type__c:null,
                Annual_Turnover__c:0
        
            };
            this.addr={
                Id:null,
                City__c:'',
                Pincode__c:'',
                State__c:'',
                Street__c:'',
                Full_Address__c:''
            };
        }

       

    }

}