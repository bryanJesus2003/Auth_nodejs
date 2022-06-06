const fs = require('fs')
const SaveImage =async  (obj = null) => {
    let path = null, data = null
    if (obj.image == "null")
        return "null"
    // Define the path

    path = `./public/media/${obj.username}_image.png`
    // Delete the previous file with the same name
    fs.unlink(path, (err) => {
        if (err)
            console.log(err)
    })
    // Writrhe the new file
    fs.writeFile(path, obj.image, {encoding: "base64"}, 
             (err, file) => {   
                 if(err)
                        data = "error"
                else{
                    data = path
                        }
                    }            
            )
    return path
}

module.exports = SaveImage

