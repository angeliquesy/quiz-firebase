import React from 'react'
import classes from './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'

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

const ActiveQuiz = ({ answerNumber, question, quizLength, answers, state, onAnswerClick }) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{answerNumber}. </strong>
        {decodeString(question)}
      </span>
      <small>{answerNumber} of {quizLength}</small>
    </p>

    <AnswersList
      answers={answers}
      onAnswerClick={onAnswerClick}
      state={state}
    />
  </div>
)


export default ActiveQuiz
