import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  swaggerDefinition: {
    info: {
      title: 'Documentacion API "unaPruebaTecnica.js"',
      version: '1.0.0',
      description: 'API de "unaPruebaTecnica.js"'
    },
    basePath: '/'
  },
  apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
