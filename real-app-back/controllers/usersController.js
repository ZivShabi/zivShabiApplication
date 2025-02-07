
//../controllers/usersController.js
const UserService = require('../services/userService')
const User = require('../models/user')

async function registerUser(req, res, next) {
    try {
        const user = await UserService.registerNewUser(req.body, next)
        res.status(201).json({
            message: 'user registered successfully', user
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function loginUser(req, res, next) {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: 'email and password are required'
        })
    }
    try {
        const user = await UserService.validateUser(email, password, next)
        if (!user) { return }
        const token = UserService.generateAuthToken(user)
        res.json({
            token, user
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updatePassword(req, res) {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        return res.status(400).json({
            message: 'both old and new passwords are required'
        })
    }
    try {
        const result = await UserService.updatePassword(req.user._id, oldPassword, newPassword)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


async function getUser(req, res,) {
    try {
        const user = await UserService.getUserById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateUser(req, res,) {
    try {
        const user = await UserService.updateDataUser(req.params.id, req.body)
        res.status(200).json({
            message: "user updated successfully", user
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteUser(req, res,) {
    try {
        await UserService.deleteUserID(req.params.id)
        res.status(200).json({
            message: "user deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function changeBizNumber(req, res) {
    try {
        const { id } = req.params
        const { bizNumber } = req.body
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'access denied' })
        }
        const updatedUser = await User.updateBizNumber(id, bizNumber)
        res.json({
            message: 'business number updated successfully', updatedUser
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
async function updateUserImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const userId = String(req.user.id);
        const paramId = String(req.params.id);
        if (userId !== paramId) {
            return res.status(403).json({ message: "You are not allowed to change this profile image" });
        }
        const updatedUser = await UserService.updateImage(paramId, req.file);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Profile image updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function getUsersToAdmin(req, res) {
    try {
        if (req.user.role != "admin") {
            throw new Error("not is admin ")
        }
        const users = await User.getAllUsers()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getFriendsList(req, res) {
    try {
        const user = await User.findById(req.user._id)
            .populate('friends', 'name email role isBusiness address')

        res.status(200).json({ friends: user.friends });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    registerUser, loginUser, getUser, updateUser, deleteUser, changeBizNumber, getUsersToAdmin, updatePassword, updateUserImage, getFriendsList
}

