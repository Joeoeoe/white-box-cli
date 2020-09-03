const fs = require('fs');

const stream = fs.createReadStream('./testDist/index.html');
console.log(stream)
