import {View, StyleSheet, Text, FlatList} from 'react-native';
import PlaceItem from './PlaceItem';

export default function PlaceList({places}){
    function renderPlaces(itemData){
        return <PlaceItem places={itemData.item}/>
    }

    if(places.isEmpty || places.length == 0){
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No places added yet. Try adding few.</Text>
        </View>
    }
    return (
        <View>
            <FlatList 
                keyExtractor={(item) => item.id}
                renderItem={renderPlaces}
                data={places}>
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: center,
        alignItems: center,
    },
    fallbackText: {
        fontSize: 16,
    }
});