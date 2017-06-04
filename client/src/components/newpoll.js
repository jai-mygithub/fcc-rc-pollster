import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';

class NewPoll extends Component {

  renderField = (field) => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <fieldset className={className}>
        <label>{field.label}</label>
        {field.type === 'text' ? <input className='form-control' type={field.type} {...field.input} /> : <textarea className='form-control' type={field.type} {...field.input} />}
        <div className='text-help'>{touched ? error : ''}</div>
      </fieldset >
    );
  }

  publishPoll = (title, options) => {
    axios.post('/api/newpoll',
      { title, options },
      { headers: { authorization: localStorage.getItem('token') } }
    )
      .then(res => {
        this.props.history.push(`/polls/${res.data.pollId}`);
      })
      .catch(() => console.log('Unable to post'));
  }

  handleFormSubmit = ({ title, options }) => {
    title = title.trim();
    options = options.split('\n').filter(item => item.trim() !== '').map(item => {
      const optionObj = { title: item, count: 0 };
      return optionObj;
    });
    this.publishPoll(title, options);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          label='Title'
          name='title'
          type='text'
          component={this.renderField} />
        <Field
          label='Options (separate by lines)'
          name='options'
          type='textarea'
          component={this.renderField} />
        <button action='submit' className='btn btn-primary'>Publish</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title || values.title.trim().length < 1) { errors.title = "Enter a question for your poll"; }

  if (!values.options) {
    errors.options = "Enter you options";
  } else {
    var optionsArray = values.options.split('\n').filter(item => item.trim() !== '');
    if (optionsArray.length < 2) { errors.options = "Enter at least 2 options"; }
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'newpoll'
})(NewPoll);