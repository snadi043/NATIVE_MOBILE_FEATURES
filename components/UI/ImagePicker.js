// Keep the imports from the expo-image-picker in the same format to keep the app out of errors.

import * as ImagePicker from 'expo-image-picker';
import {PermissionStatus} from 'expo-image-picker';

import {View, Button, Alert} from 'react-native';

export default function PickImage(){

    // The ImagePicker package provides the hook useCameraPermissions to verify the status 
    // of the users camera permissions on their devices.
    const [cameraPermissionInfo, requestPermission] = ImagePicker.useCameraPermissions();

    // Also, the pacakge gives us with inbuild enums for status to check them 
    // and handle the camera functionality respectively.
    async function verifyPermission(){
        if(cameraPermissionInfo.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted; // If the status is undetermined returning the default value as true to continue.
        }
    
        if(cameraPermissionInfo.status === PermissionStatus.DENIED){
            Alert.alert('Permission Denied', 'The app needs you to grant permission to use your mobile camera to click images.');
            return false;
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

        if(!hasPermissions){
            return;
        }

        console.log(hasPermissions);

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,
        });
        console.log(image);
        console.log('pressed');
    }
    return (
        <View>
            <View></View>
            <Button
                title="Take a picture"
                onPress={clickImageHandler}></Button>
        </View>
    );
} 