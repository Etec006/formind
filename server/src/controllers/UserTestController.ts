import { Request, Response } from "express";
import { getCustomRepository, In } from "typeorm";
import { roles } from "../enums/roles";
import { verifications } from "../enums/verifications";
import AnswerRepository from "../repositories/AnswerRepository";
import CertificateRepository from "../repositories/CertificateRepository";
import SubjectRepository from "../repositories/SubjectRepository";
import TestRepository from "../repositories/TestRepository";
import UserRepository from "../repositories/UserRepository";
import UserTestRepository from "../repositories/UserTestRepository";
import VerificationRepository from "../repositories/VerificationRepository";
import decoder from "../utils/decoderUser";

class UserTestController{
    async create(request: Request, response: Response){
        const { subject, answers } = request.body
        const user = await decoder(request);

        if(!user) return response.status(401).json({error: 'Usuário não está logado'})
        if(!subject) return response.status(400).json({error: 'Prova não informada'})

        const subjectRepository = getCustomRepository(SubjectRepository);
        const existSubject = await subjectRepository.findOne(subject)
        if(!existSubject) return response.status(400).json({error: 'Matéria informada não existe'})

        const testRepository = getCustomRepository(TestRepository);
        const existTest = await testRepository.findOne({subject: existSubject});
        if(!existTest){
            const verificationRepository = getCustomRepository(VerificationRepository);
            const verification = await verificationRepository.findOne({name: verifications.PROVA})

            const certificateRepository = getCustomRepository(CertificateRepository);
            const existCertificate = await certificateRepository.findOne({subject: existSubject, user})
            if(existCertificate) return response.status(200).json({message: 'Esse usuário já possui o certificado'})

            const certificate = await certificateRepository.create(
                {
                    user,
                    subject: existSubject,
                    verifications: [verification]
                }
            )

            await certificateRepository.save(certificate);
            
            const userRepository = getCustomRepository(UserRepository);
            await userRepository.addRole(user.id, roles.PRODUCER)

            return response.status(200).json({message: "Usuário promovido por não haver prova para essa matéria"})
        }

        if(!answers) return response.status(400).json({error: 'Questões não informadas'})
        if(!Array.isArray(answers)) return response.status(400).json({error: 'Respostas precisam ser um array'});

        const totalAnswers = await testRepository.count({
            relations: ['questions'],
            select: ['questions']
        })

        const validAnswers = answers.filter((elem: any, pos: any, self: any) => {
            let single = self.indexOf(elem) == pos;
            return single;
        })

        const answerRepository = getCustomRepository(AnswerRepository);
        const existAnswers = await answerRepository.findByIds(validAnswers);

        const correctAnswers = await answerRepository.findCorretAnswers(existAnswers);

        const result = correctAnswers.length/totalAnswers * 10;

        const userTestRepository = getCustomRepository(UserTestRepository);
        const userTest = userTestRepository.create({
            test: existTest,
            user,
            result,
            answers: existAnswers
        });

        await userTestRepository.save(userTest);

        if(result < 6) return response.status(200).json({userTest, message: "Nota insuficente"})
        
        const verificationRepository = getCustomRepository(VerificationRepository);
        const verification = await verificationRepository.findOne({name: verifications.PROVA})

        const certificateRepository = getCustomRepository(CertificateRepository);
        const existCertificate = await certificateRepository.findOne({subject: existSubject, user})
        if(existCertificate) return response.status(200).json({message: 'Esse usuário já possui o certificado'})

        const certificate = await certificateRepository.create(
            {
                user,
                subject: existSubject,
                verifications: [verification]
            }
        )

        await certificateRepository.save(certificate);
        
        const userRepository = getCustomRepository(UserRepository);
        await userRepository.addRole(user.id, roles.PRODUCER)
        

        return response.status(201).json(userTest);
    }
}

export default new UserTestController