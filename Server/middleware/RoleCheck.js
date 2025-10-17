import jwt from "jsonwebtoken";

const RoleCheck = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(403).json({message: "you are not authorized"});
        }
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) return res.status(403).json({ message: "you are not authorized" });
        const tokenDetails = await jwt.verify(bearerToken, process.env.JWT_SECRET);
        const path=req.path.split("/");
        if(path.length >= 2 && path[1] === 'api' && (path[2] === 'admin' || path[2] === 'user')){
            if(path[2] === tokenDetails.role ) {
                req['sessionData'] = tokenDetails;
                next();
            } else {
                return res.status(403).json({message: "you are not authorized"});
            }
        } else {
            next();
        }
    } catch (e) {
        console.error("Error at the admin middleware " + e);
        res.status(500).send({
            message: "internal server error"
        });
    }
}
export default RoleCheck;