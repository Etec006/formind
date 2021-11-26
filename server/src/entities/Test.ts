import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Question from "./Question";
import Subject from "./Subject";
import { v4 } from "uuid";

@Entity('tests')
class Test{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column('time')
    timing: string;

    @ManyToMany(() => Question)
    @JoinTable({
        name: 'test_questions',
        joinColumns: [{name: 'testId'}],
        inverseJoinColumns: [{name: 'questionId'}]
    })
    questions: Question[]

    @OneToOne(() => Subject)
    @JoinColumn()
    subject: Subject

    constructor(props: Omit<Test, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }
    }
}

export default Test;