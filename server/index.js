const express = require('express');
const cors = require('cors');
const Router = require('./routes/movies.route');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/movies', Router);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})
