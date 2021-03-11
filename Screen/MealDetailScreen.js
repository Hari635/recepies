import React, { useCallback,useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from "../Components/HeaderButton";
import { ListItem, Header, Card } from 'react-native-elements'
import Spacer from "../Components/Spacer";
import { toggleFavorite } from "../store/actions/meals";



const MealDetailScreen = (props) => {

    const mealid = props.navigation.getParam('mealId')
    const avaliablemeal=useSelector((state)=>{
        return(state.meals.meals)
    })
    const currentMealIsFavorite = useSelector(state =>
        state.meals.favoriteMeals.some(meal => meal.id === mealid)
      );
    
    const selected = avaliablemeal.find((meal) => {
        return (meal.id === mealid)
    })

    const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealid));
  }, [dispatch, mealid]);

  useEffect(() => {
    // props.navigation.setParams({ mealTitle: selectedMeal.title });
    props.navigation.setParams({toggleFav: toggleFavoriteHandler});
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);
    return (
        <ScrollView>
            <Image source={{ uri: selected.imageUrl }} style={styles.image} />
            <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                <Text>{selected.duration}m</Text>
                <Text>{selected.complexity.toUpperCase()}</Text>
                <Text>{selected.affordability.toUpperCase()}</Text>
            </View>
            <Header
                centerComponent={{ text: 'INGRIDANT', style: { color: 'black', fontSize: 15, paddingBottom: 25 } }}
                containerStyle={{ height: '5%', backgroundColor: '#ffff99', paddingTop: 20 }}
            />
            <Spacer/>
            <Card>
                {selected.ingredients.map((l, i) => (
                    <ListItem
                        key={i}
                        title={l}
                        bottomDivider
                    />
                ))
                }
            </Card>
            <Spacer/>
            <Header
                centerComponent={{ text: 'STEPS', style: { color: 'black', fontSize: 15, paddingBottom: 25 } }}
                containerStyle={{ height: '5%', backgroundColor: '#adebad', paddingTop: 20 }}
            />
            <Card>
                <Text>{selected.steps}</Text>
            </Card>
            <Spacer/>
            <Spacer/>
        </ScrollView>
    )
}

MealDetailScreen.navigationOptions = (naviprops) => {

    // const mealid = naviprops.navigation.getParam('mealId')
    const selected = naviprops.navigation.getParam('mealTitle')
    const toggleFavorite = naviprops.navigation.getParam('toggleFav')
    const isFavorite = naviprops.navigation.getParam('isFav');
    return {
        headerTitle: selected,
        headerStyle: {
            backgroundColor: Colors.primaryColor
        },
        headerTintColor: 'white',
        headerRight: () => {


            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Favorite"
                        iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
                        onPress={toggleFavorite}
                    />
                </HeaderButtons>)
        }
    }
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: '100%'
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    viewstyle: {
        paddingTop: 30
    }
})

export default MealDetailScreen

