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

      <p>Правильно {successCount} из {props.quiz.questions.length}</p>

      <div>

        <Button onClick={props.onRetry} type='primary'>Повторить</Button>
        <Button type='success' to='/'>Перейти в список тестов</Button>

      </div>
    </div>
  )
}

export default withRouter(FinishedQuiz)
