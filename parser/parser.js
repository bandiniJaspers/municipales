const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const Mongoose = require("mongoose");
const YAML = require('yaml')
const dotenv = require("dotenv");
dotenv.config();
try {
    console.log("process::", process.env.MONGO_URL)
    Mongoose.connect(`${process.env.MONGO_URL}:${process.env.MONGO_PORT}/lremoupas`);
}
catch (e) {
    console.log("Mongoose connect::", e);
}
const connection = Mongoose.connection;
const LremModel = require('../server/models/lrem.model');

connection.once("open", function() {
    //dropCollection();
    //processFile();
    processCommuneFile();
})

const dropCollection = () => {
    connection.db.dropCollection(
        "lrems",
        function(err, result) {
            console.log("Collection droped");
        }
    );
}

const saveData = async data => {
    const basicModel = {
        nom:"",
        prenom:"",
        sedissimule:null,
        preuve:null,
        affiliation:null
    }
    let newLrem = new LremModel({...basicModel, ...data});
    return newLrem.save();
}

const resolveData = datas => {
    return Promise.all(datas.map((data) => saveData(data)))
}

const processCommuneFile = () => {
    try {
        const workbook = XLSX.readFile(`${__dirname}/communepop.xls`);
        const sheet_name_list = workbook.SheetNames;
        console.log("sheet_name_list", sheet_name_list);
        const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[4]]);
        console.log("xlData::", xlData);
        /*resolveData(xlData).then(() => {
            console.log("Les informations ont bien été enregistré en bdd")
            Mongoose.connection.close();
        }).catch((e) => {
            console.log("Erreur lors de la resolution des données")
            Mongoose.connection.close();
        })*/
    }
    catch (e)  {
        console.log("Une erreur est survenu", e);
        //Mongoose.connection.close();
    }
}

//extract data from an excell file.
const processXLSXFile = () => {
    try {
        const workbook = XLSX.readFile(`${__dirname}/lrem.xlsx`);
        const sheet_name_list = workbook.SheetNames;
        const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        resolveData(xlData).then(() => {
            console.log("Les informations ont bien été enregistré en bdd")
            Mongoose.connection.close();
        }).catch((e) => {
            console.log("Erreur lors de la resolution des données")
            Mongoose.connection.close();
        })
    }
    catch (e)  {
        console.log("Une erreur est survenu", e);
        Mongoose.connection.close();
    }
}

const resolveDataFromYAML = (yamlObject) => {
    const datas = Object.keys(yamlObject);
    return Promise.all(datas.map((d) => saveData(yamlObject[d])))
}

const processFile = () => {
    try {
        //dropCollection();
        const file = fs.readFileSync(`${__dirname}/lrem.yaml`, 'utf8');
        const parsedYAML = YAML.parse(file);
        resolveDataFromYAML(parsedYAML).then(() => {
            console.log("Les informations ont bien été enregistré en bdd")
            Mongoose.connection.close();
        }).catch((e) => {
            console.log("Erreur lors de la resolution des données")
            Mongoose.connection.close();
        })
    }
    catch (e)  {
        console.log("Une erreur est survenu", e);
        Mongoose.connection.close();
    }
}


