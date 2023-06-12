import nodemailer from "nodemailer";

export const sendTokenApplicant = async (email, message, token) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "daniel maya",
        pass: "dmnwi7jsUGTnMq9",
      },
    });

    await transport.sendMail({
      from: '"Fred Foo 👻" <danielahmedmaya@gmail.com>', // sender address
      to: email, // list of receivers
      subject: message, // Subject line
      html: `<a href="http://localhost:3000/api/v1/auth/confirm/${token}">Verifica tu cuenta aquí</a>`, // html body
    });
  } catch (error) {
    console.log(error);
    return json({ error: error.message });
  }
};

export const notifyBeekeeperRegister = async (email, tokenConfirm, message) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "acd337f29334da",
        pass: "7340dcac0169a4",
      },
    });

    await transport.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: message, // Subject line
      html: `<a href="http://localhost:3000/api/v1/auth/register/beekeeper">Registrarse</a>`, // html body
    });
  } catch (error) {
    return json({ error: error.message });
  }
};

export const notifyBeekeeperChangePassword = async (email, message) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "acd337f29334da",
        pass: "7340dcac0169a4",
      },
    });

    await transport.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: message, // Subject line
      html: `<a href="http://localhost:3000/api/v1/auth/profile/beekeeper">Cambiar contraseña</a>`, // html body
    });
  } catch (error) {
    return json({ error: error.message });
  }
}

export const notifyClientRegister = async (email, tokenConfirm, message) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "acd337f29334da",
        pass: "7340dcac0169a4",
      },
    });

    await transport.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: message, // Subject line
      html: `<a href="http://localhost:3000/api/v1/auth/register/client">Registrarse</a>`, // html body
    });

  } catch (error) {
    return json({ error: error.message });
  }
};
