import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { roles } from "../enums/roles";
import { verifications } from "../enums/verifications";
import CertificateRepository from "../repositories/CertificateRepository";
import QuestionRepository from "../repositories/QuestionRepository";
import SubjectRepository from "../repositories/SubjectRepository";
import TestRepository from "../repositories/TestRepository";
import UserRepository from "../repositories/UserRepository";
import VerificationRepository from "../repositories/VerificationRepository";
import decoder from "../utils/decoderUser";


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

        const existTest = await testRepository.findOne({subject: subject})
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
        const subjectId = request.params.subjectId;
        const user = await decoder(request);

        if(!user) return response.status(401).json({error: "Usuário não informado"})
        if(!subjectId) return response.status(400).json({error: "Matéria não informado"})

        const subjectRepository = getCustomRepository(SubjectRepository)
        const existSubject = await subjectRepository.findOne(subjectId)
        if(!existSubject) return response.status(400).json({error: "Matéria não existe"});

        const testRepository = getCustomRepository(TestRepository)
        const existTest = await testRepository.findOne({subject: existSubject}, {relations: ['questions', 'questions.answers']})

        existTest.questions.forEach(question => {
            question.answers.forEach(
                answer => {
                    delete answer.isCorrect
                }
            )
        })

        return response.status(200).json(existTest)
    }
}

export default new TestController