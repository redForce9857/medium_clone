import { DataSource, DataSourceOptions } from "typeorm";
import { TagEntity } from "../src/tags/entities/tags.entity";
import * as dotenv from 'dotenv';
import { UserEntity } from "../src/user/entities/user.entity";

dotenv.config();

export const ormConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port:  +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ['dist/**/*.entity.js'],
    synchronize: false,
    migrations:  ['dist/db/migrations/*.js'],

};
const dataSource = new DataSource(ormConfig)
export default dataSource;