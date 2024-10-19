import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
});

const Photo = mongoose.model("Photo", PhotoSchema);

export default Photo;