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


