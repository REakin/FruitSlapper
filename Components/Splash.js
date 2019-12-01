import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity, 
    ImageBackground
} from 'react-native';
import * as Google from "expo-google-app-auth";
import PropTypes from 'prop-types';

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            name: "",
            photoUrl: ""
        }

    }




    // signIn = async () => {
    //     try {
    //         const result = await Google.logInAsync({
    //             androidClientId: "274067395902-bpdgr2n4tgm0u5qv2kl84934lsq5d5p7.apps.googleusercontent.com",
    //             scopes: ["profile", "email"]
    //         });

    //         if (result.type === "success") {
    //             console.log(result.user);
    //             this.setState({
    //                 signedIn: true,
    //                 name: result.user.name,
    //                 photoUrl: result.user.photoUrl
    //             });
    //             this.props.navigation.navigate('Game', {
    //                 name: this.state.name,
    //                 photoUrl: this.state.photoUrl,
    //             });
    //         } else {
    //             console.log("cancelled")
    //         }
    //     } catch (e) {
    //         console.log("error", e)
    //     }
    // };






    render() {
        return (
            <ImageBackground source={require('../assets/Candy_assets/PNG/bg.png')} style={{ width: '100%', height: '100%'}}>
            <View style={styles.topContainer}>
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Test')}>
                    
                {/* <Text style={styles.title}>Splash Screen!</Text>
                <Button
                style={styles.Button}
                title={'Play'}
                onPress={()=> this.props.navigation.navigate('Game')}/> */}
                {/* <Text style={styles.title}>Sign In With Google</Text> */}
                {/* <Button
                    title="SIGN IN WITH GOOGLE"
                    onPress={() => this.signIn()}/> */}
                    <Text style={styles.title}>Sweet<Text style={styles.title2}>Tooth</Text></Text>
                    
                    <Button
                    title="Drag"
                    onPress={() => this.props.navigation.navigate('Test')}/>
                    <Button
                    title="Game"
                    onPress={() => this.props.navigation.navigate('Game')}/>
                    

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
        height: 400
    },
    Button: {
        height: 40,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 150
    }
});
