import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UnderstandingAreaRepository from '../repositories/UnderstandingAreaRepository';


class UnderstandingAreaController{
    async create(request: Request, response: Response){
        const understandingAreaRepository = getCustomRepository(UnderstandingAreaRepository);


        const { name, color } = request.body;


        const existArea = await understandingAreaRepository.findOne({name});

        if(existArea){
            return response.status(400).json({message: "A área já existe"});
        }

        const area = understandingAreaRepository.create({
            name,
            color
        });

        await understandingAreaRepository.save(area);

        return response.status(201).json(area);
    }

    async index(request: Request, response: Response){
        const understandingAreaRepository = getCustomRepository(UnderstandingAreaRepository);

        const areas = await understandingAreaRepository.find({relations: ['subjects', 'subjects.modules', 'subject.modules.sessions']});

        return response.json(areas);
    }
}

export default new UnderstandingAreaController;