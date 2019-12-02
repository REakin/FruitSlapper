import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Google from "expo-google-app-auth";
import {Fruit, Bad_Fruit} from './Fruit';


export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fruit:false,
            menu: true,
            store:false,
            hand:false,
            bgPic:'',
            handpic:''
        }
        this.handlePositionChange = this.positionChange.bind(this)
    }
    positionChange(x,y,value){
        console.log(x)
        console.log(y)
        if (y>10){
            console.log('Take');
            this.takeCandy(value);
        }else{
            this.takeCandy(value);
            console.log('Reject');
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
        this.setState({menu:false, store:false, fruit:true, hand:true, score:0, opentimer:5000, candyPic:'',})
    }

    takeCandy(type){
        if(type){
            this.state.score +=1;
            this.Reset()
        }else{
            this.endGame()
        }
    }

    rejectCandy(){
        this.resetpositon()
    }
    openHand(){

    }
    closeHand(){

    }
    Reset(){
        this.setState({fruit:false,hand:false})

    }
    endGame(){
        this.setState({menu:true, fruit:false})
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
        var Candy = this.state.fruit ? <Fruit positionChange={this.handlePositionChange}/> : null;
        var hand = this.state.hand ? <View style={{height:10,width:10, backgroundColor:'white'}}/> : <View style={{height:10,width:10, backgroundColor:'black'}}/>
        return (
            <View style={styles.container}>
                <Text>{this.state.xval}</Text>
                <Text>{this.state.yval}</Text>
                {hand}
                {Candy}
                {Menu}
                {Store}
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
