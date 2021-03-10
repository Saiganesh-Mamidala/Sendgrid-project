const path = require('path');
const express = require("express");
const app = express();
const emailvalidator= require('email-validator');

const sendEmail = require("./utils/sendEmail");

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("contact");
  });

app.get("/sent", (req, res) => {
    res.render("sent");
  });
  app.post("/sendemail", (req, res) => {
    const { name, Status, email, BCC } = req.body;
    var a= req.body.email; 
    var str= req.body.BCC;
    var Emails=[ ];
    Emails= str.split(" ");
    let unique=[...new Set(Emails)];
    unique.unshift(a);
    uniqueEmails=unique;
    var allmails= [];

    allmails=uniqueEmails

    var validmailcount=0;
    var validmails =[];
    var invalidmailcount=0;
    var invalidmails=[];
    for(i=0;i<allmails.length;i++){
        if(emailvalidator.validate(allmails[i])){
        validmailcount=validmailcount+1;
        validmails.push(allmails[i]);
        
        }else{
            invalidmailcount=invalidmailcount+1;
            invalidmails.push(allmails[i]);   
    }
}
  console.log("validmails="+validmailcount);
  console.log("invalidmails="+invalidmailcount);
  console.log("All Entered Mails:"+uniqueEmails);
  console.log(validmails)
  console.log(invalidmails)

  res.render("sent",{validmailcount,invalidmailcount,validmails,invalidmails});
 // res.render("sent",{invalidmailcount});
  
  const from='saiganesh.171mn019@nitk.edu.in';
  const to =a;


  const subject = "YOUR STATUS";

  const output = `
   <p>BELOW IS YOUR STATUS</p><br>
   <ui>
   <li><b>Hi ${name}</b></li>
   <li>Your result is ${Status}</li>
   </ui>
   <a href="www.google.co.in" target="_blank">click to visit Google</a>
   <br>
   <img src="https://www.k12digest.com/wp-content/uploads/2020/10/global-shala-550x330.jpg" alt="picture" width="300" height="300">
`   ;
   sendEmail(to, from, subject, output);
   //res.redirect("/sent");
   
  var i=0;
  for (i = 0; i < uniqueEmails.length-1; i++) {

  
  
     const from='saiganesh.171mn019@nitk.edu.in';
     const to =uniqueEmails[i];
  

     const subject = "YOUR STATUS";

     const output = `
      <p>BELOW IS YOUR STATUS</p><br>
      <ui>
      <li><b>Hi ${name}</b></li>
      <li>Your result is ${Status}</li>
      </ui>
      <a href="www.google.co.in" target="_blank">click to visit Google</a>
      <br>
      <img src="https://www.k12digest.com/wp-content/uploads/2020/10/global-shala-550x330.jpg" alt="picture" width="300" height="300">
  `   ;
     sendEmail(to, from, subject, output);     
    }
    res.redirect("/sent");
   
});

const PORT = process.env.PORT || 9024 ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));