import React, { Component } from "react";

class CommentTextarea extends Component {
  state = {
    text: "",
    remainingWord: 500
  };

  handleChange = e => {
    const text = e.currentTarget.value;
    this.setState({ text, remainingWord: 500 - text.length });
  };

  handleSubmit = e => {
    this.props.onAddReason(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <div
        className={`content ${
          this.props.vote === "agree" ? "katiliyorum" : "katilmiyorum"
        }`}
      >
        <h3>
          <b>
            {this.props.vote === "agree" ? "Katılıyorum " : "Katılmıyorum "}
          </b>
          çünkü;
        </h3>
        <div className="ui form">
          <div className="yorum">
            <div className="ui avatar image foto">
              <img src={this.props.user ? this.props.user.ppLink : ""} alt="" />
            </div>
            <div className="kutu">
              <textarea
                rows="3"
                maxLength="500"
                value={this.state.text}
                onChange={this.handleChange}
              />
              <span className="enter">{this.state.remainingWord}</span>
              <div className="ui blue button noborder mt-2">Yorum Yap</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CommentTextarea;
// <Container className="bg-white rounded py-4 mb-3 ">
//   <Form className="w-100">
//     <Form.Group className="text-dark">
//       <Form.Label>Katılıyorum çünkü...</Form.Label>
//       <Form.Control
//         as="textarea"
//         value={this.state.text}
//         className="w-100"
//         onChange={this.handleChange}
//       />
//     </Form.Group>
//     <Button variant="info" onClick={this.handleSubmit}>
//       Sebep ekle
//     </Button>
//   </Form>
// </Container>
