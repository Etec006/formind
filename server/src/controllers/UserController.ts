import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';
import { roles } from '../enums/roles';
import PictureRepository from '../repositories/PictureRepository';
import decoder from '../utils/decoderUser';

class UserController{

    async create(request: Request, response: Response){
        const { name, email, password } = request.body;

        if(!name) return response.status(400).json({error: "Nome não informado"})
        if(!email) return response.status(400).json({error: "Email não informado"})
        if(!password) return response.status(400).json({error: "Senha não informado"})

        const userRepository = getCustomRepository(UserRepository);
        const existUser = await userRepository.findOne({email});

        if(existUser) return response.status(400).json({message: "O usuário já existe"});

        const passwordHashed = await hash(password, 9);

        const user = userRepository.create({
            name,
            email,
            password: passwordHashed,
        });

        await userRepository.save(user);

        await userRepository.addRole(user.id, roles.DEFAULT)

        delete user.password;

        return response.status(201).json(user);
    }

    async update(request: Request, response: Response){
        request.body.profile = request.file;
        const { name, description, profile } = request.body;
        const user = await decoder(request);

        if(!user) return response.status(401).json({error: 'Usuário não está logado'})
        if(!name) return response.status(400).json({error: "Nome não informado"})
        if(!description) return response.status(400).json({error: "Descrição não informado"})

        

        const userRepository = getCustomRepository(UserRepository);
        user.name = name;
        user.description = description;

        if(profile){
            const pictureRepository = getCustomRepository(PictureRepository);
            if(user.profile) await pictureRepository.removePicture(user.profile.id)

            const profilePicture = pictureRepository.create({
                name: profile.originalname,
                size: profile.size,
                key: profile.key,
                url: profile.path
            });
            await pictureRepository.save(profilePicture);

            user.profile = profilePicture

            const userData = userRepository.create(user);
            await userRepository.save(userData);

            return response.status(200).json()
        }     

        const userData = userRepository.create(user);
        await userRepository.save(userData);

        return response.status(200).json()
           
    }

    async getById(request: Request, response: Response){   
        const userId = request.params.id;

        if(!userId) return response.status(400).json({error: "Usuário não informado"})

        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne(userId)

        delete user.password;

        return response.status(200).json(user)
    }

    async delete(request: Request, response: Response){
        const user = await decoder(request); 
        if(!user) return response.status(400).json({error: 'Usuário não está logado'})

        const userRepository = getCustomRepository(UserRepository);
        const existUser = await userRepository.findOne(user.id, {relations: ['profile']})
        if(!existUser) return response.status(400).json({error: 'Usuário não existe'})

        const pictureRepository = getCustomRepository(PictureRepository);
        if(existUser.profile) await pictureRepository.removePicture(user.profile.id)
        
        await userRepository.delete(user.id)

        return response.status(200).json()
    }

    async promote(request: Request, response: Response){
        const user = await decoder(request);
        if(!user) return response.status(400).json({error: 'Usuário não está logado'})

        const existRole = user.roles.find(role => role.name == roles.PRODUCER)
        if(existRole) return response.status(400).json({error: "O usuário já é um produtor"})

        const userRepository = getCustomRepository(UserRepository);
        await userRepository.addRole(user.id, roles.PRODUCER)

        return response.status(200).json()
    }

    async get(request: Request, response: Response){
        const user = await decoder(request);
        if(!user) return response.status(400).json({error: 'Usuário não está logado'})

        const userRepository = getCustomRepository(UserRepository);
        const userData = await userRepository.findOne(user.id, {relations: ['modulesProduced', 'modulesProduced.image', 'profile']})

        return response.status(200).json({user: userData})
    }

}

export default new UserController;