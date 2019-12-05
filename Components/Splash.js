import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity, 
    ImageBackground,
    Image
} from 'react-native';
import * as Google from "expo-google-app-auth";
import PropTypes from 'prop-types';

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            name: "",
            photoUrl: "",
            accnt_id: 0
        }
    }
    
    static navigationOptions = {
        header: null
    };

    signIn = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: "274067395902-7giinil3jb1bcgaaai8ncc00roajbasn.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            });

            if (result.type === "success") {
                this.setState({
                    signedIn: true,
                    name: result.user.name,
                    accnt_id: result.user.id
                    
                });
                this.props.navigation.navigate('Game', {
                    name: this.state.name,
                    photoUrl: this.state.photoUrl,
                    accnt_id: this.state.accnt_id
                });
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    };

    render() {
        return (
            <ImageBackground source={require('../assets/Candy_assets/PNG/bg.png')} style={styles.backgroundImage}>
            <View style={styles.topContainer}>
                
                <TouchableOpacity onPress={() => this.signIn()}>
                    <Text style={styles.title}>Sweet<Text style={styles.title2}>T
                    <Image source={require('../assets/Candy_assets/PNG/ico/3.png')} style={styles.image}/>
                    <Image source={require('../assets/Candy_assets/PNG/ico/3.png')} style={styles.image}/>
                    th</Text></Text>                   

                    <Text style={styles.press_start}>Press anywhere to start</Text>
                    
                    </TouchableOpacity>
                    
                    
            </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
    },
    image: {
        height: 40,
        width: 40,
    },
    press_start: {
        fontSize:60,
        fontWeight: '900',
        textAlign:'center',
        color: 'white',
        height: 400,
        textShadowColor: 'black',
        textShadowOffset: {width: -3, height : 4},
        textShadowRadius:5

    },
    title:{
        fontSize:60,
        fontWeight: '900',
        textAlign:'center',
        color: 'red',
        fontFamily: 'sans-serif-thin',
        height: 200,
        textShadowColor: 'black',
        textShadowOffset: {width: -3, height : 4},
        textShadowRadius:5
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
      },
    title2:{
        fontSize:60,
        fontWeight: '900',
        textAlign:'center',
        color: 'purple',
        height: 200,
        textShadowColor: 'black',
        textShadowOffset: {width: -3, height : 4},
        textShadowRadius:5
    },
    
    topContainer: {
        flexDirection: 'column',
        flex: 1,
        marginTop: 50,
    },
    Button: {
        height: 40,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    btnText: {
        fontSize: 24,
        backgroundColor: 'blue',
        opacity: 1,
        width: '57%',
        color: 'black',
        alignItems:'center',
        justifyContent: 'center',
        textAlign:'center',
        borderColor: 'black',
        borderRadius: 12,
        borderWidth: 4,
    },
});
