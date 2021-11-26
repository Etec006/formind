import { Connection, getCustomRepository } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

import { permission } from '../../../enums/permissions';
import PermissionRepository from '../../../repositories/PermissionRepository';


export default class CreatePermission implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const permissionRepository = getCustomRepository(PermissionRepository);

    const permissions = permissionRepository.create([
        {
            name: permission.CREATE_MODULE,
            description: "Permissão para criar modulos",
        },
        {
            name: permission.EDIT_MODULE,
            description: "Permissão para editar modulos",
        },
        {
            name: permission.DELETE_MODULE,
            description: "Permissão para deletar modulos",
        },
        {
            name: permission.CREATE_SESSION,
            description: "Permissão para criar sessões",
        },
        {
            name: permission.EDIT_SESSION,
            description: "Permissão para editar sessões",
        },
        {
            name: permission.DELETE_SESSION,
            description: "Permissão para deletar sessões",
        },
        {
            name: permission.CREATE_PERMISSION,
            description: "Permissão para criar permissão",
        },
        {
            name: permission.EDIT_PERMISSION,
            description: "Permissão para editar permissão",
        },
        {
            name: permission.DELETE_PERMISSION,
            description: "Permissão para deletar permissão",
        },
        {
            name: permission.CREATE_ROLE,
            description: "Permissão para criar cargo",
        },
        {
            name: permission.EDIT_ROLE,
            description: "Permissão para editar cargo",
        },
        {
            name: permission.DELETE_ROLE,
            description: "Permissão para deletar cargo",
        }   
    ])

    await permissionRepository.save(permissions)
  }
}


