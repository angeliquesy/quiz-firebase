import React from "react";
import classes from './AnswerItem.css'
import {decodeString} from '../../ActiveQuiz'

const AnswerItem = props => {
  const cls = [classes.AnswerItem]

  if (props.state) {
    cls.push(classes[props.state])
  }

  return (
    <li
      className={cls.join(' ')}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      { decodeString(props.answer.text) }
    </li>
  )
}
export default AnswerItem
