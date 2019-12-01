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
import * as Google from "expo-google-app-auth";
import Fruit from './Fruit';
// import { FlatList } from 'react-native-gesture-handler';


export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: true,
            store:false,
            skinList: [
                    {
                        image: require('../assets/Monster_assets/Skins/2.png'),
                        price: 100,
                        title: 'blue'
                    },
                    {
                        image: require('../assets/Monster_assets/Skins/3.png'),
                        price: 100,
                        title: 'orange'
                    },
                    {
                        image: require('../assets/Monster_assets/Skins/4.png'),
                        price: 100,
                        title: 'yellow'
                    },
                    {
                        image: require('../assets/Monster_assets/Skins/5.png'),
                        price: 300,
                        title: 'purple'
                    },
                    {
                        image: require('../assets/Monster_assets/Skins/6.png'),
                        price: 300,
                        title: 'green'
                    },
                    {
                        image: require('../assets/Monster_assets/Skins/7.png'),
                        price: 400,
                        title: 'aqua'
                    },
            ]
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
        this.setState({menu:false, store:false})
        
        
    }

    endGame(){
        this.setState({menu:true})
    }


   

    openStore(){

        return(
            <View style={styles.Store}>
                <Text> Hello I am a Store</Text>

                <FlatList
                    style={styles.skin_container}
                    data={this.state.skinList}
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

        return (
            <ImageBackground source={require('../assets/Candy_assets/PNG/bg.png')} style={styles.backgroundImage}>

            <View style={styles.container}>
                {Menu}
                

                

                {/* <TouchableHighlight
                        onPress={() => this.startGame()}
                        style={styles.Button}>
                        <Text style={styles.btnText}>Close Menu</Text>
                </TouchableHighlight>
                
                <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Splash')}
                        style={styles.Button}>
                        <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity> */}
                    

                {/* <Button
                    style={styles.Button}
                    title={'Back'}
                    onPress={() => this.props.navigation.navigate('Splash')}/> */}

                    {/* <Button
                    style={styles.Button}
                    title={'Close Menu'}
                    onPress={() => this.startGame()}/> */}
                
                <Fruit/>
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
