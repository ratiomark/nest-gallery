import "./src/server/db/envConfig";
import { type Config, defineConfig } from "drizzle-kit";
import { env } from "~/env";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  // driver: "pg",
  out: "./src/server/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ["nest-gallery_*"],
});
// export default {
//   schema: "./src/server/db/schema.ts",
//   dialect: "postgresql",
//   // driver: "pg",
//   out: "./src/server/db/migrations",
//   dbCredentials: {
//     url: "postgres://default:LuFCWE2kQ6Bg@ep-square-mountain-a4g7o4cz-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
//     // url: env.POSTGRES_URL,
//     // host: "ep-square-mountain-a4g7o4cz-pooler.us-east-1.aws.neon.tech",
//     password: "LuFCWE2kQ6Bg",
//     // database: "verceldb",
//     user: "default",
//     // connectionString: env.POSTGRES_URL,
//   },
//   tablesFilter: ["0-nest-gallery_*"],
//   verbose: true,
//   strict: true,
// } satisfies Config;
// import { type Config, defineConfig } from "drizzle-kit";

// import { env } from "~/env";

// export default defineConfig({
//   schema: "./src/server/db/schema.ts",
//   // dialect: "postgresql",
//   driver: "pg",
//   dbCredentials: {
//     connectionString: env.POSTGRES_URL,
//   },
//   tablesFilter: ["0-nest-gallery_*"],
//   verbose: true,
//   strict: true,
// } satisfies Config);
