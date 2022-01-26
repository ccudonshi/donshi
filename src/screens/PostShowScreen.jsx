import React, { useEffect, useState } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PostItem from '../component/PostItem'
import { useSocketIO } from '../component/useSocketIO'
import AppDBHelper from '../helper/AppDBHelper'
import Post from '../model/Post'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

// 點選通知的時候 會連結到的貼文頁面
export default function PostShowScreen({ postId }) {
    console.log(postId)
    const [post, setPost] = useState(new Post({}))
    const onChange = ({ post }) =>
        setPost(prePost =>
            (prePost.getId() === post.getId())
                ? post
                : prePost
        )
    const [hasError, hasConnect] = useSocketIO(onChange)
    useEffect(() => {
        AppDBHelper()
            .then(manager => manager.getPostById(postId))
            .then(post => {
                if (Object.keys(post).length == 0) {
                    Alert.alert('此文已刪除')
                    Actions.pop()
                }
                setPost(post)
            })
            .catch(err => Actions.pop())
    }, [])
    return (
        <View style={{ height: "100%", backgroundColor: '#f0f0f0', padding:10 }}>
            <TouchableOpacity style={styles.iconStyle} onPress={() => Actions.pop()}>
                <AntDesign color='#7c7c7c' name='left' size={24}></AntDesign>
            </TouchableOpacity>
            <ScrollView>
                {(Object.keys(post).length !== 0)
                    && <PostItem post={post} />}
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    iconStyle: {
        marginLeft: 10,
        color: '#8E8E8E',
        marginTop:15
        // margin: 10,

    }
});