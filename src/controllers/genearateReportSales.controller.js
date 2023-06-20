import { getIdBK } from "../services/Beekeeper.service.js";
import { getMonthSales } from "../services/Sale.service.js";

export const listMonthSales = async (req, res) => {
  try {
    const { month } = req.body;
    const idUser = req.uid;

    const { idBK } = getIdBK(idUser);
    const salesM = await getMonthSales(month, idBK);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
