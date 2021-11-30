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
        const userTestRepository = getCustomRepository(UserTestRepository);
        const testRepository = getCustomRepository(TestRepository);
        const answerRepository = getCustomRepository(AnswerRepository);
        const certificateRepository = getCustomRepository(CertificateRepository);
        const subjectRepository = getCustomRepository(SubjectRepository);
        const verificationRepository = getCustomRepository(VerificationRepository);
        const userRepository = getCustomRepository(UserRepository);

        const { test, answers } = request.body
        const user = await decoder(request);


        const existTest = await testRepository.findOne(test);

        const totalAnswers = await testRepository.count({
            relations: ['questions'],
            select: ['questions']
        })

        const validAnswers = answers.filter((elem: any, pos: any, self: any) => {
            let single = self.indexOf(elem) == pos;
            return single;
        })

        const existAnswers = await answerRepository.findByIds(validAnswers);

        const correctAnswers = await answerRepository.findCorretAnswers(validAnswers);

        const result = correctAnswers.length/totalAnswers * 10;

        const userTest = userTestRepository.create({
            test: existTest,
            user,
            result,
            answers: existAnswers
        });

        await userTestRepository.save(userTest);

        if(result >= 6){
            const subject = await subjectRepository.findOne(existTest.subject);
            const verification = await verificationRepository.findOne({name: verifications.PROVA})

            const certificate = await certificateRepository.create(
                {
                    user,
                    subject,
                    verifications: [verification]
                }
            )

            await certificateRepository.save(certificate);

            await userRepository.addRole(user.id, roles.PRODUCER)

            /* const verificationRepository = getCustomRepository(VerificationRepository);
            const verification = await verificationRepository.findOne({name: verifications.PROVA})

            const certificateRepository = getCustomRepository(CertificateRepository);
            const existCertificate = certificateRepository.findOne({subject: existSubject, user})
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

            return response.status(200).json({message: "Usuário promovido por não haver prova para essa matéria"}) */
        }

        return response.status(201).json(userTest);
    }
}

export default new UserTestController