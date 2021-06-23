//This is my Gone Fishing game, and my first comments here. I plan to begin by creating the functions,
//which will create the randomly generated fish. This 'part' of the project can exist entirely by
//itself, so I think it's a good place to just get something going! I will now go make my first commit.

console.log ('And so it begins.');

//Our old friend prompt-sync
const prompt = require('prompt-sync')();


//list of colors
const fishColors = ["red", "orange", "blue", "green", "brown", "yellow", "orange with blue stripes", "transluscent", "brown with red stripes", 
"red with yellow stripes", "black", "green with brown spots", "brown with white spots", "white with red spots"];


//list of physical attributes
const fishDesc = ["splendid", "heavy", "fat", "slimy", "cute", "ugly", "lovely", "gross", 
"injured", "shiny", "heavy", "squirmy", "aggressive", "beautiful", "shimmering"];


//list of fish types
const fishType = ["catfish", "trout", "salmon", "chub", "pike", "bass", "sturgeon", "walleye", "perch", "minnow", "herring"];



//Starting values for important objects & arrays
let bucket = [];
let onRod = [];
let clock = 0;



//-------------FUNCTIONS---------------//
function createFish () {

    //First we clear the rod, I might move this line to somewhere else in the program.
    onRod = [];
    const newFish = {
        color : random_item(fishColors),
        desc : random_item(fishDesc),
        type : random_item(fishType),
        
        //'1' - temp values. I plan to input [newFish.type] in place of '1' for these 2 lines.
        value : randomCash(1),
        weight : randomWeight(1),
    }
    //This is a temporary storage place for the fish, while player makes a decision.
    onRod.push(newFish);
    return
}

// createFish();
// console.log('This is what we caught...', onRod);

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
function lookBucket () {

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
    
    //Trivial case and output to player
    return bucket.length === 0 ? console.log('Your bucket is empty, go catch some fish!') : 
    console.log('\n', 'You currently have', sumFish.toString(), 'fish.', '\n',
                'Your bucket weighs', sumWeight.toFixed(2),'lbs.', '\n',
                'This haul is worth $', sumCash.toFixed(2), 'back in town.'
               );
}

//Function to move the clock, with a variable containing the # of minutes to advance.
//Let's do the timewarp again
function timeWarp (warpSpeed) {
clock += warpSpeed;
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
    return console.log('\n', 'It is', String(hours).padStart(2,'0'), ':', String(minutes).padStart(2,'0'));
}

//
//-------END OF FUNCTIONS---------//
//

//Opening splash screen for player.
console.clear ();
console.log('Welcome to',
             '\n',  '\n', '\n', '\n', 
            '   Reel Out: Big Bass American Fishing Challenge 2021 - the Terminal Edition',
            '\n', '\n', 
            '                       "Where any fin is possible"', 
            '\n', '\n', '\n',);
console.log('Press ENTER to START!');
prompt ('>');

//We take in a custom value for the player's name.
console.log('What is your name?')
const name = prompt ('>');
console.clear ();

//Here we set the time to 0600.
timeWarp(360);

console.log('~~~~~~~ REEL OUT! ~~~~~~~',
            '\n',
            '\n',);
checkWatch();