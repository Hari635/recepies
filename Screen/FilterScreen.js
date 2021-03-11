import React, { useState,useCallback,useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from "../Components/HeaderButton";
import Colors from "../constants/Colors";
import { Toggle } from '@ui-kitten/components';
import { Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';
import Toast from 'react-native-simple-toast';


const FilterScreen = (props) => {
    const { navigation } = props;

    const [isGlutenFree, setisGlutenFree] = useState(false)
    const [isVegan, setisVegan] = useState(false)
    const [isVegetarian, setisVegetarian] = useState(false)
    const [isLactoseFree, setisLactoseFree] = useState(false)
    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
          glutenFree: isGlutenFree,
          lactoseFree: isLactoseFree,
          vegan: isVegan,
          isVegetarian: isVegetarian
        };
    
        dispatch(setFilters(appliedFilters));
      }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

      useEffect(() => {
        navigation.setParams({ save: saveFilters });
      }, [saveFilters]);

    return (
        <View style={styles.screen} >
            <Text style={styles.text} h4 >Avaliable Filter/Restriction</Text>
            <View style={styles.filterContainer} >
                <Text style={{fontSize:20}} >Gulten-free</Text>
                <Toggle
                    style={styles.toggle}
                    status='primary'
                    checked={isGlutenFree}
                    onChange={(ischecked) => {
                        return (setisGlutenFree(ischecked))

                    }}>
                </Toggle>
            </View>
            <View style={styles.filterContainer} >
                <Text style={{fontSize:20}} >Vegan</Text>
                <Toggle
                    style={styles.toggle}
                    status='primary'
                    checked={isVegan}
                    onChange={(ischecked) => {
                        return (setisVegan(ischecked))

                    }}>
                </Toggle>
            </View>
            <View style={styles.filterContainer} >
                <Text style={{fontSize:20}} >Vegetarian</Text>
                <Toggle
                    style={styles.toggle}
                    status='primary'
                    checked={isVegetarian}
                    onChange={(ischecked) => {
                        return (setisVegetarian(ischecked))

                    }}>
                </Toggle>
            </View>
            <View style={styles.filterContainer} >
                <Text style={{fontSize:20}} >Lactose-Free</Text>
                <Toggle
                    style={styles.toggle}
                    status='primary'
                    checked={isLactoseFree}
                    onChange={(ischecked) => {
                        return (setisLactoseFree(ischecked))

                    }}>
                </Toggle>
            </View>


        </View>

        
    )
}

FilterScreen.navigationOptions = (naviprops) => {
    return {
        headerTitle: "Filter",
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="menu"
                        iconName="ios-menu"
                        onPress={() => {
                            naviprops.navigation.toggleDrawer()
                        }}
                    />
                </HeaderButtons>)
        },
        headerStyle: {
            backgroundColor: Colors.primaryColor
        },
        headerTintColor: 'white',
        headerRight: ()=>{
            return(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Save"
                iconName="ios-save"
                onPress={()=>{
                    console.log('-------naviprops-----');
                    console.log(naviprops);
                    Toast.showWithGravity('SuccessFully saved!!!', Toast.LONG, Toast.CENTER);
                    naviprops.navigation.getParam('save')()
                }
                }
              />
            </HeaderButtons>)
        }
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        margin: 20,
        fontSize: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        margin:20
    }

})

export default FilterScreen