const { express, Save } = require('./index.js');
const Router = express.Router;

const listNames = new Save('Names');

const apiRouterNames = Router();

apiRouterNames.post('/names', (req, res) => {
	const body = req.body;
	listNames.saveName(body.name);
	res.redirect('/');
});

module.exports = apiRouterNames;
