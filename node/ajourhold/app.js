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
const initDataCurDay = () => {
    const ww = watchesFor(6);
    return {
        userId: "KaiDan",
        curUnitid: "39",
        curDate: "2024-03-03",
        watches: ww.watches,
        watchDefs: ww.watchdefs,
        /*
        workPlaces: [{value: "39",text: "Avdeling 1/Hjelpepleier"},
        
                     {value: "59",text: "Avdeling 2/Sykepleier"}],
        */
        workPlaces: [{value: "39",text: "Avdeling 1/Hjelpepleier"}],
        reasonCodes: reasonCodesAll()
    };
};

const emptyComboBox = () => {
    return {value:"-1",text:"---------------------"}
}

const EXTRA = "7"; // Ekstraarbeid
const ABSENCE = "6"; // Fravær
const TIMEOFF= "1"; // Avspasering
const VAC = "18"; // Ferie
const SWAP = "300"; // Vaktbytte (Swap)
const SWAP_TO = "301"; // Vaktbytte (Swap)
const GI = "19"; // Generelt tillegg
const EMER = "2"; // Uttrykning
const SLIDE = "150"; // Forskyvning (Slide)
const SLIDE_TO = "151"; // Forskyvning (Slide)
const DEFAULT_WATCH = "1001";
const COVER_FOR = "1002";

const watchDefs =  {
          "11": {len: "7,5", hourFrom: "07:30", hourTo: "15:00", isExtra: "false", reason: "701" },
          "22": {len: "8,0", hourFrom: "15:00", hourTo: "22:00", isExtra: "false", reason: "702"},
          "33": {len: "8,25", hourFrom: "07:45", hourTo: "16:00", isExtra: "false", reason: "703" },
          "7012": {len: "7,5", hourFrom: "07:30", hourTo: "15:00", isExtra: "false", reason: "701" },
          "8914": {len: "8,0", hourFrom: "15:00", hourTo: "22:00", isExtra: "false", reason: "702"},
          "324": {len: "8,25", hourFrom: "07:45", hourTo: "16:00", isExtra: "true", reason: "703" },
          "888": {len: "9,00", hourFrom: "22:00", hourTo: "07:00", isExtra: "false", reason: "703" },
          "889": {len: "9,00", hourFrom: "22:00", hourTo: "07:00", isExtra: "false", reason: "703" },
        };
const watchDefsEmer =  {
          "888": {len: "9,00", hourFrom: "22:00", hourTo: "07:00", isExtra: "false", reason: "703", startDate: "2018-10-09" },
          "889": {len: "9,00", hourFrom: "22:00", hourTo: "07:00", isExtra: "false", reason: "703", startDate: "2018-10-10" },
        };
const watchesFor = (ajCat) => {
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
     switch (ajCat) {
       case EMER:
              return {
                watchdefs: watchDefsEmer,
                watches: [
                  {value:"888",text:"N1: 09.10 22:00 - 10.10 07:00"},
                  {value:"889",text:"N1: 10.10 22:00 - 11.10 07:00"}]
                }
       case SWAP_TO:
              return {
                watchdefs: watchDefs,
                watches: [
                  {value:"11",text:"Guxen, Fredrik - D3 07:30 - 15:00"},
                  {value:"22",text:"Knixen, Tine - A1 15:00 - 22:00"},
                  {value:"33",text:"Kexen, Axel - D1 07:45 - 16:00"}]
                }
       case SLIDE:
              return {
                watchdefs: watchDefs,
                watches: [
                  {value:"11",text:"D3 07:30 - 15:00"},
                  {value:"22",text:"A1 15:00 - 22:00"},
                  {value:"33",text:"D1 07:45 - 16:00"}]
              }
       case SLIDE_TO:
              return {
                watchdefs: watchDefs,
                watches: [
                  {value:"888",text:"N1: 09.10 22:00 - 10.10 07:00"},
                  {value:"889",text:"N1: 10.10 22:00 - 11.10 07:00"}]
              }
       default:
              return {
                watchdefs: watchDefs,
                watches: [
                  {value:"7012",text:"Hansen, Fredrik - D3 07:30 - 15:00"},
                  {value:"8914",text:"Johnsen, Tine - A1 15:00 - 22:00"},
                  {value:"324",text:"Krais, Axel - D1 07:45 - 16:00"}]
                }
      };
};

const init_cur_day_1_single = 
{
  "userId": "kaidan",
  "workPlaces": [
    {
      "text": "Avdeling 2/Felles 1020/KNA 12",
      "value": "39"
    }
  ],
  "curDate": "2024-03-14",
  "curUnitid": "39",
  "curWatchid": "1212488",
  "curHbank": {
    "value": 32.2
  },
  "watches": [
    {
      "text": "A1: 14.03 15:15 - 14.03 23:00",
      "value": "1212488"
    }
  ],
  "watchdefs": {
    "1212488": {
      "len": "7,75",
      "hourFrom": "15:15",
      "hourTo": "23:00",
      "isExtra": "false",
      "reason": "",
      "startDate": "2024-03-14"
    }
  },
  "reasonCodes": reasonCodesAll()
}

