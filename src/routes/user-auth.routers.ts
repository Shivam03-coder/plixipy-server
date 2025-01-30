import { UserAuthController } from "@src/controller/user-auth.controller";
import { Router } from "express";
import { upload } from "@src/middleware/file-upload.middleware";
import { GetnewToken } from "@src/middleware/setnewtoken.middleware";
import passport from "passport";

export const AppRouter = Router();

AppRouter.route("/contact-verify").post(
  UserAuthController.UserPhoneNumberVerify
);
AppRouter.route("/otp-verify").post(UserAuthController.VerifyOtp);

AppRouter.route("/user-signup").post(
  upload.single("file"),
  UserAuthController.UserSignup
);

AppRouter.route("/user-login").post(UserAuthController.UserLogin);

// PROTECTED ROUTES
AppRouter.route("/user-profile").get(
  GetnewToken,
  passport.authenticate("jwt", { session: false }),
  UserAuthController.GetUserProfile
);
