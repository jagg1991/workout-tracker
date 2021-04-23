const router = require("express").Router();
const { db } = require("../../models/Workout");
const Workout = require("../../models/Workout");

router.get('/', (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post('/', ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
})
// router.post("/:id", (req, res) => {
//     Workout.create({
//         type: req.body.type,
//         name: req.body.name,
//         duration: req.body.duration,
//         weight: req.body.weight,
//         reps: req.body.reps,
//         sets: req.body.sets,
//         distance: req.body.distance,
//     },
//     )
//         .then(newExercise => {
//             res.json(newExercise);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });
router.put('/:id', (req, res) => {
    Workout.updateOne({ _id: req.params.id },
        {
            $push: {
                exercises: req.body
            }
        })
        .then(updateExercise => {
            res.json(updateExercise)
        })
        .catch(err => {
            res.json(err);
        })

})


router.get('/', (req, res) => {
    Workout.aggregate([{
        $addFields: { totalDuration: { $sum: "$exercises.duration" } }
    }
    ])
        .sort({ date: -1 })
        .then(dbWorkout => {
            console.log(dbWorkout)

            res.json(dbWorkout)

        })
        .catch(err => {
            res.status(400).json(err)
        })
})
module.exports = router;

router.get('/range', (req, res) => {
    Workout.aggregate([{
        $addFields: { totalDuration: { $sum: "$exercises.duration" } }
    }
    ])
        .limit(7)
        .sort({ date: -1 })

        .then(dbWorkout => {
            console.log(dbWorkout)

            res.json(dbWorkout)

        })
        .catch(err => {
            res.status(400).json(err)
        })
})