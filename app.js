// app.js
const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/connection');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const app = express();
const PORT = 3000;

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars
const hbs = create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// DB connection
db.authenticate()
  .then(() => console.log("Connected to DB successfully"))
  .catch(err => console.log("DB connection error:", err));

// Home route -> `home.handlebars`
app.get('/', (req, res) => {
  res.render('home');
});

// Jobs listing -> `jobs.handlebars`
app.get('/jobs', (req, res) => {
  let search = req.query.job;
  let query = '%' + search + '%';

  if (!search) {
    Job.findAll({ order: [['createdAt', 'DESC']] })
      .then((jobs) => res.render('jobs', { jobs }))
      .catch((err) => console.log(err));
  } else {
    Job.findAll({
      where: { title: { [Op.like]: query } },
      order: [['createdAt', 'DESC']]
    })
      .then((jobs) => res.render('jobs', { jobs, search }))
      .catch((err) => console.log(err));
  }
});

// Sub-rotas do Jobs -> add, view, etc.
app.use('/jobs', require('./routes/jobs'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); //