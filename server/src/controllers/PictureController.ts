import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import PictureRepository from "../repositories/PictureRepository";


class PictureController{
    async create(request: Request, response: Response){
        request.body.image = request.file
        const { image } = request.body

        if(!image) return response.status(400).json({error: "Imagem não informada"})

        const pictureRepository = getCustomRepository(PictureRepository);
        const picture = pictureRepository.create({
            name: image.originalname,
            size: image.size,
            key: image.key,
            url: image.path
        });

        await pictureRepository.save(picture);

        return response.status(201).json();
    }
}

export default new PictureController;