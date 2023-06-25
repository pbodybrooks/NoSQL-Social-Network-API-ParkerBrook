const { User, Thought } = require('../models');

const userController = {
    
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one user by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })   
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create a user
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // update a user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }

                // remove user from friends arrays
                User.updateMany(
                    { _id: { $in: dbUserData.friends } },
                    { $pull: { friends: req.params.userId } }
                )
                    .then(() => {
                        // remove user's thoughts
                        Thought.deleteMany({ username: dbUserData.username })
                            .then(() => {
                                res.json({ message: 'Successfully deleted user!' });
                            })
                            .catch(err => {
                                console.log(err);
                                res.sendStatus(400);
                            });
                    })
                    .catch(err => {
                        console.log(err);
                        res.sendStatus(400);
                    });
            })   
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });  
    },

    // add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }

                // add user to friend's friends array (adding a friend adds both friends to each other's array)
                User.findOneAndUpdate(
                    { _id: req.params.friendId },
                    { $addToSet: { friends: req.params.userId } },
                    { runValidators: true, new: true }
                )
                    .then(() => {
                        res.json({ message: 'Successfully added friend!' });
                    })
                    .catch(err => {
                        console.log(err);
                        res.sendStatus(400);
                    });
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // remove a friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }

                // remove user from friend's friends array
                User.findOneAndUpdate(
                    { _id: req.params.friendId },
                    { $pull: { friends: req.params.userId } },
                    { runValidators: true, new: true }
                )
                    .then(() => {
                        res.json({ message: 'Successfully removed friend!' });
                    })
                    .catch(err => {
                        console.log(err);
                        res.sendStatus(400);
                    });
            })       
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            }
        );
    }
};

module.exports = userController;

