export default class Places{
    constructor(title, imageUri, location, id){
        this.title = title;
        this.imageUri = imageUri;
        this.address = location.address;
        this.location = {lat: location.lat, lng: location.lng};  /* location is basically an object which is expected to have two properties like lattitude and longitude. */
        this.id = id;
        // this is bascially a work around to generate a random uniqdue id to be used in the application which is easy and simple, 
        // Also an alternative approach is to use uuid package which is used to generate the unqiue ids provided by npm.
    }
}


// export default class Places{
//     constructor(title, address, imageUri, lat, lng){
//         this.title = title;
//         this.address = address;
//         this.lat = lat;
//         this.lng = lng;  /* location is basically an object which is expected to have two properties like lattitude and longitude. */
//         this.imageUri = imageUri;
//         this.id = new Date().toString() + Math.random().toString();
//         // this is bascially a work around to generate a random uniqdue id to be used in the application which is easy and simple, 
//         // Also an alternative approach is to use uuid package which is used to generate the unqiue ids provided by npm.
//     }
// }