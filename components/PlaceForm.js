import { useCallback, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import { Colors } from '../constants/colors';

import ImagePick from './UI/ImagePick';
import LocationPicker from './UI/LocationPicker';
import Button from './UI/Button';
import Places from '../models/Places';


export default function PlaceForm({onFormSubmit}){
    const [pickedLocation, setPickedLocation] = useState('');
    const [pickedImage, setPickedImage] = useState();
    const [enteredTitle, setEnteredTitle] = useState();

    function titleChangeHandler(enteredText){
        setEnteredTitle(enteredText);
    }

    function pickImageHandler(imageUri){
        console.log(imageUri);
        setPickedImage(imageUri);
    }
    // useCallback() is the hook which is helpful to use the state from the cache 
    // instead of re-rendering the components very often unless the dependenices get changed.
    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, []);

    function savePlaceHandler(){
        const formData = new Places(enteredTitle, pickedImage, pickedLocation);
        onFormSubmit(formData);
        console.log(formData);

    }

    return (
        <ScrollView style={styles.form}>
             <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                    onChangeText={titleChangeHandler}
                    value={enteredTitle}
                    style={styles.input}
                />
             </View>
             <ImagePick onPickImage={pickImageHandler}/>
             <LocationPicker onPickLocation={pickLocationHandler}/>
             <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
      )
}

const styles = StyleSheet.create({
    form:{
        // flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: 'bold',
        color: Colors.primary500,
        marginBottom: 4,
        // fontSize: 16
    },
    inputContainer:{
        marginBottom: 16,
    },
    input:{
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        color: Colors.primary700,
        fontSize: 16,
        backgroundColor: Colors.primary100,
    }
})