import { EntityRepository, Repository } from 'typeorm';
import UnderstandingArea from '../entities/UnderstandingArea';

@EntityRepository(UnderstandingArea)
class UnderstandingAreaRepository extends Repository<UnderstandingArea>{}

export default UnderstandingAreaRepository;