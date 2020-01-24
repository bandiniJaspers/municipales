const XLSX = require('xlsx');
const Mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


Mongoose.connect(`${process.env.MONGO_URL}:${process.env.MONGO_PORT}/lremoupas`);
const connection = Mongoose.connection;

const LremModel = require('../server/models/lrem.model');

connection.once("open", function() {
    dropCollection();
})

const dropCollection = () => {
    connection.db.dropCollection(
        "lrems",
        function(err, result) {
            console.log("Collection droped");
            addLremFromFrama();
        }
    );
}

const saveData = async data => {
    console.log("SaveData::", data);
    const basicModel = {
        nom:data.Prenom,
        prenom:data.Nom,
        hiddenLrem:data.hiddenLrem,
        sources:data.sources,
        codeCommune: data.codeCommune,
        affiliation:data.affiliation
    }
    let newLrem = new LremModel({...basicModel, ...data});
    return newLrem.save();
}

const resolveData = datas => {
    return Promise.all(datas.map((data) => saveData(formatObject(data))))
}

const formatObject = (obj) => {
    let sources = []
    for (let [key, value] of Object.entries(obj)) {
        console.log("formatObject::", obj);
        if (key.includes("Source"))
            sources.push(obj[key])
    }
    return {...obj, sources:sources, hiddenLrem: sources.length > 0}
}
const addLremFromFrama = async () => {
    try {
        const workbook = XLSX.readFile(`${__dirname}/communepop.xls`);
        const workbookframa = XLSX.readFile(`${__dirname}/onestlatechframa.xlsx`)

        const sheet_name_list = workbook.SheetNames;
        const frama_sheet_name_list = workbookframa.SheetNames;

        const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[4]]);
        const xlDataFrama = XLSX.utils.sheet_to_json(workbookframa.Sheets[frama_sheet_name_list[0]]);

        const lrems = xlDataFrama.map((fd, idx) => {
            const index = xlData.findIndex((d) => d.hasOwnProperty("__EMPTY_5") && d["__EMPTY_5"].toLowerCase() === fd.Commune.toLowerCase());
            if (index > -1)
                return {...xlDataFrama[idx], codeCommune:xlData[index]["__EMPTY_1"] + xlData[index]["__EMPTY_4"]}
            return {...xlDataFrama[idx], codeCommune:"NULL"}
        })
        resolveData(lrems).then(() => {
            console.log("Les informations ont bien été enregistré en bdd")
            Mongoose.connection.close();
        }).catch((e) => {
            console.log("Erreur lors de la resolution des données")
            Mongoose.connection.close();
        })

    }
    catch (e)  {
        console.log("Une erreur est survenu", e);
        //Mongoose.connection.close();
    }
}
