import { EntityRepository, In, Repository } from 'typeorm';
import Picture from '../entities/Picture';

@EntityRepository(Picture)
class PictureRepository extends Repository<Picture>{}

export default PictureRepository;

