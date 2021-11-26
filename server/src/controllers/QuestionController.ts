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

    /* async index(request: Request, response: Response){
        const questionRepository = getCustomRepository(QuestionRepository);

        const questions = await questionRepository.find({relations: ['answers']});

        return response.json(questions);
    } */

    async update(request: Request, response: Response){
        const { title, text, answers} = request.body
        const questionId = request.params.id
        const user = await decoder(request);

        if(!user) return response.status(401).json({error: 'Usuário não está logado'});
        if(!questionId) return response.status(401).json({error: 'Questão não informada'});
        if(!title) return response.status(400).json({error: 'Titulo não informado'});
        if(!text) return response.status(400).json({error: 'Enunciado não informado'});
        if(!answers) return response.status(400).json({error: 'Respostas não informadas'});

        if(!Array.isArray(answers)) return response.status(400).json({error: 'Respostas precisam ser um array'});

        const questionRepository = getCustomRepository(QuestionRepository);
        const existQuestion = await questionRepository.findOne(questionId, {relations:['producer']});
        if(!existQuestion) return response.status(400).json({error: 'Questão não existe'});
        if(existQuestion.producer.id != user.id) return response.status(400).json({error: 'Não autorizado'});

        const question = questionRepository.create({
            id: existQuestion.id,
            title,
            text
        })
        await questionRepository.save(question)

        const questionAnswers = answers.map(element => {
            element.question = existQuestion.id;
            return element;
        })
        
        const answerRepository = getCustomRepository(AnswerRepository);

        const answersObjects = answerRepository.create(questionAnswers);

        await answerRepository.save(answersObjects);

        question.answers = answersObjects;

        return response.status(201).json(question);
    }

    async delete(request: Request, response: Response){
        const questionId = request.params.id
        const user = await decoder(request);

        if(!user) return response.status(401).json({error: 'Usuário não está logado'});
        if(!questionId) return response.status(401).json({error: 'Questão não informada'});

        const questionRepository = getCustomRepository(QuestionRepository);
        const existQuestion = await questionRepository.findOne(questionId, {relations:['producer']});
        if(!existQuestion) return response.status(400).json({error: 'Questão não existe'});
        if(existQuestion.producer.id != user.id) return response.status(400).json({error: 'Não autorizado'});

        await questionRepository.delete(existQuestion.id);

        return response.status(201).json();
    }
}

export default new QuestionController;