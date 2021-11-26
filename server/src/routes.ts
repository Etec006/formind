import { Router } from 'express';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import PermissionController from './controllers/PermissionController';
import RoleController from './controllers/RoleController';
import UnderstandingAreaController from './controllers/UnderstandingAreaController';
import SubjectController from './controllers/SubjectController';
import ModuleController from './controllers/ModuleController';
import SessionController from './controllers/SessionController';
import QuestionController from './controllers/QuestionController';
import TestController from './controllers/TestController';
import UserTestController from './controllers/UserTestController';


import { is } from "./middlewares/permission"
import { storeHistory } from './middlewares/history';
import multer from 'multer';
import { multerConfig } from './config/multer';
import PictureController from './controllers/PictureController';

const router = Router();

router.post("/user", multer(multerConfig).single('profile'), UserController.create)
router.get("/user/:id", UserController.get)

router.post("/auth", AuthController.create)

router.post("/permissions", PermissionController.create)

router.post("/roles", RoleController.create)

router.get("/areas", UnderstandingAreaController.index)
router.post("/areas", UnderstandingAreaController.create)

router.get("/subjects", SubjectController.index)
router.get("/subjects/search/:name", SubjectController.search)
router.post("/subjects", SubjectController.create)

router.get("/modules", ModuleController.index)
router.get("/module/:id", storeHistory(), ModuleController.get)
router.post("/module", multer(multerConfig).single('image'), ModuleController.create)
router.post("/module/:id/rating", ModuleController.rating)
router.put("/module/:id", multer(multerConfig).single('image'), ModuleController.update)
router.delete("/module/:id",  ModuleController.delete)

router.get("/session/:id", SessionController.get)
router.post("/session", multer(multerConfig).single('thumbnail'), SessionController.create)
router.post("/session/:id/progress", SessionController.createProgress)

router.get("/question", QuestionController.index)
router.post("/question", QuestionController.create)

router.post("/test", TestController.create)

router.post("/usertest", UserTestController.create)

router.post("/picture", multer(multerConfig).single('image'), PictureController.create)

export { router };