import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import {
  CreateRoomReqSchema,
  RoomResponseSchema,
} from '../../validation/room.schemas';
import { z } from '../../lib/zod';

export const registerRoomSwagger = (registry: OpenAPIRegistry) => {
  registry.register('CreateRoomReq', CreateRoomReqSchema);
  registry.register('RoomResponse', RoomResponseSchema);
  registry.register(
    'GetRoomByIdParams',
    z.object({
      id: z.string().min(1),
    }),
  );

  registry.registerPath({
    method: 'post',
    path: '/api/rooms',
    tags: ['Rooms'],
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: CreateRoomReqSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Room created',
        content: {
          'application/json': {
            schema: RoomResponseSchema,
          },
        },
      },
      400: {
        description: 'Validation or other error',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/rooms',
    tags: ['Rooms'],
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: 'All rooms',
        content: {
          'application/json': {
            schema: z.array(RoomResponseSchema),
          },
        },
      },
      400: {
        description: 'Validation or other error',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/rooms/{id}',
    tags: ['Rooms'],
    security: [{ bearerAuth: [] }],
    request: {
      params: z.object({
        id: z.string().min(1),
      }),
    },
    responses: {
      200: {
        description: 'Room',
        content: {
          'application/json': {
            schema: RoomResponseSchema,
          },
        },
      },
      400: {
        description: 'Validation or other error',
      },
      401: {
        description: 'Unauthorized',
      },
      404: {
        description: 'Room not found',
      },
    },
  });
};
