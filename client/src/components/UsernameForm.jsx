import PropTypes from 'prop-types';

function Form(props) {
  return (
    <form>
      <input
        placeholder="Username..."
        type="text"
        value={props.username}
        onChange={props.onChange}
      />
      <button onClick={props.connect}>Connect</button>
    </form>
  );
}

Form.propTypes = {
  username: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  connect: PropTypes.func.isRequired,
};

export default Form;
