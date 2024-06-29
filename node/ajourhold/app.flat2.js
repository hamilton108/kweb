const flatiron = require('flatiron');
const path = require('path');
const layout = require('./templates/layout.js');
const app = flatiron.app;
const nocache = require('nocache');

var fs = require('fs');

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });



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
const COVER_FOR = "1002";

const watchesFor = (ajCat) => {
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
}


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

const INIT_DATA_JON = 1;
const INIT_DATA_CUR_JON = 2;

const INIT_DATA_KAI = 3;
const INIT_DATA_CUR_KAI_1 = 4;
const INIT_DATA_CUR_KAI_2 = 5;
const INIT_DATA_CUR_KAI_6 = 6;
const INIT_DATA_CUR_KAI_7 = 7;

const readInitData = (v) => {
  let result = null;
  if (v === INIT_DATA_JON) {
    result = JSON.parse(fs.readFileSync('db/init_data/jon.json', 'utf8'));
  }
  else if (v === INIT_DATA_CUR_JON) {
    result = JSON.parse(fs.readFileSync('db/init_data_cur_day/jon_1.json', 'utf8'));
  }
  else if (v === INIT_DATA_KAI) {
    result = JSON.parse(fs.readFileSync('db/init_data/kai.json', 'utf8'));
  }
  else if (v === INIT_DATA_CUR_KAI_1) {
    result = JSON.parse(fs.readFileSync('db/init_data_cur_day/kai_1.json', 'utf8'));
  }
  else if (v === INIT_DATA_CUR_KAI_2) {
    result = JSON.parse(fs.readFileSync('db/init_data_cur_day/kai_2.json', 'utf8'));
  }
  else if (v === INIT_DATA_CUR_KAI_6) {
    result = JSON.parse(fs.readFileSync('db/init_data_cur_day/kai_6.json', 'utf8'));
  }
  else if (v === INIT_DATA_CUR_KAI_7) {
    result = JSON.parse(fs.readFileSync('db/init_data_cur_day/kai_7.json', 'utf8'));
  }
  else {
    result = JSON.parse('{}');
  }
  console.log(result);
  return result;
}

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

  if (msgType == "1") {
    this.res.json(readInitData(INIT_DATA_CUR_JON));
  }
  else if (msgType == "2") {
    this.res.json(readInitData(INIT_DATA_CUR_KAI_2));
  }
  else if (msgType == "6") {
    this.res.json(readInitData(INIT_DATA_CUR_KAI_6));
  }
  else if (msgType == "7") {
    this.res.json(readInitData(INIT_DATA_CUR_KAI_7));
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

app.router.get(`${homeUrl}/InitData`, function () {
  const data = readInitData(INIT_DATA_JON);
  this.res.json(data);
});

app.router.get(`${homeUrl}/WatchesFor`, function () {
  console.log(this.req.url);
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


if (process.mainModule ===  module) {
  console.log("app staring on :3000...");
  app.start(3000);
}
