import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Image,
    Animated
} from 'react-native';
import posed from 'react-native-pose'
import {Audio} from 'expo-av';
import {db} from '../db'
import {ListSkins} from '../services/ServiceInterface'
import Fruit, {Bad_Fruit} from './Fruit';
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
                          require("../assets/Monster_assets/Skins/7.png"), require("../assets/Monster_assets/Skins/8.png")],
            hand:false,
            bgPic:'',
            handpic:'',
            current_skin: require("../assets/Monster_assets/Skins/1.png"),
            character_visible: 0,
            cur_money: 0,
            bgMusic: require('../assets/Music_assets/Loops/intro.wav'),
            playingMusic: {},
            sfx: 'put require paths here',
            accnt_exist: false,
            accnt_id: 0,
            accnt_list: 0,
            monPos: false,
            highscore: 0
        }
        this.handlePositionChange = this.positionChange.bind(this)
    }

    //Hides the ting ya know....
    static navigationOptions = {
        header: null
    };

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
                    onPress={() => this.setState({store: true})}
                    style={styles.Button}>
                    <Text style={styles.btnText}>Store</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.startGame.bind(this)}
                    style={styles.Button}>
                    <Text style={styles.btnText}>Start</Text>
                </TouchableOpacity>
            </View>
        )
    }

    startGame() {
        this.setState({
            menu: false,
            store: false,
            candy: false,
            bad_candy: false,
            hand: true,
            score: 0,
            opentimer: 2000,
            candyPic: '',
            character_visible: 1,
            timer: setTimeout(this.openHand.bind(this), ((Math.random() * 5) + 1) * 1000)
        })
    }

    takeCandy(type) {
        clearTimeout(this.state.closeTimer);
        if (type) {
            this.setState({score: this.state.score + 1, opentimer: this.state.opentimer * .8, monPos: true});
            //todo some animation for the monster
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
            this.setState({candy: true})
        } else {
            this.setState({bad_candy: true})
        }
        this.setState({closeTimer: setTimeout(this.closeHand.bind(this), this.state.opentimer)})
    }

    closeHand() {
        //todo some animation
        this.endGame()
    }

    reset() {
        this.setState({candy: false, bad_candy: false, hand: false, monPos:false});
        clearTimeout(this.state.closeTimer);
        clearTimeout(this.state.timer);
        this.setState({timer: setTimeout(this.openHand.bind(this), ((Math.random() * 5) + 1) * 1000)})
    }

    async endGame(){

        this.setState({menu: true, candy: false, bad_candy: false, character_visible: 0})

        const new_bal = this.state.score + this.state.cur_money

        const ref_money = db.ref(`/${this.state.accnt_id}/1/Cash`)
        await ref_money.update({ money: new_bal})

        const ref_hscore = db.ref(`/${this.state.accnt_id}/2/HighScore`)
        const hs_snapshot = await ref_hscore.once('value')
        const highscore = hs_snapshot.val();
        console.log(highscore.HighScore)
        if(highscore.HighScore < this.state.score) {
            await ref_hscore.update({HighScore: this.state.score})
            this.setState({highscore: this.state.score})
        }
        
        this.setState({cur_money: new_bal, score: 0})


    }

    playMusic = async (requirePath) => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(requirePath);
            await soundObject.setIsLoopingAsync(true);
            await soundObject.playAsync();
            this.setState({
                playingMusic: soundObject
            })
            // Your sound is playing!
        } catch (error) {
            console.log(error);
        }
    }

    playSFX = async (requirePath) => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(requirePath);
            await soundObject.playAsync();

            // Your sound is playing!
        } catch (error) {
            console.log(error);
        }
    }

    async purchase(new_bal, skin_to_buy){
        
        this.setState({cur_money: new_bal});

        const cash_ref =  db.ref(`/${this.state.accnt_id}/1/Cash`)
        await cash_ref.update({ money: new_bal})
        

        const skin_ref = db.ref(`/${this.state.accnt_id}/0/Skins/${skin_to_buy}`)
        await skin_ref.update({ owned: true })



        const playerRef = db.ref(`/${this.state.accnt_id}`)
        const skin_snapshot = await playerRef.once('value')
        let data = skin_snapshot.val();
        var num_items = data[0].Skins.length;



        for(let i=0; i < num_items; i++) {
            var imageKey = this.state.asset_store[i];
            data[0].Skins[i].image = imageKey
        }
       

        this.setState({skins: data[0].Skins});
        
    }


    async getAccountList() {
        

        var list_db = db.ref(`/`)
        const snapshot = await list_db.once(`value`)
        const data = snapshot.val();
        var accnt_list = Object.keys(data).length
        

        return accnt_list
        
        
    }

    async checkAccountList(accnt_list) {

    
        for(i = 0; i < accnt_list; i++){
            
            const accnt_ref = db.ref(`/${this.state.accnt_id}`)
            const act_snapshot = await accnt_ref.once('value')
            let data = act_snapshot.val();   
            if(data == null) {
                           
                
            } else if(data != null) {
                
                this.setState({accnt_exist: true})
                this.setState({accnt_num: (i)})
                }
                break;
            }
        
    }

    async addAccount() {
        

        


        if(this.state.accnt_exist == false) {

        const add_accnt = db.ref('/')
        const add_snapshot = await add_accnt.child(this.state.accnt_id)
        add_snapshot.set([
            {"Skins":  [
                {
                    "price": 10,
                    "skin_num": 0,
                    "title": "Red",
                    "owned": true
                },
                {
                    "price": 10,
                    "skin_num": 1,
                    "title": "blue",
                    "owned": false
                },
                {
                    "price": 10,
                    "skin_num": 2,
                    "title": "orange",
                    "owned": false
                },
                {
                    "price": 10,
                    "skin_num": 3,
                    "title": "yellow",
                    "owned": false
                },
                {
                    "price": 40,
                    "skin_num": 4,
                    "title": "purple",
                    "owned": false
                },
                {
                    "price": 40,
                    "skin_num": 5,
                    "title": "green",
                    "owned": false
                },
                {
                    "price": 60,
                    "skin_num": 6,
                    "title": "aqua",
                    "owned": false
                },
                {
                    "price": 100,
                    "skin_num": 7,
                    "title": "special",
                    "owned": false
                }
                ]
            },
            
                {"Cash": {
                    "money": 0
                }
                },
                {
                    "HighScore" : {
                      "HighScore" : 0
                    }
                }
            
            ]);

        }
        
    }


    async retriveCash() {
        const playerRef = db.ref(`/${this.state.accnt_id}/1/Cash`)
        const cash_snapshot = await playerRef.once('value')
        const data = cash_snapshot.val();
        this.setState({cur_money: data.money})


    }
    async retriveHighscore() {
        const playerRef = db.ref(`/${this.state.accnt_id}/2/HighScore`)
        const hs_snapshot = await playerRef.once('value')
        const data = hs_snapshot.val();
        this.setState({highscore: data.HighScore})


    }

    async getSkins() {

        
    
        const playerRef = db.ref(`/${this.state.accnt_id}`)
        const skin_snapshot = await playerRef.once('value')
        let data = skin_snapshot.val();
        var num_items = data[0].Skins.length;



        for(let i=0; i < num_items; i++) {
            var imageKey = this.state.asset_store[i];
            data[0].Skins[i].image = imageKey
        }
       

        this.setState({skins: data[0].Skins});
        
        
    }
        

    async componentDidMount() {
        this.playMusic(this.state.bgMusic)

        const { navigation } = this.props;
        const accnt_id = navigation.getParam('accnt_id','No Results');
        this.setState({accnt_id: accnt_id})
        


        var accnt_list = await this.getAccountList();
        
        await this.checkAccountList(accnt_list);
        await this.addAccount();

        await this.retriveCash();
        await this.retriveHighscore();
        await this.getSkins();

    }

    async componentWillUnmount() {
        await this.state.playingMusic.stopAsync()
    }

    openStore() {

        return (
            <View style={styles.Store}>
                <Text style={styles.strText}> Hello I am a Store</Text>
                <Text style={styles.strText}>Current Balance: ${this.state.cur_money}</Text>

                <FlatList
                    style={styles.skin_container}
                    data={this.state.skins}
                    extraData={this.state}
                    renderItem={({item}) => {
                        console.log(item)
                        if(item.owned == false) {
                        return(
                                      
                              <TouchableOpacity onPress={() => {if(item.owned == false) {
                                if(item.price <= this.state.cur_money) {
                                    var new_bal = this.state.cur_money - item.price;
                                    this.purchase(new_bal, item.skin_num)
                                    this.setState({current_skin: item.image})
                                    
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

            </View>

        )
    }

    closeStore() {
        this.setState({store: false})
    }

    render() {
        let Menu = this.state.menu ? this.openMenu() : null;
        let Store = this.state.store ? this.openStore() : null;
        let Candy = this.state.candy ? <Fruit positionChange={this.handlePositionChange}/> : null;
        let Bad_Candy = this.state.bad_candy ? <Bad_Fruit positionChange={this.handlePositionChange}/> : null;
        //let Hand = this.state.hand ? <View style={{height: 50, width: 50, backgroundColor: 'white'}}/> : <View style={{height: 10, width: 10, backgroundColor: 'black'}}/>;

        return (
            <ImageBackground source={require('../assets/Candy_assets/PNG/bg.png')} style={styles.backgroundImage}>

                <View style={styles.container}>
                    <View style={styles.HS}>
                        <Text>Current Score: {this.state.score}</Text>
                        <Text>High Score: {this.state.highscore}</Text>
                    </View>
                    <Image
                        style={{
                            position: 'absolute',
                            width: 100,
                            height: 100,
                            opacity: this.state.character_visible,
                            bottom: 30,
                            left: '35%',
                            justifyContent: 'center'
                        }}
                        source={this.state.current_skin}
                    />
                    
                    {Candy}
                    {Bad_Candy}
                    {Menu}
                    {Store}
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
    HS: {
        flex: 1,
        position: 'absolute',
        left: '10%',
        bottom: '5%',
        opacity: 0.8,
        width: 100,
        height: 100,
        backgroundColor: 'green',
        borderWidth: 4,
        borderColor: 'blue',
        borderRadius: 10
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
    strText: {
        fontSize: 24,
        opacity: 1,
        backgroundColor: '#84BCE8',
        width: '100%',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderColor: 'black',
        borderRadius: 12,
        borderWidth: 4,
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
