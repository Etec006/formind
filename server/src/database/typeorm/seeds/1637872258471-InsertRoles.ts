import { Connection, getCustomRepository, In } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

import { permission } from '../../../enums/permissions';
import { roles } from '../../../enums/roles';
import PermissionRepository from '../../../repositories/PermissionRepository';
import RoleRepository from '../../../repositories/RoleRepository';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const roleRepository = getCustomRepository(RoleRepository);
        const permissionsRepository = getCustomRepository(PermissionRepository);

        const producerPermissions = await permissionsRepository.find({
            name: In([
                permission.CREATE_MODULE,
                permission.CREATE_SESSION,
                permission.EDIT_MODULE,
                permission.EDIT_SESSION,
                permission.DELETE_MODULE,
                permission.DELETE_SESSION
            ])
        })

        const adminPermissions = await permissionsRepository.find({
            name: In([
                permission.CREATE_PERMISSION,
                permission.CREATE_ROLE,
                permission.EDIT_PERMISSION,
                permission.EDIT_ROLE,
                permission.DELETE_PERMISSION,
                permission.DELETE_ROLE
            ])
        })

        const rolesData = roleRepository.create([
            {
                name: roles.DEFAULT,
                description: "Usuário padrão",
                permissions: []
            },
            {
                name: roles.PRODUCER,
                description: "Produtor",
                permissions: producerPermissions
            },
            {
                name: roles.ADMIN,
                description: "Administrador",
                permissions: adminPermissions
            }
        ])

        await roleRepository.save(rolesData)
  }
}