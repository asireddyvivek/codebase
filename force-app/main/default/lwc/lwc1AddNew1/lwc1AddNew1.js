import { LightningElement , api} from 'lwc';

import insert_record from '@salesforce/apex/mini_project_lwc.insert_Details';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Lwc1AddNew1 extends LightningElement {

    Shop_Name='';
    code='0';
    Owner_Name='';
    Type= [{label : 'Medical', value : 'Option 1'},
          {label : 'Grocery', value : 'Option 2'},
          {label : 'Clothing', value : 'Option 3'},
          {label : 'Electronics', value : 'Option 4'},
          {label : 'Hardware', value : 'Option 5'}]

    Annual_Turnover='';
    Street_Name='';
    City='';
    Pincode='012';
    State= [{label : 'Andhra Pradesh', value : 'Option 1'},
           {label : 'Maharastra', value : 'Option 2'},
           {label : 'Punjab', value : 'Option 3'},
           {label : 'Kerala', value : 'Option 4'},
           {label : 'West Bengal', value : 'Option 5'}]

    
    showModal = false;

    @api show() {
        this.showModal = true;
      }       
    handleDialogClose() {
       this.showModal = false;
    }      
    accept_shop_name(event){
        this.Shop_Name = event.target.value;
    }
    accept_code(event){
        this.code = event.target.value;
    }
    acccept_owner_name(event){
        this.Owner_Name = event.target.value;
    }
    accept_type(event){
        this.Type = event.target.value;
    }
    accept_annual_turnover(event){
        this.Annual_Turnover = event.target.value;
    }
    accept_street_name(event){
        this.Street_Name = event.target.value;
    }
    accept_city(event){
        this.City = event.target.value;
    }
    accept_state(event){
        this.State = event.target.value;
    }
    accept_pincode(event){
        this.Pincode = event.target.value;
    }


    insert_details(){
        insert_record({Shop_Name : this.Shop_Name, code: this.code, Owner_Name: this.Owner_Name , Annual_Turnover: this.Annual_Turnover,Street_Name:this.Street_Name,City:this.City,Pincode:this.Pincode})
        .then(result=> {
            console.log(result);
            const event = new ShowToastEvent({
                title: 'Record Saved',
                message: result})
                this.dispatchEvent(event);
            }).catch(Error=> {       
                console.log('Error'+Error);
                console.log(Error.message);
            })
        }
}