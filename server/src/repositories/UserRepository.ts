import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import User from '../entities/User';
import ModuleRepository from './ModuleRepository';
import RoleRepository from './RoleRepository';
import SessionRepository from './SessionRepository';

@EntityRepository(User)
class UserRepository extends Repository<User>{


    async addRole(user: string, roleName: string){
        const userData = await this.findOne(user, {relations: ['roles']})

        const roleRepository = getCustomRepository(RoleRepository);

        const roleData = await roleRepository.findOne({name: roleName})

        userData.roles.push(roleData)

        await this.save(userData);
    }

    async addProgress(user: string, session: string){
        const userData = await this.findOne(user, {relations: ['sessionProgress']})

        const sessionRepository = getCustomRepository(SessionRepository);

        const sessionData = await sessionRepository.findOne(session)

        userData.sessionProgress.push(sessionData)

        await this.save(userData);
    }
}

export default UserRepository;