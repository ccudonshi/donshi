import React, { useState } from 'react'
import { Image, Text, StyleSheet, View, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons'
import PostItem from '../component/PostItem'
import { Actions } from 'react-native-router-flux';
import HorizontalItem from '../component/HorizontalItem';
import HorizontalTopic from '../component/HorizontalTopic';
import Type from '../model/Type.js';
import onScrollEnd from '../helper/onScrollEnd'
import { useMemo } from 'react';

//資訊/需求頁面
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

export default ({
    goRefreshNthPost,
    alreadyGetAllData,
    isGettingMoreData,
    isNeed,
    needMoreData,
    topicList,
    switchTopicDisplay,
    topicMap,
    postList,
    typeId,
    setTypeId,
}) => {
    const [refreshing, setRefreshing] = useState(false);

    const addPost = () => {
        Actions.push('post',
            {
                isNeed,
                type: new Type({ id: typeId }),
            }
        )
    }

    const onRefresh = () => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(true));
    }

    const isGetDataLoading = isGettingMoreData && postList;

    const renderPostItems = useMemo(() => postList.map((post, index) => {
        const display = (topicList[topicMap[post.getTopic().id]]?.isDisplay) ? 'flex' : 'none'
        return (
            <View style={{ display }} key={post.getId()} >
                <PostItem
                    post={post}
                    goRefreshNthPost={goRefreshNthPost(index)} />
            </View>
        );
    }), [topicList, topicMap]);

    return (
        <View style={styles.background}>
            <View style={{ marginTop: 30, marginBottom: 10 }}>
                <TouchableOpacity
                    style={{
                        shadowOffset: { width: 1, height: 1 },
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                    }}
                    onPress={() => Actions.push('query')}
                >
                    <View style={{ backgroundColor: '#6C6C6C', padding: 5 }}>
                        <View style={styles.searchBtn}>
                            <EvilIcons name='search' size={24} color='#7B7B7B' />
                            <Text style={{ color: '#7B7B7B' }}> 搜尋貼文</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>


            <ScrollView horizontal='true' style={styles.horizontalBox} showsHorizontalScrollIndicator={false}>
                <View style={
                    {
                        flexDirection: 'row', shadowColor: 'black', shadowOpacity: 0.2,
                        shadowOffset: { width: 2, height: 2 },
                    }}>
                    {/* index 1-7 食 衣 住 行 育 樂 醫療照護 */}
                    <HorizontalItem index={1} typeId={typeId} setTypeId={setTypeId} itemImage={require('../../assets/first_menu_food.png')} title={'食'} />
                    <HorizontalItem index={2} typeId={typeId} setTypeId={setTypeId} itemImage={require('../../assets/first_menu_cloth.png')} title={'衣'} />
                    <HorizontalItem index={3} typeId={typeId} setTypeId={setTypeId} itemImage={require('../../assets/first_menu_home.png')} title={'住'} />
                    <HorizontalItem index={4} typeId={typeId} setTypeId={setTypeId} itemImage={require('../../assets/first_menu_transportation.png')} title={'行'} />
                    <HorizontalItem index={5} typeId={typeId} setTypeId={setTypeId} itemImage={require('../../assets/first_menu_education.png')} title={'育'} />
                    <HorizontalItem index={6} typeId={typeId} setTypeId={setTypeId} itemImage={require('../../assets/first_menu_entertainment.png')} title={'樂'} />
                    <HorizontalItem index={7} typeId={typeId} setTypeId={setTypeId} itemImage={require('../../assets/first_menu_health.png')} title={'醫療照護'} />
                </View>
            </ScrollView>

            <HorizontalTopic title='菜車' topicList={topicList} onTopicPress={switchTopicDisplay}></HorizontalTopic>

            <ScrollView
                onScroll={({ nativeEvent }) => onScrollEnd(nativeEvent, () => needMoreData())}
                scrollEventThrottle={400}
                style={{ height: '100%' }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {
                    (postList.length === 0)
                        ? <Text style={{ textAlign: 'center', fontSize: 16, color: '#5B5B5B', marginTop: 15 }}>這裡還沒有貼文喔!</Text>
                        : renderPostItems
                }
                {
                    (!alreadyGetAllData && postList.length !== 0) &&
                    <>{
                        (isGetDataLoading)
                            ? <ActivityIndicator size='small' color={'#0580FF'} />
                            : <Text style={{ textAlign: 'center', fontSize: 16, color: '#5B5B5B', marginTop: 15 }}>往下滑取得更多資料</Text>
                    }</>
                }
            </ScrollView>

            <TouchableOpacity style={styles.floatBtn} onPress={addPost}>
                <Image style={styles.img} source={require('../../assets/create.png')} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    searchBtn: {
        marginTop: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginHorizontal: 15,
        padding: 5,
        borderRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.005,
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
    background: {
        backgroundColor: '#f0f0f0',
        height: '100%',
        width: '100%',
    },
    horizontalBox: {
        flexDirection: 'row',
        width: '90%',
        height: 110,
        marginHorizontal: 20,    
    },
})