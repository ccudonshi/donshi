import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity ,Platform} from 'react-native'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import PostItem from "../../component/PostItem";
import AppHelper from '../../helper/AppDBHelper'
import User from '../../model/User';
import { useFocusEffect } from '@react-navigation/native';
import { cancelable } from 'cancelable-promise';
import { useRefreshNthPost } from '../../component/useRefreshNthPost'

import {
    AndroidEditDateModal,
    ProfileEditModal
} from './ProfileEditModal'
import {
    EditGender,
    EditIntroduction,
    EditUserName,
    EditBirthDay,
    EditPhone,
    EditProfileImage
} from "./EditComponets";
import { useSocketIOInNavigation } from '../../component/useSocketIO';
import { Divider } from 'react-native-paper';

function SwitchEditModal({ editType, myUser, setMyUser, closeModal }) {
    switch (editType) {
        case 'gender':
            return <ProfileEditModal actFunc={EditGender({ myUser, setMyUser })} closeModal={closeModal} />;
        case 'username':
            return <ProfileEditModal actFunc={EditUserName({ myUser, setMyUser })} closeModal={closeModal} />;
        case 'info':
            return <ProfileEditModal actFunc={EditIntroduction({ myUser, setMyUser })} closeModal={closeModal} />;
        case 'birthday':
            return (
                (Platform.OS === 'ios')
                    ?   <ProfileEditModal actFunc={EditBirthDay({ myUser, setMyUser })} closeModal={closeModal} />
                    :   <AndroidEditDateModal isVisible={(editType==='birthday')} myUser={myUser} setMyUser={setMyUser} closeModal={closeModal} />
            );
        case 'phone':
            return <ProfileEditModal actFunc={EditPhone({ myUser, setMyUser })} closeModal={closeModal} />;
        case 'image':
            return <ProfileEditModal actFunc={EditProfileImage({ myUser, setMyUser })} closeModal={closeModal} />;
        default:
            return null;
    }
}

