import { ApplicantModel } from "../models/Applicant.model.js"
import nodemailer from "nodemailer";

export const getApplicant = (req, res) => {
    res.send("Getting applicants");
};

export const createApplicant = async (emailApplic) => {
    res.send("Creating applicants");
    const apply = await ApplicantModel.create();
    //
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "acd337f29334da",
          pass: "7340dcac0169a4"
        }
      });

      await transport.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: emailApplic, // list of receivers
        subject: "Verfica tu cuante de correo", // Subject line
        html: `<a href="http://localhost:3000/auth/confirm/${token}">Verifica tu cuante aquí</a>`, // html body
      });
};
const deleteApplicant = (req, res) => {};
const updateApplicant = (req, res) => {};
