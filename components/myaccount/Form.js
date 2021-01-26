import React, { useState } from 'react';
import { withTranslation } from '../../i18n'

import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

import ToastComponent from '@/components/shared/ToastComponent';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const Form = ({ user, t }) => {
  const [loginError, setLoginError] = useState('');
  const [toast, setToast] = useState('');
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  const router = useRouter();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      nickname: user.nickname,
      email: user.email,
      password: ''
    },
    // validationSchema: Yup.object({
    //   email: Yup.string()
    //     .email(t('email_not_valid'))
    //     .required(t('email_required')),
    //   password: Yup.string()
    //     .min(7, t('min_7_chars'))
    //     // .password('La password no es válido')
    //     .required(t('password_required')),
    // }),
    onSubmit: async (values) => {
      console.log(values);
      setToast('');

    }
  });

  return (
    <form className="" onSubmit={formik.handleSubmit} onKeyDown={(e) => {
      if (e.key === 'Enter') {
        formik.handleSubmit;
      }
    }}>
      <div className="input-row">
        <label>{t('f_nickname')}</label>
        <input className="mb-font-small validate" type="text" value={formik.values.nickname} onChange={formik.handleChange} />
      </div>
      <div className="input-row">
        <label>{t('f_phone')}</label>
        <input className="mb-font-small validate" type="text" name="user[phone]" id="user_phone" />
      </div>
      <div className="input-row">
        <label>{t('f_mail')}</label>
        <input className="mb-font-small validate" readOnly type="email" value={formik.values.email} onChange={formik.handleChange} />
      </div>
      <div className="input-row">
        <label>{t('f_password')}</label>
        <input type="password" value="password" readOnly />
        <a href="/users/modify_password">Editar</a>
      </div>
      <div>
        <input type="submit" value={t('f_save_changes')} className="btn" />
      </div>
    </form>
  )
}

export default withTranslation('common')(Form);
