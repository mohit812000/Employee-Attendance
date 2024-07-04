import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        if (users) {
            return res.status(200).json({
                data: users,
                message: "Data fetched successfully"
            })
        }

        return res.status(400).json({ message: "Bad request" })
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }

}


export const addUser = (req, res) => {
    try {
        const { name, email, password, contact} = req.body;
        const add_user = new userModel({
            name: name,
            email: email,
            password: password,
            contact: contact,
            

        })

        add_user.save();

        if (add_user) {
            return res.status(201).json({
                data: add_user,
                message: "User added successfully!"
            })
        }

        return res.status(400).json({ message: "Bad request" })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}


export const getUser = async (req, res) => {
    try {
        const userid = req.params.user_id;
        const user = await userModel.findOne({ userID: userid });
        if (user) {
            return res.status(200).json({
                data: user,
                message: "fetched"
            })
        }

        return res.status(400).json({ message: "Bad request" })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

export const updateUser = async (req, res) => {
    try {
        const userID = req.params.user_id;
        const { name, email, password, contact, date, signIn, signOut } = req.body;
        const editUser = await userModel.updateOne({ _id: userID }, {
            $set: {
                name: name,
                email: email,
                password: password,
                contact: contact,
               
            }
        })

        if (editUser.acknowledged) {
            return res.status(200).json({ message: "Updated" })

        }
        return res.status(400).json({ message: "Bad Request" })

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}


export const deleteUser = async (req, res) => {
    try {
        const userID = req.params.user_id;
        const deleteUser = await userModel.deleteOne({ _id: userID });
        if (deleteUser) {
            return res.status(200).json({
                message: "Deleted!"
            })
        }

        return res.status(400).json({ message: "Bad request" })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}




//signup
export const signUp = async (req, res) => {
    try {
        const { name, email, password,contact } = req.body;
        const existUser = await userModel.findOne({ email: email });
        if (existUser) {
            return res.status(200).json({
                message: "User already exist"
            })
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        console.log(password, hashedPassword)

        const saveUser = await userModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            contact:contact
        });

        if (saveUser) {
            return res.status(201).json({
                message: "SignUp Successfully"
            })
        }
        return res.status(400).json({
            message: "Bad Request"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}


//login

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await userModel.findOne({ email: email });
        if (!existUser) {
            return res.status(200).json({
                message: "User doesn't exist"
            })
        }

        const checkPassword = bcrypt.compareSync(password, existUser.password);
        if (!checkPassword) {
            return res.status(200).json({
                message: "Invalid Credential"
            })
        }

        const token = jwt.sign(
            {
                _id: existUser._id,
                email: existUser.email,

            },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "10h" },
        )

        console.log("tokennnnn", token);
        return res.status(200).json({
            data: existUser,
            token: token,
            message: "Login successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });

    }

}
