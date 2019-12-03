var Zip           = require('pizzip');
var Docxtemplater = require('docxtemplater');
var fs            = require('fs');

var data = {
    firstName: 'Gedion',
    lastName: 'Teshome',
    SchoolId: '0473',
    course: 'idgaf'

}

exports.personalizeFile = ({data}) => {

// load the docx file as a binary
var content = fs.readFileSync('../public/files/input.docx', 'binary');
var zip = new Zip(content);

var doc = new Docxtemplater();
doc.loadZip(zip);

// set the templateVariables
doc.setData({
    firstName: data.firstName,
    lastName : data.lastName,
    SchoolId : data.SchoolId,
    course   : data.course
});

try {
    // render the document after replacing holders with the data that is set
    doc.render();
} catch {
    var err = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties
    }
    return JSON.stringify({error: err});
    // the error thrown contains additional information when logged with JSON.stringify (it contains a property object)
    throw error;
}

var buf = doc.getZip()
            .generate({type: 'nodebuffer'});

// buf is a nodejs buffer, you can either write it to a file or do anything else with it
// find a way to send the now made output file as a downloadable and then distract it from the server
    fs.writeFileSync('../public/files/output.docx', buf);

}