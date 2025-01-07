import {View, Text, StyleSheet, FlatList} from 'react-native';
import Places from '../models/Places';

export default function PlaceDetails({places}){
    return (
        <View>
            <FlatList 
                keyExtractor={(item) => item.id}
                renderItem={Places}
                data={places}>
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({

});