const mongoose = require('mongoose');
const User = require('../models/User');
const Schedule = require('../models/Schedule');

let toSend = [];
module.exports = {
    createSchedule: (req, res) => {
        const schedule = new Schedule({
            text: req.body.text,
            user: req.user.id,
            name: req.user.name
        });

        schedule.save()
            .then(schedule => res.json(schedule))
            .catch(err => console.log(err));
    },
    getSchedules: (req, res) => {
        Schedule.find({})
        .sort({date: -1})
        .then(schedules => {
            schedules.map(schedule => {
                User.findOne({_id: schedule.user})
                .then(user => toSend.push({user: user, schedule:schedule}))
                console.log(toSend);
                res.json(toSend);
            })
        })
        .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
    }
}