import './gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AllPlacesScreen from './screens/All_Places';
import AddPlacesScreen from './screens/Add_Places';
import IconButton from './components/UI/IconButton';

import { Colors } from './constants/colors';

export default function App() {
  const Stack = createStackNavigator();
  // const navigation = useNavigation();
  return (
    <>
      <StatusBar style='dark'/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: Colors.primary700},
          headerTintColor: Colors.gray700,
          cardStyle: {backgroundColor: Colors.gray700}
          
        }}>
          <Stack.Screen 
            name="AllPlaces" 
            component={AllPlacesScreen}
            options={
              ({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({tintColor}) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => {
                    navigation.navigate('AddPlace')
                  }
                  }
                />
              ),
            })
            }
            ></Stack.Screen>
          <Stack.Screen
            name="AddPlace" 
            component={AddPlacesScreen}
            options={{
              title: 'Add new place'
            }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


