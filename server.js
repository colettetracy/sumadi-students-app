const express = require('express');
const path = require('path');
const app = express();
app.use('/', express.static('./dist/sumadiStudentsApp/'));
app.use('*', function(req, res) {
    res.sendFile('./dist/sumadiStudentsApp/index.html');
});
app.listen(process.env.PORT || 8080);