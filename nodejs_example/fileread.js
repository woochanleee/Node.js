const fs = require('fs');
fs.readFile('sample.txt', 'UTF-8', (err, data) => {
    console.log(data);
});
