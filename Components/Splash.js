import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
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


    signIn = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: "274067395902-bpdgr2n4tgm0u5qv2kl84934lsq5d5p7.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            });

            if (result.type === "success") {
                console.log(result.user);
                this.setState({
                    signedIn: true,
                    name: result.user.name,
                    photoUrl: result.user.photoUrl
                });
                this.props.navigation.navigate('Game', {
                    name: this.state.name,
                    photoUrl: this.state.photoUrl,
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
            <View style={styles.container}>
                {/* <Text style={styles.title}>Splash Screen!</Text>
                <Button
                style={styles.Button}
                title={'Play'}
                onPress={()=> this.props.navigation.navigate('Game')}/> */}
                <Text style={styles.title}>Sign In With Google</Text>
                <Button
                    title="SIGN IN WITH GOOGLE"
                    onPress={() => this.signIn()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
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
