import { createRoute, z } from "@hono/zod-openapi";

const LocationEnum = z.enum(["tokyo", "london"]);

const WeatherResponseSchema = z.object({
  location: LocationEnum,
  temperature: z.number(),
  description: z.string(),
});

export const WeatherRoute = createRoute({
  method: "get",
  operationId: "getWeather",
  summary: "Get weather information",
  description: "Get weather information. The location parameter can be either 'tokyo' or 'london'.",
  path: "/weather",
  request: {
    query: z.object({
      location: LocationEnum.openapi({
        param: {
          name: "location",
          in: "query",
        },
        example: "tokyo",
      }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: WeatherResponseSchema,
        },
      },
      description: "Successfully retrieved weather information",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "Bad request",
    },
  },
});