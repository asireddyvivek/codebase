import {
    LightningElement,
    track
} from 'lwc';

import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';
import insertAccount from '@salesforce/apex/AccountCRUD.insertAccount';
import getAccounts from '@salesforce/apex/AccountCRUD.getAccounts';
import updateAccount from '@salesforce/apex/AccountCRUD.updateAccount';
import deleteAccount from '@salesforce/apex/AccountCRUD.deleteAccount';



export default class CRUD_Operations extends LightningElement {

    @track accRecord = {
        Id: null,
        Name: '',
        Age__c: ''
    };
    @track agedAccounts = [];

    accNameChange(event) {
        this.accRecord.Name = event.target.value;
    }

    accAgeChange(event) {
        this.accRecord.Age__c = event.target.value;
    }

    connectedCallback() {
        this.callGetAccounts();
    }

    callGetAccounts() {
        console.log('before executing getAccounts');
        getAccounts()
            .then(result => {
                console.log('in getAccounts then block');
                console.log(this.agedAccounts);
                this.agedAccounts = result;
                console.log(this.agedAccounts);
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
        console.log('after executing getAccounts');
    }

    selectedAccount;
    selectAccount(event) {
        this.accRecord.Id = event.target.dataset.id;
        console.log(this.selectedAccount);
        for (let i = 0; i < this.agedAccounts.length; i++) {
            console.log('inside for loop');
            if (this.agedAccounts[i].Id == this.accRecord.Id) {
                console.log('inside for loops if');

                this.accRecord.Name = this.agedAccounts[i].Name;
                this.accRecord.Age__c = this.agedAccounts[i].Age__c;
                break;;
            }
        }
    }

    handleInsertAccount() {
        this.accRecord.Id = null;
        insertAccount({
                acc: this.accRecord
            })
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Record Created Successfully",
                        message: result,
                        variant: "Success"
                    })
                );
                console.log(this.accRecord);
                this.accRecord = {};
                console.log(this.accRecord);

                console.log('before calling callGetAccounts');
                this.callGetAccounts();
                console.log('after calling callGetAccounts');
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error",
                        message: 'Record Creation Error :' + error.body.message,
                        variant: "failure",
                    })
                );
            });

    }

    handleUpdateAccount() {
        if (this.accRecord.Id != null) {
            updateAccount({
                acc: this.accRecord
            }).then(result => {
                this.toaster('Successful', 'record with Id :' + result + ' upadated', 'success');
                this.callGetAccounts();
                this.accRecord={};
            });
        } else {
            this.dispatchEvent(new ShowToastEvent({
                title: 'No Account Selected',
                message: 'select an account from the abve table',
                variant: 'warning'
            }));
        }
    }

    toaster(titlePar, msgPar, varPar) {
        this.dispatchEvent(new ShowToastEvent({
            title: titlePar,
            message: msgPar,
            variant: varPar
        }));
    }

    handleDeleteAccount(){
        if (this.accRecord.Id != null) {
            deleteAccount({
                acc: this.accRecord
            }).then(result => {
                this.toaster('Successful', 'record with Id :' + this.accRecord.Id + ' deleted', 'success');
                this.callGetAccounts();
                this.accRecord={};
            });
        } else {
            this.dispatchEvent(new ShowToastEvent({
                title: 'No Account Selected',
                message: 'select an account from the abve table',
                variant: 'warning'
            }));
        }
    }

}