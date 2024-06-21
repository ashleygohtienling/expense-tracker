import React, { useState, createContext, useContext } from "react";

const style = {
  container: {
    padding: "20px",
    border: "1px solid #E0E0E0",
    borderRadius: "15px",
    width: "max-content",
    marginBottom: "40px",
  },
  question: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  options: {
    marginBottom: "5px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#FFF",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  feedback: {
    marginTop: "10px",
    fontSize: "14px",
  },
};

// do not modify the questions or answers below
const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correct: "Paris",
  },
  {
    question: "What is the capital of Germany?",
    options: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
    correct: "Berlin",
  },
];

function Option({ option, id, optionHandler, selectedOption }) {
  return (
    <div>
      <input
        id={`option-${id}`}
        type="radio"
        style={style.options}
        value={option}
        checked={option === selectedOption}
        onChange={optionHandler}
      />
      <label htmlFor={`option-${id}`}>{option}</label>
    </div>
  );
}

export default function AppQuiz() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const optionHandler = (e) => {
    const { value } = e.target;
    setSelectedOption(value);
  };
  const submissionHandler = (e) => {
    if (questions[questionNumber].correct === selectedOption) {
      setFeedback("Correct!");
      setQuestionNumber(questionNumber + 1);
    } else {
      setFeedback("Incorrect!");
    }
  };

  return questionNumber < questions.length ? (
    <div style={style.container}>
      {questions.map(
        (question, index) =>
          questionNumber == index && (
            <div key={index}>
              <div id="question" style={style.question}>
                {question.question}
              </div>
              {question.options.map((option, id) => (
                <Option
                  key={id}
                  option={option}
                  id={id}
                  selectedOption={selectedOption}
                  optionHandler={optionHandler}
                />
              ))}
            </div>
          )
      )}

      <button style={style.button} id="submitBtn" onClick={submissionHandler}>
        Submit
      </button>
      <div id="feedback" style={style.feedback}>
        {feedback}
      </div>
    </div>
  ) : (
    <div style={style.container}>
      Congratulations, you have completed the quiz!
    </div>
  );
}
