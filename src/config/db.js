import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log(`Database Connected`)
    })
    await mongoose.connect(`${process.env.SPOTIFY_URI}/spotify`)
}
export default connectDB