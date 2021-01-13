import React, { useState } from 'react';
import { withTranslation } from '../i18n'

import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginForm = ({ t }) => {
  const [loginError, setLoginError] = useState('');
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  const router = useRouter();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('email_not_valid'))
        .required(t('email_required')),
      password: Yup.string()
        .min(7, t('min_7_chars'))
        // .password('La password no es válido')
        .required(t('password_required')),
    }),
    onSubmit: async (values) => {
      console.log(values);
      return auth.login(values.email, values.password).then((res) => {
        console.log(res);
        if (!res.error) {
          router.push('/users');
        }
      });
    }
  });

  return (
    <form className="new_user" onSubmit={formik.handleSubmit}>
      <div className="input-row">
        <input
          autoFocus="autofocus"
          placeholder="your@email.com"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange} />
      </div>
      {formik.touched.email && formik.errors.email ? (
        <p className="form-control-error">{formik.errors.email}</p>
      ) : null}
      <div className="input-row">
        <input
          placeholder={t('password')}
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange} />
      </div>
      {formik.touched.password && formik.errors.password ? (
        <p className="form-control-error">{formik.errors.password}</p>
      ) : null}
      <div className="btns">
        <button name="button" type="submit" className="btn BtnSubmit">Enter</button>
        <a className="lost-pass" href="/users/password/new?page_access=partner">Lost password?</a>
      </div>

      {loginError &&
        <p className="form-control-error">{loginError}</p>
      }
    </form>
  )
}

export default withTranslation('common')(LoginForm);
