import { View, Pressable, Modal, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons.js';

import styles from './EmojiPicker.module.js';

const EmojiPicker = ({isVisible, children, onClose})=>{
    return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Choose a sticker</Text>
                <Pressable onPress={onClose}>
                    <MaterialIcons name="close" color="#fff" size={24}/>
                </Pressable>
            </View>
            {children}
        </View>
    </Modal>
    )
}
export default EmojiPicker;