import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import * as Google from "expo-google-app-auth";

export default class Game extends Component {

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
                androidClientId: "659739105235-ejqse1rmiuvbgq8cn1fvfujpu08atrjv.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            });

            if (result.type === "success") {
                console.log(result.user);
                this.setState({
                    signedIn: true,
                    name: result.user.name,
                    photoUrl: result.user.photoUrl
                });
                this.props.navigation.navigate('Home', {
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
                <Text style={styles.title}>Game Screen!</Text>
                <Button
                    style={styles.Button}
                    title={'Back'}
                    onPress={()=> this.props.navigation.navigate('Splash')}/>
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
