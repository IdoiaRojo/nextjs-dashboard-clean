import BaseLayout from '@/components/layouts/BaseLayout';
import LanguageSwitcher from '@/components/LanguageSwitcher'
import Form from '@/components/myaccount/Form'
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
              <Form user={user} />
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
