import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AppHelper from '../helper/AppDBHelper';

//InfoScreen上方的 食 衣 住 行 育 樂元件
export default class horizontalItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedColor: [''],

        }
    }

    render() {
        return (
            <View style={styles.homeItemContainer}>
                <TouchableOpacity onPress={() => this.props.setTypeId(this.props.index)} style={this.props.typeId === this.props.index ? [styles.imgView, styles.itemBgc] : [styles.imgView]}>
                    <Image
                        source={this.props.itemImage}
                        style={styles.image}>
                    </Image>
                    <Text style={styles.text}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
    },
    text: {
        marginTop: 3,
        fontSize: 15,
        color: '#7B7B7B'

    },
    homeItemContainer: {
        // alignItems: 'flex-start',
        marginRight: 5,
        // backgroundColor:'#33d136',
        borderRadius: 10

    },
    imgView: {
        padding: 5,
        alignItems: 'center',
        borderRadius: 12,
    },
    // 點擊時的background顏色
    itemBgc: {
        backgroundColor: '#FFE8BF',
    }
})