//list of colors
const fishColors = ["red", "orange", "blue", "green", "brown", "yellow", "orange with blue stripes", "transluscent", "brown with red stripes", 
"red with yellow stripes", "black", "green with brown spots", "brown with white spots", "white with red spots"];


//list of physical attributes
const fishDesc = ["splendid", "heavy", "fat", "slimy", "cute", "ugly", "lovely", "gross", 
"injured", "shiny", "heavy", "squirmy", "aggressive", "beautiful", "shimmering"];


//list of fish types
const fishType = ["catfish", "trout", "salmon", "chub", "pike", "bass", "sturgeon", "walleye", "perch", "minnow", "herring"];



//Starting values for important objects & arrays
let bucket = [   
    
    {
        color: 'yellow',
        desc: 'shimmering',
        type: 'bass',
        value: '1.34',
        weight: '0.97'
    },
    
    {
        color: 'brown',
        desc: 'squirmy',
        type: 'sturgeon',
        value: '3.87',
        weight: '2.45'
    }
    
];

let onRod = [];
let clock = 0;

// console.log (bucket);

//I have some questios about accessing a function without the () operator. As I understand it,
//without any input there, this function will return the OBJECT I am creating - the new fish.
//Currently I am pushing this fish into an array outside of the function, but performing
//this action INSIDE of my function.
//
//If I removed the line 'onRod.push(newFish);', what's another way to get this object
//where I want it to go? I may just be confused on the syntax here.
//
//TODO: need value & weight
function createFish () {
    //First we clear the rod, I might move this line to somewhere else in the program.
    onRod = [];
    const newFish = {
        //I don't need to use a function here, but thought it would be fun to call a function
        //inside of another function. I could just copy over the random code into each line,
        //but change the variables so it matches the array I want to pull from.
        color : random_item(fishColors),
        desc : random_item(fishDesc),
        type : random_item(fishType),
        //'1' - temp values. I plan to input [newFish.type] in place of '1' for these 2 lines.
        value : randomCash(10),
        weight : randomWeight(3),
    }
    //This is a temporary storage place for the fish. I think from here the player will "keep",
    //meaning splice the onRod object into the bucket array; or, "throw back" where I will
    //just clear the onRod array and delete the newly created fish.
    onRod.push(newFish);
    return
}

// createFish();
// console.log('This is what we caught...', onRod);


//This function will pull a random element from a chosen array. I have an idea to use this
//during the 'fishing' part of my game. If I wanted there to be a 1/10 chance of 'breaking
//the line' on the fishing pole; I could make an array with 10 values [create fish, create fish, 
//create fish, ... break line, create fish], and have this function pull randomly. The player 
//would then either get a fish 9/10 times, or break the line the other 1/10 of the time. Many 
//approaches to this already I can see.
//
//This code I copied from a website, but it's so simple I did not think it would be an
//issue if I used it. I don't think I have ever used an '_' in a function name.
function random_item(items) { 
    return items[Math.floor(Math.random()*items.length)];
}


//functions for weight and value
//this is more difficult because the values here, will determine how 'difficult' our game
//is. I think I want to give the player 3 chances to catch a fish each hour, but each
//chance will not always produce a fish. The line could break, for example, or they
//could fish up a piece of junk.
function randomWeight (a) {
    //.toFixed here determines how many decimal places we want to output with the number.
    tempWeight = (((Math.random()*a) ) .toFixed(2));
    //This is a simple function, but I wanted to add this if statement. I don't think
    //fish smaller than a certain number should be caught, both realistically and from
    //a gameplay standpoint. 10/18 = .55, meaning if a player caught all 18 potential
    //fish, as long as they all weighed .55 or less the player could keep all of them.
    //With a min weight of 0.75, keeping all of the fish will put the total weight at
    //a minimum value of 13.5lbs.
    //
    //Using a min value will force the player to make decisions about what to keep. I
    //plan to use different values for 'a', so some fish could be bigger or smaller.
    //Balancing this would be the hardest part, to keep it competitive.
    // if (tempWeight > 0.75) {
    //     return tempWeight
    // }
    // else {
    //     return randomWeight(a)
    // } 
    
    
    return tempWeight > 0.75 ? tempWeight : randomWeight(a)
    
    
}

// console.log( 'Random weight to test our function, NOT the same as \"What we caught...\"', randomWeight(10), 'lbs' );


//Basically the same function here as above. randomValue seemed confusing to me,
//as the word value can mean a lot of different things. randomCash is more clear
//to me regarding what this number is supposed to be.
//
//Temp value is quite low here. I plan to manipulate the input, a, to more closely
//adjust the value of these fish. Since the player can accumulate as much money as
//they want, no reason to further limit the min value or the max value.
//
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
    let tempValue = (((Math.random()*a) ) .toFixed(2));
    if (tempValue > 0.25) {
        return tempValue
    }
    else {
        return randomCash(a)
    } 
}

// console.log( 'Random cash value to test our function, NOT the same as \"What we caught...\"', '$', randomCash(10));



//I would like to potentially add in a rarity system. I could create a data set for Bass,
//where they are always 1-3lbs in weight and $0.50 - $2 in value. Bass would have a PPP 
//(price-per-pound) raneg of 0.166 - 2. Any Bass with a PPP > 1.541 would be in the top
//25% of possible Bass to catch. This would trigger an additional property to be assigned
//to the fish, to help the player understand what they have.
//
//Likewise, any bass with a PPP < 0.619 would be in the bottom 25% of possible bass to catch.
//A property would then be assigned to indicate this is a poor quality fish.
//
//Adding in custom value ranges for each fish will be easy I think. I can use the randomly
//generated name value, as the input for my weight function, and have the weight function
//contain all of the code for the value ranges for each fish.



////////////////////////////////////////////////////////////////////////////////////////////

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
    
    //Trivial case
    return bucket.length === 0 ? console.log('Your bucket is empty, go catch some fish!') : 
    console.log('\n', 'You currently have', sumFish.toString(), 'fish.', '\n',
                'Your bucket weighs', sumWeight.toFixed(2),'lbs.', '\n',
                'This haul is worth $', sumCash.toFixed(2), 'back in town.'
               );
}

lookBucket();


//Function to move the clock, with a variable containing the # of minutes to advance.
//Let's do the timewarp again
function timeWarp (warpSpeed) {
clock += warpSpeed;
    return 
}

timeWarp(100);

//This function will convert the value in clock (minutes) to the 24hr clock standard.
//It is easier to do this than convert afternoon times, 13 -> 1, 14 -> 2 ...
//Also I use the 24 clock for everything anyways so it makes sense to me.
function checkWatch () {
let hours = Math.floor(clock / 60)
let minutes = clock % 60;

    //I used padStart here to append the hours for the 24hr clock. Numbers are output to
    //terminal in yellow which stands out visually; I converted these values to strings
    //for consistency with the rest of my program.
    return console.log('\n', 'It is', String(hours).padStart(2,'0'), ':', minutes.toString())
}

checkWatch ();

//pasted on jun 23 720PM
////-------------FUNCTIONS---------------//
// function createFish () {

//     //First we clear the rod, I might move this line to somewhere else in the program.
//     onRod = [];
//     const newFish = {
//         color : random_item(fishColors),
//         desc : random_item(fishDesc),
//         type : random_item(fishType),

//         //'1' - temp values. I plan to input [newFish.type] in place of '1' for these 2 lines.
//         value : randomCash(1),
//         weight : randomWeight(1),
//     }
//     //This is a temporary storage place for the fish, while player makes a decision.
//     onRod.push(newFish);
//     return
// }

// createFish();
// console.log('This is what we caught...', onRod);