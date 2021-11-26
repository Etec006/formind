import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import Permission from "./Permission";
import { v4 } from "uuid";

@Entity("roles")
class Role{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'permissions_roles',
        joinColumns: [{name: 'role_id'}],
        inverseJoinColumns: [{name: 'permission_id'}]
    })
    permissions: Permission[]

    constructor(props: Omit<Role, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }

        this.created_at = new Date();
    }
}

export default Role;