import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { data } from './data';
import User from './models/userModel';
import { generateToken, isAdmin } from './utils';
import messages from './messages';
import bcrypt from 'bcrypt';

const userRouter = express.Router();

// use Postman 바로 url 로 유저 생성 admin 생성하면된다
// userRouter.post('/seed', expressAsyncHandler(async (req, res) => {
//     const createUser = await User.insertMany(data.admin);
//     res.send({ createUser });
// }))

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    console.log("signin 들어옴")

    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(401).send({ message: messages.INVALID_EMAIL })
    }

    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) {
        return res.status(401).send({ message: messages.INVALID_PASSWORD })
    }

    const token = await generateToken(user);
    console.log('token ==>> ', token)

    if (token) {
        res.cookie("portfolio_acc", token, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            domain: "localhost",
        });
        res.send({
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404).send(messages.INVALID_TOKEN);
    }



    res.status(200).send("Hello Hong")
}));

userRouter.get('/signout', expressAsyncHandler(async (req, res) => {
    res.clearCookie("portfolio_acc");
    res.status(200).send({ message: "Successfully logged out" })
}))

export default userRouter;