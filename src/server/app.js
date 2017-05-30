const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');

const hbs = require('./hbshelpers');
require('./views/helpers/handlebars')(hbs);
const hbsutils = require('hbs-utils')(hbs);

const routes = require('./views/routes');
const {users} = require('./config/index.json');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');
app.set('json spaces', 2);

app.engine('hbs', hbs.express4({
  defaultLayout: `${__dirname}/views/layout.hbs`,
  partialsDir: `${__dirname}/views/partials`
}));

app.use(express.static(path.join(__dirname, '/../../public')));
app.use(bodyParser.json());

hbsutils.registerPartials(`${__dirname}/views'`, {
  match: /(^|\/)_[^\/]+\.hbs$/
});

app.use(basicAuth({
  users,
  challenge: true
}));

app.use('/', routes);

app.listen(4567, () => {
  console.log('Bull UI is running on port 4567');
});

module.exports = app;
