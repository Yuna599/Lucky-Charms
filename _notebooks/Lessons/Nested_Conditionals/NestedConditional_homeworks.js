// Step 1: Make a javascript file
// Step 2: Plan and set variables
let coinFlip = Math.floor(Math.random() * 2); // 0 for heads, 1 for tails
let tickets = 3;
let height = 50; // height in inches
let money = 10; // amount of money
let foodInStock = true; // is the food in stock
let foodChoice = "hot dog"; // chosen food
let requiredTickets = 2;
let requiredHeight = 48; // required height for rides
let foodCost = 8; // cost of the food

// Step 4: Determine who gets to choose and where they go
if (coinFlip === 0) { 
    console.log("It's heads! You get to choose where to go.");
    // Decide to go on a ride
    console.log("You chose to go on a ride.");
    
    // Step 5: Nested conditionals for ride checks
    if (tickets >= requiredTickets) {
        if (height >= requiredHeight) {
            console.log("You are tall enough and have enough tickets to go on the ride. Have fun!");
        } else {
            console.log("You have enough tickets, but you are not tall enough for the ride.");
        }
    } else {
        console.log("You don't have enough tickets to go on the ride.");
    }

} else {
    console.log("It's tails! Your friend gets to choose where to go.");
    // Decide to go to a food stand
    console.log("Your friend chose to go to a food stand.");

    // Step 5: Nested conditionals for food checks
    if (money >= foodCost) {
        if (foodInStock) {
            console.log(`You have enough money and the ${foodChoice} is in stock. Enjoy your food!`);
        } else {
            console.log(`You have enough money, but the ${foodChoice} is out of stock.`);
        }
    } else {
        console.log(`You don't have enough money to buy the ${foodChoice}.`);
    }
}

// Step 6: Final result is printed after all checks