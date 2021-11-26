import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Question from "./Question";

import { v4 } from "uuid"

@Entity("answers")
class Answer{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    text: string;

    @Column()
    isCorrect: boolean;

    @ManyToOne(() => Question, question => question.answers)
    question: Question;

    constructor(props: Omit<Answer, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }
    }
}

export default Answer;