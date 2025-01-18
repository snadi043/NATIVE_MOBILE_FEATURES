import { useEffect, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import PlaceList from '../components/Places_List';
import { useIsFocused } from '@react-navigation/native';

export default function AllPlacesScreen({route}){

    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFoused = useIsFocused();
    useEffect(() => {
        if(isFoused && route.params){
            setLoadedPlaces((prevPlaces) => [
                ...prevPlaces, route.params.place
        ]);
        }
    }, [route, isFoused]);

    return (
        <View>
            <PlaceList places={loadedPlaces}/>
        </View>
    );
}

const styles = StyleSheet.create({

});