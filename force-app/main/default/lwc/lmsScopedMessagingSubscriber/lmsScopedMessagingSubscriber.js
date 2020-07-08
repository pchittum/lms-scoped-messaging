import { LightningElement, wire, api } from 'lwc';
import { subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import TEST_MESSAGE_CHANNEL from '@salesforce/messageChannel/TestChannel__c';

export default class LmsScopedMessagingSubscriber extends LightningElement {
    @api
    isApplicationScope = false;

    @wire(MessageContext)
    messageContext;

    subscription;
    message;
    currentSubscriptionScope;

    handleMessageReceived(message){
        this.message = message.message;
    }

    connectedCallback(){
        if (this.isApplicationScope) {
            this.subscription = subscribe(
                this.messageContext, 
                TEST_MESSAGE_CHANNEL, 
                message => {this.handleMessageReceived(message)}, 
                {scope: APPLICATION_SCOPE}
            );
        } else {
            this.subscription = subscribe(
                this.messageContext, 
                TEST_MESSAGE_CHANNEL, 
                message => {this.handleMessageReceived(message)}
            );

        }

        this.currentSubscriptionScope = `This subscription is ${
                                        this.isApplicationScope ? 
                                        'Application' : 'Active'
                                        } scope.`;
    }

    // handleInput(event){
    //     this.message = event.target.value; 
    // }
}