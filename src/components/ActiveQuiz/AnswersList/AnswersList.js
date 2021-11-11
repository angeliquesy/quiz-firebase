import React from 'react'
import classes from './AnswersList.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = ({ answers, state, onAnswerClick }) => (
  <ul className={classes.AnswersList}>
    {answers.map((answer, index) => (
        <AnswerItem
          key={index}
          answer={answer}
          onAnswerClick={onAnswerClick}
          state={state ? state[answer.id] : null}
        />
      )
    )}
  </ul>
)

export default AnswersList
