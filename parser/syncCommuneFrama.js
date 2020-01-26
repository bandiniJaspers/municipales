const XLSX = require('xlsx');
const Mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//recupère les code region et codeCommune du fichier excelle de l'INSEE et l'ajoute dans un second excell.
(async function() {
    await processCommuneFile();
}())


const processCommuneFile = async () => {
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

        const newworkbook = await XLSX.utils.json_to_sheet(lrems);
        let wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, newworkbook, "SheetJS")
        XLSX.writeFile(wb, "test.xlsx");
    }
    catch (e)  {
        console.log("Une erreur est survenu", e);
    }
}
