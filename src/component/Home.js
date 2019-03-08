import React from "react";

class Home extends React.Component {
  handleEvent = () => {
    this.props.history.push(`/question/1`);
  };
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        Welcome to the Home page
        <button className="btn btn-primary" onClick={this.handleEvent}>
          Go to Quiz
        </button>
      </div>
    );
  }
}

export default Home;
