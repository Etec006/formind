import { EntityRepository, In, Repository } from 'typeorm';
import Certificate from '../entities/Certificate';

@EntityRepository(Certificate)
class CertificateRepository extends Repository<Certificate>{}

export default CertificateRepository;

