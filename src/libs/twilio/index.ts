import { appEnvConfigs } from "@src/configs";
import { Twilio } from "twilio";

export const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const SendOtpTo = async (to: string, otp: string) => {
  const message = `Your OTP is: ${otp}. Do not share it with anyone.`;
  try {
    const response = await client.messages.create({
      body: message,
      from: appEnvConfigs.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log(`OTP sent: ${otp}, SID: ${response.sid}`);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};
