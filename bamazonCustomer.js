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
	console.log("connected as id" + connection.threadId);
	displayProducts();
	// connection.end();
})

//result array from table
var resultsArr = [];
// [ RowDataPacket {
//     item_id: 1,
//     product_name: 'loofa',
//     department_name: 'bath',
//     price: 5,
//     stock_quantity: 10 },
//   RowDataPacket {
//     item_id: 2,
//     product_name: 'cereal',
//     department_name: 'food',
//     price: 5,
//     stock_quantity: 20 },
//   RowDataPacket {
//     item_id: 3,
//     product_name: 'mascara',
//     department_name: 'beauty',
//     price: 6,
//     stock_quantity: 10 },
//   RowDataPacket {
//     item_id: 4,
//     product_name: 'cup',
//     department_name: 'kitchen',
//     price: 5,
//     stock_quantity: 10 },
//   RowDataPacket {
//     item_id: 5,
//     product_name: 'lamp',
//     department_name: 'home',
//     price: 12,
//     stock_quantity: 10 },
//   RowDataPacket {
//     item_id: 6,
//     product_name: 'book',
//     department_name: 'school',
//     price: 7,
//     stock_quantity: 10 },
//   RowDataPacket {
//     item_id: 7,
//     product_name: 'toothbrush',
//     department_name: 'bath',
//     price: 8,
//     stock_quantity: 10 },
//   RowDataPacket {
//     item_id: 8,
//     product_name: 'paper',
//     department_name: 'school',
//     price: 1,
//     stock_quantity: 100 },
//   RowDataPacket {
//     item_id: 9,
//     product_name: 'pencil',
//     department_name: 'school',
//     price: 2,
//     stock_quantity: 50 },
//   RowDataPacket {
//     item_id: 10,
//     product_name: 'stickers',
//     department_name: 'school',
//     price: 3,
//     stock_quantity: 20 } ]

function displayProducts() {
	connection.query('SELECT * FROM products', function (error, results, fields) {
	  if (error) throw error;
	  console.log(results)
	  for(i = 0; i < results.length; i++) {
	  	resultsArr = results;
	  	var res = results[i];
	  	console.log(`Id: ${res.item_id}, Product: ${res.product_name}, Price: ${res.price}, Qty: ${res.stock_quantity}`);
	  }
	});
}

function updateProducts() {
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
		if(buy.buyerid && buy.buyerunit) {
			var i = buy.buyerid - 1;
			if(buy.buyerunit < resultsArr[i].stock_quantity) {
				var newqty = 
				//update SQL database to refelct remaining qty
				//after update, show customer the total cost of purchase.
				// console.log(`Total cost: $${//total cost}`);
			} else {
					console.log("Insufficient quantity!");
					//prevent order from going through
			}
		} else {
			console.log("Not a valid entry, try again (need both inputs).")
		}
	}
	});			
}

function updateStock() {
	connection.query('UPDATE products SET stock_quantity=? WHERE id=?', [buy.buyerunit, buy.buyerid], function (error, results, fields) {
		if(error) throw error;

	})
}

