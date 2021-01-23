import mongoose from 'mongoose';

const skillsSchema = new mongoose.Schema({
    category: { type: String, required: true },
    skillName: { type: String, required: true },
    imgSrc: { type: String, required: true },
    link: { type: String, required: true },
});

const Skills = mongoose.model("skills", skillsSchema);

export default Skills;