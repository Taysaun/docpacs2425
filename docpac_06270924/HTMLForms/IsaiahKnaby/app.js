const { error } = require('console');
const express = require('express');
const fs = require('fs');


const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/add', (req, res) => {
    res.render('add')
});

app.get('/view', (req, res) => {
    res.render('view')
})

app.post('/add', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync('./data.json')).data;

        const orderData = {
            brand: req.body.brand,
            quantity: req.body.quantity,
        }

        if (orderData.brand === ' ') throw new Error('Brand is required');
        if (!orderData.quantity) throw new Error('Quantity is required');
        if (orderData.quantity > 2000) throw new Error('Too much SODA!!!!');

        data.push(orderData);

        fs.writeFileSync('./data.json', JSON.stringify({ data: data }));

        res.redirect('/');

    } catch (err) {
        res.render('error', {error: err.message});
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})