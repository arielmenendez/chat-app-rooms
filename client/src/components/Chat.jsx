import styled from 'styled-components';
import PropTypes from 'prop-types';

const rooms = ['general', 'random', 'jokes', 'javascript'];

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;

const SideBar = styled.div`
  height: 100%;
  width: 15%;
  border-right: 1px solid black;
`;

const ChatPanel = styled.div`
  height: 100;
  width: 85%;
  display: flex;
  flex-direction: column;
`;

const BodyContainer = styled.div`
  width: 100%;
  height: 75%;
  overflow: scroll;
  border-bottom: 1px solid black;
`;

const TextBox = styled.textarea`
  height: 15%;
  width: 100%;
`;

const ChannelInfo = styled.div`
  height: 10%;
  width: 100%;
  border-bottom: 1px solid black;
`;

const Row = styled.div`
  cursor: pointer;
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

function Chat(props) {
  function renderRooms(room) {
    const currentChat = {
      chatName: room,
      isChannel: true,
      receiverId: '',
    };

    return (
      <Row onClick={() => props.toggleChat(currentChat)} key={room}>
        {room}
      </Row>
    );
  }

  function renderUser(user) {
    if (user.id === props.yourId) {
      return <Row key={user.id}>You: {user.username}</Row>;
    }
    const currentChat = {
      chatName: user.username,
      isChannel: false,
      receiverId: user.id,
    };
    return (
      <Row
        onClick={() => {
          props.toggleChat(currentChat);
        }}
        key={user.id}
      >
        {user.username}
      </Row>
    );
  }

  function renderMessages(message, index) {
    return (
      <div key={index}>
        <h3>{message.sender}</h3>
        <p>{message.content}</p>
      </div>
    );
  }

  let body;
  if (
    !props.currentChat.isChannel ||
    props.connectedRooms.includes(props.currentChat.chatName)
  ) {
    body = <Messages>{props.messages.map(renderMessages)}</Messages>;
  } else {
    body = (
      <button onClick={() => props.joinRoom(props.currentChat.chatName)}>
        Join {props.currentChat.chatName}
      </button>
    );
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      props.sendMessage();
    }
  }

  return (
    <Container>
      <SideBar>
        <h3>Channels</h3>
        {rooms.map(renderRooms)}
        <h3>All Users</h3>
        {props.allUsers.map(renderUser)}
      </SideBar>
      <ChatPanel>
        <ChannelInfo>{props.currentChat.chatName}</ChannelInfo>
        <BodyContainer>{body}</BodyContainer>
        <TextBox
          value={props.message}
          onChange={props.handleMessageChange}
          onKeyPress={handleKeyPress}
          placeholder="say something I'm giving up on you..."
        />
      </ChatPanel>
    </Container>
  );
}

Chat.propTypes = {
  currentChat: PropTypes.shape({
    chatName: PropTypes.string.isRequired,
    isChannel: PropTypes.bool.isRequired,
    receiverId: PropTypes.string,
  }).isRequired,
  connectedRooms: PropTypes.arrayOf(PropTypes.string).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  ).isRequired,
  yourId: PropTypes.string,
  message: PropTypes.string.isRequired,
  toggleChat: PropTypes.func.isRequired,
  joinRoom: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  handleMessageChange: PropTypes.func.isRequired,
};

export default Chat;
