import { Pressable, View, Text, StyleSheet, Image } from "react-native";

export default function PlaceItem({onSelect, place}){
    return <Pressable onPress={onSelect}>
        <Image source={{uri: place.imageUri}}/>
        <View>
            <Text>{place.title}</Text>
            <Text>{place.address}</Text>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({

})