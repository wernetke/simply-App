//initialize the credentials
var People = {
    username: "john",
    password: "password"
}

// get user information from form
function getInfo(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var passhash = CryptoJS.MD5(password).toString();
    console.log("username: " + username + " + password: " + password + " + md5: " + passhash);
    callLogin(username,passhash);
}

function callLogin(username,password){
    const Url='https://crtoea7d0a.execute-api.us-east-1.amazonaws.com/users/login?';
    let params = {
        u: username,
        hp: password
    };

    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

    let url = Url + query;
    console.log(url);
    fetch(url)
        .then(data => data.text())
        .then((text) => {
            console.log('request succeeded with JSON response', text)
        }).catch(function (error) {
        console.log('request failed', error)
    });

}

