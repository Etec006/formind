import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Subject from "./Subject";
import { v4 } from "uuid";

@Entity("understanding_areas")
class UnderstandingArea{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;
    
    @Column()
    color: string;

    @OneToMany(() => Subject, subject => subject.area)
    subjects: Subject[]

    constructor(props: Omit<UnderstandingArea, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }
    }
}

export default UnderstandingArea;