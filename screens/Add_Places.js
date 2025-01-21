
import PlaceForm from "../components/PlaceForm";
import { insertPlace } from '../utilities/database';

export default function AddPlacesScreen({navigation}){
    async function AddPlaceHandler(place){
        await insertPlace(place);
        navigation.navigate('AllPlaces');
    }
    return <PlaceForm onFormSubmit={AddPlaceHandler}/>;
}