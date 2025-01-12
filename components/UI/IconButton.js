import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";


export default function IconButton({name, color, size, onPress}){
    return <Pressable onPress={onPress} style={({pressed}) => [pressed && styles.pressed, styles.container]}>
        <Ionicons name={name} color={color} size={size}/>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    pressed: {
        opacity: 0.75
    }
})