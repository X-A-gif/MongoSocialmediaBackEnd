const { thought, user } = require('../models');
const objectId = require('mongodb').ObjectID;

const thoughtController = {
    getThoughts(req, res) {
        thought.find()
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.json(err);
            }
            );
    },

    getThoughtById({ params }, res) {
        thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            }
            )
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
            );
    },

    createThought({ body }, res) {
        thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },

    updateThought({ params, body }, res) {
        thought.update(params, body
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            }
            )
            .catch(err => res.status(400).json(err))
        );
    },

    deleteThought({ params }, res) {
        thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {

                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }

                res.json(dbThoughtData);
            }
            )
            .catch(err => res.status(400).json(err));
    },

    addReaction({ params, body }, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            }
            )
            .catch(err => res.json(err));
    },

    removeReaction({ params }, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
    
};

module.exports = thoughtController;
