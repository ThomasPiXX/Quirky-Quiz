import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';

function QuizSelection() {
  const navigate = useNavigate();

  const handleButtonClick = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="container">
      <h1 className="center-align">Select a Quiz</h1>
      <div className="row">
        <div className="col s6">
          <button
            className="btn waves-effect waves-light"
            onClick={() => handleButtonClick(1)}
          >
            JS Quiz
          </button>
        </div>
        <div className="col s6">
          <button
            className="btn waves-effect waves-light"
            onClick={() => handleButtonClick(2)}
          >
            Future Quiz
          </button>
        </div>
      </div>
      {/* Add more buttons or customize as needed */}
    </div>
  );
}

export default QuizSelection;
