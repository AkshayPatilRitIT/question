import React from "react";
import questionData from "../question.json";
class Question extends React.Component {
  state = {
    question: null,
    choice: null
  };
  componentDidMount = () => {
    const questionNumber = this.props.match.params.questionNumber;
    if (questionNumber < 0 || questionNumber >= 10) {
      this.props.history.push(`/`);
    }
  };
  handleNextClick = e => {
    window.scrollTo(0, 0);
    const questionNumber = this.props.match.params.questionNumber;
    if (questionNumber > 0 && questionNumber < 9) {
      this.props.history.push(`/question/${+questionNumber + 1}`);
    } else {
      this.props.history.push(`/question/result`);
    }
    const questions = localStorage.getItem("questions");
    if (questions) {
      window.localStorage.setItem(
        "questions",
        JSON.stringify(
          [...questions, { [this.state.question]: this.state.choice }],
          null,
          2
        )
      );
    } else {
      window.localStorage.setItem(
        "questions",
        JSON.stringify([{ [this.state.question]: this.state.choice }], null, 2)
      );
    }
  };
  handlePrevClick = e => {
    window.scrollTo(0, 0);
    const questionNumber = this.props.match.params.questionNumber;
    if (questionNumber > 1 && questionNumber <= 9) {
      this.props.history.push(`/question/${+questionNumber - 1}`);
    } else {
      this.props.history.push(`/question/result`);
    }
  };

  handleRadioClick = index => {
    this.setState({
      choice: index,
      question: this.props.match.params.questionNumber
    });
  };

  render() {
    {
      console.log(this.props);
    }
    let selectedQuestion = questionData.filter(
      item =>
        item.question_id.toString() === this.props.match.params.questionNumber
    );
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8 question_area">
            {selectedQuestion.map((question, index) => {
              return (
                <div key={question_id} className="Question_and_ans_section">
                  <h2 className="Question_and_ans_section-Question">
                    Q.{question.question_id}){question.question}
                  </h2>

                  {question.choices.map((choice, i) => {
                    return (
                      <div
                        key={choice.id}
                        className="Question_and_ans_section-Ans"
                      >
                        <label className="radio-inline">
                          <span>{choice.id}</span>
                          &nbsp;&nbsp;
                          <input
                            type="radio"
                            className="inner-button"
                            name="optradio"
                            onClick={() => this.handleRadioClick(i)}
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
