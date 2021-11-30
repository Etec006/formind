import { EntityRepository, In, Repository } from 'typeorm';
import Answer from '../entities/Answer';

@EntityRepository(Answer)
class AnswerRepository extends Repository<Answer>{

    async findCorretAnswers(answers: Answer[]): Promise<Answer[]>{
        const answersId = answers.map(answer => answer.id)

        const correctAnswers = this.find({
            id: In(answersId),
            isCorrect: true
        })

        return correctAnswers;
    }

}

export default AnswerRepository;

