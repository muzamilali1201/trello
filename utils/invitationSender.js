const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

const invitationSender = async (email, invitationLink) => {
  await transport.sendMail({
    to: email,
    from: process.env.user,
    subject: "Invitation for joining board",
    html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invitation to Join Trello Board</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
        
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
        
            h1 {
              color: #333;
              text-align: center;
            }
        
            p {
              color: #666;
              text-align: center;
              margin-top: 20px;
            }
        
            .btn {
              display: inline-block;
              padding: 10px 20px;
              background-color: #0079bf;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s;
            }
        
            .btn:hover {
              background-color: #005c91;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Invitation to Join Our Trello Board</h1>
            <p>You've been invited to join our Trello board! Click the link below to accept the invitation and start collaborating.</p>
            <p>
              <a href="#">${invitationLink}</a>
            </p>
          </div>
        </body>
        </html>
        `,
  });
};

module.exports = invitationSender;
