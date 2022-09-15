import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getShops from "@salesforce/apex/ShopsController.getShops";
import deleteShops from "@salesforce/apex/ShopsController.deleteShop";

import createShops from "@salesforce/apex/ShopsController.insertShops";
import searchShops from "@salesforce/apex/ShopsController.getFilteredShops"

export default class ShopComponent extends LightningElement {
    recordId = null;
    showSearch = false;
    showRecords = false;
    filterKey ='';
    @track shopRecords=[];
    shopRec = {
        Id : null,
        Name : '',
        Shop_Code__c : 0,
        Shop_Type__c : '',
        Owner_Name__c : '',
        Annual_Turnover__c : 0,
        Address__c : ''
    };
    addrRec={
        Id:null,
        City__c:'',
        Pincode__c:'',
        State__c:'',
        Street__c:'',
        Full_Address__c:''
    }
    getRecords()
    {
        
        this.showRecords =!this.showRecords;
        getShops().then(result=>{
            console.log(result);
            this.shopRecords = result;
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Error",
                    message: 'connected callback error :' + error.body.message,
                    variant: "failure",
                })
            );
        });
    }

    getFilteredRecords(event)
    {
        this.filterKey = event.target.value;
        searchShops({searchText:this.filterKey}).then(result=>{
            console.log('filtered records:',result);
            this.shopRecords = result;
            console.log('shoprecs',this.shopRecords);

        })
        .catch(error=>{
            console.log('Error:'+error);
            this.shopRecords = [];
        })
    }
    searchRecords()
    {
        this.getFilteredRecords();
    }
    createRecords()
    {
        console.log('creating');
        this.template.querySelector('c-modal-component').showmodal = true;
        // createShops({s:this.shopRec, addr:this.addrRec}).then(result=>{
        //     console.log(result);
        //     this.dispatchEvent(
        //         new ShowToastEvent({
        //             title: "Success",
        //             message: 'New Shop Record Created - :' + result,
        //             variant: "success",
        //         })
        //     );
        // })
        // .catch(error=>{
        //     console.log(error);
        // });
    }
    refreshRecords()
    {
        console.log('Called parent');
        this.getRecords();
    }
    showSearchBox()
    {
        this.showSearch = !this.showSearch;
    }
    handleDelete(event){
        console.log('In delete');
        this.recordId = event.target.dataset.id;
        console.log(this.recordId);
        deleteShops({recId:this.recordId}).then(result=>{
            console.log(result);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Success",
                    message:  result,
                    variant: "success",
                })
            );
            this.getRecords();
        })
        .catch(error=>{
            console.log(error);
        });
    }

    callFromChild(event){
        
    }

    editRecord(event){
        this.shopRec.Id = event.target.dataset.id;
        for (let i = 0; i < this.shopRecords.length; i++) {
            console.log('inside for loop');
            if (this.shopRecords[i].Id == this.shopRec.Id) {
                console.log('inside for loops if');

                this.shopRec.Name = this.shopRecords[i].Name;
                this.shopRec.Owner_Name__c = this.shopRecords[i].Owner_Name__c;
                this.shopRec.Shop_Code__c = this.shopRecords[i].Shop_Code__c;
                this.shopRec.Shop_Type__c = this.shopRecords[i].Shop_Type__c;
                this.shopRec.Annual_Turnover__c = this.shopRecords[i].Annual_Turnover__c;
                //this.shopRec.Address__c = this.shopRecords[i].Age__c;
                if(this.shopRecords[i].Address__c){
                    this.addrRec.Id = this.shopRecords[i].Address__c;
                    this.addrRec.City__c = this.shopRecords[i].Address__r.City__c;
                    this.addrRec.Street__c = this.shopRecords[i].Address__r.Street__c;
                    this.addrRec.Pincode__c = this.shopRecords[i].Address__r.Pincode__c;
                    this.addrRec.State__c = this.shopRecords[i].Address__r.State__c;



                }
                
                console.log('shop sent to child:', this.shopRec.Shop_Code__c);
                break;
            }
        }
        //this.template.querySelector('c-modal-component').shop = this.shopRec;
        this.template.querySelector('c-modal-component').editable = true;
        this.template.querySelector('c-modal-component').showmodal = true;
        console.log('JSON string',JSON.stringify(this.shopRec) );
        this.template.querySelector('c-modal-component').setShopRecord(JSON.stringify(this.shopRec), JSON.stringify(this.addrRec));
        
    }
}