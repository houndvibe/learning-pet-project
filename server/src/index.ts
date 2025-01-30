import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/index";
import sequelize from "./database/database";
import cookieParser from "cookie-parser";

import errorHandler from "./middleware/errorHandlingMiddleware";

const PORT = process.env.PORT || 7000;

const app = express();

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
