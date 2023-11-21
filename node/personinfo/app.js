const flatiron = require('flatiron');
const path = require('path');
const layout = require('./templates/layout.js');
const app = flatiron.app;
const nocache = require('nocache');

console.log(__dirname);
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

const homeUrl = "http://localhost:3000";

const personalia =
  {firstName:"Kai ",
  lastName:"Danesen",
  salaryNr:"10",
  birthDate:"13.04.1963"};

const emps = [
  {avd:"Avdeling 2",
   yrk:"Felles 1020",
   fromDate:"29.12.2014",
   toDate:"",
   stKode:"7174",
   fraction:"0,50",
   baseHours:"35,50",
   hoursPrWeek:"17,75",
   baseSalary:"-",
   salaryPrYear:"-"}];

const contactInfo =
  {address:"Grønnsunn veien 25",
  address2:"sadfasdfmm",
  postCode:"1263",
  place:"OSLO",
  country:"Norge",
  tlfPrivate:"32445566",
  tlfWork:"22111111",
  mobile:"99098671",
  email:"epost@hosmeg.no",
  email2:"",
  receiveSms:true};

const economyInfo =
  {skatteKommune:"",
   ansettelsesTypeNavn:"Skift-/Turnusarbeider",
   avgiftSone:0,
   startDato:"",
   sluttDato:"",
   fagforening:"",
   vikar:true};

const nextOfKin =
  [{kinId:67,
  navn:"hans",
  relasjon:"tr",
  adresse:"",
  adresse2:"",
  tlf:"",
  postNr:"0571",
  postSted:"OSLO"}];

app.router.get("/Home/PersonInfoFor", function () {
  const result = {
    personalia: personalia,
    emps: emps,
    contactInfo: contactInfo,
    economyInfo: economyInfo,
    nextOfKin: nextOfKin
  };
  this.res.json(result);
});

var curoid=1000;
app.router.post("/Home/UpdateNextOfKin", function () {
  console.log(this.req.url);
  console.log(this.req.body);
  this.res.json({ok: true, msg: "No problem!"});
});

app.router.post("/Home/AddNextOfKin", function () {
  console.log(this.req.url);
  console.log(this.req.body);
  curoid = curoid + 1;
  this.res.json({ok: true, msg: "No problem!", oid: curoid});
});

app.router.get("/Home/DeleteNextOfKin", function () {
  console.log(this.req.url);
  this.res.json({ok: true, msg: "No problem!"});
});

module.exports = app;

if (process.mainModule ===  module) {
  console.log("app staring on :3000...");
  app.start(3000);
}
