import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';

function QuizSelection({quizzes}) {
  const navigate = useNavigate();

  const handleButtonClick = (quizId, quizType) => {
    navigate(`/quiz/${quizType}/${quizId}`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 center-align">
          <h1>deepCode</h1>
        </div>
      </div>
      <div className="row">
        <div className="col offset-s4">
          <button
            className="btn waves-effect waves-light"
            onClick={() => handleButtonClick(quizzes[0].id, quizzes[0].type)}
          >
            {quizzes[0].label}
          </button>
        </div>
        <div className="col offset-s1">
          <button
            className="btn waves-effect waves-light"
            onClick={() => handleButtonClick(quizzes[1].id, quizzes[1].type)}
          >
            {quizzes[1].label}
          </button>
        </div>
      </div>
    </div>
  );

}

export default QuizSelection;
