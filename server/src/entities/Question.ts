import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import Answer from "./Answer";
import { v4 } from "uuid";
import User from "./User";
import Session from "./Session";

@Entity("questions")
class Question{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToOne(() => User, user => user.questionsProduced)
    producer: User

    @OneToMany(() => Answer, answer => answer.question)
    answers: Answer[]

    constructor(props: Omit<Question, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }
    }

}

export default Question;