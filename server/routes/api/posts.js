const admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const express = require('express')
const router = express.Router()

var db = admin.firestore()

// // Create A Document Variable
// const postRef = await db.collection('posts');

/* GET ALL POSTS */
/* ========= CAUTION ========== */
// This route throws the following error
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
// To be reviewed later
/* ========= END ========== */
// router.get('/', (req, res) => {
// 	const posts = [];
// 	var observer = postRef.onSnapshot(querySnapshot => {
// 	  console.log(`Received query snapshot of size ${querySnapshot.size}`);
// 	  querySnapshot.docs.forEach(doc => {
//       const post = doc.data();
//       post.id = doc.id;
//       posts.push(post)
// 	  })
//     res.json(posts);
// 	})
//   .catch(err => {
// 			console.log(`Encountered error: ${err}`);
// 	});
// })

/* GET ALL POSTS */
// router.get('/', (req, res) => {
//   const posts = [];
//   postRef.get()
//     .then(snapshot => {
//       console.log(`Received query snapshot of size ${snapshot.size}`);
//       snapshot.forEach(doc => {
//         const post = doc.data();
//         post.id = doc.id;
//         posts.push(post)
//       })
//       res.json(posts);
//       return;
//     })
//     .catch((err) => {
//         console.log('Error getting documents', err);
//     })
// })

/* GET ALL POSTS */
router.get('/', async (req, res, next) => {
const posts = [];
  try {
    const postRef = await db.collection('posts').get()
    console.log(`Received query snapshot of size ${postRef.size}`);
    postRef.forEach((doc) => {
      const post = doc.data();
      post.id = doc.id;
      posts.push(post)
    })
    res.json(posts);
    return;
  } catch (err) {
    next(err)
  }
})

/* SAVE A POST */
router.post('/', async (req, res, next) => {
  try {
    const postRef = await db.collection('posts').add({
      title: req.body.title,
      description: req.body.description,
      timestamp: FieldValue.serverTimestamp()
    })
    console.log('Added document to DB')
    res.send({
      message: 'Added document to DB'
    })
  } catch(err) {
    next(err)
  }
})

/* SHOW A POST */
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const postRef = await db.collection('posts').doc(id).get()
    if (!postRef.exists) {
      console.log('No such document!');
    }
    const post = postRef.data();
    post.id = postRef.id;
    res.json({post})
  } catch(err) {
    next(err)
  }                     
});

/* UPDATE A POST */
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const postRef = await db.collection('posts').doc(id)
    .update({
      title: req.body.title,
      description: req.body.description,
      Updated_at: FieldValue.serverTimestamp()
    })
    console.log('Updated document with ID: ' + id)
    res.json({id})
  } catch(err) {
    next(err)
  }
});

/* DELETE A POST */
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const postRef = await db.collection('posts').doc(id).delete()
    console.log('Deleted document with ID: ' + id)
    res.json({id})
  } catch(err) {
    next(err)
  }
});

module.exports = router;