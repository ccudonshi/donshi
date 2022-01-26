import React, { useState } from 'react';
import { Text, View, Alert, Modal, TouchableHighlight,StyleSheet } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';

export function ModelUPRadio({ data,isRadioVisible, onRadioSubmit }) {
    const [selectValue, setSelectValue] = useState(null);
    if(data == null) {
        data = [{ label: '男' }, { label: '女' }, { label: '其他' }] 
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isRadioVisible}
            onRequestClose={() => { Alert.alert("選單已經進行關閉"); }}>
            <View style={modelStyles.centeredView}>
                <View style={modelStyles.modalView}>
                    <Text style={modelStyles.modalText}>性別</Text>
                    <View style={{ width: "100%", padding: 10 }}>
                        <RadioButtonRN
                            data={data}
                            selectedBtn={({ label }) => setSelectValue(label)} />
                    </View>

                    <TouchableHighlight
                        style={{ ...modelStyles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => onRadioSubmit(selectValue)}>
                        <Text style={modelStyles.textStyle}>確認</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    );
}

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



