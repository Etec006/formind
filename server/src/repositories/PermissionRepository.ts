import { EntityRepository, Repository } from "typeorm";
import Permission from "../entities/Permission";

@EntityRepository(Permission)
class PermissionRepository extends Repository<Permission>{}

export default PermissionRepository;