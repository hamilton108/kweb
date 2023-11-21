const flatiron = require('flatiron');
const path = require('path');
const layout = require('./templates/layout.js');
const app = flatiron.app;
const nocache = require('nocache');

//app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

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

app.router.get("/Home/ContractsFor", function () {
  this.res.json(initData());
});

const workPlaces = () => {
  return [{value: "39",text: "Avdeling 1/Hjelpepleier"},
          {value: "59",text: "Avdeling 2/Sykepleier"}];
}

const createWatch = (id,dateTimeFrom,dateTimeTo,competence,tasks,watchName,personId,isExtra,firstName,lastName) => {
  return { id: id,
    dateTimeFrom: dateTimeFrom,
    dateTimeTo: dateTimeTo,
    competence: competence,
    tasks: tasks,
    watchName: watchName,
    personId: personId,
    isExtra: isExtra,
    firstName: firstName,
    lastName: lastName
  };
}
const vaktbok = () => {
  return {vaktbok:[
    createWatch(1,"2018-03-10T07:00","2018-03-10T15:45","Hjelpepleier","Koke kaffe","D1",72,false,"Kai","Danesen"),
    createWatch(2,"2018-03-12T15:30","2018-03-12T22:45","-","Feie gulv","A1",72,false,"Kai","Danesen")
  ],
          ajouhold:[]};
}

app.router.get("/Home/WorkPlaces", function () {
  console.log(this.req.url);
  this.res.json(workPlaces());
});

app.router.get("/Vaktbok/Fetch", function () {
  console.log(this.req.url);
  this.res.json(vaktbok());
});

/*---------------- From KDO.Common --------------------
public class WorkContractWeb
{
public long ContractId { get; set; }
public bool? Approved { get; set; }
public string UnitName { get; set; }
public string ContractTypeName { get; set; }
public DateTime Fra { get; set; }
public DateTime Til { get; set; }
public long Turnusenhetid { get; set; }
public long Lonnsnr { get; set; }
// public string ContractText { get; set; }
}
*/
module.exports = app;

if (process.mainModule ===  module) {
  console.log("app staring on :3000...");
  app.start(3000);
}
