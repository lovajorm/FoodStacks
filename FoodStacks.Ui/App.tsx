import React from 'react';
import { View, Text, Button } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Screens/Home'
import Inventory from './Screens/Inventory'
import AddFood from './Screens/AddFood'
import ErrorBoundary from 'react-native-error-boundary'

const Stack = createStackNavigator()
const errorHandler = (error: Error, stackTrace: string) => {
  /* Log the error to an error reporting service */
}
const CustomFallback = (props: { error: Error, resetError: Function }) => (
  <View>
    <Text>Something happened!</Text>
    <Text>{props.error.toString()}</Text>
    <Button onPress={props.resetError()} title={'Try again'} />
  </View>
)

export default function App() {
  return (
    <ErrorBoundary onError={errorHandler} FallbackComponent={CustomFallback}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="FoodStacks">
          <Stack.Screen name="FoodStacks" component={Home} />
          <Stack.Screen name="Inventory" component={Inventory} />
          <Stack.Screen name="Add Food" component={AddFood} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  )
}
