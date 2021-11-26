import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../entities/User";
import HistoryRepository from "../repositories/HistoryRepository";
import ModuleRepository from "../repositories/ModuleRepository";
import UserRepository from "../repositories/UserRepository";
import decoder from "../utils/decoderUser";


function storeHistory(){
    const storeHistory = async(
        request: Request, 
        response: Response, 
        next: NextFunction
    ) => {

        const user = await decoder(request);
        if(!user) return next();

        const moduleId = request.params.id;
        if(!moduleId) return next();
       
        const moduleRepository = getCustomRepository(ModuleRepository)
        const existModule = await moduleRepository.findOne(moduleId);
        if(!existModule) return next();

        const historyRepository = getCustomRepository(HistoryRepository);
        const history = historyRepository.create({
            user,
            module: existModule
        })

        await historyRepository.save(history);

        return next();
        
    }

    return storeHistory;

}

export { storeHistory }