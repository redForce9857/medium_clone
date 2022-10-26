import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ExpressRequestInterface } from '../types/express.request.interface';


@Injectable()
export class AuthMidleWare implements NestMiddleware{
    async use(req: ExpressRequestInterface, res: Response, next: NextFunction){
       if (!req.headers.authorization) {
        req.user = null
        next()
        return
       }

       const token = req.headers.authorization.split(' ')[1]
       
       
    }
}