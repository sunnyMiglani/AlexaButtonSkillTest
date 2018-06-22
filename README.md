# Alexa Button Test Skill

This skill is created to test and document button for use with Alexa Echo Plus.

This is how the system works:
You need to use the system of a `GameEngine` interface and a `GadgetController` interface. The `GadgetController` is more focused towards changing what the buttons look like, for example changing the colours on the buttons

The `GameEngine` interface is how the Alexa / AWS / Lambda skills will define interaction with the buttons. 
This is used things such as **`GameEnginer.StartInputHandler`**. The InputHandler is the main structure sent to the buttons to define their behaviour.

## Defining Echo Button Events
Echo button events is how AWS lets us talk to the buttons and only focus on the inputs that matter:
We would define a set number of patterns (max 32), through these we only act based on which pattern matched as opposed to use manually parsing the input.

(Idea: It might be possible to match the inputs in our own way as there is a method of trying to figure out the 'raw' input.)

### Events:

For each event you define, you list the patterns it has to MATCH and the ones it has to FAIL. This way you can force mutual exclusion.
This also allows for a default _match all_ pattern.

These patterns are done using a system of **recoginzers**. These are defined [here](https://developer.amazon.com/docs/gadget-skills/define-echo-button-events.html#recognizers)

Essentially these systems are just patterns which the buttons can correspond / check against and return the relevant event to. 

The `match` recoginzer is the one that's most important for our implementation. It should be able to pattern match a specific pattern in order in the history of the `InputHandler`.

## Documentation:
Referenced Documents / Links are :
1. [Overall outline of how buttons work](https://developer.amazon.com/docs/gadget-skills/gameengine-interface-reference.html)
2. [Focused on Events for InputHandler. THIS IS THE MOST IMPORTANT ONE](https://developer.amazon.com/docs/gadget-skills/define-echo-button-events.html#progress)
3. [Example sample repo](https://github.com/alexa/skill-sample-nodejs-buttons-hellobuttons)
