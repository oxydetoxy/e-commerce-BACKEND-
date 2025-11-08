import { User } from "../models/user.js";
export const newUser = async (req, res, next) => {
    try {
        const { name, email, gender, _id, dob, photo, role } = req.body;
        const user = await User.create({
            name,
            email,
            gender,
            _id,
            dob,
            photo,
            role,
        });
        return res.status(200).json({
            success: true,
            message: `Welcome ${user.name}`,
        });
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unable to create Account",
        });
    }
};
