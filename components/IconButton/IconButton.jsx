import { View, Pressable, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons.js';

import styles from './IconButton.module.js';

const IconButton = ({icon, label, onPress})=>{
    return (
        <Pressable style={styles.iconButton} onPress={onPress}>
            <MaterialIcons name ={icon} size={24} color="#fff"/>
            <Text style={styles.iconButtonLabel}>{label}</Text>
        </Pressable>
    )
}
export default IconButton;