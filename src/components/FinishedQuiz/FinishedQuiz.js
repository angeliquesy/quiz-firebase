import React from 'react'
import classes from './FinishedQuiz.css'
import Button from '../Ui/Button/Button'
import { withRouter } from 'react-router-dom'

const FinishedQuiz = ({ results, quiz, onRetry }) => {
  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'success') {
      total++
    }

    return total
  }, 0)

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {quiz.questions.map((quizItem, index) => {
          const cls = [
            'fa',
            results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[results[quizItem.id]]
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

      <p>{successCount} out of the {quiz.questions.length} are correct</p>

      <div>

        <Button onClick={onRetry} type='primary'>Retry</Button>
        <Button type='success' to='/'>Go to quiz list</Button>

      </div>
    </div>
  )
}

export default withRouter(FinishedQuiz)
