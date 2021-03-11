import React from "react";
import { Text,View,StyleSheet,FlatList } from "react-native";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../Data/dummy-data";
import Colors from "../constants/Colors";
import MealItem from "../Components/MealItem";



const FavoritesScreen=(props)=>{
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
    const favMeals = useSelector(state => state.meals.favoriteMeals);

   
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
                        routeName: 'MealDet', params: {
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

    const displayItem = useSelector((state)=>{
        return(state.meals.favoriteMeals)
    })

    if (favMeals.length === 0 || !favMeals) {
        return (
          <View >
            <Text>No favorite meals found. Start adding some!</Text>
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

FavoritesScreen.navigationOptions = {
    headerTitle: "Favorite",
    headerStyle: {
        backgroundColor: Colors.primaryColor
    },
    headerTintColor:'white'
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default FavoritesScreen