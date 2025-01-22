// Keep the imports from the expo-image-picker in the same format to keep the app out of errors.

import * as ImagePicker from 'expo-image-picker';

import {View, Text, Alert, Image, StyleSheet} from 'react-native';

import { useState } from 'react';
import { Colors } from '../../constants/colors';
import OutlinedButton from './OutlinedButton';

export default function ImagePick({onPickImage}){
    const [imagePicked, setImagePicked] = useState(null);

    // The ImagePicker package provides the hook useCameraPermissions to verify the status 
    // of the users camera permissions on their devices.
    const [cameraPermissionInfo, requestPermission] = ImagePicker.useCameraPermissions();


    // Also, the pacakge gives us with inbuild enums for status to check them 
    // and handle the camera functionality respectively.
    async function verifyPermission(){

        if(cameraPermissionInfo.status === ImagePicker.PermissionStatus.DENIED){
            Alert.alert('Permission Denied', 'The app needs you to grant permission to use your mobile camera to click images.');
            return false;
        }

        if(cameraPermissionInfo.status === ImagePicker.PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted; // If the status is undetermined returning the default value as true to continue.
        }
        return true;
    }

    // The Image Picker package gives access to use the method launchCameraAsync which is an Async function
    // and expects a promise.
    // Also in this method launchCameraAsync() we can set different options and refer this link for more details
    // https://docs.expo.dev/versions/latest/sdk/imagepicker/#imagepickeroptions
    
    async function clickImageHandler(){
        //Storing the result of VerifyPermissions function in a constant.
        const hasPermissions = await verifyPermission();
        console.log(hasPermissions);

        if(!hasPermissions){
            return;
        }

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,
        });
        console.log(image);
        if(!image.canceled){
            setImagePicked(image.assets[0].uri);
            onPickImage(image.assets[0].uri);
        }
    }

    let imagePreview = <Text>No image found yet.</Text>

        if(imagePicked){
            console.log(imagePicked);
            imagePreview = (<Image
            source={{ uri: imagePicked}} 
            style={styles.image}/>);
        }

    return (
        <View>
            <View style={styles.imageContainer}>{imagePreview}</View>
            <OutlinedButton name="camera" onPress={clickImageHandler}>Take picture</OutlinedButton>
        </View>
    );
} 

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        height: 200,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary500,
        borderRadius: 4,
        marginVertical: 8,
        overflow:'hidden'
    }
});