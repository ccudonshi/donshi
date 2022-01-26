import React, { Component,useState, useEffect } from 'react'
import { Text, View, Button,Image } from 'react-native'
import HomeItem from '../../component/HomeItem'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import AppDBHelper from '../../helper/AppDBHelper';
const ImagePickerExample =()=>{
    const [image, setImage] = useState(null);
  
    useEffect(() => {
      (async () => {
        if (Constants.platform.ios) {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        AppDBHelper().then(manager=>manager.uploadImage([result])).then(()=>setImage(result.uri))
      }
    };
  
    return (
      <View style={{  alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
  
export default class ImageTestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"123",
            posts:[{
                id:'fref'
            }],

        }  
    }
    componentDidMount() {
      
    }
    
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
                <Text> textInComponent </Text>
                <Button title="back" onPress={()=> this.setState({name:"456"})}></Button>
                <ImagePickerExample />
            </View>
        )
    }
}