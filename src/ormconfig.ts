import { DataSource, DataSourceOptions } from "typeorm";
import { TagEntity } from "./tags/entities/tags.entity";
import * as dotenv from 'dotenv';
import { UserEntity } from "./user/entities/user.entity";

dotenv.config();

export const ormConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port:  +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [TagEntity, UserEntity],
    synchronize: false,
    migrations:  [__dirname + '/migrations/**/*{.ts, .js}'],
    migrationsTableName: "custom_migration_table",

};
const dataSource = new DataSource(ormConfig)
export default dataSource;