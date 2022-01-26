import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MySocketFactory from '../../helper/socketio'



export default class IoTestScreen extends Component {
    socket;
    constructor(props) {
        super(props);
        this.state = {}
        this.onChange = this.onChange.bind(this);
    }
    onChange(data){
        console.log('on Change')
        console.log(data)
    }
    componentDidMount(){
        console.log('socket coonet')
        this.socket = MySocketFactory.getSocket();
        this.socket.open()
        MySocketFactory.listenChange(this.socket,this.onChange);
    }
    componentWillUnmount(){ this.socket.close(); }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
                <Text> textInComponent </Text>
                <Text> textInComponent </Text>
                <Text> textInComponent </Text>
                <Text> textInComponent </Text>
                <Text> textInComponent </Text>
                
            </View>
        )
    }
}
