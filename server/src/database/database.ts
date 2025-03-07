import { Sequelize, DataTypes, Model, CreationOptional } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
  }
);

export class User extends Model {
  declare id: string;
  declare username: string;
  declare password: string;
  declare email: string;
  declare avatar: string;
  declare role: CreationOptional<"USER" | "ADMIN">;
  declare age: number;
  declare bio: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: true },
    avatar: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    age: { type: DataTypes.INTEGER, allowNull: true },
    bio: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default sequelize;
