import { getIdBK } from "../services/Beekeeper.service";
import { createProblem } from "../services/Problem.service";

export const reportTrouble = async (req, res) => {
    try {
        const { nameProb, description } = req.body;
        const idUser = req.uid;

        const idBK = await getIdBK(idUser);

        await createProblem(nameProb, description, idBK);

        res.status(200).json({ok: true});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}