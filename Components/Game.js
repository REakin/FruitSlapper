import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Image
   } from 'react-native';


// import { FlatList } from 'react-native-gesture-handler';
import { db } from '../db'
import { ListSkins } from '../services/ServiceInterface'

import Fruit, {Bad_Fruit} from './Fruit';

let skinRef = db.ref('/Skins');

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candy:false,
            bad_candy:false,
            menu: true,
            store:false,
            skins: [],

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
                <TouchableOpacity
                        onPress={()=>this.setState({store:true})}
                        style={styles.Button}>
                        <Text style={styles.btnText}>Store</Text>
                </TouchableOpacity>
               
                <TouchableOpacity
                        onPress={this.startGame.bind(this)}
                        style={styles.Button}>
                        <Text style={styles.btnText}>Start</Text>
                </TouchableOpacity>


                {/* <Button
                    title={"Store"}
                    onPress={()=>this.setState({store:true})}/>
                <Button
                    title={"Start"}
                    onPress={this.startGame.bind(this)}/> */}
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


    componentDidMount() {
        

        skinRef.on('value', (snapshot) => {

            let data = snapshot.val();
            //console.log(data);
            //let skins = Object.value(data);
            //console.log(skins);
            this.setState({skins: data});
            console.log(this.state.skins)
        })
    }


   

    openStore(){
        

        return(
            <View style={styles.Store}>
                <Text> Hello I am a Store</Text>



                <FlatList
                    style={styles.skin_container}
                    data={this.state.skins}
                    extraData={this.state}
                    renderItem={({item}) =>


                              <TouchableOpacity onPress={() => this.props.navigation.navigate('InfoScreen', {info: {item}})}>
                                  <View style={styles.row}>
                                        
                                      <Image
                                          style={{
                                              width: 50,
                                              height: 50
                                          }}
                                          source={item.image}
                                      />
                                      <Text style={styles.text}> {item.title}</Text>
                                      <Text style={styles.text}>Price: {item.price}</Text>


                                  </View>

                              </TouchableOpacity>
                          }
                    keyExtractor={item => item.title}
                    />
                
                <TouchableOpacity
                        onPress={this.closeStore.bind(this)}
                        style={styles.Button}>
                        <Text style={styles.btnText}>Close Store</Text>
                    </TouchableOpacity>

                {/* <TouchableOpacity
                        onPress={this.closeStore.bind(this)}
                        style={styles.Button}>
                        <Text style={styles.btnText}>Close Store</Text>
                </TouchableOpacity> */}
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
            <ImageBackground source={require('../assets/Candy_assets/PNG/bg.png')} style={styles.backgroundImage}>

            <View style={styles.container}>
                <Text>{this.state.score}</Text>
                {Hand}
                {Candy}
                {Bad_Candy}
                {Menu}
                {Store}
            </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
    },
    skin_container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#F5FCFF',
    },
    Store: {
        flex:1,
        position: 'absolute',
        left: '10%',
        top:'10%',
        opacity:0.8,
        width:'80%',
        height: '80%',
        backgroundColor: 'green',
        borderWidth: 4,
        borderColor: 'blue',
        borderRadius: 10
    },
    title:{
        fontSize:25,
        textAlign:'center'
    },
    Button: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    btnText: {
        fontSize: 24,
        opacity: 1,
        backgroundColor: '#84BCE8',
        width: '57%',
        color: 'black',
        alignItems:'center',
        justifyContent: 'center',
        textAlign:'center',
        borderColor: 'black',
        borderRadius: 12,
        borderWidth: 4,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 16,
        borderColor: 'black',
        borderWidth: 1,
        margin: 2,
        marginBottom: 3
    },
    text: {
        fontSize: 24,
        color: 'black'
    }
      
});
