import React, { useState, useEffect, Fragment } from 'react'
import styles from './newsletter.module.css'

export default function Newsletter() {
  const [formProps, setFormProps] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const inProgress = formProps !== null

  useEffect(() => {
    if (formProps === null) {
      return
    }

    async function sendForm() {
      const response = await fetch(formProps.url, formProps.options)
      const { message = null, errors = null } = await response.json()

      setFormProps(null)
      setFeedback({
        message,
        errors,
      })
    }

    sendForm()
  }, [formProps])

  function onFormSubmit(event) {
    event.preventDefault()
    setFeedback(null)
    setFormProps({
      url: `${event.target.getAttribute('action')}?isAjax=1`,
      options: {
        method: event.target.getAttribute('method'),
        body: new FormData(event.target),
      },
    })
  }

  return (
    <form
      className={styles.newsletterForm}
      action={process.env.NEWSLETTER_FORM_ACTION}
      method="POST"
      onSubmit={onFormSubmit}
    >
      <div className={styles.newsletterForm__box}>
        <h3>Newsletter</h3>
        <p>
          If you'd like me to let you know when I share new content, please
          subscribe. It's free knowledge.
        </p>
      </div>
      <div className={styles.newsletterForm__box}>
        {feedback !== null && feedback.message !== null && (
          <p>{feedback.message}</p>
        )}
        {feedback !== null && feedback.errors !== null && (
          <Fragment>
            <p>Please make sure to provide correct data.</p>
            <FormFields inProgress={inProgress} />
          </Fragment>
        )}
        {feedback === null && <FormFields inProgress={inProgress} />}
      </div>
    </form>
  )
}

function FormFields({ inProgress }) {
  return (
    <Fragment>
      <input
        type="text"
        name="FIRSTNAME"
        placeholder="Your first name"
        aria-label="First name"
        disabled={inProgress}
      />
      <input
        type="email"
        name="EMAIL"
        placeholder="Your email address"
        aria-label="Email address"
        disabled={inProgress}
      />
      <button type="submit" disabled={inProgress}>
        Subscribe
      </button>
      <p>Unsubscribe at any time.</p>
      <p>I won’t send you spam, I promise.</p>
    </Fragment>
  )
}