const init_cur_day_1_many = 
{
  "userId": "jonjoh",
  "workPlaces": [
    {
      "text": "Avdeling 1/Bolig-A/Bolig-A",
      "value": "59"
    },
    {
      "text": "Avdeling 2/Felles 1020/KNA 12",
      "value": "39"
    },
    {
      "text": "Avdeling 2/2530 - Dagarbeider/2530 - Dagarbeider",
      "value": "131"
    }
  ],
  "curDate": "2024-03-14",
  "curUnitid": "-1",
  "curWatchid": "-1",
  "curHbank": {
    "value": 0
  },
  "watches": [],
  "watchdefs": {},
  "reasonCodes": reasonCodesAll()
}

const init_cur_day_7_single = 
{
  "userId": "kaidan",
  "workPlaces": [
    {
      "text": "Avdeling 2/Felles 1020/KNA 12",
      "value": "39"
    }
  ],
  "curDate": "2024-03-14",
  "curUnitid": "39",
  "curWatchid": "-1",
  "curHbank": {
    "value": 32.2
  },
  "watches": [],
  "watchdefs": {},
  "reasonCodes": reasonCodesAll()
};

const init_cur_day_7_many = 
{
  "userId": "jonjoh",
  "workPlaces": [
    {
      "text": "Avdeling 1/Bolig-A/Bolig-A",
      "value": "59"
    },
    {
      "text": "Avdeling 2/Felles 1020/KNA 12",
      "value": "39"
    },
    {
      "text": "Avdeling 2/2530 - Dagarbeider/2530 - Dagarbeider",
      "value": "131"
    }
  ],
  "curDate": "2024-03-14",
  "curUnitid": "-1",
  "curWatchid": "-1",
  "curHbank": {
    "value": 0
  },
  "watches": [],
  "watchdefs": {},
  "reasonCodes": reasonCodesAll()
};

const parseReqUrl = function (reqUrl) {
  console.log(reqUrl);
  const paramString = reqUrl.split("?")[1];
  const queryParam = paramString.split("&");
  console.log(queryParam);
  return queryParam;
};


app.router.get(`${homeUrl}/InitDataCurDay`, function () {
  const queryParam = parseReqUrl(this.req.url);
  const msgType = queryParam[1].split("=")[1];
  console.log("Message type: " + msgType);
  //this.res.json(initDataCurDay());
  if (msgType == "1") {
    this.res.json(init_cur_day_1_single);
  }
  /*
  else if (msgType == "2") {
    this.res.json(init_cur_day_2);
  }
  */
  else if (msgType == "6") {
    this.res.json(init_cur_day_1_single);
  }
  else if (msgType == "7") {
    this.res.json(init_cur_day_7_single);
  }
  else {
    return {};
  }
});

app.router.get(`${homeUrl}/CoverFor`, function () {
  console.log(this.req.url);
  const w = watchesFor(COVER_FOR);
  this.res.json(w);
});
app.router.get(`${homeUrl}/WatchesFor`, function () {
  const queryParam = parseReqUrl(this.req.url);
  const msgType = queryParam[0].split("=")[1];
  const w = watchesFor(msgType); //DEFAULT_WATCH);
  this.res.json(w);
});
app.router.get(`${homeUrl}/timebankworkplace`, function () {
  const queryParam = parseReqUrl(this.req.url);
  const workPlace = queryParam[1].split("=")[1];
  console.log(workPlace);
  const curVal = workPlace === "39" ? 12.45343 : 15.47865;
  this.res.json({value: curVal});
});
app.router.get(`${homeUrl}/WatchesForSwapTo`, function () {
  console.log(this.req.url);
  const w = watchesFor(SWAP_TO);
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

// Parameterized routes
app.router.get("/AjourholdRequest/slidefrom/:usr/:workPlace/:curDate", function (usr,workPlace,curDate) {
  console.log(this.req.url);
  console.log(`usr: ${usr}, workPlace: ${workPlace}, curDate: ${curDate}`);
  const w = watchesFor(SLIDE);
  this.res.json(w);
});

app.router.get("/AjourholdRequest/slideto/:usr/:workPlace/:curDate", function (usr,workPlace,curDate) {
  const w = watchesFor(SLIDE_TO);
  this.res.json(w);
});


module.exports = app;

if (process.mainModule ===  module) {
  console.log("app staring on :3000...");
  app.start(3000);
}
