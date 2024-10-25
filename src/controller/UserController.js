import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const userdata = await userModel.findOne({ $or: [{ email: email }, { phone: email }] })
        if (!userdata) {
            res.json({ result: false, message: "user Not Found" })
        }

        const isuserMatch = bcrypt.compare(password, userdata.password)

        if (!isuserMatch) {
            res.json({ result: false, message: "password Mismatch" })
        }
        res.json({ result: true, message: userdata})

    } catch (error) {
        res.json({ result: false, message: "Login failure" })
    }

}

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:5000', // Change to your backend URL
//     timeout: 10000, // 10 seconds timeout
// });

const signin = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        // Check if all required fields are provided
        if (!name || !email || !password || !phone) {
            return res.status(200).json({ result: false, message: "Kindly provide all data" });
        }

        // Check if the email already exists
        const isEmailExist = await userModel.findOne({ email });
        const isPhoneExist = await userModel.findOne({ phone });
        if (isEmailExist) {
            return res.status(200).json({ result: false, message: "Email is already registered" });
        }
        if (isPhoneExist) {
            return res.status(200).json({ result: false, message: "Number is already registered" });
        }
        // Check is Contect number
        if (!phone || !isPhoneNumber(phone)) {
            return res.status(200).json({ result: false, message: `Provide a valid phone number` });
        }

        // Check is password Strong or Week
        if (password.length < 8) {
            return res.status(200).json({ result: false, message: `Provide a strong password` });
        }

        const salt = await bcrypt.genSalt(10)
        const hasedpass = await bcrypt.hash(password, salt)

        const userdata = new userModel({
            username: name,
            email: email,
            phone: phone,
            password: hasedpass
        })
        const user = await userdata.save();
        // If everything is good, you can create User Account
        return res.json({ result: true, message: user })


    } catch (error) {
        return res.status(200).json({ result: false, message: "Signin failure" });
    }
}

const isPhoneNumber = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Basic international format
    return phoneRegex.test(phone);
};



export { login, signin }