var request = require('request');
var fs = require('fs');
var secrets = require('./secrets.js');

// function getRepoContributors(repoOwner, repoName, cb) {

//     var options = {
//         url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
//         headers: {
//           'User-Agent': 'request',
//           'Authorization': secrets.GITHUB_TOKEN
//         }
//       };
//     request(options,cb);
// }

// function handleResponse(err, res, body) {

//     if (!err && res.statusCode === 200) {
//         var apiBody = JSON.parse(body);
//         apiBody.forEach(function(url){
//             console.log(url.avatar_url)
//         });
//     } else {
//         console.log('error')
//     }
// }

function downloadImageByURL(url, filePath) {
    request.get(url + filePath)
    .on('error', function(err){
        throw err;
    })
    .on('response',function(response){
     console.log('Response Status Code: ', response.statusCode); 
     console.log(response.statusMessage)
     console.log(response.headers['content-type']);
     console.log('Downloading image...');
    })
    .on('end', function(){
    console.log('Download complete.')
    })
    .pipe(fs.createWriteStream(filePath),function (filePath){
        if (!fs.existsSync(filePath)){
            fs.mkdirSync(filePath);
        }
    });
        
}

//getRepoContributors("jquery", "jquery", handleResponse);

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")