import { api, LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    @api firstName = 'Vivek';
    handleChange(event)
    {
        console.log(event.target.value);
        this.firstName = event.target.value;
    }
    submitDetails()
    {
        window.alert('Welcome, '+this.firstName);
    }
}