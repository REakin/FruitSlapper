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
                androidClientId: "274067395902-ci9bfd4okfcs3t0sl59q6eofjuh2pj5h.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            });

            console.log(result);

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
                 <Text style={styles.title}>Sugar Rush</Text>
                <Button
                style={styles.Button}
                title={'Play'}
                onPress={()=> this.props.navigation.navigate('Game')}/>

                <Button
                    title="Log In"
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
    }
});
