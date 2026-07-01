import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Clínica Grupo F',
      version: '1.0.0',
      description: 'Sistema de gestión clínica - turnos, pacientes y administración'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ['./src/routes/v1/**/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;