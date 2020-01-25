//open France commune data from INSEE and add it to bdd

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

const resolveData = datas => {
    return Promise.all(datas.map((data) => saveData(data)))
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
        nom: data["__EMPTY_5"],
        codeCommune: data["__EMPTY_1"] + data["__EMPTY_4"],
        popmun:data["__EMPTY_6"],
        poppart:data["__EMPTY_7"],
        poptotal: data["__EMPTY_8"],
    }
    let newCommune = new CommuneModel(communeModel);
    //console.log("newCommune::", newCommune);
    return newCommune.save();
}
const processCommuneFile = () => {
    try {
        const workbook = XLSX.readFile(`${__dirname}/communepop.xls`);
        const sheet_name_list = workbook.SheetNames;
        console.log("sheet_name_list", sheet_name_list);
        const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[4]]);
        //console.log("xlData::", xlData);
        resolveData(xlData).then(() => {
            console.log("Les informations ont bien été enregistré en bdd")
            Mongoose.connection.close();
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
