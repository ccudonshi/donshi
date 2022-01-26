import React, { Component, PureComponent, useCallback } from 'react'
import { Image, Text, StyleSheet, View, Button, TouchableOpacity, TouchableHightLight, Alert, ActivityIndicator, RefreshControl } from 'react-native'
import { PublicAxios, errHandler } from '../helper/network.js'
import { ScrollView } from 'react-native-gesture-handler';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons'
import PostItem from '../component/PostItem'
import CommentItem from '../component/CommentItem'
import { Actions } from 'react-native-router-flux';
import HorizontalItem from '../component/HorizontalItem';
import HorizontalTopic from '../component/HorizontalTopic';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppHelper from '../helper/AppDBHelper'
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from 'react-native-search-box';
import Type from '../model/Type.js';
import { PostsModal } from '../component/PostsModal.jsx';
import AppDBHelper from '../helper/AppDBHelper';
import onScrollEnd from '../helper/onScrollEnd'

//資訊/需求頁面
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default class InfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postType: '',
            modalup: false,
            queryText: '',
            refreshing: false,

        }

        this.search = this.search.bind(this);
        this.addPost = this.addPost.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.onSearchBarCancel = this.onSearchBarCancel.bind(this);
        this.onSearchBarFocus = this.onSearchBarFocus.bind(this);
    }




    // 渲染畫面前
    async componentDidMount() {

    }
    async search() { // not use
        console.log('searching....')
        const manager = await AppDBHelper();
        if (this.state.queryText === '') return this.props.showQueryData([])
        const queryPosts = await manager.queryPost(this.state.queryText)
        const posts = queryPosts.filter(post => (post.isNeed == this.props.isNeed))
        return this.props.showQueryData(posts)
    }
    addPost() {
        Actions.push('post',
            {
                isNeed: this.props.isNeed,
                type: new Type({ id: this.props.typeId }),
            }
        )
    }
    updateSearch(search) {
        // this.setState({ queryText: search }, () => this.search())
    };
    onSearchBarCancel() {
        this.setState({ queryText: '' })
        // this.props.endQuery()
    }
    onSearchBarFocus() {
        // if(!this.props.isQuery)this.props.startQuery()
        Actions.push('query')
    }

    // wait = (timeout) => {
    //     return new Promise(resolve => {
    //         setTimeout(resolve, timeout);
    //     });
    // }
    onRefresh() {
        this.setState = ({ refreshing: true });
        wait(2000).then(() => this.setState = ({ refreshing: true }));
    }

    render() {


        const isGetDataLoading = this.props.isGettingMoreData && this.props.postList && !this.props.isQuery
        // const renderPostItems = this.props.postList.map((post, index) => {
        //     for (const { topic, isDisplay } of this.props.topicList) { // bottlenect ,need to optimal
        //         if (topic.id === post.getTopic().id) {
        //             return (isDisplay)
        //                 ? <PostItem goRefreshNthPost={this.props.goRefreshNthPost(index)} key={post.getId()} post={post} />
        //                 : null;
        //         }
        //     }
        // }
        // );
        if (this.props.postList.length > 0) {
            console.log('object')
            // console.log(this.props.topicList[this.props.topicMap[this.props.postList[0].getTopic().id]])
        }
        const { topicList, topicMap } = this.props
        const renderPostItems = this.props.postList
            .map((post, index) => {
                const display = (topicList[topicMap[post.getTopic().id]]?.isDisplay) ? "flex" : "none"
                // const display = "flex";
                return (
                    <View style={{ display: display }} key={post.getId()} >
                        <PostItem
                            post={post}
                            goRefreshNthPost={this.props.goRefreshNthPost(index)} />
                    </View>)
            });


        // const queryDisplay = (this.props.isQuery)?"flex":"none";
        // const postListDisplay = (!this.props.isQuery)?"flex":"none";



        return (

            <View style={styles.background}>
                <View style={{ marginTop: 30, marginBottom: 10 }}>
                    <TouchableOpacity style={{
                        shadowOffset: { width: 1, height: 1 },
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                    }} onPress={() => Actions.push('query')}>
                        {/* <SearchBar
                            onFocus={this.onSearchBarFocus}
                            style={{ backgroundColor: "white" }}
                            onCancel={this.onSearchBarCancel}
                            placeholder="搜尋"
                            onChangeText={this.updateSearch}
                            value={this.state.queryText}
                        /> */}
                        <View style={{ backgroundColor: '#6C6C6C', padding: 5 }}>
                            <View style={styles.searchBtn}>
                                <EvilIcons name="search" size={24} color="#7B7B7B" />
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
                        <HorizontalItem index={1} typeId={this.props.typeId} setTypeId={this.props.setTypeId} itemImage={require('../../assets/first_menu_food.png')} title={'食'} />
                        <HorizontalItem index={2} typeId={this.props.typeId} setTypeId={this.props.setTypeId} itemImage={require('../../assets/first_menu_cloth.png')} title={'衣'} />
                        <HorizontalItem index={3} typeId={this.props.typeId} setTypeId={this.props.setTypeId} itemImage={require('../../assets/first_menu_home.png')} title={'住'} />
                        <HorizontalItem index={4} typeId={this.props.typeId} setTypeId={this.props.setTypeId} itemImage={require('../../assets/first_menu_transportation.png')} title={'行'} />
                        <HorizontalItem index={5} typeId={this.props.typeId} setTypeId={this.props.setTypeId} itemImage={require('../../assets/first_menu_education.png')} title={'育'} />
                        <HorizontalItem index={6} typeId={this.props.typeId} setTypeId={this.props.setTypeId} itemImage={require('../../assets/first_menu_entertainment.png')} title={'樂'} />
                        <HorizontalItem index={7} typeId={this.props.typeId} setTypeId={this.props.setTypeId} itemImage={require('../../assets/first_menu_health.png')} title={'醫療照護'} />
                    </View>

                </ScrollView>
                {
                    (!this.props.isQuery) &&
                    <HorizontalTopic postType={this.postType} title='菜車' topicList={this.props.topicList} onTopicPress={this.props.switchTopicDisplay}></HorizontalTopic>
                }

                <ScrollView
                    onScroll={({ nativeEvent }) => onScrollEnd(nativeEvent, () => this.props.needMoreData())}
                    scrollEventThrottle={400}
                    style={{ height: '100%' }}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }
                >

                    {/* <View style={{display:postListDisplay}}> */}
                    {
                        (this.props.postList.length === 0)
                            ? <Text style={{ textAlign: "center", fontSize: 16, color: '#5B5B5B', marginTop: 15 }}>這裡還沒有貼文喔!</Text>
                            : renderPostItems
                    }

                    {
                        (!this.props.isQuery && !this.props.alreadyGetAllData && this.props.postList.length !== 0) &&
                        <>{
                            (isGetDataLoading)
                                ? <ActivityIndicator size="small" color={'#0580FF'} />
                                : <Text style={{ textAlign: "center", fontSize: 16, color: '#5B5B5B', marginTop: 15 }}>往下滑取得更多資料</Text>
                        }</>
                    }
                    {/* </View> */}
                    {/* <View style={{display:queryDisplay}}>
                        {
                            (this.props.queryData.length === 0)
                                ? <Text style={{ textAlign: "center", fontSize: 16, color: '#5B5B5B', marginTop: 15 }}>這裡還沒有貼文喔!</Text>
                                : this.props.queryData.map((post, index)=>
                                    <PostItem goRefreshNthPost={this.props.goRefreshNthPost(index)} key={post.getId()} post={post} />
                                )
                        }
                    </View> */}

                </ScrollView>

                {/* 浮動按鈕 */}
                <TouchableOpacity style={styles.floatBtn} onPress={this.addPost}>
                    <Image style={styles.img} source={require('../../assets/create.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

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