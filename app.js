const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const mariadb = require('mariadb');
const { createSecretKey } = require('crypto');

const dataFolderPath = path.join(__dirname);

app.post('/login', express.json(), async (req, res) =>{
    const { username, password } = req.body;
    const pool = mariadb.createPool({
        host: 'your_host',
        user: 'your_username',
        password: 'your_password',
        database: 'your_database',
        conectionLimit: 5
    });


const conn = await pool.getConnection();
const user = conn.query(`SELECT * FROM users WHERE username = ${username} & password = ${password}`);
const token = jwt.sing({userId: user.id}, "secretKey", {expiresIn: "1h"})

res.json({ token });

});

const verificacion = (req, res, next) => {
    const token = req.heder('Authorization');
    if (token === undefined){
        return res.status(400).json({ 'message': 'Error, debe estar Ingresado en el sistema para ingresar, verifique su información.'})
    }
    try {
        const verificacionUser = jwt.verify(token,'secretKey');
        req.usuario = verificacionUser;
        next();
    }
    catch (error) {
        res.status(400).json({"message": "verificacion incorrecta"})    
    }
};

app.get('/cart/:id', (req, res) => {
    const cartId = req.params.id;
    const filePath = path.join(dataFolderPath, 'cart', `${cartId}.json`);  
    res.sendFile(filePath);
});

app.get('/cats/:id', (req, res) => {
    const catsId = req.params.id;
    const filePath = path.join(dataFolderPath, 'cats', `${catsId}.json`);  
    res.sendFile(filePath);
});

app.get('/cats_products/:id', (req, res) => {
    const cats_productsId = req.params.id;
    const filePath = path.join(dataFolderPath, 'cats', `${cats_productsId}.json`);  
    res.sendFile(filePath);
});

app.get('/products/:id', (req, res) => {
    const productsId = req.params.id;
    const filePath = path.join(dataFolderPath, 'products', `${productsId}.json`);  
    res.sendFile(filePath);
});

app.get('/products_comments/:id', (req, res) => {
    const products_commentsId = req.params.id;
    const filePath = path.join(dataFolderPath, 'products_comments', `${products_commentsId}.json`);  
    res.sendFile(filePath);
});

app.get('/sell/:id', (req, res) => {
    const sellId = req.params.id;
    const filePath = path.join(dataFolderPath, 'sell', `${sellId}.json`);  
    res.sendFile(filePath);
});

app.get('/user_cart/:id', (req, res) => {
    const userCart = req.params.id;
    const filePath = path.join(dataFolderPath, 'cats', `${userCart}.json`);  
    res.sendFile(filePath);
});

app.listen(port, () => {
    console.log('Servidor Local Funcionando Puerto :' + `${port}`);
});
