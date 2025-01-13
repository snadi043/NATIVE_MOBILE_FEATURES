import { useState } from 'react';
import {View, Text, Alert, Image, StyleSheet} from 'react-native';
import OutlinedButton from "./OutlinedButton";
import { Colors } from '../../constants/colors';

import * as Location from 'expo-location';
import getUserLocation from '../../utilities/location';

export default function LocationPicker(){

    const [locationPicked, setLocationPicked] = useState();

    const [locationStatus, requestLocationPermission] = Location.useForegroundPermissions();

        async function verifyPermissions(){
            if(locationStatus.status === Location.PermissionStatus.DENIED){
                Alert.alert('Permission Denied', 'App need you to allow location permissions to have better experience while using it.');
                return false;
            }
            if(locationStatus.status === Location.PermissionStatus.UNDETERMINED){
                const locationResponse = await requestLocationPermission();
                return locationResponse.granted;
            }
            return true;
        }
    
    async function locationHandler (){
        const hasPermissions = await verifyPermissions();

        if(!hasPermissions){
            return;
        }
        const location = await Location.getCurrentPositionAsync();
        console.log(location);
        setLocationPicked(
            {
            lat: location.coords.latitude, 
            lng: location.coords.longitude
            }
        );
    }

    function pickMapHandler(){

    }

    let content = <Text>No location found yet</Text>

    if(locationPicked){
        content = (<Image
            style={styles.image} 
            source={{uri: getUserLocation(locationPicked.lat, locationPicked.lng),
            }}
            />);
    }

    return (
        <View>
            <View style={styles.locationPreview}>
                {content}
            </View>
            <View style={styles.buttonsContainer}>
                <OutlinedButton
                    name='location'
                    onPress={locationHandler}>Locate me</OutlinedButton>
                <OutlinedButton
                    name='map'
                    onPress={pickMapHandler}>Pick on map</OutlinedButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    locationPreview:{
        height: 200,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary500,
        borderRadius: 4,
        marginVertical: 8,
        overflow: 'hidden'     
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image:{
        height: '100%',
        width: '100%'
    }
})