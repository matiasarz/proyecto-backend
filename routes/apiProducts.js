const { express, Product } = require('./index.js');
const Router = express.Router;

const productContainer = new Product('Products');

const apiProductRouter = Router();

apiProductRouter.get('/', (req, res) => {
	res.send(productContainer.getAllProducts());
});
apiProductRouter.get('/:id', (req, res) => {
	const id = req.params.id;
	res.send(productContainer.getProductById(id));
});
apiProductRouter.post('/', (req, res) => {
	const product = req.body;
	productContainer.createProduct(product);
	res.redirect('/');
});
apiProductRouter.put('/:id', (req, res) => {
	const id = req.params.id;
	const product = req.body;
	res.send(productContainer.updateProductById(id, product));
	res.redirect('http://localhost:8080/');
});
apiProductRouter.delete('/:id', (req, res) => {
	const id = req.params.id;
	res.send(productContainer.deleteProductById(id));
	res.redirect('/');
});

module.exports = apiProductRouter;
