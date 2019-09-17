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

function viewProducts() {
    connection.query('SELECT id, product_name, price, stock_quantity FROM products', function (error, results, fields) {
        if (error) throw error;
        console.log('-----allProducts();----')
        console.log(results);

    });
}

function updateNewProduct(product_name, department_name, price, stock_quantity) {
    connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)', [product_name, department_name, price, stock_quantity], function (error, results, fields) {
        if (error) throw error;
    });
}
function addNewProduct() {
    inquirer
        .prompt([

            {
                type: "input",
                message: "What is the item's name?",
                name: "products_name"
            },
            {
                type: "input",
                message: "What department does the item belong to?",
                name: "department_name"
            },
            {
                type: "input",
                message: "How much does the item cost? ",
                name: "item_price"
            },
            {
                type: "input",
                message: "How many items?",
                name: "stock_quantity"
            },
        ])
        .then(function (resp) {
            updateNewProduct(resp.products_name, resp.department_name, resp.item_price, resp.stock_quantity);
            console.log("updated")
        });
}

function addToInventory() {
    connection.query('SELECT id, product_name, price, stock_quantity FROM products', function (error, results, fields) {
        if (error) throw error;
        console.log('-----allProducts();----')
        console.log(results);

    });
}

function managerPrompt() {
    inquirer
        .prompt([

            {
                type: "list",
                message: "what do you want to do?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"],
                name: "what_to_do"
            },
        ])
        .then(function (resp) {
            switch (resp.what_to_do) {
                case "View Products for Sale":
                    viewProducts();
                case "insert a car":
                    insertCarPrompt();
                    break;
                case "View Low Inventory":
                    // code block
                    // console.log('do this')
                    console.log('do this')
                    break;
                case "Add to Inventory":
                    // code block'
                    addToInventory();
                    console.log('do this')
                    break;
                case "Add New Product":
                    // code block
                    addNewProduct();
                    
                    break;
                case "quit":
                    console.log('later');
                    break;
                default:
                    // code block
                    connection.end();
                    break;
            }
        });
}
managerPrompt()