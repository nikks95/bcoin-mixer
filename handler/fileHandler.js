const fs = require('fs');
const path = require('path');
exports.readInputFile = (filepath) => {
    try {
        const rawData = fs.readFileSync(filepath, 'utf8');
        return JSON.parse(rawData);
      } catch (err) {
        return [];
      }
    
};

exports.writeOutpuFile = (filepath,data) => {
    const rawdata = JSON.stringify(data);
    try {
        fs.writeFile(filepath, rawdata, 'utf-8', (err) => {
          if (err) {
            if (err.code === 'ENOENT') {
              fs.mkdirSync(path.dirname(filepath), { recursive: true });
              fs.writeFile(filepath, rawdata, 'utf-8', (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('File saved successfully.');
                }
              });
            } else {
              console.log(err);
            }
          } else {
            console.log('File saved successfully.');
          }
        });
      } catch (error) {
        console.log(error);
      }
        
}; 
