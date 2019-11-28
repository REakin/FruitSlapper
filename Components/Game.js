import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';

export default class Game extends Component {
    constructor(props) {
        super(props);

    }

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
