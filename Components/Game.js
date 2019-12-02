import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Google from "expo-google-app-auth";
import Fruit, {Bad_Fruit} from './Fruit';


export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candy:false,
            bad_candy:false,
            menu: true,
            store:false,
            hand:false,
            bgPic:'',
            handpic:''
        }
        this.handlePositionChange = this.positionChange.bind(this)
    }
    positionChange(x,y,value){
        if (y>10){
            this.takeCandy(value);
        }else{
            this.rejectCandy();
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
        this.setState({menu:false, store:false, candy:false, bad_candy:false, hand:true, score:0, opentimer:2000, candyPic:'',
            timer:setTimeout(this.openHand.bind(this),((Math.random() * 15) + 1)*1000)})
    }

    takeCandy(type){
        clearTimeout(this.state.closeTimer)
        if(type){
            this.setState({score:this.state.score+1});
            this.reset()
        }else{
            this.endGame()
        }
    }

    rejectCandy(){
        this.reset()
    }

    openHand(){
        if (Math.random() >=.2){
            this.setState({candy:true})
        }else{
            this.setState({bad_candy:true})
        }
        this.setState({closeTimer:setTimeout(this.closeHand.bind(this),this.state.opentimer)})
    }

    closeHand(){
        //todo some animation
        this.endGame()
    }

    reset(){
        this.setState({candy:false, bad_candy:false, hand:false})
        clearTimeout(this.state.closeTimer)
        clearTimeout(this.state.timer)
        this.setState({timer:setTimeout(this.openHand.bind(this),((Math.random() * 15) + 1)*1000)})
    }

    endGame(){
        this.setState({menu:true, candy:false, bad_candy:false})
        //todo Send data save HS  and all that jazz
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
        var Candy = this.state.candy ? <Fruit positionChange={this.handlePositionChange}/> : null;
        var Bad_Candy = this.state.bad_candy ? <Bad_Fruit positionChange={this.handlePositionChange}/> : null;
        var Hand = this.state.hand ? <View style={{height:50,width:50, backgroundColor:'white'}}/> : <View style={{height:10,width:10, backgroundColor:'black'}}/>
        return (
            <View style={styles.container}>
                <Text>{this.state.score}</Text>
                {Hand}
                {Candy}
                {Bad_Candy}
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
    }
});
