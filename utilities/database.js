//Refer to the below links to understand more about SQLite Database implementations.

//https://docs.expo.dev/versions/latest/sdk/sqlite/#execasyncsource
//https://docs.expo.dev/versions/latest/sdk/splash-screen/


import * as SQLite from 'expo-sqlite';
import Places from '../models/Places';

const db = SQLite.openDatabaseSync('places.db');

export function init(){
    const promise = new Promise((resolve, reject) => {
        db.withTransactionAsync((tnx) => {
            tnx.execAsync(`CREATED DATABASE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title STRING NOT NULL,
            address STRING NOT NULL,
            imageUri STRING NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL)`, [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};

export function insertPlace(place){
    const promise = new Promise((resolve, reject) => {
        db.withTransactionAsync((tnx) => {
            tnx.execAsync(`INSERT INTO places (
                title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
            [
                place.title,
                place.imageUri,
                place.address,
                place.lat,
                place.lng
            ],
            (_,result) => {
                console.log(result);
                resolve(result);
            },
            (_,error)=>{
                reject(error);
            }
        )
        })
    });
    return promise;
}

export function getPlaces(){
    const promise = new Promise((resolve, reject) => {
        db.withTransactionAsync((tnx) => {
            tnx.execAsync('SELECT * FROM places', 
            [],
            (_, result) => {
                const places = [];
                for (const dp of result.rows._array){
                    places.push(
                        new Places(
                            dp.title,
                            dp.imageUri,
                            {
                                address: dp.address,
                                lat: dp.lat,
                                lng: dp.lng,
                            },
                            dp.id
                        )
                    );
                }
                resolve(places);    
            },
            (_, error) => {
                reject(error);
            }
        )
        })
    });
    return promise;
}


function fetchPlaceDetails(id){
    const promise = new Promise((resolve, reject) => {
        db.withTransactionAsync((tnx) => {
            tnx.execAsync('SELECT * FROM places HWERE id = ?', [id],
                (_, result) => {
                    const dbPlaces = result.rows._array[0];
                    const place = new Places(dbPlaces.title, dbPlaces.imageUri, {lat: dbPlaces.lat, lng: dbPlaces.lng, address: dbPlaces.address}, dbPlaces.id);
                    resolve(place);
                },
                (_, error) => {
                    reject(error);
                }
            )
        })
    });
    return promise;
}