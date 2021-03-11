import React from "react";
import { Text, View, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Card, Layout } from '@ui-kitten/components';
import { CATEGORIES } from "../Data/dummy-data";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from "../Components/HeaderButton";
import Colors from "../constants/Colors";

const CategoryScreen = (props) => {

    const render = (itemdata) => {
        return (
            <View>

                <Card style={{...styles.card,...{backgroundColor:itemdata.item.color}}}  onPress={() => {
                    return (props.navigation.navigate({
                        routeName: 'CategoryMeals', params: {
                            catagoryid: itemdata.item.id
                        }
                    }))
                }} >
                    <View style={styles.viewCard}>
                        <Text style={styles.text} numberOfLines={2} >{itemdata.item.title}</Text>
                    </View>
                </Card>
            </View>


        )


    }
    return (
        <View>

            <FlatList numColumns={2} data={CATEGORIES} renderItem={render} keyExtractor={(item, index) => {
                return (item.id)
            }} />
        </View>
    )
}
CategoryScreen.navigationOptions =(naviprops)=> {
    return{
    headerTitle: "Meal Detail",
    headerLeft:()=>{
        return(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="menu"
            iconName="ios-menu"
            onPress={() => {
              console.log('Mark as favorite!');
              console.log(naviprops);
              naviprops.navigation.toggleDrawer()
            }}
          />
        </HeaderButtons>)
    },
    headerStyle: {
        backgroundColor: Colors.primaryColor
    },
    headerTintColor:'white'
}
}


const styles = StyleSheet.create({

    viewCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'

    },
    card: {
        margin: 15,
        height: 150,
        width: 150,
    },
    text: {
        marginTop: '80%',
        fontSize:17,
    }
})

export default CategoryScreen