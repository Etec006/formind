import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import QuestionRepository from "../repositories/QuestionRepository";
import SubjectRepository from "../repositories/SubjectRepository";
import TestRepository from "../repositories/TestRepository";


class TestController{
    async create(request: Request, response: Response){
        const testRepository = getCustomRepository(TestRepository);
        const questionRepository = getCustomRepository(QuestionRepository);
        const subjectRepository = getCustomRepository(SubjectRepository)

        const { name, subject, timing, questions } = request.body;

        if(!name) return response.status(400).json({error: "Nome não informado"});
        if(!subject) return response.status(400).json({error: "Matéria não informado"});
        if(!timing) return response.status(400).json({error: "Tempo não informado"});
        if(!questions) return response.status(400).json({error: "Questões não informada"});

        if(!Array.isArray(questions)) return response.status(400).json({error: 'Questões precisam ser um array'});
        
        const existSubject = await subjectRepository.findOne(subject)
        if(!existSubject) return response.status(400).json({error: "Matéria não existe"});

        const existTest = await testRepository.find({subject: subject})
        if(existTest) return response.status(400).json({error: "Já existe uma prova para essa matéria"});
        
        const existsQuestions = await questionRepository.findByIds(questions);
        if(!existsQuestions) return response.status(400).json({error: "Questões informadas não são validas"});

        const test = testRepository.create({
            name,
            timing,
            questions: existsQuestions,
            subject: existSubject
        })

        await testRepository.save(test);

        return response.status(201).json(test);
    }

    async get(request: Request, response: Response){
        
    }
}

export default new TestController