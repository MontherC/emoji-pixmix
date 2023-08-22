import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './CircleButton.module.js';

const CircleButton = ({onPress})=>{
    return (
    <View style={styles.circleButtonContainer}>
        <Pressable style={styles.circleButton} onPress={onPress}>
            <MaterialIcons name ="add" size={38} color="#25292e"/>
        </Pressable>

    </View>
    )
}
export default CircleButton;