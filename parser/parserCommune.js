//open France commune data excell from INSEE and add it to bdd

const XLSX = require('xlsx');
const Mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


Mongoose.connect(`${process.env.MONGO_URL}:${process.env.MONGO_PORT}/lremoupas`);
const connection = Mongoose.connection;
const CommuneModel = require('../server/models/commune.model');

connection.once("open", function() {
    dropCollection();
})

const dropCollection = () => {
    return connection.db.dropCollection(
        "communes",
        function(err, result) {
            console.log("Collection droped");
            processCommuneFile();
        }
    );
}

const updateGeo = (data) => {

    const { nom_commune, latitude, longitude} = data;
    console.log("Nom_commune::", nom_commune);
    if (!latitude || !longitude)
    return null
    return CommuneModel.findOneAndUpdate({nom:nom_commune},  { longitude:longitude, latitude:latitude }).exec();
};

const resolveData = (datas, callback) => {
    return Promise.all(datas.map((data) => callback(data)))
}
const saveData = async data => {
    //__EMPTU = region
    //__EMPTY_1 = codeRefion
    //__EMPTY_2 = codeArrondissement
    //__EMPTY_3 = code
    //__EMPTY_4 = codeCommun
    //__EMPTY_5 = name
    //__EMPTY_6 7 8 = popmun, poppart, poptotal
    if (!data["__EMPTY_5"] || data["__EMPTY_5"] === "Nom de la commune")
        return
    const communeModel = {
        nom: data["__EMPTY_5"].replace(/\s/g,''),
        codeCommune: data["__EMPTY_1"] + data["__EMPTY_4"],
        popmun:data["__EMPTY_6"],
        poppart:data["__EMPTY_7"],
        poptotal: data["__EMPTY_8"],
        politics: [],
        latitude: 0.0,
        longitude: 0.0
    }
    let newCommune = new CommuneModel(communeModel);
    return newCommune.save();
}

const getGeoData = () => {
    const workbook = XLSX.readFile(`${__dirname}/communes_gps.xlsx`);
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    //console.log(xlData);
    resolveData(xlData, updateGeo).then(() => {
        console.log("Les informations geographique ont bien été enregistré en bdd")
        Mongoose.connection.close();
    }).catch((e) => {
        console.log("Erreur lors de la resolution des données", e);
        Mongoose.connection.close();
    })
}
const processCommuneFile = () => {
    try {
        const workbook = XLSX.readFile(`${__dirname}/communepop.xls`);
        const sheet_name_list = workbook.SheetNames;

        const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[4]]);
        resolveData(xlData, saveData).then(() => {
            console.log("Les informations ont bien été enregistré en bdd")
            getGeoData();
            //Mongoose.connection.close();
        }).catch((e) => {
            console.log("Erreur lors de la resolution des données", e);
            Mongoose.connection.close();
        })
    }
    catch (e)  {
        console.log("Une erreur est survenu", e);
        Mongoose.connection.close();
    }
}
