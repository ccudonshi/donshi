import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppDBHelper from '../helper/AppDBHelper';

//選擇主類別後，會跟著變動的子類別
export default class horizontalItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <ScrollView horizontal='true' style={styles.horizontalBox} showsHorizontalScrollIndicator={false}>
                <View style={
                    {
                        flexDirection: 'row', shadowColor: 'black', shadowOpacity: 0.2,
                        shadowOffset: { width: 2, height: 2 },
                    }}>

                    {this.props.topicList.length !== 0 &&
                        this.props.topicList.map((value, index) => (
                            <TouchableOpacity
                                key={value?.topic?.id}
                                style={{ ...styles.background, backgroundColor: (value?.isDisplay) ? '#0B8ECB' : '#8E8E8E77' }}
                                onPress={() => this.props.onTopicPress(value?.topic)}>
                                <Text style={styles.text}>{value?.topic?.topicName}</Text>
                            </TouchableOpacity>
                        ))
                        // this.props.topicList.map(({topic,isDisplay},index)=>console.log(topic))
                    }
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    horizontalBox: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginTop: 10,
        flexDirection: 'row',
        width: '90%',
        height: 70,
        marginHorizontal: 20,
        // backgroundColor:'#000'
    },
    text: {
        fontSize: 15,
        color: '#fff'
    },
    background: {
        marginRight: 8,
        // shadowColor: 'black',
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#0B8ECB',
        borderRadius: 20,

    }
})