import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Module from "./Module";
import UnderstandingArea from "./UnderstandingArea";
import { v4 } from "uuid";

@Entity("subjects")
class Subject{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => UnderstandingArea, area => area.subjects)
    area: UnderstandingArea;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Module, module => module.subject)
    modules: Module[]

    constructor(props: Omit<Subject, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }
    }

}

export default Subject;