import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';
import RoleRepository from '../repositories/RoleRepository';
import PictureRepository from '../repositories/PictureRepository';

class UserController{

    async create(request: Request, response: Response){
        const userRepository = getCustomRepository(UserRepository);
        const pictureRepository = getCustomRepository(PictureRepository);

        request.body.profile = request.file
        const { name, email, password } = request.body;

        const existUser = await userRepository.findOne({email});

        if(existUser){
            return response.status(400).json({message: "O usuário já existe"});
        }

        const passwordHashed = await hash(password, 9);

        

        const user = userRepository.create({
            name,
            email,
            password: passwordHashed
        });

        await userRepository.save(user);

        await userRepository.addRole(user.id, '3571db72-f40e-4ac6-9cdd-fcf0fe9a2f79')

        delete user.password;

        return response.status(201).json(user);
    }

    async get(request: Request, response: Response){
        const userRepository = getCustomRepository(UserRepository);

        const userId = request.params.id

        const user = await userRepository.findOne(userId)

        delete user.password;

        return response.json(user)
    }

}

export default new UserController;