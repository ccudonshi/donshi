import React, { Component, PureComponent, useRef, useState } from 'react'
import { Image, Text, StyleSheet, View, Button, TouchableOpacity, TouchableHightLight, Alert, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import PostItem from '../component/PostItem'
import onScrollEnd from '../helper/onScrollEnd'
import { useEffect } from 'react';
import AppDBHelper from '../helper/AppDBHelper';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';


// 搜尋貼文 的頁面
export default function QueryScreen({ navigation }) {
    const isNeed = false;
    const [queryText, setQuerytext] = useState('')
    const [queryData, setQueryData] = useState([])
    const searchRef = useRef(null)

    // useEffect(() => {
    //     console.log('focus')
    //     console.log(searchRef.current)
    // }, [searchRef.current])
    useEffect(() => {
        if (queryText === '') return
        const search = async () => {
            console.log('searching....')
            const manager = await AppDBHelper();
            if (queryText === '') return setQueryData([])
            const queryPosts = await manager.queryPost(queryText)
            const posts = queryPosts.filter(post => (post.isNeed == isNeed))
            return setQueryData(posts)
        }
        search()
    }, [queryText]);

    return (
        <View style={styles.background}>
            <View style={{ marginTop: 20, marginBottom: 10 }}>
                <TouchableOpacity style={styles.iconStyle} onPress={() => navigation.goBack()}>
                    <AntDesign color='#7c7c7c' name='left' size={24}></AntDesign>
                </TouchableOpacity>
                <TextInput
                    mode='outlined'
                    dense
                    activeOutlineColor='gray'
                    left={<TextInput.Icon name='magnify' />}
                    right={queryText ? <TextInput.Icon name='close' onPress={() => setQuerytext('')} /> : null}
                    style={{ backgroundColor: "white" }}
                    placeholder="搜尋"
                    onChangeText={setQuerytext}
                    value={queryText}
                />
            </View>
            <ScrollView
                scrollEventThrottle={400}
                style={{ height: '100%' }}>

                {
                    (queryData.length === 0)
                        ? <Text style={{ textAlign: "center", fontSize: 16, color: '#5B5B5B', marginTop: 15 }}>這裡還沒有貼文喔!</Text>
                        : queryData.map((post, index) =>
                            <PostItem key={post.getId()} post={post} />
                        )
                }

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    write: {
        color: 'white',
        fontSize: 35,
    },
    floatBtn: {
        position: 'absolute',
        width: 60, height: 60,
        backgroundColor: '#02C874cc',
        borderRadius: 30,
        bottom: 40, right: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowOffset: { width: 0, height: 1 },
    },
    category: {
        // backgroundColor:'blue',
        // textShadowRadius:10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#7B7B7B',
        marginRight: 100
    },
    background: {
        // alignItems:'center',
        // backgroundColor: '#C1FFE4',
        backgroundColor: '#f0f0f0',
        height: '100%',
        width: '100%',
        // padding:20,
        // marginTop:20
    },
    categoryContainer: {
        alignSelf: 'center'
    },
    iconStyle: {
        color: '#5698FC',
        margin: 10
    },
    horizontalBox: {
        flexDirection: 'row',
        width: '90%',
        height: 110,
        marginHorizontal: 20,
        // backgroundColor: '#000',      
    },
    postBtn: {
        marginVertical: 8,
        width: '90%',
        alignSelf: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
    },
    buttonText: {
        color: '#5B5B5B',
        fontSize: 20,
        // fontWeight: 'bold',
    },
    titleBar: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 24,
        marginHorizontal: 16,
    },
})