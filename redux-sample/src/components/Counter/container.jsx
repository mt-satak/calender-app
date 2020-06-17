import { connect } from "react-redux";
import { increment, decrement } from "../../redux/count/actions";
import Counter from "./presentation";

// const mapStateProps = ({ count }) => ({ count }); // ←下記と同義の書き方
const mapStateProps = state => {
  return { count: state.count };
};

const mapDispatchProps = dispatch => ({
  increment: count => {
    dispatch(increment(count));
  },
  decrement: count => {
    dispatch(decrement(count));
  }
});

export default connect(
  mapStateProps,
  mapDispatchProps
)(Counter);