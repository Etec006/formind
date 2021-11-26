import { EntityRepository, In, Repository } from 'typeorm';
import Picture from '../entities/Picture';
import fs from 'fs';
import path from 'path'

@EntityRepository(Picture)
class PictureRepository extends Repository<Picture>{

    async removePicture(pictureId: string){
        const picture = await this.findOne({id: pictureId})

        if(!picture) return;

        fs.unlink(path.resolve(__dirname, "..", "..", "tmp", "uploads", picture.key), (err) => {})

        await this.delete(picture.id)
    }

}

export default PictureRepository;

