import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log('test get');

    res.send({'estado':'ok', 'msg':'API ok'});
});

process.loadEnvFile();
const PORT = process.env.PORT;

app.listen(PORT  || 3000, () => {
    console.log(`Servidor iniciado OK en puerto ${PORT}`);
});