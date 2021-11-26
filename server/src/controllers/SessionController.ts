import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ModuleRepository from "../repositories/ModuleRepository";
import PictureRepository from "../repositories/PictureRepository";
import SessionRepository from "../repositories/SessionRepository";
import UserRepository from "../repositories/UserRepository";
import decoder from "../utils/decoderUser";

class SessionController {
  async create(request: Request, response: Response) {
    request.body.thumbnail = request.file;
    const { name, module, content, thumbnail } = request.body;
    const user = await decoder(request);

    if (!user) {
      return response.status(400).json({ error: "Usuário não informado" });
    }
    if (!name) {
      return response.status(400).json({ error: "Nome não informado" });
    }
    if (!module) {
      return response.status(400).json({ error: "Módulo não informado" });
    }
    if (!content) {
      return response.status(400).json({ error: "Conteúdo não informado" });
    }
    if (!thumbnail) {
      return response.status(400).json({ error: "Imagem não informado" });
    }

    const moduleRepository = getCustomRepository(ModuleRepository);
    const existModule = await moduleRepository.findOne(
      { id: module },
      { relations: ["producer"] }
    );
    if (!existModule) {
      return response.status(400).json({ message: "O módulo não existe" });
    }

    if (existModule.producer.id != user.id) {
      return response.status(400).json({ message: "Não autorizado" });
    }

    const sessionRepository = getCustomRepository(SessionRepository);
    const existSession = await sessionRepository.findOne({
      name,
      moduleId: existModule.id,
    });
    if (existSession) {
      return response.status(400).json({ message: "A sessão já existe" });
    }

    const pictureRepository = getCustomRepository(PictureRepository);
    const thumbnailPicture = pictureRepository.create({
      name: thumbnail.originalname,
      size: thumbnail.size,
      key: thumbnail.key,
      url: thumbnail.path,
    });

    await pictureRepository.save(thumbnailPicture);

    const session = sessionRepository.create({
      name,
      moduleId: module,
      content,
      thumbnail: thumbnailPicture,
    });

    await sessionRepository.save(session);

    return response.status(201).json(session);
  }

  async get(request: Request, response: Response) {
    const sessionId = request.params.id;
    if (!sessionId) {
      return response.status(400).json({ error: "Sessão não informada" });
    }

    const sessionRepository = getCustomRepository(SessionRepository);
    const session = await sessionRepository.findOne(sessionId, {
      relations: ["questions", "questions.answers", "thumbnail"],
    });

    return response.json(session);
  }

  async createProgress(request: Request, response: Response) {
    const { session } = request.body;
    const user = await decoder(request);
    if (!user) {
      return response.status(400).json({ error: "Usuário não logado" });
    }
    if (!session) {
      return response.status(400).json({ error: "Sessão não informada" });
    }

    const userRepository = getCustomRepository(UserRepository);
    await userRepository.addProgress(user.id, session);

    return response.status(201).json();
  }

  async update(request: Request, response: Response) {
    request.body.thumbnail = request.file;
    const { name, content, thumbnail } = request.body;
    const sessionId = request.params.id;
    const user = await decoder(request);

    if (!user) {
      return response.status(400).json({ error: "Usuário não informado" });
    }
    if (!sessionId) {
      return response.status(400).json({ error: "Sessão não informada" });
    }
    if (!name) {
      return response.status(400).json({ error: "Nome não informado" });
    }
    if (!module) {
      return response.status(400).json({ error: "Módulo não informado" });
    }
    if (!content) {
      return response.status(400).json({ error: "Conteúdo não informado" });
    }

    const sessionRepository = getCustomRepository(SessionRepository);
    const existSession = await sessionRepository.findOne(sessionId, {
      relations: ["module", "module.producer"],
    });
    if (!existSession) {
      return response.status(400).json({ error: "Sessão não existe" });
    }

    if (existSession.module.producer.id != user.id) {
      return response.status(400).json({ message: "Não autorizado" });
    }

    if (thumbnail) {
      const pictureRepository = getCustomRepository(PictureRepository);
      if (existSession.thumbnail) {
        await pictureRepository.removePicture(existSession.thumbnail.id);
      }

      const thumbnailPicture = pictureRepository.create({
        name: thumbnail.originalname,
        size: thumbnail.size,
        key: thumbnail.key,
        url: thumbnail.path,
      });

      await pictureRepository.save(thumbnailPicture);

      const session = sessionRepository.create({
        id: existSession.id,
        name,
        content,
        thumbnail: thumbnailPicture,
      });

      await sessionRepository.save(session);

      return response.status(200).json();
    }

    const session = sessionRepository.create({
      id: sessionId,
      name,
      content,
    });

    await sessionRepository.save(session);

    return response.status(200).json();
  }

  async delete(request: Request, response: Response) {
    const sessionId = request.params.id;
    const user = await decoder(request);

    if (!user) {
      return response.status(400).json({ error: "Usuário não informado" });
    }
    if (!sessionId) {
      return response.status(400).json({ error: "Sessão não informada" });
    }

    const sessionRepository = getCustomRepository(SessionRepository);
    const existSession = await sessionRepository.findOne(sessionId, {
      relations: ["module", "module.producer"],
    });
    if (!existSession) {
      return response.status(400).json({ error: "Sessão não existe" });
    }

    if (existSession.module.producer.id != user.id) {
      return response.status(400).json({ message: "Não autorizado" });
    }

    await sessionRepository.delete(sessionId);

    return response.status(200).json();
  }
}

export default new SessionController();
