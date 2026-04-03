import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

import { registerAuthSwagger } from './docs/auth.swagger';

export const setupSwagger = (app: Application) => {
  const registry = new OpenAPIRegistry();

  registry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  });

  registerAuthSwagger(registry);

  const generator = new OpenApiGeneratorV3(registry.definitions);

  const spec = generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'Chat API',
      version: '1.0.0',
    },
  });

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(spec));
};
