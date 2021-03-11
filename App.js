import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as font from "expo-font";
import { AppLoading } from "expo";
import MealNavigator from "./Navigator/MealNavigator";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { ThemeProvider } from 'react-native-elements';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import mealsReducer from "./store/reducers/meals";

// const FontLoad = () => {
//   return (font.loadAsync({
//     'opensan-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
//     'opensan-Regular': require('./assets/fonts/Roboto-BoldItalic.ttf')
//   }))
// }

const rootReducer = combineReducers({
  meals: mealsReducer
})
const store = createStore(rootReducer)

export default function App() {
  // const [LoadFont, SetLoadFont] = useState(false)

  // if (!LoadFont) {
  //   return (
  //     <AppLoading startAsync={() => {
  //       return (FontLoad())
  //     }} onFinish={() => {
  //       return (SetLoadFont(true))
  //     }} />
  //   )
  // }
  return (

    <Provider store={store} >
      <ThemeProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <MealNavigator />
        </ApplicationProvider>
      </ThemeProvider >

    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // fontFamily:'opensan-Regular',
  },
});
