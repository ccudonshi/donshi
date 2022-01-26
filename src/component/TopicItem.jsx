import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

// view 
// 陣列
// 陣列 => map

export default function TopicItem({ topic }) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{topic}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: '#000'
    },
    container: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal:40,
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        // alignSelf:'center',
        // resizeMode: 'contain',
        width: undefined,
        height: 35
    },

})