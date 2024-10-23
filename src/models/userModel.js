import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    phone: { type: String, required: true, unique: true }, // Fixed typo here
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
