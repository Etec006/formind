import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ModuleClassificationRepository from "../repositories/ModuleClassificationRepository";
import ModuleRepository from "../repositories/ModuleRepository";
import PictureRepository from "../repositories/PictureRepository";
import SubjectRepository from "../repositories/SubjectRepository";
import decoder from "../utils/decoderUser";


class ModuleController{
    async create(request: Request, response: Response){  
        const user = await decoder(request);
        request.body.image = request.file
        const { name, subject, concept, description, image } = request.body;

        if(!user) return response.status(401).json({error: 'Usuário não está logado'})
        if(!name) return response.status(400).json({error: "Nome não informado"});
        if(!subject) return response.status(400).json({error: "Matéria não informado"});
        if(!concept) return response.status(400).json({error: "Conceito não informado"});
        if(!description) return response.status(400).json({error: "Descrição não informado"});
        if(!image) return response.status(400).json({error: "Imagem não informado"}); 

        const moduleRepository = getCustomRepository(ModuleRepository);
        const existModule = await moduleRepository.findOne({name});
        if(existModule) return response.status(400).json({message: "O nome do módulo já existe"});

        const subjectRepository = getCustomRepository(SubjectRepository);
        const existSubject = await subjectRepository.findOne({id: subject});
        if(!existSubject) return response.status(400).json({message: "A matéria não existe"});

        const pictureRepository = getCustomRepository(PictureRepository);
        const imagePicture = pictureRepository.create({
            name: image.originalname,
            size: image.size,
            key: image.key,
            url: image.path
        });
        await pictureRepository.save(imagePicture);

        const module = moduleRepository.create({
            name,
            subject,
            concept,
            image: imagePicture,
            producer: user,
            description
        });
        await moduleRepository.save(module);

        return response.status(201).json(module);

    }

    async index(request: Request, response: Response){
        const moduleRepository = getCustomRepository(ModuleRepository);

        const modules = await moduleRepository.find({relations: ['sessions', 'producer']});

        return response.json(modules);
    }

    async get(request: Request, response: Response){
        const moduleId = request.params.id
        if(!moduleId) return response.status(400).json({error: "Módulo não informado"})

        const moduleRepository = getCustomRepository(ModuleRepository);
        const module = await moduleRepository.findOne(moduleId, {relations: ['sessions', 'producer', "image", "subject", "sessions.thumbnail"]});
        const {rating} = await moduleRepository.getRating(moduleId);

        if(!module) return response.status(400).json({error: "Módulo não encontrado"});

        return response.json({module, rating});
    }

    async rating(request: Request, response: Response){
        const module = request.params.id
        const {rating} = request.body;
        const user = await decoder(request)

        if(!user) return response.status(401).json({error: 'Usuário não está logado'})
        if(!module) return response.status(401).json({error: 'Módulo não informado'})
        if(!rating) return response.status(401).json({error: 'Avaliação não informado'})

        const moduleRepository = getCustomRepository(ModuleRepository);
        const existModule = await moduleRepository.findOne(module);
        if(!existModule) return response.status(401).json({error: "O módulo não existe"});
        
        const moduleClassificationRepository = getCustomRepository(ModuleClassificationRepository);
        const classification = moduleClassificationRepository.create({
            user,
            module: {id: module},
            rating
        })
        await moduleClassificationRepository.save(classification);

        return response.status(201).json();
    }

    async update(request: Request, response: Response){
        const moduleId = request.params.id
        request.body.image = request.file
        const { name, subject, description, image } = request.body;
        const user = await decoder(request);

        if(!user) return response.status(401).json({error: 'Usuário não está logado'});
        if(!moduleId) return response.status(400).json({error: "Módulo não informado"});
        if(!name) return response.status(400).json({error: "Nome não informado"});
        if(!subject) return response.status(400).json({error: "Matéria não informado"});
        if(!description) return response.status(400).json({error: "Descrição não informado"});
        //if(!image) return response.status(400).json({error: "Imagem não informado"}); 


        const moduleRepository = getCustomRepository(ModuleRepository);
        const existModule = await moduleRepository.findOne(moduleId, {relations: ['producer']});
        if(!existModule) return response.status(400).json({message: "O módulo não existe"});

        const existModuleName = await moduleRepository.findOne({name});
        if(existModuleName && existModuleName.id != existModule.id) return response.status(400).json({message: "O nome do módulo já existe"});

        const subjectRepository = getCustomRepository(SubjectRepository);
        const existSubject = await subjectRepository.findOne({id: subject});
        if(!existSubject) return response.status(400).json({message: "A matéria não existe"});

        if(existModule.producer.id != user.id) return response.status(401).json({error: "Não autorizado"}); 

        if(image){
            const pictureRepository = getCustomRepository(PictureRepository);
            if(existModule.image) await pictureRepository.removePicture(existModule.image.id)

            const imagePicture = pictureRepository.create({
                name: image.originalname,
                size: image.size,
                key: image.key,
                url: image.path
            });
            await pictureRepository.save(imagePicture);
    
            const module = moduleRepository.create({
                id: moduleId,
                name,
                subject,
                image: imagePicture,
                producer: user,
                description
            });
            await moduleRepository.save(module);
    
            return response.status(201).json();
        }

        const module = moduleRepository.create({
            id: moduleId,
            name,
            subject,
            producer: user,
            description
        });
        await moduleRepository.save(module);

        return response.status(201).json();
        
    }

    async delete(request: Request, response: Response){
        const moduleId = request.params.id
        const user = await decoder(request);

        if(!user) return response.status(401).json({error: 'Usuário não está logado'});
        if(!moduleId) return response.status(400).json({error: "Módulo não informado"});

        const moduleRepository = getCustomRepository(ModuleRepository);
        const existModule = await moduleRepository.findOne(moduleId, {relations: ['producer']});
        if(!existModule) return response.status(400).json({message: "O módulo não existe"});

        if(existModule.producer.id != user.id) return response.status(401).json({error: "Não autorizado"}); 

        await moduleRepository.delete(existModule);

        return response.status(200).json()
    }

    async search(request: Request, response: Response){
        const moduleRepository = getCustomRepository(ModuleRepository);

        const moduleName = request.params.name || "";

        const modules = await moduleRepository.searchByName(moduleName);

        return response.json(modules);
    }
}

export default new ModuleController;