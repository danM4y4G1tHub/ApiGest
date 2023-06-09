import { getAllsIdApplicants } from "../services/Solicitude.service.js";

//cargarOfertas, mostrarDatosOferta, agregarCarritoCompras
export const listOffers = async (req, res) => {
    try {
        const { provApplic, munApplic, nameProd } = req.body;
        const offers = await getAllsIdApplicants(provApplic, munApplic);
        getAllsByProduct(nameProd).then( beekeeper => {
            return 
        } );
        
        res.status(200).json();
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

//buscarUsuarioPedido, cargarPedidos, calcularImporte, modificarPedido, eliminarpedido, validarUsuarioRegistrado, aceptarPedido
//agregarPedido al apicultor