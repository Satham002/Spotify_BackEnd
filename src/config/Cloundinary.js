import { v2 as cloudinary } from 'cloudinary'


const Connect_cloudinary = async () => {

    try {
        await cloudinary.config({
            cloud_name: process.env.CLOUDINARY,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        })
    }
    catch (error) {
        console.log()
    }

}

export default Connect_cloudinary;