import React from "react";
import questionData from "../question.json";
import "./question.css";

class Question extends React.Component {
  state = {
    questions: [],
    question_id: null,
    choice: null
  };

  componentDidMount = () => {
    //Get Question Number from Route Param
    localStorage.clear();
    const questionNumber = this.props.match.params.questionNumber;
    this.setState({ question_id: Number(questionNumber) });

    // Handle route params edge case
    if (questionNumber <= 0 || questionNumber >= 10) {
      this.props.history.push(`/`);
    }
  };

  handleNextClick = e => {
    window.scrollTo(0, 0);

    //check the local staorage first time
    if (localStorage.getItem("questions")) {
      //set the state values here
      let { choice } = this.state;
      let question_id = this.props.match.params.questionNumber;

      //get the data from the local storage
      let localQuestionsArray = JSON.parse(localStorage.getItem("questions"));

      //updated the state value store in the variable
      let updatedLocalQuestionsArray = [
        ...localQuestionsArray,
        { [question_id]: choice }
      ];

      // set the question array
      this.setState({ questions: updatedLocalQuestionsArray });

      window.localStorage.setItem(
        "questions",
        JSON.stringify(updatedLocalQuestionsArray)
      );
    } else {
      let { question_id, choice } = this.state;
      let localQuestionsArray = [{ [question_id]: choice }];
      this.setState({ questions: localQuestionsArray });
      window.localStorage.setItem(
        "questions",
        JSON.stringify(localQuestionsArray)
      );
    }

    // route handling
    const questionNumber = this.props.match.params.questionNumber;

    if (questionNumber > 0 && questionNumber < 9) {
      this.props.history.push(`/question/${+questionNumber + 1}`);
    } else {
      this.props.history.push({
        pathname: "/question/result",
        state: { questions: this.state.questions }
      });
    }
  };

  handlePrevClick = e => {
    window.scrollTo(0, 0);
    const questionNumber = this.props.match.params.questionNumber;

    if (questionNumber > 1 && questionNumber <= 9) {
      this.props.history.push(`/question/${+questionNumber - 1}`);
    } else {
      this.props.history.push(`/`);
    }
  };

  render() {
    let { choice } = this.state;
    let filterItem = questionData.filter(
      item =>
        item.question_id.toString() === this.props.match.params.questionNumber
    );

    if (this.state.questions === null) {
      let position = Number(this.props.match.params.questionNumber);

      let data = this.state.questions;
      console.log(data[position - 1][position]);
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8 question_area">
            {filterItem.map((questions, index) => {
              return (
                <div
                  key={`${questions[index]}`}
                  className="Question_and_ans_section"
                >
                  <h2 className="Question_and_ans_section-Question">
                    Q.{questions.question_id}){questions.question}
                  </h2>

                  {questions.choices.map((choice, i) => {
                    return (
                      <div
                        key={`${choice}-${i}`}
                        className="Question_and_ans_section-Ans"
                      >
                        <label className="radio-inline">
                          <span>{choice.id}</span>
                          &nbsp;&nbsp;
                          <input
                            type="radio"
                            className="inner-button"
                            name="optradio"
                            onClick={e => {
                              this.setState({
                                choice: i + 1
                              });
                            }}
                          />
                          {choice.text}
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <center>
              <button
                onClick={this.handlePrevClick}
                className="btn btn-success Next-prev-btn"
              >
                Previous Step
              </button>
              &nbsp;
              <button
                className="btn btn-primary Next-prev-btn"
                onClick={this.handleNextClick}
                disabled={!choice}
              >
                Next Step
              </button>
            </center>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

export default Question;
