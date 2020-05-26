// get user information from form
function getInfo(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passhash = CryptoJS.MD5(password).toString();
    console.log("username: " + username + " + password: " + password + " + md5: " + passhash);
    callLogin(username,passhash);
}

// store data with localStorage provides
function storeData(data) {
    for (key in data) {
        localStorage.setItem(key, data[key]);
    }
}

//First call to log in user
function callLogin(username,password) {
    const Url = 'https://crtoea7d0a.execute-api.us-east-1.amazonaws.com/users/login?';
    let params = {
        u: username,
        hp: password
    };
    //Add the param to the url
    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

    let url = Url + query;
    //make the call
    fetch(url).then(function (response) {
        let statusCode = response.status;
        response.text().then(function(text) {
                let obj = JSON.parse(text);
                //check the status of the call
                if (statusCode === 400 || statusCode === 401)
                {
                    document.getElementById("errorMessage").innerHTML = obj.error;
                    document.getElementById("errorMessage").style.display = "block";
                }
                else{
                    storeData(obj);
                    document.getElementById("login").style.display = "none";
                    document.getElementById("logged").style.display = "block";
                    document.getElementById("label").innerHTML = obj.seetrusLabel;
                    document.getElementById("groupId").value = obj.groupId;
                }

            }).catch(function (error) {
                //alert the user the call has failed
            document.getElementById("errorMessage").innerHTML = "Please retry again.";
            document.getElementById("errorMessage").style.display = "block";
        })
    });
}

function callNext() {
    const Url = 'https://crtoea7d0a.execute-api.us-east-1.amazonaws.com/groups/';
    const groupId = document.getElementById("groupId").value;

    let url = Url + groupId + "/next";
    const myHeaders = new Headers();
    myHeaders.append("SeetrusAuthenticationToken", "uu58354A40FCB94759AC8FE0148A8DF116544ADBEF503441B5891914F6677C844A");
    //create the header
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    //make the second call
    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

//check if the token is already set and if the user has to log in
function checkUser(){
    if ( localStorage.getItem('token')!= null ) {
        document.getElementById("logged").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("label").innerHTML = localStorage.getItem('seetrusLabel');
        document.getElementById("groupId").value = localStorage.getItem('groupId');
    }
}