import React from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  getBooks = async () => {
    console.log('books fired');
    try {
      let results = await axios.get(`${SERVER}/books`);
      console.log(results.data);
      this.setState({
        books: results.data
      })
    } catch(error){
      console.log('error:', error.response.data)
    }
  }

  componentDidMount(){
    this.getBooks();
  }

  render() {
    
      let bookCarousel = this.state.books.map((book, index) => (
      <Carousel.Item key={index}>
        <img
        className="photos"
        src="jaredd-craig-HH4WBGNyltc-unsplash.jpg"
        alt="slide one"
        />
        <Carousel.Caption>{book.title}</Carousel.Caption>
        <Carousel.Caption>{book.description}</Carousel.Caption>
      </Carousel.Item>
      
      
    ))
    /* TODO: render all the books in a Carousel */
console.log(bookCarousel);
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
