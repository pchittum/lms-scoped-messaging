import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import TEST_CHANNEL from '@salesforce/messageChannel/TestChannel__c';

export default class LmsScopedMessagingPublisher extends LightningElement {

    @wire(MessageContext)
    messageContext;

    message; 

    handlePublishClick(){
        const payload = {message : this.message};
        publish(this.messageContext, TEST_CHANNEL, payload);
    }

    handleInput(event){
        this.message = event.target.value; 
    }
}