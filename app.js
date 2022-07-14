const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static("public"));



app.get("/", (req, res) =>
{
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) =>
{
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us9.api.mailchimp.com/3.0/lists/28c2e4c608";
  const options = {
    method: "POST",
    auth: "Shubham19:1c618ca6eef1ec5a3e21d1ab585957a-us9"
  }

  const request = https.request(url, options, (response) => {

    if(response.statusCode === 200)
    {
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", (data) => {
    console.log(JSON.parse(data));
  })
  })

  request.write(jsonData);
  request.end();
})

app.post("/failure", (req, res) => {
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, () =>
{
  console.log("The Server is running at Port 3000");
})

//API Key : 01c618ca6eef1ec5a3e21d1ab585957a-us9
//ListId : 28c2e4c608
