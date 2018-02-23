var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,
	user: "root",
	password: "root",
	database: "bamazon"
});

connection.connect(function(err) {
	if(err) throw err;
});

//store results from table
var resultsArr = [];

function start() {
	inquirer.prompt([
		{
			type:"list",
			message:"Welcome to Bamazon! What would you like to do?",
			choices:["buy", "exit"],
			name:"choice"
		}
	]).then(function(answer) {
		if(answer.choice === "buy") {
			displayProducts();
			// updateProducts();
			
		} 
		else {
			connection.end(function(err) {
				console.log(`Thank you for visiting Bamazon`)
			})
		}
	})
};

function displayProducts() {
	connection.query('SELECT * FROM products', function (error, results, fields) {
		if (error) throw error;
		resultsArr = results;//setting empty array to results
		console.log(`========================INVENTORY===========================`);
		for(i = 0; i < results.length; i++) {
			var res = results[i];
			console.log(`Id: ${res.item_id}, Product: ${res.product_name}, Price: $${res.price}, Qty: ${res.stock_quantity}`);
		};
		//calls updateProducts function if the results are finished loading
		if(resultsArr[0].stock_quantity !== "") {
			updateProducts();
		};
	});
};

function updateProducts() {
	inquirer.prompt([
		{
			type:"input",
			message:"What is the ID of the product you wish to buy?",
			name:"buyerid",
		},
		{
			type:"input",
			message:"How many units of the product do you wish to buy?",
			name:"buyerunit"
		}
	]).then(function(buy) {
		if(buy.buyerid && buy.buyerunit) {
			var i = buy.buyerid - 1;
			if(buy.buyerunit < resultsArr[i].stock_quantity) {
				var newqty = parseInt(resultsArr[i].stock_quantity) - parseInt(buy.buyerunit);
				
				connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [newqty, buy.buyerid], function (error, res) {
					if(error) throw error;
					console.log(`You have bought item: ${resultsArr[i].product_name} with a qty of: ${buy.buyerunit}`);
					console.log(`Your total cost of purchase is: $${resultsArr[i].price * buy.buyerunit}`);
				});

				//updated qty
				connection.query('SELECT * FROM products HAVING item_id=?', [buy.buyerid], function (error, newstock) {
					if(error) throw error;
					console.log(`New stock qty: ${newstock[0].stock_quantity}`);
					start();
				});
			} else {
					console.log("Insufficient quantity!");
					start();
			}
		} else {
			console.log("Not a valid entry, try again (need both inputs).")
			start();
		}
	});
};

start();