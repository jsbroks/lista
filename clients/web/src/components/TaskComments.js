import React, { Component } from "react";
import {
  Modal,
  Icon,
  Comment,
  Form,
  Button,
  Dimmer,
  Loader,
  Segment
} from "semantic-ui-react";

import { If } from "../components/helpers";

const TaskComment = ({ avatarUrl, date, text, displayName }) => {
  return (
    <Comment>
      <Comment.Avatar src={avatarUrl} />
      <Comment.Content>
        <Comment.Author as="a">{displayName}</Comment.Author>
        <Comment.Metadata>
          <div>{date}</div>
        </Comment.Metadata>
        <Comment.Text>{text}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export class TaskComments extends Component {
  scrollToReplyForm = () => {
    this.replyForm.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const { iconStyle, task } = this.props;

    return (
      <Modal
        trigger={
          <Icon
            name="comment outline"
            style={{ paddingLeft: 5, ...iconStyle }}
          />
        }
      >
        <Modal.Header>Task Comments</Modal.Header>
        <Modal.Content scrolling>
          <If condition={true}>
            <Segment basic loading style={{ padding: 30 }} />
          </If>
          <Comment.Group>
            <TaskComment
              avatarUrl="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
              displayName="Matt"
              date="Today at 5:42PM"
              text="Wow comments!"
            />
          </Comment.Group>
          <Form
            ref={el => {
              this.replyForm = el;
            }}
          >
            <Form.TextArea placeholder="Message" fluid />
            <Button content="Reply" icon="edit" primary fluid />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default TaskComments;
