import React from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

const DeleteModal = (props) => {
  const buttonStyle = {
    margin: '8px auto',
    borderRadius: '25px',
    cursor: 'pointer'
  };
  return (
    <Container>
      <Modal isOpen={props.show} toggle={props.toggle} size='sm'>
        <ModalHeader toggle={props.toggle}></ModalHeader>
        <ModalBody>
          Delete this post?
        </ModalBody>
        <ModalFooter>
          <Button
            style={buttonStyle}
            onClick={props.delete}
            color='danger'>Delete</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default DeleteModal;
