import {View} from 'react-native';

import PlaceForm from "../components/PlaceForm";

export default function AddPlacesScreen({navigation}){
    function AddPlaceHandler(place){
        navigation.navigate('AllPlaces', 
            {place: place}
        )
    }
    return (
        <View>
            <PlaceForm onFormSubmit={AddPlaceHandler}/>
        </View>
        );
}