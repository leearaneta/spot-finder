### Spot Finder

Great job overall!
A few suggestions:
+ Create a controller class that 'owns' the controller methods. This will help organize your code into modules. Also will help other coders trace the flow because they'll know where `createDestination()` lives.
+ Break out destinations adapter into two functions - one that makes the call and one that handles the response. Right now, method is long and trying to do more than one thing.
+ Clearer argument names in function declaration
+ Method names are very nice overall
+ I would hate to debug that xmlToJson function
