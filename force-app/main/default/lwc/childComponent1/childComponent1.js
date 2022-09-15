import { api, LightningElement } from 'lwc';

export default class ChildComponent1 extends LightningElement {
    @api studentname;

    @api lastname;

    msg;
    setMsg(event)
    {
        this.msg = event.target.value;
    }
    sendMessage()
    {
        const c1 = new CustomEvent('sendmsgtoparent',{detail:this.msg});
        this.dispatchEvent(c1);
    }

}