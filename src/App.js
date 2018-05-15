import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import ApolloClient from "apollo-boost"
import gql from "graphql-tag"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      whoami: null
    }
  }
  componentDidMount () {
    client
      .query({
        query: gql`
          {
            whoami
          }
        `
      })
      .then(result => {
        this.setState({
          whoami: result.data.whoami
        })
      })
      .catch(err => console.log('Error on fetch', err))
  }
  render() {
    const { whoami } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 28, color: '#F68657', paddingBottom: 15 }}>Open App</Text>
        <Text style={{ width: '80%', fontSize: 12, textAlign: 'center' }}>{whoami || 'Loading...'}</Text>
      </View>
    )
  }
}

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  },
})
