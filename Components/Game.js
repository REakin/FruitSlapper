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
import { Audio } from 'expo-av';


// import { FlatList } from 'react-native-gesture-handler';
import { db } from '../db'
import { ListSkins } from '../services/ServiceInterface'

import Fruit, { Bad_Fruit } from './Fruit';

let PlayerRef = db.ref('/Player');

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candy: false,
            bad_candy: false,
            menu: true,
            store: false,
            skins: [],
            asset_store: [require("../assets/Monster_assets/Skins/1.png"), require("../assets/Monster_assets/Skins/2.png"),
                          require("../assets/Monster_assets/Skins/3.png"), require("../assets/Monster_assets/Skins/4.png"),
                          require("../assets/Monster_assets/Skins/5.png"), require("../assets/Monster_assets/Skins/6.png"),
                          require("../assets/Monster_assets/Skins/7.png")],
            hand:false,
            bgPic:'',
            handpic:'',
            current_skin: require("../assets/Monster_assets/Skins/1.png"),
            character_visible: 0,
            cur_money: 0

        }
        this.handlePositionChange = this.positionChange.bind(this)
    }
    positionChange(x, y, value) {
        if (y > 10) {
            this.takeCandy(value);
        } else {
            this.rejectCandy();
        }
    }


    openMenu() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.setState({ store: true })}
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

        this.setState({menu:false, store:false, candy:false, bad_candy:false, hand:true, score:0, opentimer:2000, candyPic:'', character_visible: 1,
            timer:setTimeout(this.openHand.bind(this),((Math.random() * 10) + 1)*1000)})
    }

    takeCandy(type) {
        clearTimeout(this.state.closeTimer)
        if (type) {
            this.setState({ score: this.state.score + 1 });
            this.reset()
        } else {
            this.endGame()
        }
    }

    rejectCandy() {
        this.reset()
    }

    openHand() {
        if (Math.random() >= .2) {
            this.setState({ candy: true })
        } else {
            this.setState({ bad_candy: true })
        }
        this.setState({ closeTimer: setTimeout(this.closeHand.bind(this), this.state.opentimer) })
    }

    closeHand() {
        //todo some animation
        this.endGame()
    }

    reset() {
        this.setState({ candy: false, bad_candy: false, hand: false })
        clearTimeout(this.state.closeTimer)
        clearTimeout(this.state.timer)
        this.setState({ timer: setTimeout(this.openHand.bind(this), ((Math.random() * 10) + 1) * 1000) })
    }

    endGame(){

        db.ref('/Player/1/Cash').update({
            money: this.state.score + this.state.cur_money
        });

        this.setState({menu:true, candy:false, bad_candy:false, character_visible: 0})
        //todo Send data save HS  and all that jazz
    }

    playAudio = async () => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(require('../assets/Music_assets/Loops/back-home.wav'));
            await soundObject.playAsync();
            // Your sound is playing!
        } catch (error) {
            console.log(error);
        }
    }


    purchase(new_bal, skin_to_buy){
        
        this.setState({cur_money: new_bal})
        console.log(this.state.cur_money)
    componentDidMount() {
        this.playAudio()

        db.ref('/Player/1/Cash').update({
            money: new_bal
        });
        

        console.log(this.state.cur_money)
        
        db.ref(`/Player/0/Skins/${skin_to_buy}`).update({
            owned: true
        });
        }
    }


    componentDidMount() {

        db.ref('/Player/1/Cash').on('value', (snapshot) => {
            let data = snapshot.val();
            this.setState({cur_money: data.money})
        })
        
        PlayerRef.on('value', (snapshot) => {
            let data = snapshot.val();
            var num_items = data[0].Skins.length;
            for(i=0; i < num_items; i++) {
                var imageKey = this.state.asset_store[i]
                data[0].Skins[i].image = imageKey
            }
            this.setState({skins: data[0].Skins});
            //console.log(data);
            //let skins = Object.value(data);
            //console.log(skins);
            console.log(this.state.skins)
        })

    }


    openStore() {


        return (
            <View style={styles.Store}>
                <Text> Hello I am a Store</Text>
                <Text>Current Balance: ${this.state.cur_money}</Text>

                <FlatList
                    style={styles.skin_container}
                    data={this.state.skins}
                    extraData={this.state}
                    renderItem={({item}) => {if(item.owned == false) {
                        return(
                                      
                              <TouchableOpacity onPress={() => {if(item.owned == false) {
                                if(item.price <= this.state.cur_money) {
                                    var new_bal = this.state.cur_money - item.price;
                                    this.purchase(new_bal, item.skin_num)
                                    
                                }

                              } else {
                                  this.setState({current_skin: item.image})
                              }
                              
                              
                              }}>
                                  
                                  <View style={styles.row}>
                                     
                                      <Image
                                          style={{
                                              width: 50,
                                              height: 50
                                          }}
                                        
                                         source={item.image}
                                      />
                                      <Text style={styles.text}> {item.title}</Text>
                                      <Text style={styles.text}> Price: {item.price}</Text>
                                  </View>
                              </TouchableOpacity>
                        )
                    } else {
                        return(
                        <TouchableOpacity onPress={() => {if(item.owned == false) {
                            if(item.price <= this.state.cur_money) {
                                var new_bal = this.state.cur_money - item.price;
                                this.purchase(new_bal, item.skin_num)
                                
                            }

                          } else {
                              this.setState({current_skin: item.image})
                          }
                          
                          
                          }}>
                              
                              <View style={styles.row}>
                                 
                                  <Image
                                      style={{
                                          width: 50,
                                          height: 50
                                      }}
                                    
                                     source={item.image}
                                  />
                                  <Text style={styles.text}> {item.title}</Text>
                                  <Text style={styles.text}> Owned </Text>
                              </View>
                          </TouchableOpacity>
                        )

                    }
                    }

                              
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
    closeStore() {
        this.setState({ store: false })
    }


    render() {
        var Menu = this.state.menu ? this.openMenu() : null;
        var Store = this.state.store ? this.openStore() : null;
        var Candy = this.state.candy ? <Fruit positionChange={this.handlePositionChange} /> : null;
        var Bad_Candy = this.state.bad_candy ? <Bad_Fruit positionChange={this.handlePositionChange} /> : null;
        var Hand = this.state.hand ? <View style={{ height: 50, width: 50, backgroundColor: 'white' }} /> : <View style={{ height: 10, width: 10, backgroundColor: 'black' }} />
        return (
            <ImageBackground source={require('../assets/Candy_assets/PNG/bg.png')} style={styles.backgroundImage}>

            <View style={styles.container}>
                <Text>{this.state.score}</Text>
                {Hand}
                {Candy}
                {Bad_Candy}
                {Menu}
                {Store}


                <Image
                    style={{
                        width: 100,
                        height: 100,
                        opacity: this.state.character_visible,
                        bottom: "5%",
                        left: '35%',
                        justifyContent: 'center'
                
                    }}
                    source={this.state.current_skin}
                    />
            </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    skin_container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#F5FCFF',
    },
    Store: {
        flex: 1,
        position: 'absolute',
        left: '10%',
        top: '10%',
        opacity: 0.8,
        width: '80%',
        height: '80%',
        backgroundColor: 'green',
        borderWidth: 4,
        borderColor: 'blue',
        borderRadius: 10
    },
    title: {
        fontSize: 25,
        textAlign: 'center'
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
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
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
    },
    
      
});
