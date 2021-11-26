import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";
import Module from "./Module";
import Session from "./Session";
import User from "./User";


@Entity("module_classification")
class ModuleClassification{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => User, user => user.moduleClassifications)
    user: User

    @ManyToOne(() => Module, module => module.classifications)
    module: Module

    @Column()
    rating: number

    constructor(props: Omit<ModuleClassification, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }
    }
}

export default ModuleClassification;