import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Cadastro de Usuários',
      version: '1.0.0',
    },
    components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  tags: [
    {
      name: 'Auth',
      description: 'Operações de autenticação'
    },
    {
      name: 'Usuário',
      description: 'Operações relacionadas a usuários'
    },
    {
      name: 'Cargo',
      description: 'Operações relacionadas a cargos'
    }
  ],
  security: [
    {
      bearerAuth: []
    }
  ],
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./src/modules/**/*.ts'],
});

