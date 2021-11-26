import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";

@Entity('verifications')
class Verification{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string

    constructor(props: Omit<Verification, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }
    }
}

export default Verification;