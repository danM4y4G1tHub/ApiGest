import {
  getUser,
  getUsersApplicants,
  setState,
} from "../services/User.service.js";

export const listApplicants = async (req, res) => {
  try {
    const { rol } = req.params;
    const applics = await getUsersApplicants(rol);

    res.status(200).json(applics);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const processCertificates = async (req, res) => {
  try {
    const { idUser, state } = req.body;
    await setState(idUser, state);
    if ((await getUser(idUser)) == null)
      res.status(400).json({ message: "No existe ese usuario." });
    res.status(200).json(await setState(idUser, state));
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//cargarDashBoard
//llenarTablaUsuarios,
