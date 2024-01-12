const UserInfoModel = require("../models/User");

class AuthController {
    // [POST] /auth/signUp
    async signUp(req, res) {
        try {
            const { email } = req.body;

            const existingUser = await UserInfoModel.findOne({ email });

            if (existingUser) {
                return res.status(200).json(existingUser);
            } else {
                const newUser = await UserInfoModel.create(req.body);
                newUser.save();
                return res.status(200).json(newUser);
            }
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getUserInfo(req, res) {
        try {
            const { email } = req.body;

            const existingUser = await UserInfoModel.findOne({ email });

            if (existingUser) {
                return res.status(200).json(existingUser);
            } else {
                return res.status(200).json({});
            }
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async signIn(req, res, next) {
        try {
            const token = await encodedJWT(req.user._id);
            res.setHeader("Authorization", "Bearer " + token);
            return res.status(200).json({ message: "Đăng nhập thành công" });
        } catch (error) {
            console.error(error);
        }
    }

    async secret(req, res, next) {
        try {
            return res.status(200).json({ message: "Confirm token" });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AuthController();
