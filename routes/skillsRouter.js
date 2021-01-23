import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Skills from '../models/skillsModel';
import { isAdmin } from '../utils';
import multer from 'multer';
// import { skills } from '../data';

const skillsRouter = express.Router();

// skillsRouter.post('/seed/skills', expressAsyncHandler(async (req, res) => {
//     const createdSkills = await Skills.insertMany(skills);
// }))

skillsRouter.get('/skills', expressAsyncHandler(async (req, res) => {
    const skills = await Skills.find({});
    // console.log('skills == >> ', skills)
    if (!skills) {
        return res.status(500).send({ message: "Something error to get skills" });
    }
    res.status(200).send(skills);
}));






// 사진 비디오 파일 요청 받고 저장
const storage = multer.diskStorage({
    destination: "./public/uploads/skills",
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    },
})

const upload = multer({ storage: storage }).single("image");

skillsRouter.post('/skills/save', upload, expressAsyncHandler(async (req, res) => {
    console.log('데이터 받아옴 ==>> ', req.body.saveSkill)
    console.log('파일 업로드 하는곳으로 들어옴');
    console.log(req.file);
    // upload(req, res, err => {
    //     if (err) { return res.json({ success: false, err }) }
    //     console.log('path: ' + req.file.path);
    //     return res.json({ success: true, url: res.req.file.path, fileName: req.file.filename });
    // });
    const { skillName, link, category, imgSrc } = JSON.parse(req.body.saveSkill);
    const skill = new Skills({
        skillName,
        link,
        category,
        imgSrc,
    });
    try {
        const createdSkill = await skill.save();
        res.status(200).send({ message: "Skill Saved.", skill: createdSkill })
    } catch (error) {
        console.log(err);
        res.status(500).send(err.message);
    }

}))










export default skillsRouter;