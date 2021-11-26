import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";
import Module from "./Module";
import User from "./User";


@Entity("history")
class History{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => User, user => user.histories)
    user: User

    @ManyToOne(() => Module, module => module.histories)
    module: Module

    @CreateDateColumn()
    created_at: Date

    constructor(props: Omit<History, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }

        this.created_at = new Date();
    }
}

export default History;