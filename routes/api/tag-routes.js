const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  
  // be sure to include its associated Product data
  try {
    const tagDataAll = await Tag.findAll({
      include: {
        model: Product
      }
    });

    res.json(tagDataAll);
  }
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagDataId = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product
      }
    });
    
    if(!tagDataId) {
      res.status(404).json({ message: 'No Tag found with this id'});
      return;
    }
    res.json(tagDataId);
  }
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new tag
    try {
      const tagDataNew = await Tag.create({
          tag_name: req.body.tag_name
      });

      res.json(tagDataNew);
    }
    catch (err) { 
        console.log(err);
        res.status(500).json(err);
    }
  });

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagId = req.params.id;
    const tagDataUpdate = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: tagId
        }
      }
    );
    if(tagDataUpdate[0] === 0) {
      res.status(404).json({ message: 'No Tag found with this id'});
      return;    
    }
    
    res.json({ message: ` Tag id: ${tagId} updated successfully`});
  }
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagId = req.params.id;

    const tagDataDelete = await Tag.destroy({
        where: {
            id: tagId
        },
    });

    if (tagDataDelete === 0) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
    }

    res.json({ message: `Tag id: ${tagId} deleted successfully` });
  } catch(err) {
      console.log(err);
      res.status(500).json(err);
  }
  
});

module.exports = router;
