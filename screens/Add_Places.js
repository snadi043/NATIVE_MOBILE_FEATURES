
import PlaceForm from "../components/PlaceForm";
import { insertPlace } from '../utilities/database';

export default function AddPlacesScreen({navigation}){
    async function addPlaceHandler(place){
        await insertPlace(place);
        navigation.navigate('AllPlaces');
    }
    return <PlaceForm onFormSubmit={addPlaceHandler}/>;
}