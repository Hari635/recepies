import 'react-native-gesture-handler';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer';
import CategoryScreen from "../Screen/CategoryScreen";
import CatogoryMealScreen from "../Screen/CatogoryMealScreen";
import MealDetailScreen from "../Screen/MealDetailScreen";
import FaviourtScreen from "../Screen/FaviourtScreen";
import FilterScreen from "../Screen/FilterScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const FavNavigator=createStackNavigator(
    {
        faviourt:FaviourtScreen,
        MealDet:MealDetailScreen

    }
)

const MealNavigator = createStackNavigator({
    Categories: CategoryScreen,
    CategoryMeals: {
        screen: CatogoryMealScreen
    },
    MealDetail: MealDetailScreen
})
const BottomNavigator = createMaterialBottomTabNavigator({
    Meals: {
        screen: MealNavigator, 
        navigationOptions: {
            tabBarColor: "Meal",
            tabBarIcon: (tabinfo) => {
                return (
                    <Ionicons
                        name="ios-restaurant"
                        size={25}
                        color={tabinfo.tintColor} />
                )
            }
        }
    },
    fav: {
        screen: FavNavigator, 
        navigationOptions: {
            tabBarLabel: "favorites",
            tabBarIcon: (tabinfo) => {
                return (
                    <Ionicons
                        name="ios-star"
                        size={25}
                        color={tabinfo.tintColor} />
                )
            }
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: Colors.accentColor
    }
})

const FilterNavigation=createStackNavigator({
    filter:FilterScreen
})

const MainNavigator=createDrawerNavigator({
    Meal:BottomNavigator,
    Filter:FilterNavigation
})


export default createAppContainer(MainNavigator)

// export default MealNavigator;

// npm install react-navigation
// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
// npm install react-navigation-stack @react-native-community/masked-view
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
//here  i am using 4API so when you want to install package check your installing 4API not 5API
