import { EntityRepository, Repository } from 'typeorm';
import Subject from '../entities/Subject';

@EntityRepository(Subject)
class SubjectRepository extends Repository<Subject>{

    searchByName(subjectName: string){
        const subjects = this.createQueryBuilder("subject")
                            .leftJoinAndSelect("subject.producer", "producer")
                            .where("LOWER(subject.name) like :name", {name:`%${subjectName.toLowerCase()}%`})
                            .getMany();

        return subjects;
    }


}

export default SubjectRepository;