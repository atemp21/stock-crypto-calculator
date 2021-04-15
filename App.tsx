import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import useCachedResources from './hooks/UseCachedResources';
import CalculatorScreen from './screens/CalculatorScreen';
import SettingsScreen from './screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import {getData} from './hooks/PersistentStorage';

export default function App() {

  const darkModeEnabled =  getData("theme").toString() === "1" ? true : false
  const isLoaded = useCachedResources();
  const Tab = createBottomTabNavigator();

  if(!isLoaded){
    return null;
  }
  else{
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route})=>({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if(route.name === "Calculator"){
                iconName = focused ? "ios-calculator" : "ios-calculator-outline";
              }else if(route.name === "Settings"){
                iconName = focused ? "ios-settings" : "ios-settings-outline";
              }
              return <Ionicons name={iconName} size={size} color={color}/>;
            },
          })}
          tabBarOptions={{
            activeTintColor:'tomato',
            inactiveTintColor:'gray'
          }}>
          <Tab.Screen name="Calculator" component={CalculatorScreen}/>
          <Tab.Screen name="Settings" component={SettingsScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

