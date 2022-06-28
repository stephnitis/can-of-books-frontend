import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showImages: false,
      error: false
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  getBooks = async () => {
    console.log('books fired');
    try {
      let results = await axios.get(`${SERVER}/books`);
      console.log(results.data);
      this.setState({
        books: results.data,
        showImages: true
      })
    } catch(error){
      console.log('error:', error.response.data)
      this.setState({
        error: true

      })
    }
  }

  componentDidMount(){
    this.getBooks();
  }

  render() {
    
      let bookCarousel = this.state.books.map((book, index) => (
      <Carousel.Item key={index}>
        <img
        className="d-block w-100"
        src="jaredd-craig-HH4WBGNyltc-unsplash.jpg"
        alt="slide one"
        />
        <Carousel.Caption>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
        </Carousel.Caption>
      </Carousel.Item>

      
      
    ))
    /* TODO: render all the books in a Carousel */
console.log(bookCarousel);
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.error === true 
        ? 
          <Alert>No Books Found :</Alert>
        : 
        <>
          <Container>
            <Carousel>
              {bookCarousel}
            </Carousel>
          </Container>
          </>}  
      </>
    )
}
}

export default BestBooks;
