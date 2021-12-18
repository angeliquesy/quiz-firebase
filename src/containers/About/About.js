import React from 'react'
import classes from './About.css'

const About = () => (
  <div className={classes.About}>
    <div>
      <p>This website is&nbsp;built on&nbsp;React, hosted, and served by&nbsp;Firestore. All user data goes to&nbsp;Firestore Database.</p>
      <p><em>"&laquo;Who wants to&nbsp;be&nbsp;a&nbsp;millionaire&raquo;</em> and <em>&laquo;Frontend IT&nbsp;quiz&raquo;</em> games
        each time give a&nbsp;different pack of&nbsp;10&nbsp;random questions.</p>
      <p>To&nbsp;<strong>create your own quiz</strong> you should sign&nbsp;up. There is&nbsp;no&nbsp;email verification,
        input any email and password, let the browser remember it&nbsp;for you to&nbsp;be&nbsp;able to&nbsp;sign in&nbsp;again.</p>
      <p>An&nbsp;authorized user also can star his favorite quizzes and delete his own quizzes.</p>
      <p>Enjoy ❤</p>
    </div>
  </div>
)

export default About
