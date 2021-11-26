import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import PermissionRepository from '../repositories/PermissionRepository';
import RoleRepository from '../repositories/RoleRepository';

class RoleController{
    async create(request: Request, response: Response){
        const {name, description, permissions} = request.body;

        if(!name) return response.status(400).json({error: "Nome não informado"})
        if(!description) return response.status(400).json({error: "Descrição não informado"})
        if(!permissions) return response.status(400).json({error: "Permissão não informado"})

        if(!Array.isArray(permissions)) return response.status(400).json({error: 'Permissões precisam ser um array'});

        const roleRepository = getCustomRepository(RoleRepository);
        const existRole = await roleRepository.findOne({name});
        if(existRole) return response.status(400).json({error: "Cargo já existe"});

        const permissionRepository = getCustomRepository(PermissionRepository);
        const existsPermissions = await permissionRepository.findByIds(permissions);

        const role = roleRepository.create({
            name,
            description,
            permissions: existsPermissions
        });

        await roleRepository.save(role);

        return response.json(role);

    }
}

export default new RoleController;