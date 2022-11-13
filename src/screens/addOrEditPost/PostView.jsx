import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ChooseTopicBox from '../../component/ChooseTopicBox';
import ChooseList from './ChooseList';
// 新增/修改貼文的頁面UI
export default function PostView({
    onSubmit,
    user,
    setModalVisible,
    topic,
    modalVisible,
    setTopic,
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
    navigation,
}) {
    return <View style={styles.background}>
        <View style={styles.top}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.fontBlue}>取消</Text>
            </TouchableOpacity>

            <Text style={styles.bold}>發佈貼文</Text>

            <TouchableOpacity onPress={onSubmit}>
                <Text style={styles.fontBlue}>完成</Text>
            </TouchableOpacity>

        </View>

        <View style={styles.radius_shadow}>



            <ScrollView style={styles.contentBox}>
                <View>
                    <View style={styles.proPicContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.img} source={(user.getPictureUrl()) ? { uri: user.getPictureUrl() } : require('app/assets/profile.png')} />
                            <View style={styles.nameTimeContainer}>
                                <Text style={{ fontSize: 18 }}>{user.username}</Text>

                            </View>
                        </View>


                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={styles.theme}>{topic.topicName || '選擇主題'}</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <ChooseTopicBox
                    typeId={type}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    setTopic={setTopic} />




                <TextInput
                    value={title}
                    onChangeText={(title) => setTitle(title)}
                    style={styles.input}
                    placeholder='公告標題'
                    // fontSize={20}
                    numberOfLines={2}
                    multiline={true}
                    maxLength={18}

                >
                </TextInput>

                <View style={styles.divide} />
                <TextInput
                    value={text}
                    onChangeText={(text) => setText(text)}
                    style={styles.input}
                    placeholder='想公告什麼......？'
                    // fontSize={20}
                    multiline={true}
                    numberOfLines={5}
                    maxLength={1000}>
                </TextInput>
            </ScrollView>



            <View style={styles.listContainer}>
                <ChooseList
                    navigation={navigation}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    region={region}
                    setRegion={setRegion}
                    images={images}
                    setImages={setImages}
                />
            </View>


        </View>

    </View>;
}
const styles = StyleSheet.create({
    background: {
        // position:'relative',
        flex: 1,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center'
    },
    top: {
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    fontBlue: {
        fontSize: 16,
        color: '#5698FC'
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#545454'
    },
    img: {
        marginLeft: 5,
        width: 40,
        height: 40,
        borderRadius: 100,
        borderColor: '#6C6C6C',
        overflow: 'hidden',
    },
    proPicContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        // justifyContent:'space-between',
        marginTop: 15,
        marginBottom: 30,
        flexDirection: 'row'
    },
    nameTimeContainer: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    theme: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        fontSize: 18,
        // marginLeft:120,
        color: '#A7D379',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 8,
        overflow: 'hidden',

        // width:100  
    },

    input: {
        fontSize: 18,
        marginLeft: 2,
        marginTop: 0,
    },
    contentBox: {
        height: 300
    },
    divide: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#ADADAD',
        height: 2
    },
    radius_shadow: {
        justifyContent: 'space-between',
        flex: 1,
        width: '90%',
        margin: 20,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
    },

    listContainer: {
        marginBottom: 10,
        borderRadius: 8,
        padding: 0,
        // overflow:'hidden',
        justifyContent: 'flex-end',
        backgroundColor: '#fff',

    }
})


