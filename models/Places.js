export default class Places{
    constructor(title, location, imageUri, address){
        this.title = title;
        this.address = address;
        this.location = location;  /* location is basically an object which is expected to have two properties like lattitude and longitude. */
        this.imageUri = imageUri;
        this.id = new Date().toString() + Math.random().toString();
        // this is bascially a work around to generate a random uniqdue id to be used in the application which is easy and simple, 
        // Also an alternative approach is to use uuid package which is used to generate the unqiue ids provided by npm.
    }
}