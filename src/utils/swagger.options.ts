import config from 'config'

const host = config.get<number>('host')
const port = config.get<number>('port')

export const options = {
  info: {
    version: '1.0.0',
    title: 'REST API Refreshment',
    description:
      'This is a initialize project with RBAC using nodeJs + expressJs + typeORM + postgres.',
    termsOfService: 'http://example.com/terms/',
    contact: {
      name: 'API Support',
      url: 'http://www.example.com/support',
      email: 'support@example.com',
    },
    license: {
      name: 'MIT',
    },
  },
  security: {
    // BasicAuth: {
    //     type: 'http',
    //     scheme: 'basic',
    // },
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  servers: [
    {
      url: `http://${host}:${port}`,
      description: 'Development server',
    },
  ],

  // Base directory which we use to locate your JSDOC files
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: '../**/*.ts',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
}
