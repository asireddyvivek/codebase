import { LightningElement } from 'lwc';

export default class ParentLwcDay3 extends LightningElement {

    name1 = '';
    age1='';
    setName(event)
    {
        console.log(event.target.name+": "+event.target.value);
        this.name1 = event.target.value;
    }
    sendToChild()
    {
        this.template.querySelector('c-child-lwc-day-3').detailsFromParent =this.name1;
    }
    processChildData(event)
    {
        this.age1 = event.detail;
        
    }
}