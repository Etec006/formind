import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import Session from "../entities/Session";
import QuestionRepository from "./QuestionRepository";

@EntityRepository(Session)
class SessionRepository extends Repository<Session> {
  async addQuestion(session: string, question: string) {
    const sessionData = await this.findOne(session, {
      relations: ["questions"],
    });

    const questionRepository = getCustomRepository(QuestionRepository);

    const questionData = await questionRepository.findOne(question);

    sessionData.questions.push(questionData);

    await this.save(sessionData);
  }
}

export default SessionRepository;
