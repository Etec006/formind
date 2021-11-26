import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import AnswerRepository from "../repositories/AnswerRepository";
import QuestionRepository from "../repositories/QuestionRepository";
import SessionRepository from "../repositories/SessionRepository";
import decoder from "../utils/decoderUser";


class QuestionController{
    async create(request: Request, response: Response){
        const { title, text, answers, session} = request.body
        const user = await decoder(request);

        if(!user) return response.status(401).json({error: 'Usuário não está logado'});
        if(!title) return response.status(400).json({error: 'Titulo não informado'});
        if(!text) return response.status(400).json({error: 'Enunciado não informado'});
        if(!answers) return response.status(400).json({error: 'Respostas não informadas'});
        
        if(!Array.isArray(answers)) return response.status(400).json({error: 'Respostas precisam ser um array'});

        if(!session){   
            const questionRepository = getCustomRepository(QuestionRepository);
            const question = questionRepository.create({
                title,
                text,
                producer: user
            })
            await questionRepository.save(question)

            const questionAnswers = answers.map(element => {
                element.question = question.id;
                return element;
            })

            const answerRepository = getCustomRepository(AnswerRepository);

            const answersObjects = answerRepository.create(questionAnswers);

            await answerRepository.save(answersObjects);

            question.answers = answersObjects;

            return response.status(201).json(question);
        } 

        const sessionRepository = getCustomRepository(SessionRepository);
        const existSession = await sessionRepository.findOne(session)
        if(!existSession) return response.status(400).json({error: 'Sessão não existe'});
        
        const questionRepository = getCustomRepository(QuestionRepository);
        const question = questionRepository.create({
            title,
            text,
            producer: user
        })
        await questionRepository.save(question)

        const questionAnswers = answers.map(element => {
            element.question = question.id;
            return element;
        })
        
        const answerRepository = getCustomRepository(AnswerRepository);

        const answersObjects = answerRepository.create(questionAnswers);

        await answerRepository.save(answersObjects);

        await sessionRepository.addQuestion(session, question.id)

        question.answers = answersObjects;

        return response.status(201).json(question);
        
    }

    async index(request: Request, response: Response){
        const questionRepository = getCustomRepository(QuestionRepository);

        const questions = await questionRepository.find({relations: ['answers']});

        return response.json(questions);
    }
}

export default new QuestionController;