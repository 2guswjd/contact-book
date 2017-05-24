var express = require('express');
var router = express.Router();
var Contact = require('../models/Contact');

// find: 해당 model의 document를 찾아 항상 array로 결과 반환
router.get('/', function(req, res) {
  Contact.find({}, function(err, contacts) {
    if(err) return res.json(err);
    res.render('contacts/index', {contacts: contacts});
  });
});
router.get('/new', function(req, res) {
  res.render('contacts/new');
});
router.post('/', function(req, res) {
  Contact.create(req.body, function(err, contact) {
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});
router.get('/:id', function(req, res) {
  Contact.findOne({_id: req.params.id}, function(err, contact) {
    if(err) return res.json(err);
    res.render('contacts/show', {contact: contact});
  });
});
router.get('/:id/edit', function(req, res) {
  Contact.findOne({_id: req.params.id}, function(err, contact) {
    if(err) return res.json(err);
    res.render('contacts/edit', {contact: contact});
  });
});
router.put('/:id', function(req, res) {
  Contact.findOneAndUpdate({_id: req.params.id}, req.body, function(err, contact) {
    if(err) return res.json(err);
    res.redirect('/contacts/' + req.params.id);
  });
});
router.delete('/:id', function(req, res) {
  Contact.remove({_id: req.params.id}, function(err) {
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});

module.exports = router;
