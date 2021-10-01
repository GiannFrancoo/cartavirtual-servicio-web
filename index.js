const express = require('express');
const PORT = process.env.PORT || 5000

const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Carta Virtual API",
            version: "1.0.0",
            description:
                "Documentación de la Carta Virtual API",
            contact: {
                name: "Bentivegna Gian Franco",
            },
        },
        servers: [
            {
                url: 'https://giannfrancoo-servicio-web.herokuapp.com',
            },
        ],
    },
    apis:["./routes/index.js"],
};

const specs = swaggerJsdoc(options);

app.listen(PORT);
app.use(express.json());
app.use(cors());
app.use(require('./routes/index'))

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.get('*', function(req,res){
    res.status(404).send('Error 404 - Ruta no valida');
})


