import React from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { CATEGORIES } from "../Data/dummy-data";
import Colors from "../constants/Colors";
import MealItem from "../Components/MealItem";
import { useSelector } from "react-redux";




const categoriesMealScreen = (props) => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
    
    const render=(itemData)=>{
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);
        return(
            <MealItem
            title={itemData.item.title}
            image={itemData.item.imageUrl}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity}
            affordability={itemData.item.affordability}
            onSelectMeal={() => {
                console.log('hello');
                return(
                    props.navigation.navigate({
                        routeName: 'MealDetail', params: {
                            mealId: itemData.item.id,
                            mealTitle:itemData.item.title,
                            isFav: isFavorite
                        }
                    })
              )
            }}
          />
        )
    }

    const catogoryid = props.navigation.getParam('catagoryid')
    const element = CATEGORIES.find((cat) => {
        if (cat.id === catogoryid) {
            return (cat)
        }
        else {
            return (null)
        }
    })
    const avaliablemeals=useSelector((state)=>{
        return(state.meals.filteredMeals)
    })
    const displayItem = avaliablemeals.filter((meal) => {
        return (meal.categoryIds.indexOf(catogoryid) >= 0)
    })
    if(displayItem.length==0){
        return (
            <View >
              <Text>No meals found, maybe check your filters?</Text>
            </View>
          );

    }


    return (
        <View style={styles.screen} >
            <FlatList data={displayItem} keyExtractor={(item, index) => {
                return (item.id)
            }} renderItem={render}/>
        </View>
    )


}
categoriesMealScreen.navigationOptions = (naviprops) => {

    const catogoryid = naviprops.navigation.getParam('catagoryid')
    const element = CATEGORIES.find((cat) => {
        if (cat.id === catogoryid) {
            return (cat)
        }
        else {
            return (null)
        }
    })

    return {
        headerTitle: element.title,
        headerStyle: {
            backgroundColor: Colors.primaryColor
        },
        headerTintColor: 'white'
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default categoriesMealScreen