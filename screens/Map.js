import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, {Marker} from "react-native-maps";
import IconButton from "../components/UI/IconButton";

export default function MapScreen({navigation}){


    const [selectedLocation, setSelectedLocation] = useState(null);
    
    const initialRegion = {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };

    function selectLocationHandler(event){
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        // console.log(lat, lng);

    // console.log(selectedLocation);

        setSelectedLocation({latitude: lat, longitude: lng});
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
        navigation.setOptions({
            headerRight: ({tintColor}) => {
                <IconButton 
                    name="save" 
                    color={tintColor} 
                    size={24} 
                    onPress={savedLocationPickerHandler}/>
            }
        });
    }, [navigation, savedLocationPickerHandler]);

   return <MapView
        initialRegion={initialRegion} 
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