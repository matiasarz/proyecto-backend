const { express } = require('../index.js');
const Router = express.Router;

const logInRouter = Router();

logInRouter.get('/', (req, res) => {
	res.sendFile('views/logIn.html', { root: __dirname });
});

module.exports = logInRouter;
