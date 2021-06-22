//list of colors
const fishColors = ["red", "orange", "blue", "green", "brown", "yellow", "orange with blue stripes", "transluscent", "brown with red stripes", 
"red with yellow stripes", "black", "green with brown spots", "brown with white spots", "white with red spots"];



//list of physical attributes
const fishDesc = ["splendid", "heavy", "fat", "slimy", "cute", "ugly", "lovely", "gross", 
"injured", "shiny", "heavy", "squirmy", "aggressive", "beautiful", "shimmering"];


//list of fish types
const fishType = ["catfish", "trout", "salmon", "chub", "pike", "bass", "sturgeon", "walleye", "perch", "minnow", "herring"];

let bucket = [];
let onRod = [];

// console.log(fishColors);
// console.log(fishDesc);
// console.log(fishType);
// console.log(fishColors.length);



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
    const newFish = {
        //I don't need to use a function here, but thought it would be fun to call a function
        //inside of another function. I could just copy over the random code into each line,
        //but change the variables so it matches the array I want to pull from.
        color : random_item(fishColors),
        desc : random_item(fishDesc),
        type : random_item(fishType),
    }
    //This is a temporary storage place for the fish. I think from here the player will "keep",
    //meaning splice the onRod object into the bucket array; or, "throw back" where I will
    //just clear the onRod array and delete the newly created fish.
    onRod.push(newFish);
    return
}

function random_item(items) { 
    return items[Math.floor(Math.random()*items.length)];
}

createFish();

console.log(onRod);