import BaseLayout from '@/components/layouts/BaseLayout';
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { withTranslation } from '../i18n'

import { useAuth } from '@/hooks/useAuth';

const MyAccount = ({ t }) => {
  const { user, loading } = useAuth();
  return (
    <>
      <BaseLayout
        user={user}
        loading={loading}
        navClass="transparent"
        className="cover">
        {loading &&
          <p>Loading</p>
        }
        {user &&
          <div className="content-with-top-menu new_styles" id="my_account_view">
            <div id="account_details" className="card-white loadingContainer">
              <h2>{t('my_account')}</h2>
              <div className="input-row">
                <h3>{t('f_language')}</h3>
                <LanguageSwitcher />
              </div>
              <h3>{t('f_profile')}</h3>
              <form className="new_user" id="new_user" action="/users/update" acceptCharset="UTF-8" method="post">
                <div className="input-row">
                  <label>{t('f_nickname')}</label>
                  <input className="mb-font-small validate" value={user.nickname} type="text" name="user[nickname]" id="user_nickname" />
                </div>
                <div className="input-row">
                  <label>{t('f_phone')}</label>
                  <input className="mb-font-small validate" type="text" name="user[phone]" id="user_phone" />
                </div>
                <div className="input-row">
                  <label>{t('f_mail')}</label>
                  <input className="mb-font-small validate" value={user.email} readOnly type="email" name="user[email]" id="user_email" />
                </div>
                <div className="input-row">
                  <label>{t('f_password')}</label>
                  <input type="password" value="password" readOnly />
                  <a href="/users/modify_password">Editar</a>
                </div>
                <div>
                  <input type="submit" name="commit" value={t('f_save_changes')} className="btn" id="save_changes" disabled="disabled" data-disable-with="Guardar cambios" /></div>
              </form>
              {loading &&
                <div className="loadingDiv"><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i></div>
              }
            </div>
          </div>

        }
      </BaseLayout>
    </>
  )

}

MyAccount.defaultProps = {
  i18nNamespaces: ['common']
}

export default withTranslation('common')(MyAccount);
