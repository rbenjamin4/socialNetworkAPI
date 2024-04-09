const router = require('express').Router()
const { Thought } = require('../../models')

router.get('/', async (req, res) => {
    try {
      const result = await Thought.find({}).populate('reactions');
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const result = await Thought.findOne({_id: req.params.id}).populate('reactions');
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  router.post('/', (req, res) => {
    const newThought = new Thought ({ thoughtText: req.body.thoughtText, username: req.body.username });
    // console.log(req.body)
    newThought.save();
    if (newThought) {
      res.status(201).json(newThought);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  })

  router.put('/:id', async (req, res) => {
    try {
    const result = await Thought.updateOne({ _id: req.params.id }, req.body)
    res.status(200).json(result)
    } catch (err) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await Thought.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } catch (err) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    });

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
    const result = await User.findOneAndUpdate({ _id: req.params.thoughtId }, {$addToSet:{reactions: req.body}},{new:true})
    res.status(200).json(result)
    } catch (err) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
    const result = await User.findOneAndUpdate({ _id: req.params.thoughtId }, {$pull:{friends: req.params.reactionId}},{new:true})
    res.status(200).json(result)
    } catch (err) {
        res.status(500).json({error: 'Something went wrong'})
    }
})


module.exports = router
