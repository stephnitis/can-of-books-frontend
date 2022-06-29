import React from 'react';
import { Button, Form, Carousel, Container } from 'react-bootstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import BookFormModal from './BookFormModal'

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showImages: false,
      error: false,
      showModal: false,
    }
  }

  handleOnHide = () => {
    this.setState({
      showModal: false
    });
  };

  handleBookSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      //status: e.target.status.checked
    }
    this.postBooks(newBook)
  }

  postBooks = async (newBookObj) => {
    try {
      let url = `${SERVER}/books`;
      let addBook = await axios.post(url, newBookObj);
      this.setState({
        books: [...this.state.books, addBook.data],
        showModal: true,
      });
    } catch (error) {
      console.log('Error pulling book', error.response.data);
    }
  }

  deleteBooks = async (id) => {
    try {
      await axios.delete(`${SERVER}/books/${id}`)
      let url = `${SERVER}/books/${id}`;
      await axios.delete(url);
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks
      });
    } catch (error) {
      console.log('Error deleting book', error.response.data);
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
    } catch (error) {
      console.log('error:', error.response.data)
      this.setState({
        error: true

      })
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {

    // let bookCarousel = this.state.books.map((book, index) => (
    // <Carousel.Item key={index}>
    //   <img
    //   className="d-block w-100"
    //   src="jaredd-craig-HH4WBGNyltc-unsplash.jpg"
    //   alt="slide one"
    //   />
    //   <Carousel.Caption>
    //     <h3>{book.title}</h3>
    //     <p>{book.description}</p>
    //   </Carousel.Caption>
    //   <Carousel.Caption>
    //     <Button onClick={() => this.deleteBooks(book._id)}>Delete</Button>
    //   </Carousel.Caption>
    // </Carousel.Item>



    // ))
    /* TODO: render all the books in a Carousel */
    // console.log(bookCarousel);
    return (
      <>
        <BookFormModal
          showModal={this.state.showModal}
          handleOnHide={this.handleOnHide}
        />
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.error === true
          ?
          <Alert>No Books Found :</Alert>
          :
          <>
            <Container>
              <Carousel>
                {this.state.books.map((book, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src="carouselbook.jpg"
                      alt="slide one"
                    />
                    <Carousel.Caption>
                      <h3>{book.title}</h3>
                      <p>{book.description}</p>
                      <Button variant="dark" onClick={() => this.deleteBooks(book._id)}>Delete</Button>
                    </Carousel.Caption>
                  </Carousel.Item>



                ))}
              </Carousel>
            </Container>
          </>}
        <Container>
          <Form onSubmit={this.handleBookSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title: </Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description: </Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            {/* <Form.Group>
              <Form.Check type="checkbox" label="Read" />
            </Form.Group> */}
            <Button variant="dark" type="submit" >Add Book</Button>
          </Form>
        </Container>
      </>
    )
  }
}

export default BestBooks;
