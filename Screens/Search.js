import React, {Component} from 'react';
import {Text, View} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import { FlatList } from 'react-native';
import { TouchableOpacity, Image } from 'react-native'
import { ListItem, Header, SearchBar, Card } from 'react-native-elements';
import { ScrollView } from 'react-native';

export default class Search extends Component{

    state = {
        all_recipes : [],
        searchText : '',
        allFilteredRecipes : [],
        allRecipeNames : [],
    }

    componentDidMount = async() => {

        firestore.collection('recipes').onSnapshot((snapshot) => {
            var all_recipes = snapshot.docs.map((doc) => doc.data());
            var allRecipeNames = snapshot.docs.map((doc) => doc.data().recipe_name);
            this.setState({
                all_recipes : all_recipes,
                allRecipeNames : allRecipeNames
            })  
        });
        
    }

    renderItem = ({item}) => (
        <View>
            <Card title = {item.recipe_name}>
                <Text style = {{ textAlign : 'center', marginBottom : 30}}> {item.recipe_description} </Text>
                <TouchableOpacity onPress = {() => {
                    this.props.navigation.navigate('recipe_details', {'details' : item});
                }}>
                    <Text style = {{ alignSelf : 'center', 
                        backgroundColor : 'orange', 
                        justifyContent : 'center',
                        color : 'black',
                        textAlign : 'center',
                        height : 30,
                        width : '30%'
                    }}> Read more </Text>
                </TouchableOpacity>
            </Card>
        </View>
    );

    searchRecipes = () => {
        if(this.state.searchText === this.state.allRecipeNames){
            this.renderItem();
        }else{
            return(
                <View>
                    <Text> No results Found </Text>
                </View>
            )
        }
    }

    // function for searching the user
    // searchRecipe = () => {

    //     const text = this.state.searchText;
    //     const enteredText = text.split('');

    //     if(enteredText[0] === 'A'){

    //     }
    // }

    render(){
        return(
            <View>

                <ScrollView>
                <Header 
                centerComponent = {<Text style = {{fontSize : 26}}> Search recipes </Text>}
                leftComponent = {
                    <TouchableOpacity onPress = {() => {
                        this.props.navigation.openDrawer();
                    }}>
                    <Image source = {require('../Images/hamburgerIcon.png')} style = {{
                        width : 30, 
                        height : 30,
                        alignSelf : 'center'
                    }}></Image>
                    </TouchableOpacity>
                }
                rightComponent = {
                    <TouchableOpacity onPress = {()=> {
                        this.props.navigation.navigate('Notifications');
                    }}>
                    <Image source = {require('../Images/bellIcon.png')} style = {{
                        width : 30, 
                        height : 30,
                        alignSelf : 'center'
                    }}></Image>
                    </TouchableOpacity>
                }></Header>

                <SearchBar 
                placeholder = {'Search recipes ...'} 
                onChangeText = {(text) => {
                    this.setState({
                        searchText : text
                    })
                }} 
                    value = {this.state.searchText}
                ></SearchBar>

                <TouchableOpacity onPress = {() => {

                }}>
                    <Text> Search </Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}