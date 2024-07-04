import attendanceModel from "../models/attendance.model";

export const getAttendance = async (req, res) => {
    try {
        const { id } = req.existUser;
        console.log("useridddd", id)
        const attendance = await attendanceModel.find({ userID: id });
        if (attendance) {
            return res.status(200).json({
                data: attendance,
                message: "Data fetched successfully"
            })
        }

        return res.status(400).json({ message: "Bad request" })
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }

}

//for sign-in

export const createsignIn = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const { date, signIn } = req.body;

        if (!req.existUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const { _id: id } = req.existUser;
        const saveSignIn = new attendanceModel({
            userID: id,
            date: date,
            signIn: signIn,
        });

        await saveSignIn.save();
        if (saveSignIn) {
            return res.status(201).json({
                data: saveSignIn,
                message: "SignIn success"
            });
        }

        return res.status(400).json({ message: "Bad Request" });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const createSignOut = async (req, res) => {
    try {
        
        console.log("signouttt", req.body)
        const { signOutTime, userID } = req.body;

        const updated = await attendanceModel.updateOne({_id:userID},{$set:{"signOut":signOutTime}});
        // const updateAtt = await attendanceModel.updateOne({ _id: userID }, {
        //     $set: {

        //         signOut: signOut
        //     }
        // })

        console.log(updated)
        if (updated.acknowledged) {
            return res.status(200).json({
                message: "SignOut"
            })
        }

        return res.status(400).json({ message: "Bad request" })

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}




export const getsingleAttendance = async (req, res) => {
    try {
        const userID = req.params.user_id;
        const attendance = await attendanceModel.find({ userID: userID });
        console.log("atendance", attendance)
        if (attendance) {
            return res.status(200).json({
                data: attendance,
                message: "Data fetched successfully"
            })
        }

        return res.status(400).json({ message: "Bad request" })
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }

}
