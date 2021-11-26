import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";

@Entity('pictures')
class Picture{
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    size: number

    @Column()
    key: string

    @Column()
    url: string

    constructor(props: Omit<Picture, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = v4();
        }

        if(!this.url){
            this.url = ""
        }
    }
}

export default Picture;