import './styles/index.css';
import React from 'react';
import FormGroup from './FormGroup';
import FormField from './FormField';
import FormTitle from './FormTitle';
import FormCaption from './FormCaption';
import FormHeader from './FormHeader';

const Form = ({ children }) => <div className="form">{children}</div>;

export default Object.assign(Form, {
  Group: FormGroup,
  Field: FormField,
  Title: FormTitle,
  Caption: FormCaption,
  Header: FormHeader,
});
