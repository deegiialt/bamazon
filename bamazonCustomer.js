var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host:"localhost",
	port: 8889,
	user: "root",
	passowrd: "root",
	database: "damazon"
});

connection.connect(function(err) {
	if(err) throw err;
	console.log("connected as id " + connection.threadId);
	connection.end();
})

inquirer.prompt([
	{
		type:"input",
		message:"What is the ID of the product you wish to buy?",
		name:"buyerid"
	},
	{
		type:"input",
		message:"How many units of the product do you wish to buy?",
		name:"buyerunit"
	}
]).then(function(buy) {
	if(buy.buyerunit === ) {
		//update SQL database to refelct remaining qty
		//after update, show customer the total cost of purchase.
		// console.log(`Total cost: $${//total cost}`);
	} else {
		console.log("Insufficient quantity!");
		//prevent order from going through
	}
})