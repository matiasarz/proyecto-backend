const { express, Save } = require('./index.js');
const Router = express.Router;

const apiRouterNames = Router();

const listNames = new Save('Names');

apiRouterNames.post('/names', (req, res) => {
	const body = req.body;
	listNames.saveName(body.name);
	res.redirect('/');
});

module.exports = apiRouterNames;
