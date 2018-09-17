'use strict';
const admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const express = require('express')
const router = express.Router()

var db = admin.firestore()

//INDEX - show all products
router.get("/", function(req, res){
    // Get all product from DB
    res.render('index', {page: 'home'})
});

//INDEX - show all products
router.get("/about", function(req, res){
    // Get all product from DB
    res.render('about', {page: 'about'})
});

//INDEX - show all products
router.get("/courses", function(req, res){
    // Get all product from DB
    res.render('courses', {page: 'courses'})
});

//INDEX - show all products
router.get("/tutorials", function(req, res){
    // Get all product from DB
    res.render('tutorials', {page: 'tutorials'})
});
//INDEX - show all products
router.get("/canvas", function(req, res){
    // Get all product from DB
    res.render('canvas', {page: 'canvas'})
});

module.exports = router;