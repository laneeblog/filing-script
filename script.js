var fs = require('fs');
var process = require('process');

var target = process.argv[2];

fs.readdir(`./${target}`, (error, filelist) => {
    error && console.log(error);

    filelist.forEach((v, i) => {
        if(v.endsWith(".mov") || v.endsWith(".mp4")) {
            fs.rename(`./${target}/` + v, `./${target}/video/` + v, () => {
                console.log(`${v} moved to video`);
            });
        }else if(v.endsWith(".png") || v.endsWith(".aae")) {
            fs.rename(`./${target}/` + v, `./${target}/captured/` + v, () => {
                console.log(`${v} moved to captured`);
            });
        }else {
            if(v.startsWith('IMG_E')) {
                fs.rename(`./${target}/IMG_` + v.substring(5), `./${target}/duplicated/IMG_` + v.substring(5), (error) => {
                    console.log(`${v} moved to duplicated`);
                });
            }
        }
    })
})





// fs.rename('./test/test.txt', './test/video/test.txt', (error) => {
//     console.log("renameError: " + error);
// });