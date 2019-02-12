var request = require('request');
var fs = require('fs');
var secrets = require('./secrets.js');
var args = process.argv.slice(2);
var repoOwner = args[0];
var repoName = args[1];

function getRepoContributors(repoOwner, repoName, cb) {
    if (!repoOwner || !repoName){
        throw "Input needed"
    } else {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
          'Authorization': secrets.GITHUB_TOKEN
        }
      }
    request(options,cb);
    }
}

function handleResponse(err, res, body) {

    if (!err && res.statusCode === 200) {
        var apiBody = JSON.parse(body);
        apiBody.forEach(function(url){
            avatarUrl = url.avatar_url;
            var filePath = ('./avatars/' + url.login + '.jpg');
            console.log(url.login)
            downloadImageByURL(avatarUrl,filePath);
        });
    } else {
        console.log('error');
    }
}

function downloadImageByURL(avatarUrl, filePath) {
    request.get(avatarUrl)
    .on('error', function(err){
        throw err;
    })
    .on('response',function(response){
     console.log('Response Status Code: ', response.statusCode); 
     console.log(response.statusMessage);
     console.log(response.headers['content-type']);
     console.log('Downloading image...');
    })
    .on('end', function(){
    console.log('Download complete.');
    })
    .pipe(fs.createWriteStream(filePath));
        
}

// function makeFolder(filePath){
//     fs.mkdir(filePath, { recursive: true });
// }
// fs.makeFolder(filePath)
getRepoContributors(repoOwner, repoName, handleResponse);
