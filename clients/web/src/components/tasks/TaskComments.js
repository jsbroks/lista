import React, { Component } from "react";
import {
  Modal,
  Icon,
  Comment,
  Form,
  Button,
  Segment,
  Placeholder
} from "semantic-ui-react";

import { If } from "../helpers";

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
    const { iconStyle, inverted } = this.props;
    return (
      <Modal
        trigger={
          <Icon
            name="comment outline"
            style={{ paddingLeft: 5, ...iconStyle }}
            inverted={inverted}
          />
        }
      >
        <Modal.Header>Task Comments</Modal.Header>
        <Modal.Content scrolling>
          <If condition={true}>
            <Segment basic loading style={{ padding: 30 }}>
              <Placeholder>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
              <Placeholder>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
            </Segment>
          </If>
          <Comment.Group>
            <TaskComment
              avatarUrl="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
              displayName="Matt"
              date="Today at 5:42PM"
              text="As collected deficient objection by it discovery sincerity curiosity. Quiet decay who round three world whole has mrs man. Built the china there tried jokes which gay why. Assure in adieus wicket it is. But spoke round point and one joy. Offending her moonlight men sweetness see unwilling. Often of it tears whole oh balls share an. "
            />
          </Comment.Group>
          <Form
            ref={el => {
              this.replyForm = el;
            }}
          >
            <Form.TextArea placeholder="Message" />
            <Button content="Reply" icon="edit" primary fluid />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default TaskComments;
