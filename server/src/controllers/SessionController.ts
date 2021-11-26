import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ModuleRepository from "../repositories/ModuleRepository";
import PictureRepository from "../repositories/PictureRepository";
import SessionRepository from "../repositories/SessionRepository";
import UserRepository from "../repositories/UserRepository";
import decoder from "../utils/decoderUser";


class SessionController{
    async create(request: Request, response: Response){
        const sessionRepository = getCustomRepository(SessionRepository);
        const moduleRepository = getCustomRepository(ModuleRepository);
        const pictureRepository = getCustomRepository(PictureRepository);
        
        request.body.thumbnail = request.file
        const { name, module, content, thumbnail } = request.body;


        const existSession = await sessionRepository.findOne({name});

        if(existSession){
            return response.status(400).json({message: "A sessão já existe"});
        }

        const existModule = await moduleRepository.findOne({id: module});

        if(!existModule){
            return response.status(400).json({message: "O módulo não existe"});
        }

        const thumbnailPicture = pictureRepository.create({
            name: thumbnail.originalname,
            size: thumbnail.size,
            key: thumbnail.key,
            url: thumbnail.path
        });

        await pictureRepository.save(thumbnailPicture);

        const session = sessionRepository.create({
            name,
            module,
            content,
            thumbnail: thumbnailPicture
        });

        await sessionRepository.save(session);

        return response.status(201).json(session);
    }

    async get(request: Request, response: Response){
        const sessionRepository = getCustomRepository(SessionRepository);
        const sessionId = request.params.id

        const session = await sessionRepository.findOne(sessionId, {relations: ['questions', 'questions.answers']});

        return response.json(session);
    }

    async createProgress(request: Request, response: Response){
        const userRepository = getCustomRepository(UserRepository);
        const {session} = request.body;
        const user = await decoder(request)

        await userRepository.addProgress(user.id, session);

        return response.status(201).json();
    }
}

export default new SessionController;