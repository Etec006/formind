import { EntityRepository, Repository } from 'typeorm';
import Module from '../entities/Module';

@EntityRepository(Module)
class ModuleRepository extends Repository<Module>{

    getRating(module: string){

        const rating = this.createQueryBuilder("module")
                            .select("AVG(rating) rating")
                            .leftJoin("module.classifications", "classifications")
                            .where("module.id = :id", { id: module })
                            .getRawOne();

        return rating;

    }

}

export default ModuleRepository;

