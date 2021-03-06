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
        console.log('-----All Products----')
        console.table(results);
        
    });
    // managerPrompt();
}
function viewLowProducts() {
    connection.query('SELECT id, product_name, price, stock_quantity FROM products where stock_quantity <= 5', function (error, results, fields) {
        if (error) throw error;
        console.log('-----All Products----')
        console.table(results);
    });
    managerPrompt(); 
}


function updateNewProduct(product_name, department_name, price, stock_quantity) {
    connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)', [product_name, department_name, price, stock_quantity], function (error, results, fields) {
        if (error) throw error;
    });
    managerPrompt();
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
                message: "How many does this item have?",
                name: "stock_quantity"
            },
        ])
        .then(function (resp) {
            updateNewProduct(resp.products_name, resp.department_name, resp.item_price, resp.stock_quantity);
            console.log("Added new product")
        });
}

function addToInventory(id_name, stock_quantity) {
    var totalInventory = 0;

    connection.query('SELECT * from products WHERE id = ?', [id_name], function (error, results, fields) {
        totalInventory += parseInt(stock_quantity) + parseInt(results[0].stock_quantity);

        console.log(totalInventory)
        connection.query('UPDATE products set stock_quantity = ? WHERE id = ?', [totalInventory, id_name], function (error, results, fields) {
            if (error) throw error;

        });
    })
    viewProducts();
}
function addInventoryPrompt() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the items ID?",
                name: "id_name"
            },
            {
                type: "input",
                message: "How many items do you want to add?",
                name: "stock_quantity"
            },
            
        ])
        .then(function (resp) {
            addToInventory(resp.id_name, resp.stock_quantity, resp.what_to_do); // what_to_do will not go anywhere once the buttons are selected. 
            console.log("updated")
            managerPrompt()
        });
}
function quitApplication() {
    connection.end()
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
            if (resp.what_to_do == "View Products for Sale"){
                viewProducts();
                managerPrompt();
            }else if(resp.what_to_do == "View Low Inventory"){
                viewLowProducts();
                managerPrompt();
            }else if (resp.what_to_do == "Add to Inventory"){
                addInventoryPrompt();
                viewProducts();
            }else if (resp.what_to_do == "Add New Product"){
                addNewProduct();

            }else if (resp.what_to_do == "quit"){
                quitApplication();
            }
            // switch (resp.what_to_do) {
            //     case "View Products for Sale":
            //         viewProducts();
            //     case "View Low Inventory":
            //         // code block
            //         // console.log('do this')
            //         viewLowProducts();
            //         managerPrompt();
            //         break;
            //     case "Add to Inventory":
            //         // code block'
            //         addInventoryPrompt();
            //         viewProducts();
            //         //managerPrompt();
            //         break;
            //     case "Add New Product":
            //         // code block
            //         addNewProduct();
            //         break;
            //     case "quit":
            //         quitApplication();
            //         break;
            //     default:
            //         // code block
            //         connection.end();
            //         break;
            // }
        });
}
managerPrompt()
