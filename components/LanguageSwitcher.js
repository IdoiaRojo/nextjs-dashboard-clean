import { i18n } from '../i18n'
import { useContext } from 'react'
import { I18nContext } from 'next-i18next'
import { withTranslation } from '../i18n'

const LanguageSwitcher = ({t}) => {
  const { i18n: { language } } = useContext(I18nContext)
  const handleOptionChange = (e) => {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <>
      <div className="radio-input">
        <div className="div-language radio-new-style">
          <input
            type="radio"
            name="language"
            value="es"
            checked={language === 'es'}
            onChange={handleOptionChange}
             />
          <label htmlFor="locale_es" className="radio-label">{t('locales_es')}</label>
        </div>
        <div className="div-language radio-new-style">
        <input
            type="radio"
            name="language"
            value="en"
            checked={language === 'en'}
            onChange={handleOptionChange}
             />
          
          <label htmlFor="locale_en" className="radio-label">{t('locales_en')}</label>
        </div>
      </div>
    </>
  )
}

export default withTranslation('common')(LanguageSwitcher)
