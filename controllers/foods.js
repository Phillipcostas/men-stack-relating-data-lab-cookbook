const express = require('express');
const router = express.Router();

const User = require('../models/user.js')
 

router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      res.render('foods/index.ejs', {
        pantry: currentUser.pantry,
      });
    } catch (error) {

      console.log(error)
      res.render("There are no items in the pantry")
    }
  });


router.get('/new', async (req, res) => {
    res.render('foods/new.ejs')
});

router.post('/', async (req, res) => {
    try {
      console.log(req.body)
        const currentUser = await User.findById(req.session.user._id); 
        currentUser.pantry.push(req.body);
        await currentUser.save()
        res.redirect(`/users/${currentUser._Id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.get('/:foodsId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const pantry = currentUser.pantry.id(req.params.foodsId);
    console.log(currentUser.pantry)
    res.render('foods/show.ejs', {
      foods: pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
})


router.delete('/:foodsId', async (req, res) => {
  try {
  const currentUser = await User.findById(req.session.user._id);
  currentUser.pantry.id(req.params.foodsId).deleteOne();
  await currentUser.save();
  res.redirect(`/users/${currentUser._id}/foods`)
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
})

router.get('/:foodsId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const pantry = currentUser.pantry.id(req.params.foodsId);
    res.render('foods/edit.ejs', {
      foods: pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});




module.exports = router; 