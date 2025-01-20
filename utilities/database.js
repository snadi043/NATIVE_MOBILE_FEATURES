//Refer to the below links to understand more about SQLite Database implementations.

//https://docs.expo.dev/versions/latest/sdk/sqlite/#execasyncsource
//https://docs.expo.dev/versions/latest/sdk/splash-screen/


import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('places.db');

export function init(){
    const promise = new Promise((resolve, reject) => {
        db.withExclusiveTransactionAsync((tnx) => {
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
        db.withExclusiveTransactionAsync((tnx) => {
            tnx.execSync(`INSERT INTO places (
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

    