//This is my Gone Fishing game, and my first comments here. I plan to begin by creating the functions,
//which will create the randomly generated fish. This 'part' of the project can exist entirely by
//itself, so I think it's a good place to just get something going! I will now go make my first commit.


//Our old friend prompt-sync
const prompt = require('prompt-sync')();


//list of colors
const fishColors = ["red", "orange", "blue", "green", "brown", "yellow", "orange & blue striped", 
"transluscent", "brown & red striped", "red & yellow striped", "black", "green & brown spotted", 
"brown & white spotted", "white & red spotted"];


//list of physical attributes
const fishDesc = ["splendid", "heavy", "fat", "slimy", "cute", "ugly", "lovely", "gross", 
"injured", "shiny", "heavy", "squirmy", "aggressive", "beautiful", "shimmering"];


//list of fish types
const fishType = ["catfish", "trout", "salmon", "chub", "pike", "bass", "sturgeon", "walleye", "perch", "minnow", "herring"];



//Starting values for important objects & arrays
let bucket = [];
let onRod = [];
let clock = 0;
let time = '';
let chum = 0;
let name = 'player';
let playerInput = '';

//This value is my escape/exit from the program
let running = 0;



//This code I copied from a website, but it's so simple I did not think it would be an
//issue if I used it. I don't think I have ever used an '_' in a function name.
function random_item(items) { 
    return items[Math.floor(Math.random()*items.length)];
}

//This is more difficult because the values here, will determine how 'difficult' our game
//is. I want to give the player 3 chances to catch a fish each hour, but each
//chance will not always produce a fish. The line could break, for example, or they
//could fish up a piece of junk.
function randomWeight (a) {
    
    //.toFixed here determines how many decimal places we want to output with the number.
    tempWeight = (((Math.random()*a) ) .toFixed(2));
    
    //Fish smaller than a certain number should not be caught, both realistically and from
    //a gameplay standpoint. 10/18 = .55, meaning if a player caught all 18 potential
    //fish, as long as they all weighed .55 or less the player could keep all of them.
    //With a min weight of 0.75, keeping all of the fish will put the total weight at
    //a minimum value of 13.5lbs.
    //
    //Using a min value will force the player to make decisions about what to keep. I
    //plan to use different values for 'a', so some fish could be bigger or smaller.
    //Balancing this would be the hardest part, to keep it competitive. There should be a 
    //greater number of small fish than large fish.
    return tempWeight > 0.75 ? tempWeight : randomWeight(a);
}

// console.log( 'Random weight to test our function, NOT the same as \"What we caught...\"', randomWeight(10), 'lbs' );


//I could make certain high values less likely here, by adding in some new code. If
//tempValue > 15, run another random roll, half the time they get the expensive fish
//but half the time the value gets re-evaluated behind the scenes.
//
//Also, I'm not sure where in all of the code I should put this. If I wanted each fish
//to have a different set of values: minnows are .25 - 2$, but bass are $2 - $5, for
//example. I could put that in here, and also take an additional input, a - top value of
//fish & b - type of fish.
//
//So if this function gets a minnow, it will run a different command than if it got
//bass or trout as the input.
function randomCash (a) {
    let tempValue = (((Math.random()*a)).toFixed(2));
    
    //This sets the min value for any fish caught.
    return tempValue > 0.25 ? tempValue : randomCash(a)
}

// console.log( 'Random cash value to test our function, NOT the same as \"What we caught...\"', '$', randomCash(10));



//I would like to potentially add in a rarity system. I could create a data range for Bass,
//where they are always 1-3lbs in weight and $0.50 - $2 in value. Bass would have a PPP 
//(price-per-pound) range of 0.166 - 2. Any Bass with a PPP > 1.541 would be in the top
//25% of possible Bass to catch. This would trigger an additional property to be assigned
//to the fish, to help the player understand what they have.
//
//Likewise, any bass with a PPP < 0.619 would be in the bottom 25% of possible bass to catch.
//A property would then be assigned to indicate this is a poor quality fish.
//
//Adding in custom value ranges for each fish will be easy I think. I can use the randomly
//generated name value, as the input for my weight function, and have the weight function
//contain all of the code for the value ranges for each fish.

