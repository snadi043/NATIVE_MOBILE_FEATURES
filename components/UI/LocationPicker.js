import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import {View, Text, Alert, Image, StyleSheet} from 'react-native';
import OutlinedButton from "./OutlinedButton";
import { Colors } from '../../constants/colors';

import {
    getCurrentPositionAsync,
    useForegroundPermissions,
    PermissionStatus,
  } from 'expo-location';
import  { getUserLocation, getAddress } from '../../utilities/location';

export default function LocationPicker({onPickLocation}){

    const navigation = useNavigation();

    const route = useRoute();

    // useIsFoused is an hook which helps to render different content based on the existing foucus of the state.
    // Here useIsFocused is used to re-render the component and display the savedUserLocation as a preview by using the data from MapScreen.
    const isFoused = useIsFocused(); // returns boolean value true || false

    const [locationPicked, setLocationPicked] = useState();

    const [locationStatus, requestLocationPermission] = useForegroundPermissions();

    //useEffect hook is used to re-run the code and updating the state whenever the dependencies changes.
    useEffect(() => {
        if(isFoused && route.params){
            const userPickedMap = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng,
            }   
            setLocationPicked(userPickedMap);
            }
        },[isFoused, route]
    );

    //Re-run the component when ever the dependency locationPicked and onPickLocation changes.
    useEffect(() => {
        async function handleAddress(){
            if(locationPicked){
                const address = await getAddress(locationPicked.lat, locationPicked.lng);
                onPickLocation({...locationPicked, address: address});
            }
        };
        handleAddress();
    }, [locationPicked, onPickLocation]);

        async function verifyPermissions(){
            if(locationStatus.status === PermissionStatus.DENIED){
                Alert.alert('Permission Denied', 'App need you to allow location permissions to have better experience while using it.');
                return false;
            }
            if(locationStatus.status === PermissionStatus.UNDETERMINED){
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
        const location = await getCurrentPositionAsync();
        setLocationPicked(
            {
            lat: location.coords.latitude, 
            lng: location.coords.longitude
            }
        );
    }

    function pickMapHandler(){
        navigation.navigate('PickMap');
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