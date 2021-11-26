import { EntityRepository, In, Repository } from 'typeorm';
import History from '../entities/History';

@EntityRepository(History)
class HistoryRepository extends Repository<History>{}

export default HistoryRepository;

