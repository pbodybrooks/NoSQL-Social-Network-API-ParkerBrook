const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// get all thoughts, create new thought
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// get one thought by id, update thought, delete thought
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// add reaction
router.route('/:thoughtId/reactions')
    .post(addReaction);

// delete reaction
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;

