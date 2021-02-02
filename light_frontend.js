var socket = io.connect();
function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

document.getElementById("openBtn").addEventListener("click", ()=>{
    console.log("Opening...")
    postAjax("http://eeethan.ddns.net"+"/auto/open", "", _=>{
        console.log("Open successful!")
    })
})

document.getElementById("closeBtn").addEventListener("click", ()=>{
    console.log("Closing...")
    postAjax("http://eeethan.ddns.net"+"/auto/close", "", _=>{
        console.log("Close successful!")
    })
})