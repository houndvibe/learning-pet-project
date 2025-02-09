import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "http://localhost:7000/api-docs/swagger.json", // Swagger JSON
  apiFile: "./src/shared/api/apiSlice.ts", // Базовый API
  apiImport: "apiSlice",
  outputFile: "./src/api.ts",
  exportName: "userApi",
  hooks: { queries: true, lazyQueries: true, mutations: true },
};

export default config;
