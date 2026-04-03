import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import {
  RegisterReqSchema,
  LoginReqSchema,
  AuthResponseSchema,
} from '../../validation/auth.schemas';

export const registerAuthSwagger = (registry: OpenAPIRegistry) => {
  registry.register('RegisterReq', RegisterReqSchema);
  registry.register('LoginReq', LoginReqSchema);
  registry.register('AuthResponse', AuthResponseSchema);

  registry.registerPath({
    method: 'post',
    path: '/api/auth/register',
    tags: ['Auth'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: RegisterReqSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'User created',
        content: {
          'application/json': {
            schema: AuthResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/auth/login',
    tags: ['Auth'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: LoginReqSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Login success',
        content: {
          'application/json': {
            schema: AuthResponseSchema,
          },
        },
      },
    },
  });
};
