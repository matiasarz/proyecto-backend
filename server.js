const express = require('express');
const apiCartRouter = require('./routes/apiCart.js');
const apiProductRouter = require('./routes/apiProducts.js');
const productRouter = require('./routes/route/productsRoute.js');
const cartRouter = require('./routes/route/cartRoute.js');
const logInRouter = require('./routes/route/logInRoute.js');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/carrito', apiCartRouter);
app.use('/api/productos', apiProductRouter);
app.use('/log-in', logInRouter);
app.use('/productos', productRouter);
app.use('/carrito', cartRouter);

app.listen(port, () => console.log(`Server running on port: ${port}`));
app.on(port, (e) => console.error(e));
