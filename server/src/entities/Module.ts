import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Session from "./Session";
import Subject from "./Subject";
import { v4 } from "uuid";
import History from "./History";
import Picture from "./Picture";
import ModuleClassification from "./ModuleClassification";
import User from "./User";

@Entity("modules")
class Module{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Subject, subject => subject.modules)
    subject: Subject;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => User, user => user.modulesProduced)
    producer: User

    @OneToMany(() => Session, session => session.module)
    sessions: Session[]

    @OneToMany(() => History, history => history.module)
    histories: History[]

    @OneToOne(()=> Picture)
    @JoinColumn()
    image: Picture

    @OneToMany(() => ModuleClassification, moduleClassification => moduleClassification.module)
    classifications: ModuleClassification[]

    constructor(props: Omit<Module, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }
    }
}

export default Module;