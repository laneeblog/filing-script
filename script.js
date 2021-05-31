var fs = require('fs');
var process = require('process');

var target = process.argv[2];

!fs.existsSync(`./${target}/video`) && fs.mkdirSync(`./${target}/video`);
!fs.existsSync(`./${target}/captured`) && fs.mkdirSync(`./${target}/captured`); 
!fs.existsSync(`./${target}/duplicated`) && fs.mkdirSync(`./${target}/duplicated`);

fs.readdir(`./${target}`, (error, filelist) => {
    error && console.log(error);

    filelist.forEach((v, i) => {
        if(v.endsWith(".mov") || v.endsWith(".mp4")) {
            fs.rename(`./${target}/` + v, `./${target}/video/` + v, (err) => {
                err ? console.log(err) : console.log(`${v} moved to video`);
            });
        }else if(v.endsWith(".png") || v.endsWith(".aae")) {
            fs.rename(`./${target}/` + v, `./${target}/captured/` + v, (err) => {
                err ? console.log(err) : console.log(`${v} moved to captured`);
            });
        }else {
            if(v.startsWith('IMG_E')) {
                if(fs.existsSync(`./${target}/IMG_` + v.substring(5))) {
                    fs.rename(`./${target}/IMG_` + v.substring(5), `./${target}/duplicated/IMG_` + v.substring(5), (err) => {
                        err ? console.log(err) : console.log(`${v} moved to duplicated`);
                    });
                }
            }
        }
    })
})
