import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.first_name) {
    errors.first_name = 'Required'
  } else if (values.first_name.length > 15) {
    errors.first_name = 'Must be 15 characters or less'
  }
  if (!values.last_name) {
    errors.last_name = 'Required'
  } else if (values.last_name.length > 15) {
    errors.last_name = 'Must be 15 characters or less'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length > 15) {
    errors.password = 'Must be 15 characters or less'
  }
  if (!values.repeat_password) {
    errors.repeat_password = 'Required'
  } else if (values.repeat_password.length > 15) {
    errors.repeat_password = 'Must be 15 characters or less'
  }else if (values.password === values.repeat_password){
    errors.repeat_password = 'Password not equals'
  }
  return errors
}

const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} className="form-control" type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const SyncValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="first_name" type="text" component={renderField} label="First Name"/>
      <Field name="last_name" type="text" component={renderField} label="Last Name"/>
      <Field name="username" type="text" component={renderField} label="Username"/>
      <Field name="email" type="email" component={renderField} label="Email"/>
      <Field name="password" type="password" component={renderField} label="Password"/>
      <Field name="repeat_password" type="password" component={renderField} label="Repeat Password"/>
      <div>
        <button className="btn btn-default" type="submit" disabled={submitting}>Submit</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'syncValidation',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  warn                     // <--- warning function given to redux-form
})(SyncValidationForm)