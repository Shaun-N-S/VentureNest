import { CONFIG } from "@config/config";
import { IBaseEmailTemplate } from "domain/interfaces/services/IEmail/IBaseEmailTemplate";
import { IEmailService } from "domain/interfaces/services/IEmail/IEmailService";
import nodemailer from "nodemailer";

export class EmailService implements IEmailService {
  private _transporter: nodemailer.Transporter;
  constructor() {
    this._transporter = nodemailer.createTransport(
      {
        service: "gmail",
        auth: {
          user: CONFIG.GOOGLE_MAIL,
          pass: CONFIG.GOOGLE_APP_PASSWORD,
        },
      },
      {
        from: CONFIG.GOOGLE_MAIL,
      }
    );

    this._transporter
      .verify()
      .then(() => console.log("Gmail service connection establised"))
      .catch((err) => console.error("Gmail connection failed:", err));
  }

  async sendEmail(email: Required<IBaseEmailTemplate>): Promise<void> {
    try {
      console.log(`Email sent to ${email.receiverEmail}`);
      await this._transporter.sendMail({
        to: email.receiverEmail,
        subject: email.subject,
        html: email.content,
      });
    } catch (error) {
      console.error("Error in sending mail", error);
      throw error;
    }
  }
}
