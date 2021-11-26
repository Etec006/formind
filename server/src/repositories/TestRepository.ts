import { EntityRepository, Repository } from 'typeorm';
import Test from '../entities/Test';

@EntityRepository(Test)
class TestRepository extends Repository<Test>{}

export default TestRepository;

