import { StatusBar } from 'expo-status-bar';
import {Text, View, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef} from 'react';
import {GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import DomToImage from 'dom-to-image';

import styles from "./App.module.js"
import ImageViewer from './components/ImageViewer/ImageViewer.jsx';
import Button from './components/Button/Button.jsx'
import CircleButton from './components/CircleButton/CircleButton.jsx'
import IconButton from './components/IconButton/IconButton.jsx'
import EmojiPicker from './components/EmojiPicker/EmojiPicker.jsx';
import EmojiList from './components/EmojiList/EmojiList.jsx';
import EmojiSticker from './components/EmojiSticker/EmojiSticker.jsx';


const PlaceholderImage = require('./assets/pics/woman.jpeg');




export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [selectedImage, setSelectedImage] = useState(null);

  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [pickedEmoji, setPickedEmoji] = useState(null);

  const imageRef = useRef();

  if( status=== null || status=== MediaLibrary.PermissionStatus.GRANTED){
    requestPermission();
  }

  const pickImageAsync = async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if(!result.canceled){
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true);
    }else{
      alert("you did not select any image");
    }
  }

  const onReset= ()=>{
    setShowAppOptions(false);
  }

  const onAddSticker = ()=>{
    setIsModalVisible(true);
  }

const onModalClose = ()=>{
  setIsModalVisible(false);
}

  const onSaveImageAsync = async () =>{
    if(Platform.OS !== 'web'){
      try {
        const localUri = await captureRef(imageRef, {
          height:440,
          quality: 1,
        });
        
        await MediaLibrary.saveToLibraryAsync(localUri);
        if(localUri){
          alert("Saved!");
        }
        
      }catch(e){
        console.log(e);
      }
    } else{
      try{
        const dataUrl = await DomToImage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      }catch(e){
        console.log(e);
      }
    }
  }



  return (
    <GestureHandlerRootView style={styles.container}>
          <View style={styles.imageContainer}>
            <View ref ={imageRef} collapsable={false}>

              <ImageViewer 
                placeholderImageSource={PlaceholderImage}
                selectedImage={selectedImage}
              />
              {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
            </View>
          </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style = {styles.optionsRow}>
              <IconButton icon = "refresh" label="Reset" onPress={onReset}/>
              <CircleButton onPress = {onAddSticker} />
              <IconButton icon = "save-alt" label="Save" onPress={onSaveImageAsync}/>
            </View>
          </View>
        ):(
            <View style={styles.footerContainer}>
     
              <Button theme = "primary" label="Choose a photo" onPress={pickImageAsync}/>
              <Button label="Use this photo" onPress = {()=> setShowAppOptions(true)}/>
            
            </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
        <StatusBar style="light" />
    </GestureHandlerRootView>
  ); 
}
