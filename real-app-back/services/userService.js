

//../services/userService.js
const jwt = require("jsonwebtoken")
const config = require("config")
const User = require('../models/user')
err = require('../middlewares/errorMiddleware')
UserServiceUtils = require('../services/userServiceUtils')

async function registerNewUser(data) {
    const { name, email, password, isBusiness, address, image } = data
    console.log(address, image)
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
        return err.StringErrEmail()
    }
    const hashedPassword = await User.hashPassword(password)
    if (!hashedPassword) {
        err.stringErrPassword()
    }
    const user = new User({
        image,
        address,
        name,
        email,
        password: hashedPassword,
        isBusiness
    })
    return await user.saveUser()
}

async function validateUser(email, password) {
    const user = await User.findEmailPassword(email)
    if (!user) {
        err.StringErrEmailOrPassword()
    }
    const isPasswordValid = await User.comparePassword(user, password)
    if (!isPasswordValid) {
        await UserServiceUtils.handleFailedLogin(user)
        err.StringErrEmailOrPassword()
    }
    if (UserServiceUtils.isUserBlocked(user)) {
        err.StringErrBlocked()
    }
    await UserServiceUtils.resetLoginAttempts(user)
    return user
}

function generateAuthToken(user) {
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        isBusiness: user.isBusiness,
        role: user.role,
        image: user.image,
        address: user.address,

        iat: Date.now()
    }, config.get("jwtKey"), { expiresIn: '1h' })
    return token
}


async function getUserById(id) {
    const user = await User.findById(id)
    if (!user) {
        err.StringErrUser()
    }
    return user
}

async function updateDataUser(id, updateFields) {
    return await User.updateData(id, updateFields)
}

async function deleteUserID(id) {
    const user = await User.findByIdAndDelete(id)
    if (!user) {
        err.StringErrUser()
    }
}

async function updatePassword(userId, oldPassword, newPassword) {
    try {
        return await User.changePassword(userId, oldPassword, newPassword)
    } catch (error) {
        throw new Error(error.message)
    }
}



async function updateImage(id, imageUrl) {
    const user = await User.findById(id)
    if (!user) {
        StringErrUser()
    }
    user.profileImage = imageUrl
    return await user.save()
}

// ../services/userService.js

// async function sendFriendRequest(senderId, receiverId) {
//     const sender = await User.findById(senderId);
//     const receiver = await User.findById(receiverId);

//     if (!sender || !receiver) {
//         throw new Error('Sender or Receiver not found');
//     }
//     console.log("Receiver's friend requests: ", receiver.friendRequests);

//     // if (receiver.friendRequests.includes(senderId)) {
//     //     return res.status(200).json({ message: 'Friend request already sent' });
//     // }

//     if (receiver.friendRequests.includes(senderId)) {
//         throw new Error('Friend request already sent');
//     }



//     receiver.friendRequests.push(senderId);
//     sender.sentFriendRequests.push(receiverId);  // עדכון בבקשות שנשלחו

//     await receiver.save();
//     await sender.save();

//     return { senderId, receiverId };
// }
async function sendFriendRequest(senderId, receiverId) {
    if (senderId === receiverId) {
        throw new Error("You cannot send a friend request to yourself");
    }

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
        throw new Error('Sender or Receiver not found');
    }

    if (receiver.friendRequests.includes(senderId)) {
        throw new Error('Friend request already sent');
    }

    if (receiver.friends.includes(senderId)) {
        throw new Error('You are already friends');
    }

    receiver.friendRequests.push(senderId);
    sender.sentFriendRequests.push(receiverId);

    await receiver.save();
    await sender.save();

    return { senderId, receiverId };
}

// async function acceptFriendRequest(senderId, receiverId) {
//     const sender = await User.findById(senderId);
//     const receiver = await User.findById(receiverId);

//     if (!sender || !receiver) {
//         throw new Error('Sender or Receiver not found');
//     }

//     console.log("Sender:", sender);
//     console.log("Receiver:", receiver);
//     console.log("Receiver's Friend Requests:", receiver.friendRequests);  // הוספת לוג להדפסת בקשות החברות


//     // בדיקה אם יש בקשת חברות
//     if (!receiver.friendRequests.includes(senderId)) {
//         throw new Error('Friend request not found');
//     }
//     if (!receiver.friendRequests.some(id => id.toString() === senderId.toString())) {
//         throw new Error('Friend request not found');
//     }

//     // הוספת החברים לרשימת החברים ההדדית
//     sender.friends.push(receiverId);
//     receiver.friends.push(senderId);

//     // הסרת הבקשה מרשימת הבקשות
//     receiver.friendRequests = receiver.friendRequests.filter(id => id.toString() !== senderId.toString());

//     await sender.save();
//     await receiver.save();

//     return { sender, receiver };
// }
async function acceptFriendRequest(senderId, receiverId) {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
        const error = new Error('Sender or Receiver not found');
        error.status = 404;
        throw error;
    }

    // בדיקה שהמשתמש שמנסה לאשר הוא באמת המקבל
    if (!receiver.friendRequests.includes(senderId)) {
        const error = new Error('Friend request not found or already processed');
        error.status = 403;
        throw error;
    }

    // הוספת חברים אם הם עדיין לא חברים
    if (!sender.friends.includes(receiverId)) {
        sender.friends.push(receiverId);
    }

    if (!receiver.friends.includes(senderId)) {
        receiver.friends.push(senderId);
    }

    // הסרת הבקשה מהמערך של בקשות
    receiver.friendRequests = receiver.friendRequests.filter(id => id.toString() !== senderId.toString());

    await sender.save();
    await receiver.save();

    return { sender, receiver };
}



// ביטול בקשת חברות שנשלחה
async function cancelFriendRequest(senderId, receiverId) {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
        throw new Error('Sender or Receiver not found');
    }

    // אם לא נשלחה בקשה
    if (!sender.sentFriendRequests.includes(receiverId)) {
        throw new Error('No sent friend request found');
    }

    // הסרת בקשה שנשלחה
    sender.sentFriendRequests = sender.sentFriendRequests.filter(id => id.toString() !== receiverId.toString());
    receiver.friendRequests = receiver.friendRequests.filter(id => id.toString() !== senderId.toString());

    await sender.save();
    await receiver.save();
}



module.exports = {
    generateAuthToken, registerNewUser, validateUser, updatePassword, updateImage, getUserById, deleteUserID, updateDataUser, sendFriendRequest, cancelFriendRequest, acceptFriendRequest
}