//This function will provide to the player, a summary of their catch so far today.
// function lookBucket () {

//     //Starting values for this function
//     let sumFish = 0;
//     let sumWeight = 0;
//     let sumCash = 0;

//     //Sum of fish
//     for (let i=0; i<bucket.length; i++) {
//         sumFish++;
//         sumWeight += Number(bucket[i].weight);
//         sumCash += Number(bucket[i].value);
//     }

//     //Trivial case and output to player
//     return bucket.length === 0 ? console.log('Your bucket is empty, go catch some fish!') : 
//     console.log('\n', 'You currently have', sumFish.toString(), 'fish.', '\n',
//     'Your bucket weighs', sumWeight.toFixed(2),'lbs.', '\n',
//     'This haul is worth $', sumCash.toFixed(2), 'back in town.'
//     );
// }

//Function to move the clock, with a variable containing the # of minutes to advance.
//Let's do the timewarp again
function timeWarp (warpSpeed) {
    clock += warpSpeed;
    // console.log('The new clock value is', clock);
    checkWatch();
    return 
}

// timeWarp(100);

//This function will convert the value in clock (minutes) to the 24hr clock standard.
//It is easier to do this than convert afternoon times, 13 -> 1, 14 -> 2 ...
//Also I use the 24 clock for everything anyways so it makes sense to me.
function checkWatch () {
    let hours = Math.floor(clock / 60)
    let minutes = clock % 60;
    
    //I used padStart here to append the hours for the 24hr clock. Numbers are output to
    //terminal in yellow which stands out visually; I converted these values to strings
    //for consistency with the rest of my program.
    //
    //I had a '+' in here for the longest time instead of .concat; from before I converted
    //these into strings. PAY ATTENTION!
    time = ((String(hours).padStart(2,'0')).concat(':').concat((String(minutes).padStart(2,'0'))).toString());
    
    return;
}

function getName () {
    //We take in a custom value for the player's name.
    console.log('What is your name?')
    name = prompt ('>');
    return
}



//
//-------END OF FUNCTIONS---------//
//

//Opening splash screen for player.
console.clear ();

