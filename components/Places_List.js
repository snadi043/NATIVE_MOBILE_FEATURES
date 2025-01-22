import {View, StyleSheet, Text, FlatList} from 'react-native';
import PlaceItem from './PlaceItem';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

export default function PlaceList({places}){

    const navigation = useNavigation();
    
        function selectPlaceHandler(id){
            navigation.navigate('PlaceDetails', {
                placeId: id
            });
        }

    if(!places || places.length === 0){
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No places added yet. Try adding few.</Text>
        </View>
    }
    return (
            <FlatList 
                style={styles.list}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <PlaceItem place={item} onSelect={selectPlaceHandler}/>}
                data={places}>
            </FlatList>
    );
}

const styles = StyleSheet.create({
    list: {
    margin: 24,
  },
    fallbackContainer: {
        // flex: 1,
        marginTop: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200,
    }
});