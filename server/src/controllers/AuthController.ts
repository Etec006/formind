import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';
import { sign } from 'jsonwebtoken';

class AuthController{

    async create(request: Request, response: Response){
        const { email, password } = request.body;
        if(!email) return response.status(400).json({error: "E-mail não informado"});
        if(!password) return response.status(400).json({error: "Senha não informada"});

        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne({email}, {select: ['id', 'email', 'password'], relations: ['roles', 'profile']});
        if(!user) return response.status(400).json({error: "Usuário não encontrado"});

        const matchPassword = await compare(password, user.password);
        if(!matchPassword) return response.status(400).json({error: "Usuário ou Senha incorreta"});

        const roles = user.roles.map(role => role.name)

        const token = sign({ roles }, "c24fdfdde70947f16f6380f410ae5442ed475e20", {
           subject: user.id,
           expiresIn: '1d' 
        });

        return response.json({token});
    }
    
}

export default new AuthController;