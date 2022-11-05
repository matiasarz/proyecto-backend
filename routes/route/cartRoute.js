const { express } = require('../index.js');
const Router = express.Router;

const cartRouter = Router();

cartRouter.get('/', (req, res) => {
	res.sendFile('views/cart.html', { root: __dirname });
});

module.exports = cartRouter;