// 個人資料頁面
export default function ProfileScreen({ route, navigation }) {
    const refresh = route.params
    const [myUser, setMyUser] = useState(new User())
    const [postList, setPostList] = useState([])
    const [editType, setEditType] = useState(null)
    const [isFetch, setIsFetch] = useState(false)
    const [isUpdateUser, setIsUpdateUser] = useState(false)
    const [checkIsRefreshPost, goRefreshNthPost] = useRefreshNthPost(postList, setPostList);

    // 即時更新留言
    const onChange = (data) => {
        const { post } = data
        setPostList(prePostList => prePostList.map(postValue => (post.getId() === postValue.getId()) ? post : postValue))
    }
    const [hasError, hasConnect] = useSocketIOInNavigation(onChange)

    const editUsername = () => setEditType('username');
    const editInfo = () => setEditType('info');
    const editPhone = () => setEditType('phone');
    const editBirthday = () => setEditType('birthday');
    const editGender = () => setEditType('gender');
    const editImage = () => setEditType('image');
    const closeModal = () => setEditType('');

    const username = myUser.getUserName();
    const phone = myUser.getPhone();
    const bithYear = myUser.getBirthDay().split('-')[0];
    const pictureUrl = myUser.getPictureUrl();
    const info = myUser.getIntroduction();
    const gender = myUser.getGender();

    useFocusEffect(
        useCallback(() => {
            const updateUser = async () => {
                const manager = await AppHelper();
                await manager.updateUser([], myUser)
            }
            let fetchPromise = null;
            if (isFetch) {
                fetchPromise = cancelable(
                    updateUser()
                        .then(()=>setEditType(null))
                        .then(() => setIsUpdateUser(true))
                );
            }
            return () => {
                if (fetchPromise != null && !fetchPromise.isCanceled())
                    fetchPromise.cancel()
            };
        }, [myUser])
    );

    useFocusEffect(
        useCallback(() => {
            if(!isUpdateUser)return;
            
            const fetchPostData = async () => {
                const manager = await AppHelper();
                const infoList = await manager.getMyPosts(false)
                const needList = await manager.getMyPosts(true)
                const totalList = [infoList, needList].flat();
                setPostList(totalList);
            }

            let fetchPromise = cancelable(
                fetchPostData()
                    .then(() => setIsUpdateUser(false))
            )

            return () => {
                if (!fetchPromise.isCanceled())
                    fetchPromise.cancel()
            };
        }, [isUpdateUser])
    );

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                const manager = await AppHelper();
                const myUser = await manager.getMyInfo()
                const infoList = await manager.getMyPosts(false)
                const needList = await manager.getMyPosts(true)
                const totalList = [infoList, needList].flat();
                setMyUser(myUser);
                setPostList(totalList);
            }

            let fetchPromise = cancelable(
                fetchData()
                    .then(() => setIsFetch(true))
            )

            return () => {
                if (!fetchPromise.isCanceled())
                    fetchPromise.cancel()
            };
        }, [refresh])
    );

    return (
        <SafeAreaView style={styles.container}>
            <SwitchEditModal editType={editType} myUser={myUser} setMyUser={setMyUser} closeModal={closeModal} />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 大頭貼 */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
                    <View style={{ marginBottom: 10, marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.profileImage}>
                            {
                                <TouchableOpacity style={styles.image} onPress={editImage}>
                                    <Image
                                            style={styles.image} resizeMode='cover'
                                            source={
                                                (pictureUrl)
                                                    ? { uri: pictureUrl }
                                                    : require('app/assets/profile.png')} />
                                 </TouchableOpacity>
                               
                            }
                        </View>
                        <TouchableOpacity onPress={editUsername}>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 10, color: '#4F4F4F' }}>{username}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <MaterialCommunityIcons onPress={() => navigation.navigate('Settings')} name="cog" style={{ color: '#7c7c7c', marginRight: 30, }} size={30} />
                </View>
                <TouchableOpacity
                    style={{ marginLeft: 25 }}
                    onPress={() => {
                        const newUser = new User(myUser);
                        newUser.userTicket = { hasUserTicket: !myUser.getHasUserTicket() };
                        setMyUser(newUser);
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ marginRight: 10 }} source={myUser.getHasUserTicket() ? require('app/assets/clover.png') : require('app/assets/clover-gray.png')} />
                        <Text>{`我${myUser.getHasUserTicket() ? '有' : '沒有'}好時券`}</Text>
                    </View>
                </TouchableOpacity>
                <Divider style={{ marginHorizontal: 25, marginVertical: 5 }} />
                <Text style={{ marginLeft: 25, fontSize: 15, fontWeight: 'bold' }}>自我介紹</Text>
                <TouchableOpacity onPress={editInfo}>
                    <View style={styles.selfIntro}>
                        <Text style={{ color: '#7B7B7B', fontSize: 15 }}>{(info !== '') ? info : '無'}</Text>
                    </View>
                </TouchableOpacity>
                {/* 資訊欄 */}
                <ScrollView style={styles.statsContainer} horizontal='true' showsHorizontalScrollIndicator={false}>
                    <View style={styles.infoBox}>
                        <View style={styles.statsBox}>
                            <Text style={[styles.text, { fontSize: 22 }]}>{postList.length}</Text>
                            <Text style={[styles.text, styles.subText]}>貼文數</Text>
                        </View>

                        <TouchableOpacity onPress={editPhone}>
                            <View style={[styles.statsBox]}>
                                <Text style={[styles.text, { fontSize: 22 }]}>{phone}</Text>
                                <Text style={[styles.text, styles.subText]}>連絡電話</Text>
                            </View>
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={editGender}>
                            <View style={[styles.statsBox]}>
                                <Text style={[styles.text, { fontSize: 22 }]}>{gender}</Text>
                                <Text style={[styles.text, styles.subText]}>性別</Text>
                            </View>
                        </TouchableOpacity> */}

                        <TouchableOpacity onPress={editBirthday}>
                            <View style={styles.statsBoxRight}>
                                <Text style={[styles.text, { fontSize: 22 }]}>{bithYear}</Text>
                                <Text style={[styles.text, styles.subText]}>出生年</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </ScrollView>

                
                {/* <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    資訊分類按鈕
                    <TouchableOpacity style={styles.infoNeedBtn}>
                        <Text style={{ fontSize: 18, color: '#6C6C6C', paddingHorizontal: 50, paddingVertical: 5 }}>資訊</Text>
                    </TouchableOpacity>

                    需求分類按鈕
                    <TouchableOpacity style={styles.infoNeedBtn}>
                        <Text style={{ fontSize: 18, color: '#6C6C6C', paddingHorizontal: 50, paddingVertical: 5 }}>需求</Text>
                    </TouchableOpacity>
                </View> */}

                {/* 貼文 */}
                <ScrollView>
                    {
                        postList.map((post, index) => (
                            <PostItem goRefreshNthPost={goRefreshNthPost(index)} key={post.getId()} post={post} />
                        ))
                    }
                </ScrollView>

            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    imgView: {
        padding: 5,
        alignItems: 'center',
        borderRadius: 12,
    },
    // 點擊時的background顏色
    itemBgc: {
        backgroundColor: '#FFE8BF',
    },
    infoNeedBtn: {
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10
    },
    container: {
        // padding:30,
        // height: '100%',
        // width: '100%',
        // backgroundColor:'#fff'
    },
    text: {
        // fontFamily: 'HelveticaNeue', android don't have this fontFamily
        color: '#52575D'
    },
    subText: {
        marginTop: 3,
        fontSize: 14,
        color: '#AEB5BC',
        textTransform: 'uppercase',
        fontWeight: '500'
    },
    iconStyle: {
        color: '#5698FC',
        margin: 10
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    titleBar: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 24,
        marginHorizontal: 16,
    },
    profileImage: {
        // borderWidth:3,
        width: 90,
        height: 90,
        borderRadius: 100,
        borderColor: '#FFA042',
        marginTop: 10,
        overflow: 'hidden',
        elevation: 20
    },
    selfIntro: {
        marginRight: 20,
        marginLeft: 25,
        alignSelf: 'flex-start',
        marginTop: 5
    },
    pm: {
        backgroundColor: '#41444B',
        position: 'absolute',
        // top:20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    active: {
        backgroundColor: '#34FFB9',
        position: 'absolute',
        bottom: 20,
        left: 5,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: '#41444B',
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoContainer: {
        // marginTop: 10,
        // alignSelf: 'flex-start',
        // marginLeft: 20,
        // alignItems: 'center',
    },
    infoBox: {
        flexDirection: 'row',
        // backgroundColor:'#000',
        marginHorizontal: 30,
        alignSelf: 'center',
    },
    border: {
        color: '#000',
        width: 10,
        height: 10
    },
    statsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 32,
    },
    statsBox: {
        alignItems: 'center',
        borderRightWidth: 1,
        paddingHorizontal: 15,
        borderColor: '#DFD8C8'
    },
    statsBoxRight: {
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    // mediaImageContainer: {
    //     width: 100,
    //     height: 100,
    //     borderRadius: 12,
    //     overflow: 'hidden',
    //     marginHorizontal:10

    // }
})