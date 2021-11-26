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

    searchByName(moduleName: string){
        const modules = this.createQueryBuilder("module")
                            .leftJoinAndSelect("module.producer", "producer")
                            .where("LOWER(module.name) like :name", {name:`%${moduleName.toLowerCase()}%`})
                            .getMany();

        return modules;
    }

}

export default ModuleRepository;

