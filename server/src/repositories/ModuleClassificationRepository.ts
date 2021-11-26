import { EntityRepository, In, Repository } from 'typeorm';
import ModuleClassification from '../entities/ModuleClassification';

@EntityRepository(ModuleClassification)
class ModuleClassificationRepository extends Repository<ModuleClassification>{}

export default ModuleClassificationRepository;

