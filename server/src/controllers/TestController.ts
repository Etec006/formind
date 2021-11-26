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
        
        const existsQuestions = await questionRepository.findByIds(questions);
        const existSubject = await subjectRepository.findOne(subject)

        const test = testRepository.create({
            name,
            timing,
            questions: existsQuestions,
            subject: existSubject
        })

        await testRepository.save(test);

        return response.status(201).json(test);
    }
}

export default new TestController