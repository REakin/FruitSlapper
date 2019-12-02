import { db } from '../db';

import React, { Component } from "react";

let skinRef = db.ref('/Skins');

export default class ListSkins extends Component {

    state = {
        skins: []
    };

    componentDidMount() {
        skinRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let skins = Object.value(data);
            this.setState({skins});
            console.log(this.state.skins)
        })
    }



}