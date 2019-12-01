import React, { Component } from 'react';
import { View, StyleSheet, PanResponder, Animated, Easing, Dimensions } from 'react-native';
import Draggable from 'react-native-draggable';

const { height, width } = Dimensions.get("window");

export default class Fruit extends Component {
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (e, gesture) => {
                console.log(gesture)
                if (Math.abs(gesture.dx) > 100 || gesture.dy < -150) {
                    Animated.timing(position, {
                        toValue: { x: gesture.dx * 500, y: gesture.dy * 500 },
                        duration: 1000
                    }).start();
                } else {
                    Animated.spring(position, {
                        toValue: { x: 0, y: 0 },
                        friction: 5
                    }).start();
                }
            }
        });

        this.state = {
            panResponder,
            position,
            opacity: 100
        };
    }
    render() {
        let handles = this.state.panResponder.panHandlers;
        return (
            <View style={styles.container}>
                {/* <Animated.View
                    style={[styles.ball, this.state.position.getLayout(), { opacity: this.state.opacity }]}
                    {...handles}
                /> */}
                <Animated.Image
                    source={require('../assets/Monster_assets/BASICO/1.png')}
                    style={[styles.ball, this.state.position.getLayout(), { opacity: this.state.opacity }]}
                    {...handles}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ball: {
        height: 80,
        width: 80,
        borderRadius: 40,
        borderWidth: 40,
    },
    container: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: '10%', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});


// export default class Fruit extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             source: 'http://pixdaus.com/files/items/pics/7/88/310788_b52a1fa4469034b12ef4bb7c8eff11c7_large.jpg'
//         }
//         this.showPos.bind(this)
//     }


//     showPos() {
//         console.log(this.fruit.offsetX)
//     }

//     render() {
//         console.log('imafruit')
//         return (
//             <Draggable
//                 ref={ref => {
//                     this.fruit = ref;
//                 }}
//                 renderSize={56}
//                 renderColor="black"
//                 offsetX={0}
//                 offsetY={0}
//                 renderText="A"
//                 pressDrag={() => alert('touched!!')}
//                 pressDragRelease={this.showPos}
//             />
//         );
//     }
// }