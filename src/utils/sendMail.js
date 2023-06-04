export const sendEmail = async (email, token) => {
    try {
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
            to: email, // list of receivers
            subject: "Verfica tu cuenta de correo", // Subject line
            html: `<a href="http://localhost:3000/auth/confirm/${token}">Verifica tu cuenta aquí</a>`, // html body
          });
    } catch (error) {
        return json({error: error.message});
    }
}