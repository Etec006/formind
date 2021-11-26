import { EntityRepository, In, Repository } from 'typeorm';
import Verification from '../entities/Verification';

@EntityRepository(Verification)
class VerificationRepository extends Repository<Verification>{}

export default VerificationRepository;

