import express from 'express';
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

const authRouter = express.Router();

authRouter.post('/api/login', async (req, res) => {
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
                }, process.env.JWT_SECRET,{ expiresIn: '1000m' });
                res.json({token: token, role: role});
            } else {
                res.status(401).json({message: 'Invalid login or password'});
            }
        } else if (role === 'user') {
            const user = await User.findOne({
                $or: [{phone: login}, {email: login}],
            });
            if (user && user.comparePassword(password)) {
                const token = jwt.sign({
                    role: 'user',
                    id: user._id,
                },process.env.JWT_SECRET,{ expiresIn: '1000m' })
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

authRouter.post('/api/signup', async (req, res) => {
   try {
       const {email, password,name,phone} = req.body;
       const check = await User.findOne({
           $or: [
               { email: email },
               { phone: phone }
           ]
       });

       if (check) {
           return res.status(400).json({message: 'email or phone already exists'});
       }

       const user = await User.insertOne({
           email,
           password,
           name,
           phone
       });

       return res.json({
           message: 'User successfully created!',
           id: user.id,
       });
   } catch (e) {
       console.error("Error occurred while login " + e);
       res.status(500).send({
           error: e.message,
           message: 'Internal Server Error',
       })
   }
});

export default authRouter;


