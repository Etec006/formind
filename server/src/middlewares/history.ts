import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../entities/User";
import HistoryRepository from "../repositories/HistoryRepository";
import UserRepository from "../repositories/UserRepository";
import decoder from "../utils/decoderUser";


function storeHistory(){
    const storeHistory = async(
        request: Request, 
        response: Response, 
        next: NextFunction
    ) => {

        const user = await decoder(request);
        const {module} = request.body;

        if(!user?.id) return next();

        const historyRepository = getCustomRepository(HistoryRepository);

        const history = historyRepository.create({
            user,
            module
        })

        await historyRepository.save(history);

        return next();
        
    }

    return storeHistory;

}

export { storeHistory }