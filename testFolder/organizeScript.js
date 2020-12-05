const fs   = require('fs');
const path = require('path');
const dir  = __dirname;

const HTMLFolderName   = "HTML";
const imagesFolderName = "Images";
const moviesFolderName = "MOVIES";

// Should these be global objects ?
const htmlFiles = [], jsFiles = [], jpgFiles = [], vidFiles = [], miscFiles = [];  


module.exports = () => {
  console.log("Changing Files in Directory: " + dir + '\n');

  // Scan the current directory for the files
  fs.readdir(dir, {}, (err, files) => {
    if(err) throw err;

    const fileList = files;

    fileList.map(fileName => {
      const extName = path.extname(fileName).toLocaleLowerCase();
      seperateFilestoArr(extName, fileName);
    })

    printExtensionObj()

  })

}
function seperateFilestoArr(extentionType, fileName){
  // Should this be a switch statement or a long 'if' with similar groupings in an all in one if catch (e.g. img,vid,doc)?
  switch(extentionType){
    case '.html': htmlFiles.push(fileName); break;
    case '.js':     jsFiles.push(fileName); break;
    case '.jpg':   jpgFiles.push(fileName); break;
    case '.mov':   vidFiles.push(fileName); break;
    default:      miscFiles.push(fileName);
  }
}

function printList(type, fileArray){ 
  console.log(`${type} arr: ${JSON.stringify(fileArray)}`); 
}
function printExtensionObj(){
  printList('HTML', htmlFiles); 
  printList('JPG',  jpgFiles); 
  printList('Video', vidFiles);
  printList('JS',   jsFiles); 
  printList('MISC', miscFiles);


}