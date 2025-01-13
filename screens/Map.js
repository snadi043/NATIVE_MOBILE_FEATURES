import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

export default function MapScreen(){
    const initialRegion = {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
    
    return <MapView
        initialRegion={initialRegion} 
        style={styles.map}>
    </MapView>
}

const styles = StyleSheet.create({
    map:{
        flex: 1,
    }
})