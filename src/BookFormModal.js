import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { Button, Form, } from 'react-bootstrap';

class BookFormModal extends React.Component {

  handleUpdateSubmit = (e) => {
    e.preventDefault();
    let bookToUpdate = {
      title : e.target.title.value || this.props.updatedBook.title,
      description: e.target.description.value || this.props.updatedBook.description,
      status: this.props.updatedBook.status,
      _id: this.props.updatedBook._id
    }
    this.props.updateBooks(bookToUpdate);
    this.props.handleOnHide();
  }

  render() {

    return (

      <Modal className='h-100 p-5'
        show={this.props.showModal}
        onHide={this.props.handleOnHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modify Book!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleUpdateSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title: </Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description: </Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Button type="submit">Update Book</Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }

}


export default BookFormModal;