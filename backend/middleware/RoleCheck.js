import jwt from "jsonwebtoken";

const RoleCheck = async (req, res, next) => {
    try {
        const path = req.path.split("/");
        if(path.length >= 3 && path[1] === 'api' && (path[2] === 'admin' || path[2] === 'user')){
            const token = req.cookies.token;
            console.log(token);

            if (!token) {
                return res.status(401).json({message: "Not authorized: No token found"});
            }
            const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);
            if(path[2] === tokenDetails.role ) {
                req['sessionData'] = tokenDetails;
                next();
            } else {
                return res.status(403).json({message: "Not authorized: Role mismatch"});
            }
        } else {
            next();
        }
    } catch (e) {
        if (e.name === 'JsonWebTokenError' || e.name === 'TokenExpiredError') {
            res.clearCookie('token');
            return res.status(401).json({ message: "Invalid or expired session" });
        }

        console.error("Error at the admin middleware " + e);
        res.status(500).send({
            message: "internal server error"
        });
    }
}

export default RoleCheck;