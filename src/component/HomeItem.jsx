import React from 'react';
import{View, Image, StyleSheet,Text} from 'react-native';

export default class homeItem extends React.Component{
    render(){
        return(
            <View style = {styles.homeItemContainer}>
                <View style={styles.imgView}>
                    <Image
                        source = {this.props.itemImage}
                        style = {styles.image}>      
                    </Image>
                </View>
                
                <Text style={styles.text}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        backgroundColor:'white',
        width: 50,
        height: 50,      
    },
    text:{
        marginTop:7,
        fontSize:18
    },
    homeItemContainer:{
        justifyContent:'center',
        alignItems: 'center',
        width: 120,
        height: 110,
    },
    imgView: {
        elevation: 2,
        backgroundColor:'white',
        borderColor:'white',
        borderRadius:12,
        borderWidth:8,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            height: 2,
            width: 2,
        }   
    }
})