import React from 'react'
import classes from './AnswerItem.css'
import { decodeString } from '../../ActiveQuiz'

const AnswerItem = ({ state, answer, onAnswerClick }) => {
  const cls = [classes.AnswerItem]

  if (state) {
    cls.push(classes[state])
  }

  return (
    <li
      className={cls.join(' ')}
      onClick={() => onAnswerClick(answer.id)}
    >
      {decodeString(answer.text)}
    </li>
  )
}
export default AnswerItem
