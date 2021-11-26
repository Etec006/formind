import {CreateDateColumn, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn} from 'typeorm';
import Certificate from './Certificate';
import Role from './Role';

import { v4 } from 'uuid'
import SessionClassification from './ModuleClassification';
import Session from './Session';
import History from './History';
import Picture from './Picture';
import ModuleClassification from './ModuleClassification';
import Module from './Module';
import Question from './Question';

@Entity("users")
class User{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    description: string;

    @Column({select: false})
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => Role)
    @JoinTable({
        name: 'users_roles',
        joinColumns: [{name: 'user_id'}],
        inverseJoinColumns: [{name: 'role_id'}]
    })
    roles: Role[]

    @OneToMany(() => Certificate, certificate => certificate.user)
    certificates: Certificate[]

    @OneToMany(() => ModuleClassification, moduleClassification => moduleClassification.user)
    moduleClassifications: ModuleClassification[]

    @ManyToMany(() => Session)
    @JoinTable({
        name: 'session_progress',
        joinColumns: [{name: 'userId'}],
        inverseJoinColumns: [{name: 'sessionId'}]
    })
    sessionProgress: Session[]

    @OneToMany(() => History, history => history.user)
    histories: History[]

    @OneToOne(()=> Picture)
    @JoinColumn()
    profile: Picture

    @OneToMany(() => Module, module => module.producer)
    modulesProduced: Module[]

    @OneToMany(() => Question, question => question.producer)
    questionsProduced: Module[]

    constructor(props: Omit<User, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }

        this.created_at = new Date();
    }
}

export default User;