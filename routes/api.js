const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Schedule = require('../models/Schedule');

let toSend = []

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  router.get("/current_user", (req, res) => {
    res.send(req.user);
  });

  router.get('/schedules', (req, res) => {

    Schedule.find({})
    .sort({date: -1})
    .then(schedules => {
      res.json(schedules);
    })
    .catch(err => console.log(err));

});

  router.post('/schedules/create', (req, res) => {
    const schedule = new Schedule({
        text: req.body.text,
        user: req.user.id,
        name: req.user.name
    });

    schedule.save()
        .then(schedule => res.json(schedule))
        .catch(err => console.log(err));
})

module.exports = router;