
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.lyami.net', port: 443, protocol: 'https' });


const add = (formData) => {

  return new Promise((resolve, reject) => {

    ipfs.sendAsync({
      jsonParse: true,
      accept: 'image/png',
      uri: '/add',
      takeHash: true,
      payload: formData.getBuffer(), 
      boundary: formData.boundary,
    }, (err, result) => {
      if(err) reject(err)
      resolve(result)
    });

  })
  
}

const addJSON = (data) => {

  return new Promise((resolve, reject) => {
    ipfs.addJSON(data, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
  
}

module.exports = {
  ipfs,
  add,
  addJSON
}
