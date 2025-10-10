import jwt from "jsonwebtoken";

const AdminAuth = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(403).json({message: "you are not authorized"});
        }
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) return res.status(403).json({ message: "you are not authorized" });
        const tokenDetails = await jwt.verify(bearerToken, process.env.JWT_SECRET);
        if(tokenDetails.role !== "admin") {
            return res.status(403).json({ message: "you are not authorized" });
        }
        req['sessionData'] = tokenDetails;
        console.log(tokenDetails);
        next();
    } catch (e) {
        console.error("Error at the admin middleware " + e);
        res.status(500).send({
            message: "internal server error"
        });
    }
}
export default AdminAuth;