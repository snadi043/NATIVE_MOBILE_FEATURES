import {View, StyleSheet} from 'react-native';
import OutlinedButton from "./OutlinedButton";
import { Colors } from '../../constants/colors';

export default function LocationPicker(){
    function locationHandler(){

    }
    function pickMapHandler(){

    }
    return (
        <View>
            <View style={styles.locationPreview}></View>
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
        marginVertical: 8        
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})