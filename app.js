const express = require('express');
const path = require('path');
var app = express();
app.use(express.static(path.resolve(__dirname, './dist')))


//监听3002端口
app.listen(3000, '0.0.0.0', () => {
    console.log('server is running 5555');
});
