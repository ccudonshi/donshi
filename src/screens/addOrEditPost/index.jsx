import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppHelper from '../../helper/AppDBHelper';
import User from '../../model/User';
import Post from '../../model/Post';
import { getCurrentUserASync } from '../../helper/helper';
import Topic from '../../model/Topic';
import PostView from './PostView';

// AddPostScreen 和 EditPostScreen

// 用來 新增貼文 的頁面
export function AddPostScreen({ isNeed, type }) {
    const [topic, setTopic] = useState(new Topic());
    const [region, setRegion] = useState({}); // latlng
    const [postion, setPostion] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [user, setUser] = useState(new User());

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getCurrentUserASync().then(user => setUser(user));
    }, []);

    const checkHasInvalid = () => ((topic.id == undefined) || (title === '') || (text === ''));

    const getErrorMsg = () => {
        let postfix = '未選擇或填寫';
        let prefix = '';
        if (topic.id == undefined) prefix += ' 主題 ';
        if (title === '') prefix += ' 標題 ';
        if (text === '') prefix += ' 內容 ';
        if (prefix === '') return false;
        else return prefix + postfix;
    };

    const onSubmit = async () => {
        if (checkHasInvalid()) return Alert.alert(getErrorMsg());
        const newPost = new Post({ ...region, title, topic, user, type, text, isNeed, startDate, endDate });
        const manager = await AppHelper();
        manager.addNewPost(images, newPost).then(() => Actions.replace("home", { refresh: {} }));
    };

    return (
        PostView(
            onSubmit,
            user,
            setModalVisible,
            topic,
            modalVisible,
            (value) => {
                setTopic(value);
                setModalVisible(false);
            },
            title,
            setTitle,
            text,
            setText,
            startDate,
            endDate,
            setStartDate,
            setEndDate,
            region,
            setRegion,
            images,
            setImages,
            type,
        )
    );
};

// 用來 編輯已有貼文 的頁面
export function EditPostScreen({ post }) { // Post
    console.log(post)
    const id = post.getId();
    const isNeed = post.isNeed;
    const type = post.getType();
    const files = post.getFiles();
    console.log(post.getLatitude())
    const initRegion = (post.getLatitude() && post.getLongitude()) ? {
        latitude: post.getLatitude(),
        longitude: post.getLongitude(),
    } : {};

    const [topic, setTopic] = useState(post.getTopic());
    const [region, setRegion] = useState(initRegion); // latlng 
    // const [postion, setPostion] = useState('')
    const [startDate, setStartDate] = useState(post.getStartDate());
    const [endDate, setEndDate] = useState(post.getEndDate());
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState(post.getTitle());
    const [text, setText] = useState(post.getText());
    const [user, setUser] = useState(post.getAuthor());
    const [modalVisible, setModalVisible] = useState(false);

    const checkHasInvalid = () => ((topic.id == undefined) || (title === '') || (text === ''));

    const getErrorMsg = () => {
        let postfix = '未選擇或填寫';
        let prefix = '';
        if (topic.id == undefined) prefix += ' 主題 ';
        if (title === '') prefix += ' 標題 ';
        if (text === '') prefix += ' 內容 ';
        if (prefix === '') return false;
        else return prefix + postfix;
    };

    const onSubmit = async () => {
        if (checkHasInvalid()) return Alert.alert(getErrorMsg());
        const newPost = new Post({ id, ...region, title, topic, user, type, text, isNeed, startDate, endDate, files });

        const manager = await AppHelper();
        manager.updatePost(images, newPost).then(() => Actions.replace("home", { refresh: {} }));
    };

    return (
        PostView(
            onSubmit,
            user,
            setModalVisible,
            topic,
            modalVisible,
            (value) => {
                setTopic(value);
                setModalVisible(false);
            },
            title,
            setTitle,
            text,
            setText,
            startDate,
            endDate,
            setStartDate,
            setEndDate,
            region,
            setRegion,
            images,
            setImages,
            type,
        )
    );
};