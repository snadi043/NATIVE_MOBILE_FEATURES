import { useEffect, useState } from 'react';
import PlaceList from '../components/Places_List';
import { useIsFocused } from '@react-navigation/native';
import { getPlaces } from '../utilities/database';

export default function AllPlacesScreen(){

    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFoused = useIsFocused();

    useEffect(() => {
        async function loadPlaces(){
            const places = await getPlaces();
            setLoadedPlaces(places);
        }
        if(isFoused){
            loadPlaces();
        }
    }, [isFoused]);

    return <PlaceList places={loadedPlaces}/>;
}