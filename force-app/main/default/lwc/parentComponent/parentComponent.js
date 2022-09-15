import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    age;
    lastName;
    message;
    setAge(event)
    {
        this.age =  event.target.value;
    }
    setName(event)
    {
        this.lastName = event.target.value;
    }
    sendToChild()
    {
        this.template.querySelector('c-child-component-1').lastname = this.lastName;
        this.template.querySelector('c-child-component-2').studentage = this.age;
        
    }

    forwardMessage(event)
    {
        this.message = event.detail;
        this.template.querySelector('c-child-component-2').msg = this.message;
    }

}