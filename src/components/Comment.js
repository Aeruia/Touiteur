import TouiteurAPI from "./../api/TouiteurAPI";
import React from "react";
import SendComment from "./SendCommentForm";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      comments: []
    };
  }
  componentDidMount() {
    TouiteurAPI.getComments(
      result => {
        this.setState({
          isLoaded: true,
          comments: [...result.comments]
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          message: "Error, someone fucked up!!!"
        });
      },
      this.props.messageid
    );
  }
  componentWillMount() {}
  render() {
    const { comments } = this.state;
    console.log(comments);
    return (
      <div className="comments">
        <SendComment messageid={this.props.messageid} />
        {comments
          .slice()
          .reverse()
          .map((comment, index) => (
            <div className="comment" key={index}>
              <div className="commentComment">{comment.comment}</div>
              <div className="commentName">{comment.name}</div>
            </div>
          ))}
      </div>
    );
  }
}

export default Comment;
