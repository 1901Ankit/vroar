import ProgressBar from "react-bootstrap/ProgressBar";

const AnimatedExample = (props) => {
  return (
    <ProgressBar
      animated
      now={props.completed}
      color="#f15d17"
      label={props.label}
    />
  );
};

export default AnimatedExample;
