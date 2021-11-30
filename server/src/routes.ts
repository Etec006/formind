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
router.delete("/user", UserController.delete);

router.post("/auth", AuthController.create);
router.get("/auth", AuthController.validate);

router.post("/permissions", is([roles.ADMIN]), PermissionController.create);

router.post("/roles", is([roles.ADMIN]), RoleController.create);

router.get("/areas", UnderstandingAreaController.index);
router.post("/areas", UnderstandingAreaController.create);

router.get("/subjects", SubjectController.index);
router.post("/subjects", SubjectController.create);

router.get("/modules", ModuleController.index);
router.get("/module/search/", ModuleController.search);
router.get("/module/search/:name", ModuleController.search);
router.get("/module/:id", storeHistory(), ModuleController.get);
router.post(
  "/module",
  multer(multerConfig).single("image"),
  ModuleController.create
);
router.post("/module/:id/rating", ModuleController.rating);
router.put(
  "/module/:id",
  multer(multerConfig).single("image"),
  ModuleController.update
);
router.delete("/module/:id", ModuleController.delete);

router.post(
  "/session",
  multer(multerConfig).single("thumbnail"),
  SessionController.create
);
router.get("/session/:id", SessionController.get);
router.post("/session/:id/progress", SessionController.createProgress);
router.put(
  "/session/:id",
  multer(multerConfig).single("thumbnail"),
  SessionController.update
);
router.delete("/session/:id", SessionController.delete);

//router.get("/question", QuestionController.index)
router.post("/question", QuestionController.create);
router.put("/question/:id", QuestionController.update);
router.delete("/question/:id", QuestionController.delete);

router.get("/test/:subjectId", TestController.get);
router.post("/test", TestController.create);

router.post("/usertest", UserTestController.create);

router.post(
  "/picture",
  multer(multerConfig).single("image"),
  PictureController.create
);

export { router };
