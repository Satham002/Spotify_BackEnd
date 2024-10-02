import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log(`Database Connected ${process.env.SPOTIFY_URI}/spotify`)
    })
    await mongoose.connect(`${process.env.SPOTIFY_URI}/spotify`)
}
export default connectDB