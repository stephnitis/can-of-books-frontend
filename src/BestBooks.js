import React from 'react';
import { Button, Carousel, Container } from 'react-bootstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import BookFormModal from './BookFormModal'
import Form from 'react-bootstrap/Form'

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showImages: false,
      error: false,
      showModal: false,
      updatedBook: null
    }
  }

  handleOnHide = () => {
    this.setState({
      showModal: false
    });
  };

  handleShowModal = (book) => {
    this.setState({
      showModal: true,
      updatedBook: book
    })
  }

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

  updateBooks = async (bookToUpdate) => {
    try {
      let url = `${SERVER}/books/${bookToUpdate._id}`;
      let updatedBook = await axios.put(url, bookToUpdate);
      let updatedArray = this.state.books.map(existingBook => {
        return existingBook._id === bookToUpdate._id
          ? updatedBook.data
          : existingBook
      });
      this.setState({
        books: updatedArray,
      })
    } catch (error) {
      console.log('Update Error: ', error.response.data);
    }
  }

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

    return (
      <>
        <BookFormModal
          books={this.state.books}
          handleOnHide={this.handleOnHide}
          postBooks={this.postBooks}
          updateBooks={this.updateBooks}
          handleBookSubmit={this.handleBookSubmit}
          showModal={this.state.showModal}
          updatedBook={this.state.updatedBook}
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
                      <Button
                        variant="dark"
                        onClick={() => this.handleShowModal(book)}>Update
                      </Button>
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
            <Form.Group>
              <Form.Check type="checkbox" label="Read" />
            </Form.Group> 
            <Button variant="dark" type="submit">Add Book</Button>
          </Form>
        </Container>
      </>
    )
  }
}


export default BestBooks;
