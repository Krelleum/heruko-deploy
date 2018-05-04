const sharp = require('sharp');

module.exports = {
    resize: function(reqFile){
        sharp(reqFile).resize(200, 200).toBuffer(function (err, buf) {
            if (err) return next(err)

            
        })
    }
}
