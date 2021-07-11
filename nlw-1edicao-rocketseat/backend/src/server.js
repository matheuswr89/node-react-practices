var app = require('express');
app.get('/user', function () {
    console.log('Listagem de usuario');
});
app.listen(3333);
