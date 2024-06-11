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

router.get('/pantry/:foodId/edit', async (req, res) => {
  try {
    // console.log(res.locals.user)
    const currentUser = await User.findById(req.session.user._id);
    console.log(currentUser)
    const pantry = currentUser.pantry.id(req.params.foodId);
    // console.log(currentUser.pantry)
    res.render('foods/edit.ejs', {
      foods: pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
})

router.delete('/pantry/:foodId', async (req, res) => {
  try {
  const currentUser = await User.findById(req.session.user._id);
  currentUser.pantry.id(req.params.foodId).deleteOne();
  await currentUser.save();
  res.redirect(`/users/${currentUser._id}/foods`)
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
})

router.get('/pantry/:foods/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const pantry = currentUser.pantry.id(req.params.foodId);
    res.render('foods/edit.ejs', {
      foods: pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});


router.put('/pantry/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const pantry = currentUser.pantry.id(req.params.foodId);
    pantry.set(req.body);
    console.log(req.body)
    await currentUser.save();
    res.render('foods/edit.ejs', {
      foods: pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});


module.exports = router; 




