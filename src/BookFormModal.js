import React from 'react';
import Modal from 'react-bootstrap/Modal'

class BookFormModal extends React.Component {

  render() {

    return (

      <Modal className='h-100 p-5'
        show={this.props.showModal}
        onHide={this.props.handleOnHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Book Added!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="img-fluid"
            src="modalbook.jpg"
            alt="book open to bookmarked page"
          />
        </Modal.Body>
      </Modal>
    )
  }

}

export default BookFormModal;