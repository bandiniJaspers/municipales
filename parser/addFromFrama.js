//script for synchronizing framasoft excell with the bdd of the program


//@todo not dropping the collection but updating the bdd

const XLSX = require('xlsx');
const Mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


Mongoose.connect(`${process.env.MONGO_URL}:${process.env.MONGO_PORT}/lremoupas`);
const connection = Mongoose.connection;

const PoliticModel = require('../server/models/lrem.model');
const CommuneModel = require('../server/models/commune.model');

connection.once("open", function() {
    dropCollection();
})

// we erase first the collection
const dropCollection = () => {
    connection.db.dropCollection(
        "lrems",
        function(err, result) {
            addPoliticFromFrama();
        }
    );
}


//save data to mongoose
const saveData = async data => {
    const basicModel = {
        nom:data.Nom,
        prenom:data.Prenom,
        commune:data.commune,
        hiddenLrem:data.hiddenLrem,
        sources:data.sources,
        vote: data.vote,
        codeCommune: data.codeCommune,
        affiliation:data.affiliation
    }
    let newLrem = new PoliticModel({...basicModel, ...formatObject(data)});
    const codeCommune = data.codeCommune
    //console.log("codeCommune::", codeCommune)
    if (codeCommune) {
       // console.log("codeCommune::", codeCommune)

    }
    return newLrem.save().then(async (res) => {
        const commune = await CommuneModel.findOneAndUpdate({codeCommune: data.codeCommune}, {$push: {politics: res._id}}).exec();
    })
}

const resolveData = datas => {
    return Promise.all(datas.map((data) => saveData(data)))
}

// catch all the Source_NB col in the frame and push it into an array
const formatObject = (obj) => {
    let sources = []
    /*let debug = false
    if (obj.Prenom === "Violette") {
        debug = true;
    }*/
    for (let [key, value] of Object.entries(obj)) {
        /*if (debug)
            console.log(key, value)*/
        if (key.includes("Source")) {
            // cette source n'implique pas que le candidat cache son affiliation a en marche.
            if (obj[key] !== 0 && !obj[key].includes("https://en-marche.fr/municipales"))
                sources.push(obj[key])
        }
    }
    return {...obj, sources:sources, hiddenLrem: sources.length > 0}
}

const addPoliticFromFrama = async () => {
    try {
        const workbook = XLSX.readFile(`${__dirname}/communepop.xls`);
        const workbookframa = XLSX.readFile(`${__dirname}/onestlatechframa.xlsx`)

        const sheet_name_list = workbook.SheetNames;
        const frama_sheet_name_list = workbookframa.SheetNames;

        const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[4]]);
        const xlDataFrama = XLSX.utils.sheet_to_json(workbookframa.Sheets[frama_sheet_name_list[0]]);

        const lrems = await xlDataFrama.map((fd, idx) => {
            //search index of the commune. If not found we set the commune to null. The value must then be manually set.
            const index = xlData.findIndex((d) => d.hasOwnProperty("__EMPTY_5") && d["__EMPTY_5"].toLowerCase() === fd.Commune.toLowerCase());

            if (index > -1) {
                return {
                    ...xlDataFrama[idx],
                    vote: 0,
                    commune: xlData[index]["__EMPTY_5"],
                    codeCommune: xlData[index]["__EMPTY_1"] + xlData[index]["__EMPTY_4"]
                }
            }
            return {...xlDataFrama[idx], vote: 0, commune:null, codeCommune:null}
        })
        resolveData(lrems).then(() => {
            console.log("Les informations ont bien été enregistré en bdd")
            Mongoose.connection.close();
        }).catch((e) => {
            console.log("Erreur lors de la resolution des données", e)
            Mongoose.connection.close();
        })

    }
    catch (e)  {
        console.log("Une erreur est survenu", e);
        Mongoose.connection.close();
    }
}
