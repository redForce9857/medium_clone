import { userType } from "./user.type";

export interface userResponseInterface{
    user: userType & {token: string}
}