import { Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function Button({children}){
    return <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.text}>{children}</Text>
    </Pressable>
}

const styles = StyleSheet.create(
    {
        button:{
            backgroundColor: Colors.primary800,
            borderRadius: 4,
            paddingHorizontal: 8,
            paddingVertical: 12,
            elevation: 4,
            shadowColor: 'black',
            shadowRadius: 2,
            shadowOffset: {width:1, height: 1},
            shadowOpacity: 0.15,
        },
        pressed:{
            opacity: 0.75,
        },
        text:{
            textAlign: 'center',
            fontSize: 16,
            color: Colors.primary50,
        }
    }
)