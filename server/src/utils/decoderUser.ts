import { Request } from "express";
import { decode } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../entities/User";
import UserRepository from "../repositories/UserRepository";

async function decoder(request: Request): Promise<User | undefined>{
    const authHeader = request.headers.authorization || "";
    const userRepository = getCustomRepository(UserRepository);

    const [, token ] = authHeader?.split(" ");

    const payload = decode(token, {json: true});

    const userId = payload?.sub || "";

    const user = await userRepository.findOne(userId, {relations: ['roles']});
    
    return user;
}

export default decoder;