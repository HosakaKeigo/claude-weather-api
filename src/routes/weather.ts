import { WeatherRoute } from "../schema/routes/weather";
import type { App } from "..";

export const weatherAPI = (app: App) => {
  app.openapi(WeatherRoute, async (c) => {
    try {
      const { location } = c.req.valid("query");

      // モックデータを返します
      const weatherData = {
        tokyo: {
          temperature: 25,
          description: "Sunny",
        },
        london: {
          temperature: 15,
          description: "Cloudy",
        },
      }[location];

      return c.json({
        location,
        ...weatherData,
      }, 200);
    } catch (e) {
      return c.json({ message: e instanceof Error ? e.message : String(e) }, 400);
    }
  });
};