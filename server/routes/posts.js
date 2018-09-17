const admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary');

const multer = require('multer');
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter})

cloudinary.config({ 
  cloud_name: 'callezenwaka', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log(process.env.CLOUDINARY_API_KEY)
console.log(process.env.CLOUDINARY_API_SECRET)
const db = admin.firestore()

// Create A Document variable
const postRef = db.collection('posts');

/* GET ALL POSTS */
router.get('/', (req, res) => {
	const posts = [];
  postRef.get()
    .then(snapshot => {
      console.log(`Received query snapshot of size ${snapshot.size}`);
      snapshot.forEach(doc => {
        const post = doc.data();
        post.id = doc.id;
        posts.push(post)
      })
      res.render('post/index', {posts: posts, page: 'posts'});
      return;
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    })
})


/* CREATE A POST */
router.get('/publish', (req, res) => {
  res.render('post/create', { page: 'post-create'});
})

/* SAVE A POST */
router.post('/', upload.single('image'), (req, res) => {
  cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      console.log(err)
      return res.redirect('back')
    }
    // title: req.body.post.title,
    // description: req.body.post.description,
    // // add cloudinary url for the image to the post object under image property
    // image_url = result.secure_url;
    // // add image's public_id to post object
    // imageId = result.public_id;
    //return console.log(req.body.post)
    postRef.add({
      title: req.body.post.title,
      description: req.body.post.description,
      // add cloudinary url for the image to the post object under image property
      image_url: result.secure_url,
      // add image's public_id to post object
      imageId: result.public_id,
      // title: req.body.post.title,
      // description: req.body.post.description,
      // image: {
        // add cloudinary public_id for the image to the post object under image property
        // id: result.public_id,
        // add cloudinary url for the image to the post object under image property
        // url: result.secure_url
      created_at: FieldValue.serverTimestamp()
      // },
    })
    .then(ref => {
      console.log('Added document with ID: ', ref.id);
      res.redirect('/posts')
      return;
     })
    .catch((err) => {
      console.log(err)
    })
  });
})

/* SHOW A POST */
router.get('/:id', (req, res) => {
  postRef.doc(req.params.id)
  	.get()
    .then(doc => {
      if (!doc.exists) {
          console.log('No such document!');
      }
      const post = doc.data();
      post.id = doc.id;
      res.render('post/show', {post: post, page: 'post'});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    })                        
});


/* EDIT A POST */
let imageId, imageUrl;
router.get('/:id/edit', (req, res) => {
  postRef.doc(req.params.id)
  	.get()
    .then(doc => {
      if (!doc.exists) {
          console.log('No such document!');
      }
      const post = doc.data();
      post.id = doc.id;
      imageId = doc.data().imageId
      image_url = doc.data().image_url
      res.render('post/edit', {post: post, page: 'post'});
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    })                    
});

/* UPDATE A POST */
router.put('/:id', upload.single('image'), (req, res) => {
  if (!req.file) {
    postRef.doc(req.params.id)
    .update({
      title: req.body.post.title,
      description: req.body.post.description,
      // add cloudinary url for the image to the post object under image property
      imageId: imageId,
      // // add image's public_id to post object
      image_url: image_url,
      update_at: FieldValue.serverTimestamp()
    })
    .then(ref => {
      console.log('Updated document with ID: ' + req.params.id)
      res.redirect('/posts')
      return;
    })
    .catch((err) => {
      console.log(err)
    })
  } else {
     // remove original/old campground image on cloudinary
    cloudinary.uploader.destroy(imageId, (result) => { console.log(result) });
    cloudinary.v2.uploader.upload(req.file.path, (result) => {
      postRef.doc(req.params.id)
        .update({
          title: req.body.post.title,
          description: req.body.post.description,
          // add cloudinary url for the image to the post object under image property
          imageId: result.public_id,
          // // add image's public_id to post object
          image_url: result.secure_url,
          update_at: FieldValue.serverTimestamp()
        })
        .then(ref => {
          console.log('Updated document with ID: ' + req.params.id)
          res.redirect('/posts')
          return;
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }
});

/* DELETE A POST */
router.delete('/:id', (req, res) => {
  postRef.doc(req.params.id)
    .delete()
    .then(doc => {
      console.log("Successfully deleted! " + req.params.id)
      res.redirect('/posts')
      return;
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    })
});

module.exports = router;