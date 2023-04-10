const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
     scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
       });
  console.log(auth)