import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Clínica Grupo F',
      version: '1.0.0',
      description: 'Documentación de la API de la Clínica Grupo F'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/routes/v1/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;