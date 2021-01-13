import { withTranslation } from '../i18n';
import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/LoginForm'

const Login = ({ t }) => {
  const router = useRouter();
  const { user, loading } = useAuth();
  // if (user) {
  //   router.push("/users");
  // }
  return (
    <div className="register-body">
      <div id="partner-login">
        <p className="language">
          <a href="/partner/login?locale=en" className="active">English</a>
          <a href="/partner/login?locale=es" className="">Español</a>
        </p>
        <div id="partner-login-form" className="row">
          <div className="container form-login">
            <div className="icon">
              <img src="https://s3.eu-west-2.amazonaws.com/ifeel-media/images/Ifeel_pos_rgb0.5x.png" alt="" />
            </div>

            <h1 className="title">{t('sign_in')}</h1>
            <div className="login-form row">
              <div className="forms-container new-styles-form ">
                <div>
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
          <div className="photo-login" ></div>
        </div>
      </div>
    </div>
  )
}

export default withTranslation('common')(Login);
