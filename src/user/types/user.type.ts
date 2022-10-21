import { UserEntity } from "../entities/user.entity";

export type userType = Omit<UserEntity, 'hashPass'>