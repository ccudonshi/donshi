import PropTypes from "prop-types";
import React, { useEffect } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

// 註冊的第二個頁面 2/2
export default function RegisterSecond({
    onSubmitClick,
    onBackStep,
    pickImage, image, hasError
}) {
    return <View style={styles.background}>
        <Text style={styles.title}>註冊(2/2)</Text>
        <Text style={{ color: '#8E8E8E', marginTop: 10 }}>放一張大頭照吧!</Text>
        <View style={{
            marginVertical: 40,
            backgroundColor: '#BEBEBE',
            width: 220,
            height: 220,
            borderRadius: 200,
            borderWidth: 0,
            alignSelf: 'center',
            justifyContent: "center",

        }}>
            {image && !hasError && <Image
                style={{ flex: 1, resizeMode: "cover", borderRadius: 200, }}
                source={{ uri: image.uri }} />}
        </View>
        <TouchableOpacity onPress={onBackStep}>
            <Text style={styles.btnBack}>上一步</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={pickImage}>
            <Text style={styles.btnNext}>選擇照片</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onSubmitClick}>
            <Text style={styles.btnNext}>完成</Text>
        </TouchableOpacity>
    </View>;
}

RegisterSecond.propTypes = {
    hasError: PropTypes.any,
    image: PropTypes.any,
    onBackStep: PropTypes.func,
    onSubmitClick: PropTypes.func,
    pickImage: PropTypes.func,
}




const styles = StyleSheet.create({
    background: {
        flex: 1,
        padding: 40,
        // alignItems:'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 40,
        color: '#7B7B7B'
    },
    textInput: {
        fontSize: 20,
        marginTop: 40,
        borderBottomWidth: 1.5,
        borderBottomColor: '#BEBEBE',
        paddingVertical: 5
    },
    btnNext: {
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 15,
        color: '#fff',
        backgroundColor: '#46A3FF',
        padding: 8,
        borderRadius: 23,
        borderWidth: 5,
        borderColor: '#46A3FF',
        overflow: 'hidden',
        fontSize: 18,
        width: 200
    },
    btnBack: {
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 15,
        color: '#fff',
        backgroundColor: '#46A3FF',
        padding: 8,
        borderRadius: 23,
        borderWidth: 5,
        borderColor: '#46A3FF',
        overflow: 'hidden',
        fontSize: 18,
        width: 200
    }
});



