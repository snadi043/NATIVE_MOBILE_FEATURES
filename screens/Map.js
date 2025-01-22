import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, {Marker} from "react-native-maps";
import IconButton from "../components/UI/IconButton";

export default function MapScreen({navigation, route}){

    const initialLocation = route.params && {
        lat: route.params.initialLat,
        lng: route.params.initialLng
    }

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const region = {
            latitude: initialLocation ? initialLocation.lat : 37.78825,
            longitude: initialLocation ? initialLocation.lng : -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };

    function selectLocationHandler(event){
        if(initialLocation){
            return;
        }
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;        
        
        //The object here which is to be set has to have the properties only as lat and lng.
        setSelectedLocation({lat: lat, lng: lng});
    }

    //useCallback() hooks is used in order to avoid unnecessary function calls often, rather by using 
    // the state changes which are handled from the cache/ memorized callback and helps in performance of the app. 
    // Basically, avoids re-rendering of the components.
    const savedLocationPickerHandler = useCallback(() => {
        if(!selectedLocation){
            Alert.alert('Invalid Action', 'Please select a location by tapping on the map');
            return;
        }
        navigation.navigate('AddPlace', {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng,
        });
    }, [selectedLocation, navigation]);

    //useLayoutEffect() hook is form of useEffect() hook which is used to verify 
    // the layout adjustments before the components gets renderd on the screen and 
    // runs the cleans up function every time the dependencies changes and brfore the DOM gets rendered on the screen.
    useLayoutEffect(() => {

        if(initialLocation){
            return;
        }

        navigation.setOptions({
            headerRight: ({tintColor}) => (
                <IconButton 
                    name="save" 
                    color={tintColor} 
                    size={24} 
                    onPress={savedLocationPickerHandler}/>
            ),
        });
    }, [navigation, savedLocationPickerHandler, initialLocation]);

   return <MapView
        initialRegion={region} 
        style={styles.map}
        onPress={selectLocationHandler}>
        {
        selectedLocation && (<Marker 
        title="Picked Location"
        coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
            }}/>)
        }
    </MapView>
}

const styles = StyleSheet.create({
    map:{
        flex: 1,
    }
})