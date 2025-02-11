import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { bearerAuth } from "hono/bearer-auth";
import { weatherAPI } from "./routes/weather";
import type { Bindings } from "./types";

const app = new OpenAPIHono<{ Bindings: Bindings }>();
export type App = typeof app;

// ミドルウェアの追加
app.use(logger());
app.use(secureHeaders());

// Bearer認証の追加
app.use("*", async (c, next) => {
  if (c.req.path === "/doc") return next();
  const auth = bearerAuth({ token: c.env.BEARER_TOKEN });
  return auth(c, next);
});

// ルートの登録
weatherAPI(app);

// OpenAPI ドキュメントの設定
app.doc("/doc", {
  openapi: "3.1.0",
  info: {
    title: "Weather API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:8787",
    },
  ],
  security: [{ bearerAuth: [] }],
});

export default app;