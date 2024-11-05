import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
// import session from 'express-session';

const createToken = (email, password) => {
    return jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const tokenVerify = async (req, res) => {
    try {
        // 
        const token = req.session.token;
        // console.log(req.session.token)
        if (!token) {
            return res.json({ result: false, message: "Token Missing. Kindly Login." });
        }

        // Token Verification
        const Token_verified = await jwt.verify(token, process.env.JWT_SECRET);

        if (Token_verified.email) {
            try {
                const userdata = await userModel.findOne({ email: Token_verified.email });
                if (!userdata) {
                    return res.json({ result: false, message: "User Not Found." });
                }

                // Compare hashed password
                //const isUserMatch = await bcrypt.compare(Token_verified.password, userdata.password);  Await the comparison
                const isUserMatch = Token_verified.password ===  userdata.password
                if (!isUserMatch) {
                    return res.json({ result: false, message: "Password Mismatch." });
                }

                // Send success response
                return res.json({ result: true, message: userdata, token: token });
            } catch (error) {
                return res.json({ result: false, message: "Authorization failed." });
            }
        }

        return res.status(200).json({ result: true, data: { email: Token_verified.email } }); // Removed password from response
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.json({ result: false, message: "Token expired. Kindly login." });
        }
        return res.json({ result: false, message: "Token invalid. Kindly login." });
    }
};

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
        const token = createToken(userdata.email, userdata.password)

        req.session.token = token;
        res.json({ result: true, message: userdata, token: token })

    } catch (error) {
        res.json({ result: false, message: "Login failure" })
    }

}

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



export { login, signin, tokenVerify }