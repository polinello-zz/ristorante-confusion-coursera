/* eslint-disable react/jsx-pascal-case */
import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  Label,
} from "reactstrap";

import { Control, Form, Errors, actions } from "react-redux-form";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      rating: "",
      author: "",
      comment: "",
      touched: {
        rating: false,
        author: false,
        comment: false,
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  toggleModal() {
    console.log("toggle modal...");
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );

    this.props.resetFeedbackForm();
    // event.preventDefault();
  }

  // event.preventDefault();

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;
    const isNumber = (val) => !isNaN(Number(val));

    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <Form
              model="feedback"
              onSubmit={(values) => this.handleSubmit(values)}
            >
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>
                  Rating
                </Label>
                <Col md={10}>
                  <Control.input
                    type="number"
                    id="rating"
                    model=".rating"
                    name="rating"
                    className="form-control"
                    validators={{
                      required,
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".rating"
                    show="touched"
                    messages={{
                      required: "Required. ",
                      isNumber: "Must be a number. ",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name" md={2}>
                  Your Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required. ",
                      minLength: "Must be greater than 2 characters. ",
                      maxLength: "Must be 15 characters or less. ",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={2}>
                  Comment
                </Label>
                <Col md={10}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="12"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default CommentForm;
