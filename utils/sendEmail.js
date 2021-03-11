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


