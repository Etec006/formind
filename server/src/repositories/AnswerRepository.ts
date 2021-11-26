import { EntityRepository, In, Repository } from 'typeorm';
import Answer from '../entities/Answer';

@EntityRepository(Answer)
class AnswerRepository extends Repository<Answer>{

    async findCorretAnswers(answers: []): Promise<Answer[]>{
        const correctAnswers = this.find({
            id: In(answers),
            isCorrect: true
        })

        return correctAnswers;
    }

}

export default AnswerRepository;

