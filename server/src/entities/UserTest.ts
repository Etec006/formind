import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Answer from "./Answer";
import Test from "./Test";
import User from "./User";
import { v4 } from "uuid";

@Entity('user_tests')
class UserTest{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => Test)
    @JoinColumn()
    test: Test

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @Column()
    result: number

    @ManyToMany(() => Answer)
    @JoinTable({
        name: 'user_test_answers',
        joinColumns: [{name: 'userTestId'}],
        inverseJoinColumns: [{name: 'answerId'}]
    })
    answers: Answer[]

    constructor(props: Omit<UserTest, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }
    }
}

export default UserTest;