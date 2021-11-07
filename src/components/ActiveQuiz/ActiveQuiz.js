import React from "react";
import classes from './ActiveQuiz.css'
import AnswersList from "./AnswersList/AnswersList";

export const decodeString = str => {
  const values = {
    '&quot;': '"',
    '&pi;': 'π',
    '&#039;': '\'',
    '&amp;': '&',
    '&ntilde;': 'ñ',
  }

  let newStr = str;

  for (const key in values) {
    const regex = new RegExp(key, 'g');
    newStr = newStr.replace(regex, values[key])
  }

  return newStr
}

const ActiveQuiz = props => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{props.answerNumber}. </strong>
        {decodeString(props.question)}
      </span>
      <small>{props.answerNumber} of {props.quizLength}</small>
    </p>

    <AnswersList
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
      state={props.state}
    />
  </div>
)


export default ActiveQuiz
