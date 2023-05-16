export const registerSolicitude = (req, res) => {
    try {
        res.render("formSolicitude");
    } catch (error) {
        res.send(error);
    }
}