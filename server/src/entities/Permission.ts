import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("permissions")
class Permission{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(props: Omit<Permission, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }

        this.created_at = new Date();
    }

}

export default Permission;