import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

let __fileName1 = fileURLToPath(import.meta.url);

let dirPath = path.join(__fileName1, './../../filesNew');

// Create a directory
fs.mkdir(dirPath, (error)=>{
    if(error) {
       console.log('Directory Creation filed');
       return;
    }
    console.log(`Directory is created successfully`);
});

//Read contents aka files from the directory (Curremtly Only Names)

let dirPathToRead = path.join(__fileName1, './../files');

fs.readdir(dirPathToRead, (error, dirContents)=>{
    if(error) {
        console.log(`Reading directory failed ${error.message}`);
        return;
     }

     // Read Contents of the Directory inclding files and subDirectories
     // content: Represents a single entry in the directory
     // This could be file or the sub directory 
     dirContents.forEach((content)=>{
         // check if the current content is directory or file
         // The 'stat' is an actual content of teh directory
         fs.stat(`${dirPathToRead}/${content}`, (err,stat)=>{   
            if(err) {
                console.log(`Reading the resource is failed ${err.message}`);
                return;
             }
             /* Check if the current stat is directory */
             if(stat.isFile()) {
                console.log(`The Current resource is file and its name is = ${content}`);
                let data = fs.readFileSync(`${dirPathToRead}/${content}`,{encoding:'utf8'});
                console.log(`Data from File is = ${data}`)
             }
             /* Logic from YOU in lab */
             /* Read all files from subdirectory and its subdirectory and its  subdirectory*/


             if (stat.isDirectory()) {
                     console.log(`The Current resource is a directory and its name is = ${content}`);

                     let subdirPath = path.join(__fileName1, `../files/${content}`);
                     fs.readdir(subdirPath, (error, subDirContents) => {
                       if (error) {
                         console.log(`Reading Sub directory failed ${error.message}`);
                         return;
                       }
                       subDirContents.forEach((content) => {
                         fs.stat(`${subdirPath}/${content}`, (err, stat) => {
                           if (err) {
                             console.log(`Reading the resource is failed ${err.message}`);
                             return;
                           }
                           if (stat.isFile()) {
                             console.log(`The Current resource is file and its name is = ${content}`);
                             let data = fs.readFileSync(`${subdirPath}/${content}`, { encoding: 'utf8' });
                             console.log(`Data from File is = ${data}`)

                           }
                         });
                       });
                     });
                   }
         });
     });

});


