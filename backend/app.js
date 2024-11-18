const express = require('express');
 master
const db = require('./db/db'); 
require('dotenv').config(); 
const cors = require('cors');

const app = express();
app.use(cors())

app.use(express.json());


const routes = require('./routes/index'); 
app.use('/api', routes);

const { connectDB } = require('./db/db');  
const routes = require('./routes/index');  
const app = express();

app.use(express.json()); 
 main


connectDB();  


app.use('/api', routes);

 master
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
 main
