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

// Template Engine (Handlebars)
const hbs = create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// DB connection
db
  .authenticate()
  .then(() => {
    console.log("Conectou ao banco com sucesso");
  })
  .catch(err => {
    console.log("Ocorreu um erro ao conectar", err);
  });

// Routes
app.get('/', (req, res) => {
  let search = req.query.job;
  let query = '%' + search + '%';

  if (!search) {
    Job.findAll({
      order: [['createdAt', 'DESC']],
    })
      .then((jobs) => {
        res.render('index', { jobs });
      })
      .catch((err) => console.log(err));
  } else {
    Job.findAll({
      where: {
        title: { [Op.like]: query }
      },
      order: [['createdAt', 'DESC']],
    })
      .then((jobs) => {
        res.render('index', { jobs, search });
      })
      .catch((err) => console.log(err));
  }
});

// Jobs Routes
app.use('/jobs', require('./routes/jobs'));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});