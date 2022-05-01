var client_id="3925929015a04136ace508bf8ad58df6";
var client_secret="e2b65395f70b452699dffc6918f52684";
let test=new Buffer.from(client_id + ':' + client_secret).toString('base64');
console.log(test);