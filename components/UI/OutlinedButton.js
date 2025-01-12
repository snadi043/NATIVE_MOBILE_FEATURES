import { Ionicons } from "@expo/vector-icons";
import { Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";


export default function OutlinedButton({name, onPress, children}){
    return <Pressable 
        onPress={onPress} 
        style={({pressed}) => [pressed && styles.pressed, styles.button]}>
        <Ionicons 
            name={name} 
            color={Colors.primary500} 
            size={18}
            style={styles.icon}
            />
        <Text style={styles.text}>{children}</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 12,
        marginHorizontal: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderWidth: 1,
        borderColor: Colors.primary500,
    },
    pressed: {
        opacity: 0.75
    },
    icon: {
        marginHorizontal: 8,
    },
    text:{
        color: Colors.primary500
    }
})