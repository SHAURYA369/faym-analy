// /**
//  * TODO(developer): Uncomment this variable and replace with your
//  *   Google Analytics 4 property ID before running the sample.
//  */

// propertyId = '143978554';
// const { google } = require('googleapis');
// // Imports the Google Analytics Data API client library.
// const {BetaAnalyticsDataClient} = require('@google-analytics/data');

// // Using a default constructor instructs the client to use the credentials
// // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
// const analyticsDataClient = new BetaAnalyticsDataClient();
// const axios = require('axios');
// // Runs a simple report.
// async function runReport() {
//   // const [response] = await analyticsDataClient.runReport({
//   //   property: `properties/${propertyId}`,
//   //   dateRanges: [
//   //     {
//   //       startDate: '2020-03-31',
//   //       endDate: 'today',
//   //     },
//   //   ]
//   // });

//   // console.log('Report result:');
//   // response.rows.forEach(row => {
//   //   console.log(row.dimensionValues[0], row.metricValues[0]);
//   // });
// const path=require('path');
// const access_token="eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk4NmVlOWEzYjc1MjBiNDk0ZGY1NGZlMzJlM2U1YzRjYTY4NWM4OWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NzgxMjc1ODg1NjEtYmdzdXVwMHIxaXFtamc0bTJmYWkxMXRyaW9uZnR1NGUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NzgxMjc1ODg1NjEtM3M5bTM0cmE4OWZvajdqZHJqcjcydjI3YXFicjFha2YuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTAxMzU1NDg4NDY4NDIzNjQ2NDQiLCJlbWFpbCI6ImFtaXRrdW1hcjUwNjA4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiQW1pdCBLdW1hciIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhielU0REQyZzJqRHlBTWoyNEYwOWNFOHZDRmwzLXN0cms3eG9lVnVBPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkFtaXQiLCJmYW1pbHlfbmFtZSI6Ikt1bWFyIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2Nzk3Nzc3ODQsImV4cCI6MTY3OTc4MTM4NH0.FWQNn-wNIGOleb9s6ZsPGm3xKZ2mw0rsiPXAImtHLNDyXxFaCZ6ykf9UdlQd5RHO6lk7yWwC_GwzZ91VzZ-YpTh2_Ih1GM_5lIucWmKvauErdE8D3fwGb5a57qYrIYnGZY4GWdo1jT8mZFEQMt4uRlIp4haMVUSKkh8BKP1eKv2ov331_lrR8o8LehmaqsA5R-zUaoWSuckakkbTzrm--rmE3ALhqkH_5EjXq7Y5Th6Lw"
//  const auth = new google.auth.GoogleAuth({
//       keyFile: path.join(__dirname, 'credentials.json'),
//        scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
//          });

// console.log(auth)
// }

// runReport();

const express = require('express');
const app = express();
const port = 3000;
const { google } = require('googleapis');
const request=require("request");
const cors=require('cors');
const urlParse=require("url-parse");
const urll=require("url")
const bodyParser=require("body-parser");
const axios=require("axios");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/ting",(req,res)=>res.send("yeet"));
app.listen(port,()=>console.log("yt analytics is listening on port 3000"));

app.get("/auth",(req,res)=>{
  const oauth2Client=new google.auth.OAuth2(
    "795783541332-h74n0g9kqcsrpouejrn099mbn58ferm4.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/analytics"

 
     )
      const scopes = ['https://www.googleapis.com/auth/analytics.readonly','https://www.googleapis.com/auth/youtube']
    
      const url=oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state:JSON.stringify({
          callbackUrl:req.body.callbackUrl,
          userId:req.body.userId
        })

      })
      request(url,(err,response,body)=>{
        console.log("error",err);
        console.log("statuscode",response && response.statusCode);
        res.send({url});
      });
     


});
app.get("/analytics",  async (req,res)=>{
  console.log("aya hia")
  function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
  const queryURL=new urlParse(req.url);
  const code=getParameterByName("code",queryURL);
  console.log("code",code);
  const oauth2Client=new google.auth.OAuth2(
    "795783541332-h74n0g9kqcsrpouejrn099mbn58ferm4.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/analytics"
     )
     const tokens=await oauth2Client.getToken(code);
      console.log("tokens",tokens);
      try{
        // const response=await axios.get("https://www.googleapis.com/youtube/v3/channels"+tokens.tokens.access_token);
        // console.log("response",response.data);
        let config = {
          headers: {
            'Authorization': 'Bearer ' + tokens.tokens.access_token
          }
        }
        axios.get( 
            'https://www.googleapis.com/youtube/v3/channels?mine=true&key=AIzaSyDRJEXg9lparScpK4spgallf9tEtcaFhfk',
            config
          )
          .then( ( response ) => {
            console.log( response.data)
          } )
          .catch()
      }
      catch(err){
        console.log("error",err);
      }
});