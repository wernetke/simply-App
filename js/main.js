// get user information from form
function getInfo(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passhash = CryptoJS.MD5(password).toString();
    console.log("username: " + username + " + password: " + password + " + md5: " + passhash);
    callLogin(username,passhash);
}

function storeData(data) {
    for (key in data) {
        localStorage.setItem(key, data[key]);
    }
}



function callLogin(username,password) {
    const Url = 'https://crtoea7d0a.execute-api.us-east-1.amazonaws.com/users/login?';
    let params = {
        u: username,
        hp: password
    };

    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

    let url = Url + query;

    fetch(url).then(function (response) {
        let statusCode = response.status;
        response.text().then(function(text) {
                let obj = JSON.parse(text);
                if (statusCode === 400 || statusCode === 401)
                {
                    document.getElementById("errorMessage").innerHTML = obj.error;
                    document.getElementById("errorMessage").style.display = "block";
                }
                else{
                    storeData(obj);
                   // const dataToken = getData();
                    document.getElementById("login").style.display = "none";
                    document.getElementById("logged").style.display = "block";
                    document.getElementById("label").innerHTML = obj.seetrusLabel;
                    document.getElementById("groupId").value = obj.groupId;
                }

            }).catch(function (error) {
            console.log('request failed', error)
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

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function checkUser(){
    if ( localStorage.getItem('token')!= null ) {
        document.getElementById("logged").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("label").innerHTML = localStorage.getItem('seetrusLabel');
        document.getElementById("groupId").value = localStorage.getItem('groupId');
    }
}