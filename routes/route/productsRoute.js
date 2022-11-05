const { express } = require('../index.js');
const Router = express.Router;

const productRouter = Router();

productRouter.get('/', (req, res) => {
	res.sendFile('views/products.html', { root: __dirname });
});

module.exports = productRouter;
