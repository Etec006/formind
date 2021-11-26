import { Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Subject from "./Subject";
import User from "./User";
import Verification from "./Verification";
import { v4 } from "uuid";

@Entity('certificates')
class Certificate{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, user => user.certificates)
    user: User

    @OneToOne(() => Subject)
    @JoinColumn()
    subject: Subject

    @ManyToMany(() => Verification)
    @JoinTable({
        name: 'certificates_verifications',
        joinColumns: [{name: 'certificateId'}],
        inverseJoinColumns: [{name: 'verificationId'}]
    })
    verifications: Verification[]

    constructor(props: Omit<Certificate, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }
    }

}

export default Certificate;