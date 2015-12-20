// Get the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./models/book');


// Connect to the Library MongoDB
mongoose.connect('mongodb://localhost:27017/LibApp');


// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the Library' });
});

// Create a new route with the prefix /books
var booksRoute = router.route('/books');

// Create endpoint /api/books for POSTS
booksRoute.post(function(req, res) {
  // Create a new instance of the Book model
  var book = new Book();

  // Set the book properties that came from the POST data
  book.name = req.body.name;
  book.type = req.body.type;
  book.quantity = req.body.quantity;

  // Save the book and check for errors
  book.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Book added to the library!', data: book });
  });
});

// Create endpoint /api/books for GET
booksRoute.get(function(req, res) {
  // Use the Book model to find all books
  Book.find(function(err, books) {
    if (err)
      res.send(err);

    res.json(books);
  });
});

// Create a new route with the /books/:book_id prefix
var bookRoute = router.route('/books/:book_id');

// Create endpoint /api/books/:book_id for GET
bookRoute.get(function(req, res) {
  // Use the Book model to find a specific book
  Book.findById(req.params.book_id, function(err, book) {
    if (err)
      res.send(err);

    res.json(book);
  });
});
// Create endpoint /api/books/:book_id for PUT
bookRoute.put(function(req, res) {
  // Use the Book model to find a specific book
  Book.findById(req.params.book_id, function(err, book) {
    if (err)
      res.send(err);

    // Update the existing book quantity
    book.quantity = req.body.quantity;

    // Save the book and check for errors
    book.save(function(err) {
      if (err)
        res.send(err);

      res.json(book);
    });
  });
});
// Create endpoint /api/books/:book_id for DELETE
bookRoute.delete(function(req, res) {
  // Use the Book model to find a specific book and remove it
  Book.findByIdAndRemove(req.params.book_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Book removed from the library!' });
  });
});




// Register all our routes with /api
app.use('/api', router);

// application 
    app.get('*', function(req, res) {
        res.sendFile('/home/sid/LibApp/public/library.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

// Start the server
app.listen(port);
console.log('Manage books on ' + port);