console.log(
    '                                Welcome to',
    '\n',  '\n', '\n', '\n', 
    '   Reel Out: Big Bass American Fishing Challenge 2021 - the Terminal Edition',
    '\n', '\n', 
    '                       "Where any fin is possible"', 
    '\n', '\n', '\n',);
    
    console.log('Press ENTER to START!');
    prompt ('>');
    
    //Setting this value to 1 will enter us into the main loop of the game.
    running = 1;
    
    //Here we set the time to 0600.
    timeWarp(360);
    
    while (running === 1) {
        
        
        //I thought it would be interesting to try and store some of my functions inside of an object, and then call them
        //as needed. Not sure if this is easier/helpful, but I wanted to stay away from as many loops as possible.
        //
        //I could have put all functions in here, but I didn't want to spend the time to fix any bugs that might pop up.
        const choices = {
            
            quit: function () {
                running = 2;
                return
            },
            
            //Look inside the bucket, give sums to player
            bucket: function () {
                
                //***CLEAR CONSOLE***
                console.clear();
                
                //Starting values for this function
                let sumFish = 0;
                let sumWeight = 0;
                let sumCash = 0;
                
                //Sum of fish
                for (let i=0; i<bucket.length; i++) {
                    sumFish++;
                    sumWeight += Number(bucket[i].weight);
                    sumCash += Number(bucket[i].value);
                }
                
                //Maintain some of the UI for the player, so they know they're still 'inside' the game.
                console.log('          ~~~~~~~~~~ REEL OUT! ~~~~~~~~~');
                console.log('          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                
                //Trivial case inside a ternary statement
                bucket.length === 0 ? 
                
                console.log(
                    '\n', 
                    'Your bucket is empty, go catch some fish!',
                    '\n') : 
                    
                    //Other side of ternary statement
                    console.log(
                        '\n', 
                        'You currently have', sumFish.toString(), 'fish.', 
                        '\n',
                        'Your bucket weighs', sumWeight.toFixed(2), 'lbs.', 
                        '\n',
                        'This haul is worth $', sumCash.toFixed(2), 'back in town.')
                        ;
                        
                        //Since I am using console clears, and repetitive logs, to imitate a static UI here,
                        //I must put these 'pauses' in the game, so the player has time to read the output.
                        console.log('Press ENTER to continue...');
                        prompt('>')
                        ;
                        
                        return 
                    },
                    
                    //Create a new fish & place it on the player's fishing rod.
                    fish: function () {
                        
                        //***CONSOLE CLEAR***
                        console.clear();
                        
                        console.log('          ~~~~~~~~~~ REEL OUT! ~~~~~~~~~');
                        console.log('          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                        
                        
                        //First we clear the rod, I might move this line to somewhere else in the program.
                        onRod = [];
                        
                        const newFish = {
                            color : random_item(fishColors),
                            desc : random_item(fishDesc),
                            type : random_item(fishType),
                            
                            //'1' - temp values. I plan to input [newFish.type] in place of '1' for these 2 lines.
                            value : randomCash(3),
                            weight : randomWeight(5),
                        }
                        //This is a temporary storage place for the fish, while player makes a decision.
                        onRod.push(newFish);
                        console.log(
                            '\n',    
                            'You feel a bite and pull in your catch...',
                            '\n',
                            '   You caught a', newFish.color, newFish.type, ',', 'it looks', newFish.desc, 'and hangs from your hook.',
                            '\n',
                            '\n',
                            'Would you like to keep the fish?',
                            '\n',
                            '\n',
                            )
                            
                            let keep = prompt ('(Y/N) >')
                            
                            return (keep === 'N' || keep === 'n') ? onRod=[] : 
                            (keep === 'Y' || keep === 'y') ? choices.chuck(newFish) :
                            ''
                        },
                        
                        //The cast function will determine what happens to the player.
                        cast: function () {
                            
                            //Advance time by 20 minutes when the player casts their line
                            timeWarp(20);
                            
                            //***CONSOLE CLEAR***
                            console.clear();
                            
                            //Using a scale of 100 is easier to adjust/balance things.
                            let a = Math.floor(Math.random()*100);
                            
                            //I chose to use chum as a bonus to the roll. Fish can be caught at a roll up to 110, so
                            //chum essentially removes 10 'poor' outcomes and replaces them with 10 'good' outcomes.
                            chum = 1 ? a + 10 : a=a;
                            
                            console.log('          ~~~~~~~~~~ REEL OUT! ~~~~~~~~~');
                            console.log('          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                            console.log('\n');
                            
                            //Wanted to practice with ternary statements, and edit some of the code down. All the
                            //'if' and 'else' statements sure take up a lot of space.
                            
                            return (a <= 20) ? prompt('You fished up some junk. It is not worth anything. Press ENTER to continue.') : choices.fish();
                            
                        },
                        
                        //This function kicks in when the player decides to keep a fish. It checks the catch against sumWeight
                        //of the bucket, will block the fish if it would put the sumWeight over 10.
                        chuck: function (a) {
                            
                            //I am annoyed with this code, but I'm not retooling it. sumWeight is scoped inside of another
                            //function and I don't know how to get to it. In the future I think I'll split up my functions
                            //a lot more. I want to use just the sumWeight not the whole bucket function.
                            //Starting values for this function
                            let sumWeight = 0;
                            for (let i=0; i<bucket.length; i++) {
                                sumWeight += Number(bucket[i].weight);
                            }
                            
                            let testA = sumWeight + Number(a.weight);
                            console.log(sumWeight);
                            console.log(a.Weight);
                            
                            console.log('Your testA weight is', testA);
                            prompt('>');
                            
                            return ( testA < 10) ? bucket.push(a) : choices.thisThat(a);
                        },
                        
                        //This function will guide the player through exchanging their new fish, with one already in their bucket.
                        thisThat: function (a) {
                            aAA = a;
                            bucket.push(aAA);
                            // console.log('You have made it to your thisThat function with', a)
                            //     prompt ('>');
                            
                            //Sum of fish
                            let sumWeight = 0;
                            for (let i=0; i<bucket.length; i++) {
                                sumWeight += Number(bucket[i].weight);}
                                if (a.type === 'N/A') {
                                    bucket.splice(bucket.length - 1, 1)
                                    return};
                                    
                                    console.log(
                                        'Your bucket is too heavy, choose a fish throw out.',
                                        '\n',
                                        sumWeight, '/ 10lbs MAX.',
                                        '\n',
                                        )
                                        
                                        console.log(
                                            '\n',
                                            '\n',);
                                            
                                            for (let i=0; i<bucket.length; i++) {
                                                console.log('#', i + 1, '...', bucket[i].type, '...$', bucket[i].value, '...#', bucket[i].weight)};
                                            
                                            console.log(                                                
                                                '\n',
                                                '\n',
                                                'Enter the #number of the fish you will throw back into the river.');
                                                let input = prompt('>');
                                                bucket.splice(Number(input - 1), 1);
                                                
                                                
                                                return choices.thisThat({type:'N/A',value:0,weight:0})
                                            }
                                            
                                            
                                        }//End of choices
                                        
                                        //BEGINNING OF MAIN CODE
                                        
                                        
                                        //Clear the player's input from the previous loop.
                                        playerInput = '';
                                        
                                        //The program will check if we have a name for the player, if not it will prompt an input.
                                        name === 'player' ? getName():'';
                                        
                                        
                                        console.clear();
                                        //This is the basic UI for the player.
                                        console.log('          ~~~~~~~~~~ REEL OUT! ~~~~~~~~~');
                                        console.log('          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                                        console.log( 
                                            '\n',
                                            'It is currently', time, 'and a gorgeous sunny day outside.',
                                            '\n',
                                            '\n',
                                            'What would you like to do', name, '?',
                                            '\n',
                                            '\n',
                                            'Commands -',
                                            '\n',
                                            ' -Cast your line into the river. [cast]',
                                            '\n',
                                            ' -Review your catch. [bucket]',
                                            '\n',
                                            '\n',
                                            ' -Quit game. [quit]',
                                            );
                                            
                                            
                                            console.log('Type in a command...', '\n');
                                            
                                            //I want to use the player input, as the input to call a function. I needed to convert the input to lower case
                                            //if the player inputs any capital letters.
                                            // playerInput = ( (prompt ('>')).toLowerCase() );
                                            checkAction( ( (prompt ('>')).toLowerCase() ) );
                                            
                                            
                                            
                                            
                                            
                                            //Late stage add here, had a crash if this input did not match one of the key:values of {choices}
                                            function checkAction (a) {
                                                let aA = 0;
                                                
                                                //Go through each property in choices, if playerinput matches any of these, add 1 to aA. If aA is still at
                                                //value 0 when this loop is finished, it means that the player entered an invalid command.
                                                for (const action in choices) {
                                                    if (a === 'fish') {
                                                        checkAction( ( (prompt ('>')).toLowerCase() ) );
                                                    }
                                                    a === action ? aA++ : '';
                                                }
                                                
                                                return (aA === 0) ? (checkAction( ( (prompt ('>')).toLowerCase() ) ) ): 
                                                (aA > 0) ? (choices[a]() ):
                                                '';
                                            }
                                            
                                        }//End of main while loop
                                        
                                        
                                        
                                        if (running = 2) {
                                            console.clear();
                                            console.log('Thanks for playing, see you next time!');
                                        }