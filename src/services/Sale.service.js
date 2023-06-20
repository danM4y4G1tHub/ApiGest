import { SaleModel } from "../models/Sale.model.js";
import { ProductModel } from "../models/Product.model.js";

export const createSale = async (lotProd, product) => {
  try {
    const sale = await SaleModel.create({
      lotProd,
      dateSale: new Date(),
    });
    await sale.addProducts(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMonthSales = async (month, idBK) => {
  try {
    const sales = await SaleModel.findAll({
      include: [
        { 
          model: ProductModel,
          attributes: ["nameProd", "price"],
          through: {
            attributes: ["idProd", "idSale"],
          },
        },
      ],
      where: {
        dateSale: {
          [Op.and]: [
            { [Op.gte]: new Date(new Date().getFullYear(), month, 1) },
            { [Op.lte]: new Date(new Date().getFullYear(), month + 1, 0) },
          ],
        },
      },
    });

    return await getDataSales(sales);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getDataSales = async (sales) => {
  try {
    const dataSales = sales.map((sale) => {
      const productsSales = sale.ProductModel.map((product) => {
        return {
          name: product.nameProd,
          price: product.price,
          lot: product.SaleModel.lotProd,
        };
      });
    });

    const benefit = productsSales.reduce((total, product) => {
      return total + product.lot * product.price;
    }, 0);

    return {
      products: productsSales,
      benefit: benefit,
    };
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// export const getYearlySales = async (year) => {};
