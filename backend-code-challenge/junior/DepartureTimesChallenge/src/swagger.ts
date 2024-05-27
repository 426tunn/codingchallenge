import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Departure Times API',
      version: '1.0.0',
      description: 'API to get real-time departure times for public transportation',
    },
  },
  apis: ['./src/Routes/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);
