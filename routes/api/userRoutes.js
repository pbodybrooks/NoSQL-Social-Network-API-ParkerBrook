const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// get all users, create new user 
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// get one user by, update user, delete user 
router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// add friend, remove friend
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;