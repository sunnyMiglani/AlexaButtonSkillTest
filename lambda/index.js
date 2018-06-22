"use strict";

const Alexa = require('alexa-sdk');
const ssmlMediumBreak = "<break time = '0.5s' />";

exports.handler = (event, context) => {
    // Standard Alexa Skills Kit initialization.
    const alexa = Alexa.handler(event, context);
    alexa.appId = 'amzn1.ask.skill.9a50e8dd-aafa-4a18-92ec-333557acae44'; // Put your Skill ID here.
    alexa.registerHandlers(main);
    alexa.execute();
};

const main = {
    'LaunchRequest' : function(){
        this.response.speak("Hello, Welcome to the Big Buttons Test Skill!," + ssmlMediumBreak +  " if you need help ask for 'help', otherwise say 'play'").listen("You can say Help or say Play!");
        this.emit(":responseReady");


    },
    'HelpIntent': function(){
        this.response.speak("This app was made as proof of concept for BIG Research Lab " + ssmlMediumBreak + "Test the echo buttons using the word 'play' when you launch this app").listen("Say play or stop");
        this.emit(":responseReady");
    },

    'ButtonIntent': function(){
        this.response.speak("This is a placeholder for the buttons to start colours!");
        this.emit(":responseReady");
    }
}
