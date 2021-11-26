import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SubjectRepository from "../repositories/SubjectRepository";
import UnderstandingAreaRepository from "../repositories/UnderstandingAreaRepository";
import decoder from "../utils/decoderUser";


class SubjectController{
    async create(request: Request, response: Response){
        const { name, area, description } = request.body;

        if(!name) return response.status(400).json({error: "Nome não informado"});
        if(!area) return response.status(400).json({error: "Área de conhecimento não informado"});
        if(!description) return response.status(400).json({error: "Descrição não informado"});

        const subjectRepository = getCustomRepository(SubjectRepository);
        const existSubject = await subjectRepository.findOne({name});
        if(existSubject) return response.status(400).json({message: "A Matéria já existe"});

        const understandingAreaRepository = getCustomRepository(UnderstandingAreaRepository);
        const existArea = await understandingAreaRepository.findOne({id: area});
        if(!existArea) return response.status(400).json({message: "A Área não existe"});

        const subject = subjectRepository.create({
            name,
            area,
            description
        });

        await subjectRepository.save(subject);

        return response.status(201).json(subject);
    }

    async index(request: Request, response: Response){
        const subjectRepository = getCustomRepository(SubjectRepository);

        const subjects = await subjectRepository.find();

        return response.json(subjects);
    }

    
}

export default new SubjectController;