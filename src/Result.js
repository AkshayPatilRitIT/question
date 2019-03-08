import React from "react";

const Result = props => (
  <div>
    <p>{JSON.stringify(props && props.location.state.questions)}</p>
  </div>
);
export default Result;
