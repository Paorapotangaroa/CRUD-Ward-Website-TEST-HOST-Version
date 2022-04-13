// Ward Website Back and Front End
// Toa Pita
//Description: Tracks, edits, deletes, and adds announcements. Also contains the ward calendar.


//1)Create a server file called index.js
//Create a constant to hold the value for the port we are listening on
const port = process.env.PORT || 3333;

//requires the express module
let express = require("express");
//require moment
const moment = require("moment");
//require express-fileupload
const fileUpload = require("express-fileupload");
//require the path module
let path = require('path');

//create a new instance express variable called app
let app = express();

//Set the view engine to EJS
app.set("view engine", "ejs")

//Make it possible to access the body attribute using URL Encoding
app.use(express.urlencoded({ extended: true }));

//Allow file uploads
app.use(fileUpload());
//require the knex module and set it to access the PostgreSQL database
const knex = require(path.join(__dirname + '/knex/knex.js'));

//Make the css and image files accessable when ejs files are rendered.
app.use(express.static(__dirname + "/assets"));

//alerts user that the server is active and starts listening on the listen port 
app.listen(port, function() {

    console.log("Listener active on port " + port);

});

app.get("/", (req, res) => {
    //announcements within 7 daysd
    knex("Announcements").where("date", "<=", moment().add(7, 'days').calendar()).andWhere("date", ">=", moment().subtract(1, 'days').calendar()).orderBy("date")
        .then(results => {
            res.render("index", { announcement: results });
        });
});

app.get("/Calendar", (req, res) => {
    //next 30 days
    knex("Announcements").where("date", "<=", moment().add(30, 'days').calendar()).andWhere("date", ">=", moment().subtract(1, 'days').calendar()).orderBy("date")
        .then(results => {
            res.render("Calendar", { announcement: results });
        });
});


//Create a new annoucement
app.get("/createAnnouncement", (req, res) => {
    res.render("createAnnouncement")
});

app.post("/createAnnouncement", (req, res) => {
    //fix the redirect

    //defualt image path
    let image = "/img/garland_tabernacle_pews.jpeg";

    //if they selected custom change the image to their custom image
    if (req.body.image === "custom") {
        image = req.body.imageLocation
    }
    knex("Announcements").insert({

        //set the title to the title from the post
        "title": req.body.title,

        //set the details to the details from the post
        "details": req.body.details,

        //set the date to the date from the post
        "date": req.body.date,

        //set the imageLocation from the post
        "imageLocation": image,

        //set the image orientation
        "imageOrientation": req.body.imageOrientation,
        //set to the Date converted to text
        "dateAsString": req.body.dateAsString

    }).then(addResults => {

        //redirect to the display vehicle page
        res.redirect("/manageAnnouncements");

    }).catch(err => {
        //same as all the other errors
        console.log(err);
        res.status(500).json({ err });
    });
});

app.get("/manageAnnouncements", (req, res) => {
    knex("Announcements").orderBy("date")
        .then(results => {
            res.render("listAnnouncements", { announcement: results });
        });
});

app.get("/delete/:a_id", (req, res) => {
    knex("Announcements").where('a_id', req.params.a_id).del()
        .then(delResult => {
            res.redirect("/manageAnnouncements");
        });
});

app.get("/editAnnouncement/:a_id", (req, res) => {

    knex("Announcements").where("a_id", req.params.a_id)
        .then(announcementInfo => {
            res.render('editAnnouncement', { announcement: announcementInfo });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ err });
        });

});

app.post("/editAnnouncement", (req, res) => {
    //fix the redirect

    //defualt image path
    let image = "/img/garland_tabernacle_pews.jpeg";

    //if they selected custom change the image to their custom image
    if (req.body.image === "custom") {
        image = req.body.imageLocation
    }
    knex("Announcements").where("a_id", req.body.a_id).update({

        //set the title to the title from the post
        "title": req.body.title,

        //set the details to the details from the post
        "details": req.body.details,

        //set the date to the date from the post
        "date": req.body.date,

        //set the imageLocation from the post
        "imageLocation": image,

        //set the image orientation
        "imageOrientation": req.body.imageOrientation,
        //set to the Date converted to text
        "dateAsString": req.body.dateAsString

    }).then(addResults => {

        //redirect to the display vehicle page
        res.redirect("/manageAnnouncements");

    }).catch(err => {
        //same as all the other errors
        console.log(err);
        res.status(500).json({ err });
    });
});

app.get("/upload", (req, res) => {
    res.render("testFileUpload");
});

app.post("/upload", (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.myFile;
    const imgPath = __dirname + "/assets/img/" + file.name;

    file.mv(imgPath, (err) => {
        if (err) {
            res.redirect("/test");
        }
        res.render("newUpload", { imgPath: "img/" + file.name });
    });
});

app.get("/testing", (req, res) => {
    res.render("Test");
})