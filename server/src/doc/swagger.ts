import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pet-project API",
      version: "1.0.0",
      description: "API documentation for Express + RTKQ Pet-project",
    },
    servers: [
      {
        url: "http://localhost:7000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const specs = swaggerJsdoc(options);
