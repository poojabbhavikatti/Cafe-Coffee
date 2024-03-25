const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname)));

// Define a route for your HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'coffee.html'));
});
// Route for the 'anotherpage'
app.get('/americano', (req, res) => {
    res.sendFile(path.join(__dirname, '/americano.html'));
});

app.get('/espresso', (req, res) => {
    res.sendFile(path.join(__dirname, '/espresso.html'));
});

app.get('/irish', (req, res) => {
    res.sendFile(path.join(__dirname, '/irish.html'));
});

app.get('/mocha', (req, res) => {
    res.sendFile(path.join(__dirname, '/mocha.html'));
});

app.get('/cappuccino', (req, res) => {
    res.sendFile(path.join(__dirname, '/cappuccino.html'));
});

app.get('/getDescription', function(req, res) {
    const azure = require('azure-storage');
    // Azure Storage account credentials
    const storageAccount = 'cafecoffee';
    const storageAccessKey = '8tDKbQ23zlDWwRprDHjM69d6GndkhfN4+9SvE+F6OcVrDYExFAwyIAdIGVZ8imD+l0Lxku5mE36j+AStdMzGpA==';
    const tableName = 'cafe';

    // Create a table service client
    const tableService = azure.createTableService(storageAccount, storageAccessKey);
    const PartitionKey = 'cappuccino';
    const RowKey = 'b7c70637';

    // Query data from Azure Table Storage
    tableService.retrieveEntity(tableName, PartitionKey, RowKey, function(error, result, response) {
        if (!error) {
            const description = result.Description._;
            console.log(description);
            res.send(description);
        } else {
            console.error(error);
        }
    });      
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

