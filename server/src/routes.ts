import { Router } from "express";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import PermissionController from "./controllers/PermissionController";
import RoleController from "./controllers/RoleController";
import UnderstandingAreaController from "./controllers/UnderstandingAreaController";
import SubjectController from "./controllers/SubjectController";
import ModuleController from "./controllers/ModuleController";
import SessionController from "./controllers/SessionController";
import QuestionController from "./controllers/QuestionController";
import TestController from "./controllers/TestController";
import UserTestController from "./controllers/UserTestController";

import { is } from "./middlewares/permission";
import { storeHistory } from "./middlewares/history";
import multer from "multer";
import { multerConfig } from "./config/multer";
import PictureController from "./controllers/PictureController";
import { roles } from "./enums/roles";

const router = Router();

router.get("/user/", is([roles.DEFAULT]), UserController.get);
router.get("/user/:id", is([roles.DEFAULT]), UserController.getById);
router.post("/user", UserController.create);
router.post("/user/promote", is([roles.DEFAULT]), UserController.promote);
router.put(
  "/user",
  is([roles.DEFAULT]),
  multer(multerConfig).single("profile"),
  UserController.update
);
router.delete("/user", is([roles.DEFAULT]), UserController.delete);

router.post("/auth", AuthController.create);
router.get("/auth", is([roles.DEFAULT]), AuthController.validate);

router.post("/permissions", is([roles.ADMIN]), PermissionController.create);

router.post("/roles", is([roles.ADMIN]), RoleController.create);

router.get("/areas", is([roles.DEFAULT]), UnderstandingAreaController.index);
router.get("/area/:id", is([roles.DEFAULT]), UnderstandingAreaController.get);
router.post("/areas", is([roles.ADMIN]), UnderstandingAreaController.create);

router.get("/subjects", is([roles.DEFAULT]), SubjectController.index);
router.post("/subjects", is([roles.ADMIN]), SubjectController.create);

router.get("/modules", is([roles.DEFAULT]), ModuleController.index);
router.get("/module/search/", is([roles.DEFAULT]), ModuleController.search);
router.get("/module/search/:name", is([roles.DEFAULT]), ModuleController.search);
router.get("/module/:id", is([roles.DEFAULT]), storeHistory(), ModuleController.get);
router.post(
  "/module",
  is([roles.PRODUCER]),
  multer(multerConfig).single("image"),
  ModuleController.create
);
router.post("/module/:id/rating", is([roles.DEFAULT]), ModuleController.rating);
router.put(
  "/module/:id",
  is([roles.PRODUCER]),
  multer(multerConfig).single("image"),
  ModuleController.update
);
router.delete("/module/:id", ModuleController.delete);

router.post(
  "/session",
  is([roles.PRODUCER]),
  multer(multerConfig).single("thumbnail"),
  SessionController.create
);
router.get("/session/:id", is([roles.DEFAULT]), SessionController.get);
router.post("/session/:id/progress", is([roles.DEFAULT]), SessionController.createProgress);
router.put(
  "/session/:id",
  is([roles.PRODUCER]),
  multer(multerConfig).single("thumbnail"),
  SessionController.update
);
router.delete("/session/:id", is([roles.PRODUCER]), SessionController.delete);

//router.get("/question", QuestionController.index)
router.post("/question", is([roles.PRODUCER]), QuestionController.create);
router.put("/question/:id", is([roles.PRODUCER]), QuestionController.update);
router.delete("/question/:id", is([roles.PRODUCER]), QuestionController.delete);

router.get("/test/:subjectId", is([roles.DEFAULT]), TestController.get);
router.post("/test", is([roles.ADMIN]), TestController.create);

router.get("/usertest/:id", is([roles.DEFAULT]), UserTestController.get);
router.post("/usertest", is([roles.DEFAULT]), UserTestController.create);

router.post(
  "/picture",
  multer(multerConfig).single("image"),
  PictureController.create
);

export { router };
