import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true }
}, {
    timestamps: true
});

const User = mongoose.model("portfolioUser", userSchema);

export default User;