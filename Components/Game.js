import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import * as Google from "expo-google-app-auth";

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
        this.setState({menu:false})
    }
    endGame(){
        this.setState({menu:true})
    }

    openStore(){
        return(
            <View style={styles.Store}>
                <Text> Hello I am a Store</Text>
                {/* <Button
                    title={'Close Store'}
                    onPress={this.closeStore.bind(this)}/> */}

                <TouchableOpacity
                        onPress={this.closeStore.bind(this)}
                        style={styles.Button}>
                        <Text style={styles.btnText}>Close Store</Text>
                </TouchableOpacity>

                    
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
                {Store}

                

                <TouchableHighlight
                        onPress={() => this.startGame()}
                        style={styles.Button}>
                        <Text style={styles.btnText}>Close Menu</Text>
                </TouchableHighlight>
                
                <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Splash')}
                        style={styles.Button}>
                        <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity>
                    

                {/* <Button
                    style={styles.Button}
                    title={'Back'}
                    onPress={() => this.props.navigation.navigate('Splash')}/> */}

                    {/* <Button
                    style={styles.Button}
                    title={'Close Menu'}
                    onPress={() => this.startGame()}/> */}
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
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    btnText: {
        fontSize: 24,
        opacity: 1,
        backgroundColor: 'blue',
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
});
