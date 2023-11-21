const flatiron = require('flatiron');
const path = require('path');
const layout = require('./templates/layout.js');
const app = flatiron.app;
const nocache = require('nocache');

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

console.log(__dirname);
const homeUrl = "/AjourholdRequest";
app.use(flatiron.plugins.http);
app.use(flatiron.plugins.static, {dir: __dirname});
app.use(nocache());
app.router.get("/", function () {
  this.res.writeHead(200,
    {
      'Content-Type': 'text/html'
    });
  this.res.end(layout());
});

app.router.get(`${homeUrl}/InitData`, function () {
  this.res.json(initData());
});


/*---------------- From KDO.Common --------------------
   public enum MessageType
   {
       All = 0,
       Mertid = 1,
       Utrykning = 2,
       Fravaer = 4,
       Avspasering = 8,
       Ajourhold = 15, // Mertid + Utrykning + Fravaer + Avspasering
       SickLeave = 16,
       HourlistMessage = 32,
       Request = 64,
       General = 128,
       Vacation = 256,
       Swap = 512,
       Slide = 1024,
       GenereltTillegg = 2048
   };
*/

const reasonCodesAll = () => {
  return {
          r1 : [
              {value:"101", text:"Avspasering reason 1"},
              {value:"102", text:"Avspasering reason 2"},
            ],
          r2 : [
              {value:"201", text:"Utrykning reason 1"},
              {value:"202", text:"Utrykning reason 2"},
            ],
          r6 : [
              {value:"601", text:"Absence reason 1"},
              {value:"602", text:"Absence reason 2"},
            ],
          r7 : [
              {value:"701", text:"Extra reason 1"},
              {value:"702", text:"Extra reason 2"},
              {value:"703", text:"Extra reason 3"}
            ],
          r15 : [
              {value:"1501", text:"Slide reason 1"},
              {value:"1502", text:"Slide reason 2"},
              {value:"1503", text:"Slide reason 3"}
            ],
          r18 : [
              {value:"1801", text:"Vacation reason 1"},
              {value:"1802", text:"Vacation reason 2"},
              {value:"1803", text:"Vacation reason 3"}
            ],
          r19 : [
              {value:"1901", text:"Generelt tillegg reason 1"},
              {value:"1902", text:"Generelt tillegg reason 2"},
              {value:"1903", text:"Generelt tillegg reason 3"}
            ]
        };
};
const initData = () => {
    return {
        userId: "KaiDan",
        workPlaces: [{value: "39",text: "Avdeling 1/Hjelpepleier"},
                     {value: "59",text: "Avdeling 2/Sykepleier"}],
        reasonCodes: reasonCodesAll(),
        saldo: 67.90,
        vacation: "12"
    };
};
const emptyComboBox = () => {
    return {value:"-1",text:"---------------------"}
}
const watchesFor = (isSwapTo) => {
  /*
  var item = new ComboBoxItem()
     {
         text = row["TEXT"].ToString(),
         value = String.Format("{0};{1};{2};{3}",
         row["VALUE"].ToString(),
         row["FRATID"].ToString(),
         row["TILTID"].ToString(),
         row["TIMER"].ToString())
     };
     */
     //const reqParams = url.split('&');
    if (isSwapTo === true) {
            /*
      return  [
         {value:"889577;07:30;15:30;7,50000;-", text:"Åberg, Camilla - D1 07:30 - 15:30"},
         {value:"889579;07:30;15:00;7,00000;-",text:"Lie, Trine - D3 07:30 - 15:00"},
         {value:"889580;07:30;15:00;7,00000;-",text:"Johnsen, Jon - D3 07:30 - 15:00"},
         {value:"889581;22:45;07:45;9,00000;-",text:"Alsen, Trine - N1 22:45 - 07:45"},
         {value:"889582;07:30;14:00;6,00000;-",text:"Moe, Kristin - D4 07:30 - 14:00"}
       ]
       */
      return {
        watchdefs: {
          "11": {len: "7,5", hourFrom: "07:30", hourTo: "15:00", isExtra: "false", reason: "701" },
          "22": {len: "8,0", hourFrom: "15:00", hourTo: "22:00", isExtra: "false", reason: "702"},
          "33": {len: "8,25", hourFrom: "07:45", hourTo: "16:00", isExtra: "false", reason: "703" }
        },
        watches: [
          {value:"11",text:"Guxen, Fredrik - D3 07:30 - 15:00"},
          {value:"22",text:"Knixen, Tine - A1 15:00 - 22:00"},
          {value:"33",text:"Kexen, Axel - D1 07:45 - 16:00"}]
        }
    }
    else {
      return {
        watchdefs: {
          "7012": {len: "7,5", hourFrom: "07:30", hourTo: "15:00", isExtra: "false", reason: "701" },
          "8914": {len: "8,0", hourFrom: "15:00", hourTo: "22:00", isExtra: "false", reason: "702"},
          "324": {len: "8,25", hourFrom: "07:45", hourTo: "16:00", isExtra: "true", reason: "703" }
        },
        watches: [
          {value:"7012",text:"Hansen, Fredrik - D3 07:30 - 15:00"},
          {value:"8914",text:"Johnsen, Tine - A1 15:00 - 22:00"},
          {value:"324",text:"Krais, Axel - D1 07:45 - 16:00"}]
        }
    }
};
app.router.get(`${homeUrl}/CoverFor`, function () {
  console.log(this.req.url);
  const w = watchesFor(false);
  console.log(w);
  this.res.json(w);
});
app.router.get(`${homeUrl}/WatchesFor`, function () {
  console.log(this.req.url);
  const w = watchesFor(false);
  console.log(w);
  this.res.json(w);
});
app.router.get(`${homeUrl}/WatchesForSwapTo`, function () {
  console.log(this.req.url);
  const w = watchesFor(true);
  console.log(w);
  this.res.json(w);
});

app.router.post(`${homeUrl}/SaveMessageCenter`, function () {
  console.log(this.req.url);
  console.log(this.req.body);
  this.res.json({ok: true, msg: ""});
});

app.router.get("/msg", function () {
  this.res.json(
    [
      { "id": 1, "received":"2018-4-12","read":false, "fromPerson":"Jonas Hax", "subject":"node.js", "cssClass":"mt1",
        "fromDate":"2018-4-28T07:30","toDate":"2018-4-28T15:00","workPlace":"Work Place","cover":"Trine Hex","reason":"Årsak 1",
        "msg":"How do you do?","msgTypeText":"Avspasering","fromStr":"07:30","toStr":"15:30","subItems":null},
      { "id": 2, "received":"2018-4-10","read":false, "fromPerson":"Jonas Hax", "subject":"node.js", "cssClass":"mt1",
        "fromDate":"2018-4-28T07:30","toDate":"2018-4-28T15:00","workPlace":"Work Place","cover":"Trine Hex","reason":"Årsak 1",
        "msg":"How do you do?","msgTypeText":"Avspasering","fromStr":"07:30","toStr":"15:30","subItems":null},
      { "id": 3, "received":"2018-4-5","read":false, "fromPerson":"Jonas Hax", "subject":"node.js", "cssClass":"mt1",
        "fromDate":"2018-4-28T07:30","toDate":"2018-4-28T15:00","workPlace":"Work Place","cover":"Trine Hex","reason":"Årsak 1",
        "msg":"How do you do?","msgTypeText":"Avspasering","fromStr":"07:30","toStr":"15:30","subItems":null}
     ]);
});


module.exports = app;

if (process.mainModule ===  module) {
  console.log("app staring on :3000...");
  app.start(3000);
}
