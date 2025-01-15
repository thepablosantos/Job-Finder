const express = require('express');
const { create } = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const PORT = 3000;

// Configuração do servidor
app.listen(PORT, function () {
  console.log(`O Express está rodando na porta ${PORT}`);
});

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Configuração do Handlebars
const hbs = create({ defaultLayout: 'main' }); // Para compatibilidade com a versão 8.x do express-handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configuração da pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com o banco de dados
db.authenticate()
  .then(() => {
    console.log('Conectou ao banco com sucesso');
  })
  .catch((err) => {
    console.log('Ocorreu um erro ao conectar', err);
  });

// Rota principal
app.get('/', (req, res) => {
  res.render('index');
});

// Rotas de jobs
app.use('/jobs', require('./routes/jobs'));