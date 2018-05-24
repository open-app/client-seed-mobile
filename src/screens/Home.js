import React from 'react'
import { View, Text } from 'react-native'

export default class HomeScreen extends React.Component {
  // static navigationOptions = ({ navigation, screenProps }) => ({
  //   title: screenProps.t('home:title')
  // })

  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 28, color: '#F68657', paddingBottom: 15 }}>Home</Text>
      </View>
    )
  }
}