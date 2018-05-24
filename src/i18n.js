import i18n from 'i18next'
import { reactI18nextModule } from 'react-i18next'
import RNLanguages from 'react-native-languages'

const lang = RNLanguages.language.substring(0, 2)
// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback) => { return lang },
  init: () => {},
  cacheUserLanguage: () => {}
}

// export default i18n.init({
//   debug: __DEV__,
//   lng: RNLanguages.language,
//   fallbackLng: 'en',
//   ns: ['common'],
//   defaultNS: 'common',
//   resources: { en, pt },
//   interpolation: { escapeValue: false }, // not needed for react
//   react: { wait: true }
// });


i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: lang,
    resources: {
      en: {
        home: {
          title: 'Welcome',
          introduction: 'This text comes from i18next and is provided in english.'
        },
        page2: {
          title: 'Page 2',
          introduction: 'This text on page two.'
        },
        common: {
          actions: {
            toggleToPortuguese: 'Portuguese',
            toggleToEnglish: 'English',
            goToPage2: 'Open page 2'
          },
          infoText: "<0><0>Eins </O><1>Zwei </1><2>Drei </2><3>Vier </3><4>Fünf</4></O>"
        }
      },
      pt: {
        home: {
          title: 'Bem Vindo',
          introduction: 'Bem vindo ao mundo'
        },
        page2: {
          title: 'Pagina 2',
          introduction: 'Introdução na página 2'
        },
        common: {
          actions: {
            toggleToPortuguese: 'português',
            toggleToEnglish: 'inglês',
            goToPage2: 'Ir a pag 2'
          }
        }
      }
    },
    ns: ['common'],
    defaultNS: 'common',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    }
  })


export default i18n