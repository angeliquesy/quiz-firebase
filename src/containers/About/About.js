import React from 'react'
import classes from './About.css'

const About = () => (
  <div className={classes.About}>
    <div>
      <p>This website is built on React, hosted, and served by Firestore. All user data goes to Firestore Database.</p>
      <p><em>"Who wants to be a millionaire"</em> and <em>"Frontend IT quiz"</em> games each time give a different pack of 10 random questions.</p>
      <p>To <strong>create your own quiz</strong> you should sign in. There is no email verification,
      input any email and password, let the browser remember it for you to be able to sign in again.</p>
      <p>An authorized user also can star his favorite quizzes and delete his own quizzes.</p>
      <p>Enjoy ❤</p>
    </div>
  </div>
)

export default About
