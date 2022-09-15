import { LightningElement, track } from 'lwc';
import NAME_FIELD from "@salesforce/schema/Account.Name";
import MOBILE_FIELD from "@salesforce/schema/Account.Phone";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import TYPE_FIELD from "@salesforce/schema/Account.Type";

import saveRecord from "@salesforce/apex/CreateRecordController.saveAccount";
//import {showToastEvent} from "lightning/platformShowToastEvent";
export default class CreateRecord extends LightningElement {
    @track accRecord={
        Name : NAME_FIELD,
        Mobile : MOBILE_FIELD,
        Type : TYPE_FIELD,
        Insudtry : INDUSTRY_FIELD 
    };

    handleChange(event)
    {
        if(event.target.name ==='accName')
            this.accRecord.Name = event.target.value;
        else if(event.target.name==='accMobile')
            this.accRecord.Mobile = event.target.value;
        else if(event.target.name==='accIndustry')
            this.accRecord.Insudtry =  event.target.value;
        else if(event.target.name==='accType')
            this.accRecord.Type = event.target.value;
        
        console.log('Name:'+event.target.name+' Value:'+event.target.value);
    }

    handleClick()
    {
        console.log('button clicked');
        saveRecord({acc:this.accRecord}).then(result=>{
            console.log('result:'+result.data);

        }).catch(error=>{
            console.log('error:'+error);
            console.log('error:'+error.message);
        });
    }
}