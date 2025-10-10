import express from 'express';
import Admin from '../models/Admin.js';
import Student from '../models/Students.js';
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    try {
        const {role, login, password} = req.body;
        if (role === 'admin') {
            const admin = await Admin.findOne({
                $or: [{phone: login}, {email: login}],
            });
            if (admin && admin.comparePassword(password)) {
                const token = jwt.sign({
                    role: 'admin',
                    id: admin._id,
                },process.env.JWT_SECRET);
                res.json({token: token, role: role});
            } else {
                res.status(401).json({message: 'Invalid login or password'});
            }
        } else if (role === 'user') {
            const student = await Student.findOne({
                $or: [{phone: login}, {email: login}],
            });
            if (student && student.password === password) {
                const token = jwt.sign({
                    role: 'admin',
                    id: student._id,
                })
                res.json({token: token, role: role});
            } else {
                res.status(401).json({message: 'Invalid login or password'});
            }
        } else {
            res.status(401).send('Not authorized');
        }
    } catch (e) {
        console.error("Error occurred while login " + e);
        res.status(500).send({
            error: e.message,
            message: 'Internal Server Error',
        })
    }
});

export default authRouter;


