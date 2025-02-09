import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/index";
import sequelize from "./database/database";
import cookieParser from "cookie-parser";

import swaggerUi from "swagger-ui-express";
import redoc from "redoc-express";
import { specs } from "./doc/swagger";

import errorHandler from "./middleware/errorHandlingMiddleware";

const PORT = process.env.PORT || 7000;
const app = express();

app.get("/api-docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// ReDoc
app.use(
  "/api-docs-redoc",
  redoc({
    title: "API Documentation",
    specUrl: "/api-docs/swagger.json", // Путь к JSON-спецификации
  })
);

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () =>
      console.log(`-----server starts at port ${PORT}-----`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
