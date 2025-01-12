import { useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';

import { Colors } from '../constants/colors';
import PickImage from './UI/ImagePicker';
import LocationPicker from './UI/LocationPicker';

export default function PlaceForm(){
    const [enteredTitle, setEnteredTitle] = useState();

    function titleChangeHandler(enteredText){
        setEnteredTitle(enteredText);
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
             <PickImage/>
             <LocationPicker/>
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