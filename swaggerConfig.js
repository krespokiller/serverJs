import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'API Documentation', // Title of the documentation
      version: '1.0.0', // Version of the API
      description: 'API Documentation for your application', // Description of the API
    },
    servers: [
      {
        url: 'http://localhost:3000', // The base URL of your API
        description: 'Development server',
      },
      // Add more servers if needed
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            email: { type: 'string' },
            hashedPassword: { type: 'string' },
            products: { 
              type: 'array',
              items: {
                $ref: '#/components/schemas/Product' // Reference to another schema
              }
            }
          }
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            price: { type: 'number', format: 'float' }, // Use 'number' with 'format' for floating point numbers
            userId: { type: 'integer' }
          }
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  // Path to the API routes files
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
