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
        this.response._addDirective({
            "type": "GameEngine.StartInputHandler",
            "timeout": 3000,
            "recognisers": {
                "button_down_recognizer": {
                    type: "match",
                    fuzzy: false,
                    anchor: "end",
                    "pattern": [{
                        "action": "down"
                    }]
                },
                "button_up_recognizer": {
                    type: "match",
                    fuzzy: false,
                    anchor: "end",
                    "pattern": [{
                        "action": "down"
                    }]
                }
            },
            "events": {
                "button_down_event": {
                    "meets": ["button_down_recognizer"],
                    "reports": "matches",
                    "shouldEndInputHandler": false
                },
                "button_up_event": {
                    "meets": ["button_up_recognizer"],
                    "reports": "matches",
                    "shouldEndInputHandler": false
                },
                "timeout": {
                    "meets": ["time_out"],
                    "reports": "history",
                    "shouldEndInputHandler": true
                }
            },
        });
        this.attributes.inputHandler_originatingRequestId = this.event.request.requestId;
        delete this.handler.response.response.shouldEndSession;
        this.emit(":responseReady");
    },

    'HelpIntent': function(){
        this.response.speak("This app was made as proof of concept for BIG Research Lab " + ssmlMediumBreak + "Test the echo buttons using the word 'play' when you launch this app").listen("Say play or stop");
        this.emit(":responseReady");
    },
    "GameEngine.InputHandlerEvent": function(){
        let buttonId;
        let gameEngineEvents = this.events.request.events || [];
        for (let i = 0; i < gameEngineEvents.length; i++) {
            switch(gameEngineEvents[i]){
                case 'button_down_event':
                    buttonId = gameEngineEvents.inputEvents[0].gadgetId;
                    this.response._addDirective(generateAnimationDirective([buttonId],"red"));
                break;
            }
        }

    }
    
}

const generateAnimationDirective = function (targetGadgets, color) {
    return {
        "type": "GadgetController.SetLight",
        "version": 1,
        "targetGadgets": targetGadgets,
        "parameters": {
            "animations": [{
                "repeat": 1,
                "targetLights": ["1"],
                "sequence": [{
                    "durationMs": 300,
                    "color": "FFFF00",
                    "blend": false
                }]
            }],
            "triggerEvent": "buttonDown",
            "triggerEventTimeMs": 0
        }
    }
};
