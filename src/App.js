import React from 'react'
import { View, Text, Button, Platform, Linking } from 'react-native'
import ApolloClient from "apollo-boost"
import { createStackNavigator, createSwitchNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'
import Loading from './screens/Loading'
import Home from './screens/Home'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log('GraphQL Error: ', graphQLErrors)
    }
    if (networkError) {
      console.log('Network Error: ', networkError)
    }
  },
  clientState: {
    defaults: {
      isConnected: true
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected }})
          return null
        }
      }
    }
  },
  // cacheRedirects: {
  //   Query: {
  //     movie: (_, { id }, { getCacheKey }) =>
  //       getCacheKey({ __typename: 'Movie', id })
  //   }
  // }
})

const MainNavigator = createMaterialTopTabNavigator({
  Home,
  Profile: Home,
})

const AppNavigator = createSwitchNavigator({
  Loading: Loading,
  Home: MainNavigator
})

const WrappedStack = () => {
  return <I18nextProvider i18n={ i18n }><AppNavigator /></I18nextProvider>
}
export default class App extends React.Component {
  render() {
    return <WrappedStack />;
  }
}