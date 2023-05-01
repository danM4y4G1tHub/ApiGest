import { createUser } from "../services/User.js";

// import {
//     createBeekeeper,
//     getBeekeeper,
//     deleteBeekeeper,
//     updateBeekeeper,
// } from "../services/Beekeeper.js";

// import {
//     createClient,
//     getClient,
//     updateClient,
//     deleteClient,
//     getClients,
// } from "../services/Client.js";

// import {
//     createManager,
//     getManager,
//     updateManager,
//     deleteManager,
// } from "../services/Manager.js";

// validarDatosUsuario, confirmarUsuario, registrarUsuario, crearSessionUsuario

export const registerUser = (req, res) => {
    console.log(req.body);
    res.json({ ok: "Registrar"});
}

// comprobarAccesoInvitado, crearUsuarioRolInvitado, cargarSessionInvitado
export const guestUser = async (req, res) => {
    const create = await createUser;
    res.json(create);
}

// validarDatosUsuario, confirmarUsuario, modificarUsuario
export const changePasswordUser = (req, res) => {
    console.log(req.body);
    res.json({ ok: "Cambiar Contraseña"});
}

// validarDatosUsuario, autenticarUsuario, cargarSessionUsuario
export const authUser = (req, res) => {
    console.log(req.body);
    res.json({ ok: "Login"});
};