import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UnderstandingAreaRepository from '../repositories/UnderstandingAreaRepository';


class UnderstandingAreaController{
    async create(request: Request, response: Response){
        const { name, color } = request.body;

        if(!name) return response.status(400).json({error: "Nome não informado"});
        if(!color) return response.status(400).json({error: "Cor não informado"});

        const understandingAreaRepository = getCustomRepository(UnderstandingAreaRepository);
        const existArea = await understandingAreaRepository.findOne({name});

        if(existArea) return response.status(400).json({message: "A área já existe"});

        const area = understandingAreaRepository.create({
            name,
            color
        });

        await understandingAreaRepository.save(area);

        return response.status(201).json(area);
    }

    async index(request: Request, response: Response){
        const understandingAreaRepository = getCustomRepository(UnderstandingAreaRepository);

        const areas = await understandingAreaRepository.find({relations: ['subjects']});

        return response.json(areas);
    }

    async get(request: Request, response: Response){
        const areaId = request.params.id;
        if(!areaId) return response.status(400).json({error: 'Área não informada'});

        const areaRepository = getCustomRepository(UnderstandingAreaRepository);
        const existArea = await areaRepository.findOne(areaId, {relations: ['subjects']});
        if(!existArea) return response.status(400).json({error: "Área informada não existe"});

        return response.status(200).json(existArea);
    }
}

export default new UnderstandingAreaController;