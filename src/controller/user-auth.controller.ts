import { Request, Response } from "express";
import {
  generateOtp,
  hashPassword,
  isEmailValid,
  isWeakpassword,
} from "@src/helpers/shared-variables";
import {
  ApiError,
  ApiResponse,
  AsyncHandler,
} from "@src/helpers/server-functions";
import { db } from "@src/db";
import { SendOtpTo } from "@src/libs/twilio";
import { getImageUrlFromCloudinary } from "@src/libs/cloudinary";

export class UserAuthController {
  // PHONE NUMBER VERIFICATION
  public static UserPhoneNumberVerify = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { contactNumber, termsAccepted } = req.body;

      if (!contactNumber) {
        throw new ApiError(400, "Contact number is required");
      }

      if (!termsAccepted) {
        throw new ApiError(400, "Please accept terms");
      }

      const existingUser = await db.usercontact.findFirst({
        where: { contactNumber },
      });

      if (existingUser) {
        throw new ApiError(409, "User already exists");
      }

      const userContact = await db.usercontact.create({
        data: {
          contactNumber,
          termsAccepted,
        },
      });

      if (userContact) {
        const otp = generateOtp();

        await SendOtpTo(userContact.contactNumber, otp);

        await db.otp.create({
          data: {
            otp,
            expireAt: new Date(Date.now() + 10 * 60 * 1000),
            usercontact: {
              connect: { id: userContact.id },
            },
          },
        });
      }

      res.json(new ApiResponse(200, "OTP SENT SUCCESSFULLY", userContact));
    }
  );

  // VERIFY OTP
  public static VerifyOtp = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { otp, contactId } = req.body;

      // Find the user by email address
      const userContactOtp = await db.otp.findUnique({
        where: { contactId },
      });

      if (!userContactOtp) {
        throw new ApiError(404, "USER NOT FOUND");
      }

      const currentTime = new Date();

      // Validate OTP expiration and correctness in a single block
      if (currentTime > userContactOtp.expireAt) {
        throw new ApiError(400, "OTP EXPIRED");
      }

      if (otp !== userContactOtp.otp) {
        throw new ApiError(400, "INVALID OTP");
      }

      await db.usercontact.update({
        where: { id: userContactOtp.contactId! },
        data: { verified: true },
      });

      res.status(200).json(new ApiResponse(200, "OTP VERIFIED SUCCESSFULLY"));
    }
  );

  // SIGN UP
  public static UserSignup = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const {
        fullname,
        email,
        password,
        groupInterest,
        groupInviteLink,
        groupName,
        groupPlatformName,
        groupCategory,
        groupPurpose,
        groupSince,
      } = req.body;

      const contactId = req.headers["contact-id"] as string;

      const requiredFields = {
        fullname,
        email,
        password,
        groupInterest,
        groupInviteLink,
        groupName,
        groupPlatformName,
        groupCategory,
        groupPurpose,
        groupSince,
      };

      if (Object.values(requiredFields).some((field) => !field)) {
        throw new ApiError(400, "All required fields must be provided.");
      }

      // Validate email format
      if (!isEmailValid(email)) {
        throw new ApiError(400, "Email is not valid");
      }

      // Validate password strength
      if (!isWeakpassword(password)) {
        throw new ApiError(400, "Password is weak");
      }

      // Check if email already exists
      const isEmailAlreadyExist = await db.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (isEmailAlreadyExist) {
        throw new ApiError(400, "Email already exists");
      }

      const hashedPassword = await hashPassword(password);
      let groupInfoImageUrl = await getImageUrlFromCloudinary(req?.file?.path!);

      if (!groupInfoImageUrl) {
        throw new ApiError(500, "Failed to upload group info image");
      }

      // Create User and Connect Group
      const newUser = await db.user.create({
        data: {
          fullname,
          email,
          password: hashedPassword,
          Groups: {
            create: {
              groupInterest,
              groupInviteLink,
              groupName,
              groupPlatformName,
              groupCategory,
              groupPurpose,
              groupSince: new Date(groupSince),
              groupInfoImage: groupInfoImageUrl,
            },
          },
          usercontact: {
            connect: {
              id: contactId,
            },
          },
        },
        include: {
          Groups: true,
        },
      });

      res.json(new ApiResponse(200, "Success", newUser));
    }
  );
}
