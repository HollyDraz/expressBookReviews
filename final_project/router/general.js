const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();




public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented, post books"});
});



const fetchBooks = () => {
  return new Promise((resolve) => {
      setTimeout(() => resolve(books), 100); // Simulate delay
  });
};

public_users.get('/', (req, res) => {
  fetchBooks()
      .then(data => {
          const formattedBooks = JSON.stringify(data, null, 2);
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(formattedBooks);
      })
      .catch(error => {
          res.status(500).json({
              message: "Error retrieving book list",
              error: error.message
          });
      });
});


//task 2 
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
 });
  

 //task 3
// Get book details based on author
// Fetch books by author using Promise
const fetchBooksByAuthor = (author) => {
  return new Promise((resolve, reject) => {
      const bookKeys = Object.keys(books);
      const matchingBooks = bookKeys
          .map(key => books[key])
          .filter(book => book.author.toLowerCase() === author.toLowerCase());
      
      if (matchingBooks.length > 0) {
          resolve(matchingBooks);
      } else {
          reject(new Error("No books found for the given author"));
      }
  });
};
  
// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author;
  fetchBooksByAuthor(author)
      .then(matchingBooks => {
          const formattedBooks = JSON.stringify(matchingBooks, null, 2);
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(formattedBooks);
      })
      .catch(error => {
          if (error.message === "No books found for the given author") {
              res.status(404).json({ message: error.message });
          } else {
              res.status(500).json({
                  message: "Error retrieving books by author",
                  error: error.message
              });
          }
      });
});




// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
