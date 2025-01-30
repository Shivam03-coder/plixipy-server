import passport from "passport";
import { UserAuthController } from "@src/controller/user-auth.controller";
import { GetnewToken } from "@src/middleware/setnewtoken.middleware";
import { Router } from "express";

export const AppRouter = Router();

AppRouter.route("/contact-verify").post(
  UserAuthController.UserPhoneNumberVerify
);
