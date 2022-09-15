import { api, LightningElement } from 'lwc';

export default class ChildLwcDay3 extends LightningElement {
    @api detailsFromParent='';
    @api detailsFromParentSec='';

    age;
    setAge(event)
    {
        this.age =  event.target.value;
    }
    sendToParent()
    {
        const cevent1 = new CustomEvent('senddetailstoparent',{detail:this.age});
        this.dispatchEvent(cevent1);
    }
}