import { UserAuthController } from "@src/controller/user-auth.controller";
import { Router } from "express";
import { upload } from "@src/middleware/file-upload.middleware";

export const AppRouter = Router();

AppRouter.route("/contact-verify").post(
  UserAuthController.UserPhoneNumberVerify
);
AppRouter.route("/otp-verify").post(UserAuthController.VerifyOtp);

AppRouter.route("/user-signup").post(
  upload.single("file"),
  UserAuthController.UserSignup
);
