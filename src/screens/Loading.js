import React from 'react'
import { View, Text, Button, Platform, Linking, ActivityIndicator } from 'react-native'
import graphFetch from '../graphFetch'
import { translate } from 'react-i18next'

const url = 'apphub://app'
const uri = 'http://localhost:4000/graphql'

const whoamiQuery = `
  query Query {
    whoami
  }
`

class LoadingScreen extends React.Component {
  // static navigationOptions = ({ navigation, screenProps }) => ({
  //   title: screenProps.t('home:title')
  // })
  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
  }
  componentDidMount () {
    console.log('Loading...')
    this.pingServer()
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        console.log('URL', url)
      })
    } else {
      Linking.addEventListener('url', this.handleOpenURL)
    }
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL)
  }
  
  handleOpenURL = (event) => {
    this.navigate(event.url)
  }

  navigate = (url) => {
    console.log('trying to go to ', url)
    const { navigate } = this.props.navigation
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url)
      } else {
        return Linking.openURL(url)
      }
    }).catch(err => console.error('An error occurred', err))    
  }

  pingServer = () => {
    const { navigation: { navigate } } = this.props
    graphFetch(uri, whoamiQuery)
      .then(res => {
        navigate('Home')
      })
      .catch(err => {
        setTimeout(() =>{
          this.setState({
            error: true
          }, () => this.pingServer())
        }, 1000)
      })
  }
  render() {
    const { error } = this.state
    // console.log('props', this.props)
    const { t, i18n } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 28, color: '#F68657', paddingBottom: 15 }}>Open App</Text>
        <Button
          onPress={() => { i18n.changeLanguage('en') }}
          title={t('common:actions.toggleToEnglish')}
        />
        <Button
          onPress={() => { i18n.changeLanguage('pt') }}
          title={t('common:actions.toggleToPortuguese')}
        />
        <Text>{t('introduction')}</Text>
        <Button
          onPress={() => navigate('Page2')}
          title={t('common:actions.goToPage2')}
        />
        <ActivityIndicator />
        {error && <Button onPress={() => this.navigate('apphub://app')} title='Open App' />}
      </View>
    )
  }
}

export default translate(['home', 'common'])(LoadingScreen)