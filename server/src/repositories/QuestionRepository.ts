import { EntityRepository, Repository } from "typeorm";
import Question from "../entities/Question";

@EntityRepository(Question)
class QuestionRepository extends Repository<Question>{}

export default QuestionRepository;