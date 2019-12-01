import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import * as Google from "expo-google-app-auth";
import Fruit from './Fruit';


export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: true,
            store:false
        }
    }

    openMenu(){
        return(
            <View>
                <Text>Menu</Text>
                <Button
                    title={"Store"}
                    onPress={()=>this.setState({store:true})}/>
                <Button
                    title={"Start"}
                    onPress={this.startGame.bind(this)}/>
            </View>
        )
    }

    startGame(){
        this.setState({menu:false, store:false})
        
        
    }

    endGame(){
        this.setState({menu:true})
    }

    openStore(){
        return(
            <View style={styles.Store}>
                <Text> Hello I am a Store</Text>
                <Button
                    title={'Close Store'}
                    onPress={this.closeStore.bind(this)}/>
            </View>
        )
    }
    closeStore(){
        this.setState({store:false})
    }

    render() {
        var Menu = this.state.menu ? this.openMenu() : null;
        var Store = this.state.store ? this.openStore() : null;

        return (
            <View style={styles.container}>
                {Menu}
                {Store}
                <Fruit/>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
    },
    Store: {
        flex:1,
        position: 'absolute',
        left:0,
        top:0,
        opacity:0.8,
        width:'100%'
    },
    title:{
        fontSize:25,
        textAlign:'center'
    },
    Button: {
        height: 40,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
