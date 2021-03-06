import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import PermissionRepository from '../repositories/PermissionRepository';

class PermissionController{
    async create(request: Request, response: Response){
        const {name, description} = request.body;

        if(!name) return response.status(400).json({error: "Nome não informado"})
        if(!description) return response.status(400).json({error: "Descrição não informado"})

        const permissionRepository = getCustomRepository(PermissionRepository);
        const existPermission = await permissionRepository.findOne({name});

        if(existPermission) return response.status(400).json({error: "Permissão já existe"});

        const permission = permissionRepository.create({
            name,
            description
        });

        await permissionRepository.save(permission);

        return response.json(permission);

    }
}

export default new PermissionController;