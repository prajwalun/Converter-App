const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");
const stream = require("stream");
const fastcsv = require("fast-csv");
const utf8 = require('utf8');

const app = express();
// const utf8 = require('utf8');
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.post("/upload", (req, res) => {
  const newpath = "./public/uploaded-files/";
  //const newpath = "F:/Demo/";
  
  const {file} = req.files;
  const filename = file.name;
  file.mv(`${newpath}${filename}`, (err) => {
    const path = require("path");
    const extension = path.extname(`${filename}`);
    if (extension != ".asc" || `${filename}` === null) {
      // res.status(500).send({ message: "File upload failed", code: 200 });
    } else {
      // res.status(200).send({ message: "File Uploaded", code: 200 });
      

      function one(callback) {
        const origin = fs.createReadStream(
        `${newpath}${filename}`, 
        {encoding:'latin1'}
        );

        const transform = new stream.Transform({
          writableObjectMode: true,
          encoding: 'utf8',
          transform: function removeNewLines(chunk, encoding, callback) {
              let formated = chunk.replace(/,/g, ".").replace(/;/g, ",")
            callback(
                null, 
                utf8.encode(formated)
            );
          },
        });

        const destination = fs.createWriteStream(
          "./public/processing-files/original.csv",
          {encoding:'utf8'}
          );
          
          origin
          .pipe(transform)
          .pipe(destination);

          // const data = fs.readFileSync(`${newpath}${filename}`,
          //   {encoding:'latin1', flag:'r'});
          // fs.writeFileSync("./programming.csv",data);


        setTimeout(function () {
          console.log("first function executed");
          callback();
        }, 3000);

        // removecomma();
      }

    //   function two(callback) {
    //     const origincolon = fs.createReadStream(
    //       "./public/processing-files/original.csv",
          
    //       {encoding:'utf8'}
           
    //     );
    //     const transformcolon = new stream.Transform({
    //       // accept data as a strings
    //       writableObjectMode: true,
    //       encoding: 'utf8',
    //       transform: function removeNewLines(chunk, encoding, callback) {
    //         callback(null, chunk.replace(/;/g, ","));
    //       },
    //     });

    //     const destinationcolon = fs.createWriteStream(
    //       "./public/processing-files/temp.csv",
          
    //       {encoding:'utf8'}
           
    //     );

    //     origincolon.pipe(transformcolon).pipe(destinationcolon);

    //     setTimeout(function () {
    //       console.log("second function executed");
    //       callback();
    //     }, 5000);
    //   }

      function three(callback) {
        (async function () {
          const writeagain = fs.createWriteStream(
            "./public/processing-files/columnedit.csv",
            
            {encoding:"utf8"}
             
          );

          const parseagain = fastcsv.parse({
            ignoreEmpty: true,
            discardUnmappedColumns: true,
            encoding:'utf8',
            headers: [
              "col_1",
              "col_2",
              "col_3",
              "col_4",
              "col_5",
              "col_6",
              "col_7",
              "col_8",
              "col_9",
              "col_10",
              "col_11",
              "col_12",
              "col_13",
              "col_14",
              "col_15",
              "col_16",
              "col_17",
              "col_18",
              "col_19",
              "col_20",
              "col_21",
              "col_22",
              "col_23",
              "col_24",
              "col_25",
              "col_26",
              "col_27",
              "col_28",
              "col_29",
              "col_30",
              "col_31",
              "col_32",
              "col_33",
              "col_34",
              "col_35",
              "col_36",
              "col_37",
              "col_38",
              "col_39",
              "col_40",
              "col_41",
              "col_42",
              "col_43",
              "col_44",
              "col_45",
              "col_46",
              "col_47",
              "col_48",
              "col_49",
              "col_50",
              "col_51",
              "col_52",
              "col_53",
              "col_54",
              "col_55",
              "col_56",
              "col_57",
              "col_58",
              "col_59",
              "col_60",
              "col_61",
              "col_62",
              "col_63",
              "col_64",
              "col_65",
              "col_66",
              "col_67",
              "col_68",
              "col_69",
            ],
          });
          const transformagain = fastcsv
            .format({ headers: true, skipRows: 10, strictColumnHandling: true })
            .transform((row) => ({
              ArNr: utf8.decode(row.col_1),
              Artikelbezeichnung: utf8.decode(row.col_3),
              PreisD: utf8.decode(row.col_5),
              Rabattpreis: utf8.decode(row.col_6),
              PreisCH: utf8.decode(row.col_7),
              VE: utf8.decode(row.col_9),
              Lagerbestand_generell: utf8.decode(row.col_16),
              Bestelldatum1: utf8.decode(row.col_17),
              Bestellmenge1: utf8.decode(row.col_18),
              Bestelldatum2: utf8.decode(row.col_19),
              Bestellmenge2: utf8.decode(row.col_20),
              Bestelldatum3: utf8.decode(row.col_21),
              Bestellmenge3: utf8.decode(row.col_22),
              Kategorie: utf8.decode(row.col_23),
              Subkategorie: utf8.decode(row.col_24),
              Lagerbestand_sofort: utf8.decode(row.col_33),
              Exportkennzeichen: utf8.decode(row.col_50),
              Farbe: utf8.decode(row.col_54),
              Groesse: utf8.decode(row.col_55),
              Kennzeichen: utf8.decode(row.col_56),
              Lagerbestand_physisch: utf8.decode(row.col_57),

              // redundant is dropped
              // delta is not loaded by parse() above
            }));
          const stream = fs
            .createReadStream("./public/processing-files/original.csv", 
            {encoding:"utf8"}
             )
            .pipe(parseagain)
            .pipe(transformagain)
            .pipe(writeagain);
        })();
        setTimeout(function () {
          console.log("Third function executed");
          callback();
        }, 7000);
      }

      function four() {
        let csv = fs.readFileSync(
          "./public/processing-files/columnedit.csv",
          "utf8"
        );
        csv = csv.split("\n").map((line) => line.trim());
        let csvarr = [];

        for (let i = 0; i < csv.length; i++) {
          let s = "";
          //csv.split(",").map((line) => line[14]="shishira");
          let split = csv[i].split(",");

          if (i != 1) {
            //console.log(split.length); //21
            for (j = 0; j < split.length; j++) {
              //let value = split[13];
              // if (Boolean(split[13])) {
              //   split[13] = "shishira";
              //console.log(Boolean(split[13]));
              // }

              if (split[13] === undefined) {
                //split[13] = "undefined";
                break;
              } else if (split[13].trim().length === 0) {
                split[13] = "UNKATEGORISIERT";
              } else if (split[14].trim().length === 0) {
                split[14] = "UNKATEGORISIERT";
              } else if (split[17].trim().length === 0) {
                split[17] = "undefiniert";
              } else if (split[18].trim().length === 0) {
                split[18] = "undefiniert";
              }
              s += split[j] + ",";
            }
            csvarr.push(s);
          }
        }
        console.log("fourth function");

        // const path = require("path");
        // const directory = "./public/uploaded-files/";
        // fs.readdir(directory, (err, files) => {
        //   if (err) throw err;
        //   for (const file of files) {
        //     fs.unlink(path.join(directory, file), (err) => {
        //       if (err) throw err;
        //     });
        //   }
        //   console.log("Deleted the uploaded file");
        // });

        fs.createWriteStream("./public/download-files/finalfile.csv", 
        {encoding:"latin1"}
         ).end(csvarr.join("\n"));
      }

      one(function () {
          three(function () {
            four(function () {});
          });
      });
    }

    // if (req.file) {
    //   if (err) {
    //     res.status(500).send({ message: "File upload failed", code: 200 });
    //   }
    // } else {
    //   res.status(200).send({ message: "File Uploaded", code: 200 });
    // }
  });
  return res.status(200).send({ message: "File Uploaded", code: 200 });
});

app.get("/download/", (req, res) => {
  const fs = require("fs");
  var files = fs.createReadStream("./public/download-files/finalfile.csv");
  res.writeHead(200, {
    "Content-disposition": "attachment; filename=finalfile.csv",
  }); //here you can add more headers
  files.pipe(res);
  // const path = require("path");
  // const directory = "./public/download-files/";
  // fs.readdir(directory, (err, files) => {
  //   if (err) throw err;
  //   for (const file of files) {
  //     fs.unlink(path.join(directory, file), (err) => {
  //       if (err) throw err;
  //     });
  //   }
  //   console.log("Deleted the downloded file");
  // });
});

// app.get("/", (req, res) => {
//   const path = require("path");
//   res.sendFile(path.join(__dirname  "../Frontend/build/index.html"));
// });

app.listen(5000, () => {
  console.log("Server running successfully on 5000");
});
