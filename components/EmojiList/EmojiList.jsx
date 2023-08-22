import { FlatList, Image, Pressable, Platform } from 'react-native';
import { useState } from 'react';
import styles from './EmojiList.module.js';

const EmojiList = ({onSelect, onCloseModal})=>{
    const [emoji] = useState([
        require('../../assets/emojis/emoji1.png'),
        require('../../assets/emojis/emoji2.png'),
        require('../../assets/emojis/emoji3.png'),
        require('../../assets/emojis/emoji4.png'),
        require('../../assets/emojis/emoji5.png'),
      ]);

    return (
        <FlatList
        horizontal
        showsHorizontalScrollIndicator={Platform.OS ==='web'}
        data={emoji}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index}) =>{
            return(
                <Pressable
                    onPress={()=>{
                        onSelect(item);
                        onCloseModal();
                }}>
                    <Image source={item} key={index} style={styles.image} />
                </Pressable>
            );
        }}
        />
    )
}
export default EmojiList;