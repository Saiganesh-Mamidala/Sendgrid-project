const sgMail = require("@sendgrid/mail");
const { code } = require("statuses");

sgMail.setApiKey('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')

var count =0;
var delivered=0;
const sendEmail = (to, from, subject, text) => {
    const msg = {
        to,
        from,
        subject,
        html: text,
    };

    sgMail.send(msg, function (err, result) {
      if (err) {
        count=count+1;
      } else {
        delivered=delivered+1;     
      }
      console.log("No.of Emails sent="+delivered+"/"+(count+delivered));  
    })
    
   
}

module.exports = sendEmail;


