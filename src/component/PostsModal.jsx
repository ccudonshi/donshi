import React from 'react';
import {  Text,View, Alert, Modal,StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PostItem from './PostItem';
// export function PostModalComponent({postList}){
//     return()=>(
//         <ScrollView style={{height:300}}>
//             {
//                     postList.map((post, index) => (
//                         <PostItem key={index} post={post} />
//                     ))
//             }
//         </ScrollView>
            
    
//     )
       
   
// }
function SubNavbar({onClose,title}){
  return(
    <View>
            <View style={navStyles.container}>
                <TouchableOpacity style={navStyles.leftBtn}  onPress={onClose}>
                  <Text style={{ fontSize:20,color:"white"}}>Back</Text>
                </TouchableOpacity>
                <View style={navStyles.title}>
                        <Text style={{ fontSize:20,color:"white"}}>{ title ||"queryText"}</Text>
                </View>
            </View>
    </View>
  )
}
export function PostsModal({postList,closeModelup,queryText}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => { Alert.alert("選單已經進行關閉"); }}>
            <View style={modelStyles.centeredView}>
                <SubNavbar onClose={closeModelup} title={queryText}/>
                <ScrollView style={{height:300}}>
                    {
                            postList.map((post, index) => (
                                <PostItem key={index} post={post} />
                            ))
                    }
                </ScrollView>
            </View>
        </Modal>
    );
}
const navStyles = StyleSheet.create({
  container: {
      marginTop:20,
      paddingTop: 20,
      ...Platform.select({
      ios: {
          height: 62,
      },
      android: {
          height: 54,
      },
      windows: {
          height: 54,
      },
      }),
      width:'100%',
      display:'flex',
      flexDirection:'row',
      justifyContent:"space-around"
  },
  // leftBtn:{
  //   paddingLeft:15,
  //   justifyContent:'flex-start',
   
  // },
  title:{

  }
})
const modelStyles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
      modalView: {
        width:"80%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})



