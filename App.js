import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AllPlacesScreen from './screens/All_Places';
import AddPlacesScreen from './screens/Add_Places';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <>
      <StatusBar style='dark'/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AllPlaces" component={AllPlacesScreen}></Stack.Screen>
          <Stack.Screen name="AddPlace" component={AddPlacesScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


