const fs   = require('fs');
const path = require('path');
const dir  = __dirname;

const HTMLFolderName   = "HTML";
const imagesFolderName = "Images";
const videosFolderName = "Videos";
const docsFolderName   = "Documents";
const miscFolderName   = "Misc"; 

// Should these be global objects ?
const htmlFiles = [], jsFiles = [], jpgFiles = [], vidFiles = [], miscFiles = [];  
const imageExtensionsArr = ['.jpg', '.png', '.gif', '.bmp', '.webp', '.svg'];
const videoExtensionsArr = ['.webm', '.mov', '.mp4', '.flv', '.avi','.mkv', '.gifv', '.wmv' ];

module.exports = async () => {
  console.log("Changing Files in Directory: " + dir + '\n');

  // Scans and lists the current directory for the files into seperate arrays.
  await fs.readdir(dir, {}, (err, files) => {
    if(err) throw err;

    const fileList = files;

    fileList.map(fileName => {
      const extName = path.extname(fileName).toLocaleLowerCase();
      seperateFilestoArr(extName, fileName);
    })
    printExtensionObj()
    createOrganizedFolders()
    // moveFilesController()  //Un-comment when wanting to test file moving.

  })

}
function seperateFilestoArr(extentionType, fileName){
  // Should this be a switch statement or a long 'if' with similar groupings in an all in one if catch (e.g. img,vid,doc)?
  switch(extentionType){
    case '.html': htmlFiles.push(fileName); break;
    case '.js':     jsFiles.push(fileName); break;
    case '.jpg':   jpgFiles.push(fileName); break;
    case '.mov':   vidFiles.push(fileName); break;
    case '.png':   jpgFiles.push(fileName); break;
    default:      miscFiles.push(fileName);
  }

}

function seperateFilestoArrV2(extentionType, fileName){
  if(imageExtensionsArr.includes(extentionType)){ jpgFiles.push(fileName); }
  if(videoExtensionsArr.includes(extentionType)){ vidFiles.push(fileName); }
}

function moveFilesController(){
  moveFiles(htmlFiles, HTMLFolderName)
  moveFiles(jpgFiles,  imagesFolderName)
  moveFiles(vidFiles,  videosFolderName)
  // Misc includes folders in the list... Find a way to Ignore folders to make the test case work.
  moveFiles(miscFiles, miscFolderName)
}

function moveFiles(fileListArray, folderName){

  fileListArray.map((file)=>{
    const filepathOrig = path.join(dir, file);
    const folderPath   = path.join(dir, folderName);
    const filePathNew  = path.join(folderPath, file);

    fs.rename(filepathOrig, filePathNew,(err)=>{ if(err) throw err; })

  })
}

function createOrganizedFolders(){
  // Probably add a check to see if folders are already created, so errors don't occur when folders already exist. 

  const htmlPath    = path.join(dir,HTMLFolderName);
  const imagesPath  = path.join(dir,imagesFolderName);
  const videosPath  = path.join(dir,videosFolderName);
  const miscPath    = path.join(dir,miscFolderName);


  fs.mkdir(htmlPath,  {},(err)=>{ if(err) throw err; })
  fs.mkdir(imagesPath,{},(err)=>{ if(err) throw err; })
  fs.mkdir(videosPath,{},(err)=>{ if(err) throw err; })

  // Misc includes folders in the list... Find a way to Ignore folders to make the test case work.
  // fs.mkdir(miscPath,  {},(err)=>{ if(err) throw err; })

}


// Helper Methods to show file list.
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