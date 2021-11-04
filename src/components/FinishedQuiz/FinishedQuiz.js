import React from "react";
import classes from './FinishedQuiz.css'
import Button from '../Ui/Button/Button'
import {withRouter} from 'react-router-dom'

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }

    return total
  }, 0)

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.questions.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[quizItem.id]]
          ]
          return (
          <li key={index}>
            <strong>{index + 1}. </strong>
            {quizItem.question}
            <i className={cls.join(' ')}/>
          </li>
          )
        })
        }
      </ul>

      <p>{successCount} out of {props.quiz.questions.length} are correct</p>

      <div>

        <Button onClick={props.onRetry} type='primary'>Retry</Button>
        <Button type='success' to='/'>Go to quiz list</Button>

      </div>
    </div>
  )
}

export default withRouter(FinishedQuiz)
