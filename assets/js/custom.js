function refreshSample() {
    let title = document.getElementById("title").value.toString();
    let date = document.getElementById("date").value.toString();
    let details = document.getElementById("details").value.toString();
    let imageLocation;
    let imageOrientation = document.getElementById("imageOrientation").value;
    let time;
    let amPm = "AM";

    if (date != "") {
        //clean up the date and time for display
        //['2022', '02', '03T21:40']
        date = date.split("-");
        time = date[2].split("T");
        time = time[1].split(":");

        if (parseInt(time[0]) >= 12) {
            amPm = "PM";
            time[0] = time[0] - 12;
        }
        time = time[0] + ":" + time[1] + amPm;
        date[2] = date[2].substring(0, date[2].indexOf("T"));
        date = date[1] + "/" + date[2] + "/" + date[0]
    }
    document.getElementById("dateAsString").value = date + " at " + time;
    //decide if we are using a custom image or a default
    if (document.getElementById("default").checked === true) {
        document.getElementById("imageLocation").disabled = true;
        imageLocation = "";

        //assign the values
        document.getElementById("sampleTitle").innerHTML = title;
        document.getElementById("sampleDate").innerHTML = date + " at " + time;
        document.getElementById("sampleDetails").innerHTML = details;

        document.getElementById("sampleImage").style = 'background-image: ' +
            'url("/img/garland_tabernacle_pews.jpeg"); background-size: 100%; ' +
            'background-position: ' + imageOrientation + ';color: white; text-shadow: black 0.1em 0.1em 0.2em;' +
            "list-style-type: none;"


    } else {
        document.getElementById("imageLocation").disabled = false;
        imageLocation = document.getElementById("imageLocation").value;

        document.getElementById("sampleTitle").innerHTML = title;
        document.getElementById("sampleDate").innerHTML = date + " at " + time;
        document.getElementById("sampleDetails").innerHTML = details;

        document.getElementById("sampleImage").style = 'background-image: ' +
            'url("' + imageLocation + '"); background-size: 100%; ' +
            'background-position: ' + imageOrientation + ';color: white; text-shadow: black 0.1em 0.1em 0.2em;' +
            "list-style-type: none;"

    }

}

function refreshSample2() {
    let title = document.getElementById("title").value.toString();
    let date = document.getElementById("date").value.toString();
    let details = document.getElementById("details").value.toString();
    let imageLocation;
    let imageOrientation = document.getElementById("imageOrientation").value;
    let time;
    let amPm = "AM";

    if (date != "") {
        //clean up the date and time for display
        //['2022', '02', '03T21:40']
        date = date.split("-");
        time = date[2].split("T");
        time = time[1].split(":");

        if (parseInt(time[0]) >= 12) {
            amPm = "PM";
            time[0] = time[0] - 12;
        }
        time = time[0] + ":" + time[1] + amPm;
        date[2] = date[2].substring(0, date[2].indexOf("T"));
        date = date[1] + "/" + date[2] + "/" + date[0]
    }
    document.getElementById("dateAsString").value = date + " at " + time;
    //decide if we are using a custom image or a default
    if (document.getElementById("default").checked === true) {
        document.getElementById("imageLocation").disabled = true;
        imageLocation = "";

        //assign the values
        document.getElementById("sampleTitle").innerHTML = title;
        document.getElementById("sampleDate").innerHTML = date + " at " + time;
        document.getElementById("sampleDetails").innerHTML = details;
        document.getElementById("sampleImage").style = 'background-image: ' +
            'url("/img/garland_tabernacle_pews.jpeg"); background-size: 100%; ' +
            'background-position: ' + imageOrientation + ';color: white; text-shadow: black 0.1em 0.1em 0.2em;' +
            "list-style-type: none;"


    } else {
        document.getElementById("file").disabled = false;
        imageLocation = document.getElementById("file").webkitRelativePath;


        document.getElementById("sampleTitle").innerHTML = title;
        document.getElementById("sampleDate").innerHTML = date + " at " + time;
        document.getElementById("sampleDetails").innerHTML = details;

        document.getElementById("sampleImage").style = 'background-image: ' +
            'url("' + imageLocation + '"); background-size: 100%; ' +
            'background-position: ' + imageOrientation + ';color: white; text-shadow: black 0.1em 0.1em 0.2em;' +
            "list-style-type: none;"

    }

}