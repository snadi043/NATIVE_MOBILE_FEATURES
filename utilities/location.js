const GOOGLE_MAPS_KEY = 'AIzaSyBoMMjTdC54L0rctvSz2ZpJq99y3KFOg94';

// Verify this link to get more details on how to use the Google Maps Static API.
// https://developers.google.com/maps/documentation/maps-static/start?_gl=1*f8e17m*_up*MQ..*_ga*MjYyNjQxOTUzLjE3MzA4NTEwMjE.*_ga_NRWSTWS78N*MTczNjc4MTQ3NS4yLjAuMTczNjc4MTQ3NS4wLjAuMA..
export function getUserLocation(lat, lng){
    const locationUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_MAPS_KEY}`;
    return locationUrl;
}

// Verify this link to get more details on how to use the Google Maps Reverse Geocoding API.
// https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding?_gl=1*1l8w6m1*_up*MQ..*_ga*NzI0NzA1ODQ2LjE3MzcyMjM0MDc.*_ga_NRWSTWS78N*MTczNzIyMzQwNy4xLjEuMTczNzIyMzQ3MS4wLjAuMA..
export async function getAddress(){
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_KEY}`;
    const response = await fetch(url);

    if(!response.OK){
        throw new Error('Failed to fetch the address');
    }

    const data = await response.json();
    const address = data.results[0].formatted_address;
    console.log(address);
    return address;
}