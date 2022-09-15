import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertAccount from '@salesforce/apex/AccountController.createAcc';
export default class ProductComponent extends LightningElement {
    picklistValues = [{label:'Prospect', value:'Prospect'},{label:'Other',value:'Other'}];
    productName; productType; productNumber;


    changeHandler(event)
    {
        console.log('changed name'+event.target.value);
        if(event.target.name==='Name')
        {
            this.productName = event.target.value;
        }
        else if(event.target.name==='Number')
        {
            this.productNumber =  event.target.value;
        }
        else if(event.target.value==='Type')
        {
            this.productType =  event.target.value;
        }
        //console.log('value:'+event.target.value);
    }
    saveDetails()
    {
        console.log('Validating the input...');
        alert('submitted2'+this.productName);
        if(this.productName==undefined || (this.productName).length<5)
        {
            console.log((this.productName).length);
            this.showError('Name should have atleast 5 characters');
        }
        else if(this.productNumber<100 || this.productNumber>200 || !this.productNumber || this.productNumber==='')
        {
            this.showError('Number should be between 100-200');
        }
        else if(this.productType==='' || !this.productType || this.productType==='')
        {
            this.showError('Select a value for the Type');
        }
        
        /*insertAccount({name:this.productName,num:this.productNumber,type:this.productType}).then(result=>{
        alert('result'+result);
    
        });*/

    }

    showError(msg)
    {
        console.log('showing error toast');
        const event = new ShowToastEvent({
            title: 'Error',
            message:''+msg,
            variant: 'error',
        });
        this.dispatchEvent(event);
    
    }
    
    
}