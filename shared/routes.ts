
import { z } from 'zod';
import { insertUserSchema, users, groundwaterStats } from './schema';

// Error Schemas
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// API Contract
export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/auth/login',
      input: z.object({
        email: z.string().email(),
        password: z.string(),
      }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/auth/logout',
      responses: {
        200: z.object({ message: z.string() }),
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/auth/me',
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
  },
  dashboard: {
    getStats: {
      method: 'GET' as const,
      path: '/api/dashboard/stats',
      input: z.object({
        year: z.string().optional(),
        province: z.string().optional(),
        district: z.string().optional(),
        subdistrict: z.string().optional(),
      }).optional(),
      responses: {
        200: z.object({
          summary: z.object({
            totalWells: z.number(),
            government: z.object({
              total: z.number(),
              agriculture: z.number(),
              consumption: z.number(),
            }),
            privateSector: z.object({
              total: z.number(),
              agriculture: z.number(),
              consumption: z.number(),
              business: z.number(),
            }),
            lastUpdated: z.string(),
          }),
          charts: z.object({
            depth: z.array(z.object({ range: z.string(), count: z.number() })),
            diameter: z.array(z.object({ size: z.string(), count: z.number() })),
            usage: z.array(z.object({ month: z.string(), government: z.number(), privateSector: z.number() })),
            contamination: z.array(z.object({ status: z.string(), count: z.number(), fill: z.string() })),
          })
        }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
