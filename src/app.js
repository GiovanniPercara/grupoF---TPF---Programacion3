const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');

const app = express();


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});


app.use(cors());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
