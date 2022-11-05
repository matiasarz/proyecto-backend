const { express, Cart } = require('./index.js');
const Router = express.Router;
const fs = require('fs');

const cartRouter = Router();

const cartContainer = new Cart('Carts');

cartRouter.post('/', (req, res) => {
	const body = req.body;
	const cart = {
		cartName: body.name,
		products: [],
	};
	cartContainer.createCart(cart);
	res.redirect('/carrito');
});

cartRouter.get('/', (req, res) => {
	res.send(cartContainer.getAllCarts());
});

cartRouter.get('/:id/productos', (req, res) => {
	const id = req.params.id;
	res.send(cartContainer.getListProductFromCart(id));
});

cartRouter.post('/:id/productos', (req, res) => {
	const cartID = req.params.id;
	const body = req.body;
	const productID = Object.keys(body).toString();
	const products = fs.readFileSync('Products.txt', 'utf-8');
	const arrayProducts = JSON.parse(products);
	const product = arrayProducts.find((product) => product.id == productID);

	cartContainer.addProductToCart(cartID, product);

	res.redirect('/productos');
});

cartRouter.delete('/:id', (req, res) => {
	const id = req.params.id;
	res.send(cartContainer.deleteCartById(id));
});
cartRouter.delete('/:id/productos/:id_prod', (req, res) => {
	const { id, id_prod } = req.params;
	res.send(cartContainer.deleteProductById(id, id_prod));
});

module.exports = cartRouter;
