import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import OutlinedButton from '../components/UI/OutlinedButton';
import { Colors } from '../constants/colors';
import { useEffect } from 'react';

export default function PlaceDetailsScreen({route, navigation}){

    const [fetchedPlace, setFetchedPlace] = useState();

    function detailsHandler(){
        navigation.navigate('PickMap',{
            initialLat: fetchedPlace.location.lat,
            initialLng: fetchedPlace.location.lng
        });
    } 

    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
           async function loadPlaceData(){
            const place = await fetchPlaceDetails(selectedPlaceId);
            setFetchedPlace(place);
            navigation.setOptions({
                title: place.title,
            })
           }
           loadPlaceData();
    }, [selectedPlaceId]);

    if(!fetchedPlace){
        return (
            <View style={styles.fallbackText}>
                <Text>Loading place data...</Text>
            </View>
        )
    }
    return <ScrollView>
        <Image style={styles.image} source={{uri: fetchedPlace.imageUri}}/>
        <View style={styles.detailsContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{fetchedPlace.address}</Text>
            </View>
            <OutlinedButton
                name="map"
                onPress={detailsHandler}
                >View on Map</OutlinedButton>
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    fallbackText:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        height: '35%',
        minHeight: 300
    },
    detailsContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressContainer:{
        padding: 20
    },
    address:{
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary500,
        textAlign:'center',
    }
})