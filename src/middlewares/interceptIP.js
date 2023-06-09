export const interceptIPUser = async(req, res, next) => {
    try {
        console.log(req.connection);
        console.log(req.headers);
    } catch (error) {
        
    }
} 