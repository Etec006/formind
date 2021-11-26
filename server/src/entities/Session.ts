import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Module from "./Module";
import { v4 } from "uuid";
import User from "./User";
import Picture from "./Picture";
import Question from "./Question";

@Entity("sessions")
class Session{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Module, module => module.sessions)
    module: Module;

    @Column()
    name: string;

    @Column()
    content: string;

    @ManyToMany(() => User)
    @JoinTable({
        name: 'session_progress',
        joinColumns: [{name: 'sessionId'}],
        inverseJoinColumns: [{name: 'userId'}]
    })
    userProgress: User[]

    @OneToOne(()=> Picture)
    @JoinColumn()
    thumbnail: Picture

    @ManyToMany(() => Question)
    @JoinTable({
        name: 'session_questions',
        joinColumns: [{name: 'sessionId'}],
        inverseJoinColumns: [{name: 'questionId'}]
    })
    questions: Question[]

    constructor(props: Omit<Session, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }
    }
}

export default Session;