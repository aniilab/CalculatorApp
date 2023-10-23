import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Calculator from './screens/Calc';
import AuthorScreen from './screens/Author';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2d644d',
        inactiveTintColor: 'gray', 
      }}
      >
        <Tab.Screen
          name="Calculator"
          component={Calculator}
          options={{
            tabBarLabel: '',
             tabBarIcon: ({ color, size }) => (
              <Icon name="calculator" size={size} color={color} /> 
            ),
          }}
          
        />
        <Tab.Screen
          name="Author"
          component={AuthorScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" size={size} color={color} /> 
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
