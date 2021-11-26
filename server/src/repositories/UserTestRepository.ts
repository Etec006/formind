import { EntityRepository, Repository } from 'typeorm';
import UserTest from '../entities/UserTest';

@EntityRepository(UserTest)
class UserTestRepository extends Repository<UserTest>{}

export default UserTestRepository;

