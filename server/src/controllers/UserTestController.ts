import { Request, Response } from "express";
import { getCustomRepository, In } from "typeorm";
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
            const verification = await verificationRepository.findOne('44f284db-3df7-4303-9689-8c83abd0c058')

            const certificate = await certificateRepository.create(
                {
                    user,
                    subject,
                    verifications: [verification]
                }
            )

            await certificateRepository.save(certificate);

            await userRepository.addRole(user.id, '9b1cee8a-b803-4565-a3ec-b026dd468c11')
        }

        return response.status(201).json(userTest);
    }
}

export default new UserTestController