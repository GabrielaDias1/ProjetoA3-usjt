const express = require('express');
const db = require('./db/db'); 
require('dotenv').config(); 
const cors = require('cors');

const app = express();
app.use(cors())

app.use(express.json());


const routes = require('./routes/index'); 
app.use('/api', routes);


async function analizandoConexao() {
  try {
    const connection = await db.getConnection(); 
    console.log('Banco de dados conectado com sucesso!');
    connection.release(); 
  } catch (err) {
    console.error('Erro ao conectar no banco de dados:', err);
    process.exit(1);
  }
}


analizandoConexao().then(() => {

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});