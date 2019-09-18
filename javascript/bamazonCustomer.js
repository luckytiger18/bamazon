var mysql = require('mysql');
var inquirer = require("inquirer");

// mysql -u root -p
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon_db',
    port: 3306
});

connection.connect();

function allProducts() {
    connection.query('SELECT id, product_name, price FROM products', function (error, results, fields) {
        if (error) throw error;
        console.log('---------')
        console.log('---------')
        console.log('-----allProducts();----')
        console.table(results);
        console.log('---------')
    });
}

function buyProducts(product_id, buy_qty) {
    connection.query('SELECT stock_quantity, price from products WHERE id = ?', [product_id], function (error, results, fields) {
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity >= buy_qty) {
                console.log("you pay:")
                updateProductStock = results[i].stock_quantity - buy_qty, product_id;
                console.table("$" + (parseFloat(results[i].price * buy_qty).toFixed(2)));
            } else {
                console.log("Insufficient quantity!");
            }
        }
    })
}
function updateInventory(stock_quantity, product_id) {
    connection.query('UPDATE products SET stock_quantity = ? WHERE id = ?', [stock_quantity, product_id], function (error, results, fields) {
        if (error) throw error;
    });
}

allProducts();

function appPrompt() {
    inquirer
        .prompt([

            {
                type: "input",
                message: "What is the ID of the product that you would like to buy?",
                name: "products_id"
            },
            {
                type: "input",
                message: "How many would you like to buy?",
                name: "buy_qty"
            },
        ])
        .then(function (resp) {
            buyProducts(parseInt(resp.products_id), parseInt(resp.buy_qty));
        });
}
appPrompt();


// connection.end();