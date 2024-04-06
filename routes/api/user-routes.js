const router = require('express').Router()
const { User } = require('../../models')

router.get('/', async (req, res) => {
    try {
      const result = await User.find({}).populate('thoughts').populate('friends');
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const result = await User.findOne({_id: req.params.id}).populate('thoughts').populate('friends');
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  router.post('/', (req, res) => {
    const newUser = new User ({ username: req.body.username, email: req.body.email });
    // console.log(req.body)
    newUser.save();
    if (newUser) {
      res.status(201).json(newUser);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
    const result = await User.updateOne({ _id: req.params.id }, req.body)
    res.status(200).json(result)
    } catch (err) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await User.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } catch (err) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    });

    router.post('/:userId/friends/:friendId', async (req, res) => {
        try {
        const result = await User.findOneAndUpdate({ _id: req.params.id }, {$addToSet:{friends: req.params.friendId}},{new:true})
        res.status(200).json(result)
        } catch (err) {
            res.status(500).json({error: 'Something went wrong'})
        }
    })

    router.delete('/:userId/friends/:friendId', async (req, res) => {
        try {
        const result = await User.findOneAndUpdate({ _id: req.params.id }, {$pull:{friends: req.params.friendId}},{new:true})
        res.status(200).json(result)
        } catch (err) {
            res.status(500).json({error: 'Something went wrong'})
        }
    })

    module.exports = router
