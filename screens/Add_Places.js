import {View} from 'react-native';

import PlaceForm from "../components/PlaceForm";
import { insertPlace } from '../utilities/database';

export default function AddPlacesScreen({navigation}){
    function AddPlaceHandler(place){
        insertPlace(place);
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