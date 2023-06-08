const { User, Thought, user } = require('../models');
const objectId = require('mongodb').ObjectID;

const userController = {
    getUsers(req, res) {
        user.find()
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.json(err);
            }
            );
    },

    getUserById({ params }, res) {
        user.findOne({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }
            )
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
            );
    },

    createUser({ body }, res) {
        user.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
        user.update(params, body
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }
            )
            .catch(err => res.status(400).json(err))
        );
    },

    deleteUser({ params }, res) {
        user.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {

                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }

                res.json(dbUserData);
            }

            )

            .catch(err => res.status(400).json(err));
    },

    addFriend({ params }, res) {
        user.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                    
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No user found with this id!' });
                        return;
                    }
    
                    res.json(dbUserData);
                }

            )
            .catch(err => res.json(err));
    },

    deleteFriend({ params }, res) {
        user.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                        
                        if (!dbUserData) {
                            res.status(404).json({ message: 'No user found with this id!' });
                            return;
                        }
        
                        res.json(dbUserData);
                    }

            )
            .catch(err => res.json(err));
    }
};

module.exports = userController;
