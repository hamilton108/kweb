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

const normalArbeidsTid = {value:"-5", text: "Normal arbeidstid"};

const myDeviations = () => {
  return [
    {id : 2,
        name: "Kai Danesen",
        timeIn: "2018-10-17T07:35",
        watchStart: "2018-10-17T07:30",
        reasonIn: "-5",
        deviationIn: "-5min",
        timeOut: "2018-10-17T15:20",
        watchEnd: "2018-10-17T15:15",
        reasonOut: "3",
        deviationOut: "+5min",
        watchId: 87,
        presentId: null},
     {id : 3,
        name: "Helga Helgesen",
        timeIn: "2018-11-17T14:50",
        watchStart: "2018-11-17T14:00",
        reasonIn: "1",
        deviationIn: "-50min",
        timeOut: "2018-11-18T07:20",
        watchEnd: "2018-11-18T07:30",
        reasonOut: "4",
        deviationOut: "-10min",
        watchId: 421,
        presentId: null},
     {id : 4,
        name: "Kari Karvik",
        timeIn: "2018-11-17T14:50",
        watchStart: "2018-11-17T14:00",
        reasonIn: "1",
        deviationIn: "-50min",
        timeOut: "2018-11-18T07:20",
        watchEnd: "2018-11-18T07:30",
        reasonOut: "4",
        deviationOut: "-10min",
        watchId: null,
        presentId: 8943},
    ];
};

const myDeviations2 = () => {
  return {
    "flags": {
        "userid": "kaidan",
        "wid": "39",
        "lang": "no"
    },
    "usr": "kaidan",
    "deviations": [
        {
            "name": "Asle Tarvik",
            "id": 60,
            "timeIn": "2023-03-07T08:00",
            "timeOut": "2023-03-08T11:39",
            "watchStart": "",
            "watchEnd": "",
            "deviationIn": "-",
            "deviationOut": "-",
            "reasonIn": "659",
            "reasonOut": "-5",
            "watchId": null,
            "presentId": null,
            "isAnvist": false,
            "toHourBank": "0,00",
            "costplaceid": 39,
            "costplacelist": [
                {
                    "cpid": 39,
                    "cpname": "Avdeling 2/Felles 1020/KNA 12"
                },
                {
                    "cpid": 49,
                    "cpname": "Avdeling 3/Felles 1040/KNA 40"
                }
            ]
        },
        {
            "name": "Solveig Restad",
            "id": 66,
            "timeIn": "2023-03-09T08:00",
            "timeOut": "2023-03-09T09:52",
            "watchStart": "",
            "watchEnd": "",
            "deviationIn": "-",
            "deviationOut": "-",
            "reasonIn": "372",
            "reasonOut": "-5",
            "watchId": null,
            "presentId": null,
            "isAnvist": false,
            "toHourBank": "0,00",
            "costplaceid": null,
            "costplacelist": [
                {
                    "cpid": 39,
                    "cpname": "Avdeling 2/Felles 1020/KNA 12"
                }
            ]
        },
        {
            "name": "Trine Lie",
            "id": 69,
            "timeIn": "2023-03-09T12:05",
            "timeOut": "2023-03-09T12:27",
            "watchStart": "",
            "watchEnd": "",
            "deviationIn": "-",
            "deviationOut": "-",
            "reasonIn": "659",
            "reasonOut": "-5",
            "watchId": null,
            "presentId": null,
            "isAnvist": false,
            "toHourBank": "0,00",
            "costplaceid": 59,
            "costplacelist": [
                {
                    "cpid": 39,
                    "cpname": "Avdeling 2/Felles 1020/KNA 12"
                },
                {
                    "cpid": 49,
                    "cpname": "Avdeling 3/Felles 1040/KNA 40"
                },
                {
                    "cpid": 59,
                    "cpname": "Avdeling 4/Felles 1050/KNA 59"
                }
            ]
        },
        {
            "name": "Trine Lie",
            "id": 70,
            "timeIn": "2023-03-09T14:03",
            "timeOut": "2023-03-09T16:10",
            "watchStart": "",
            "watchEnd": "",
            "deviationIn": "-",
            "deviationOut": "-",
            "reasonIn": "660",
            "reasonOut": "372",
            "watchId": null,
            "presentId": null,
            "isAnvist": false,
            "toHourBank": "0,00",
            "costplaceid": null,
            "costplacelist": [
                {
                    "cpid": 39,
                    "cpname": "Avdeling 2/Felles 1020/KNA 12"
                }
            ]
        }
    ],
    "reasonsIn": [
        {
            "id": -5,
            "value": "-5",
            "text": "Normal arbeidstid",
            "isComing": true,
            "isLeaving": true
        },
        {
            "id": 192,
            "value": "192",
            "text": "Utrykning",
            "isComing": true,
            "isLeaving": true
        },
        {
            "id": 372,
            "value": "372",
            "text": "Møte frivillig",
            "isComing": true,
            "isLeaving": true
        },
        {
            "id": 659,
            "value": "659",
            "text": "Ekstrapersonell",
            "isComing": true,
            "isLeaving": true
        },
        {
            "id": 660,
            "value": "660",
            "text": "Opplæring",
            "isComing": true,
            "isLeaving": true
        },
        {
            "id": 661,
            "value": "661",
            "text": "Ekstra pga uro",
            "isComing": true,
            "isLeaving": true
        },
        {
            "id": 759,
            "value": "759",
            "text": "Møte pålagt",
            "isComing": true,
            "isLeaving": true
        },
        {
            "id": 962,
            "value": "962",
            "text": "Utrykning2",
            "isComing": true,
            "isLeaving": true
        }
    ],
    "reasonsOut": [
        {
            "id": -5,
            "value": "-5",
            "text": "Normal arbeidstid",
            "isComing": true,
            "isLeaving": true
        },
        {
            "id": 192,
            "value": "192",
            "text": "Utrykning",
            "isComing": true,
            "isLeaving": true
        },
        {
            "id": 372,
            "value": "372",
            "text": "Møte frivillig",
            "isComing": true,
            "isLeaving": true
        },
        {
            "id": 659,
            "value": "659",
            "text": "Ekstrapersonell",
            "isComing": true,
            "isLeaving": true
        },
        {
            "id": 660,
            "value": "660",
            "text": "Opplæring",
            "isComing": true,
            "isLeaving": true
        },
        {
            "id": 661,
            "value": "661",
            "text": "Ekstra pga uro",
            "isComing": true,
            "isLeaving": true
        },
        {
            "id": 759,
            "value": "759",
            "text": "Møte pålagt",
            "isComing": true,
            "isLeaving": true
        },
        {
            "id": 962,
            "value": "962",
            "text": "Utrykning2",
            "isComing": true,
            "isLeaving": true
        }
    ]
  }
};


const myDeviations3 = () => {
    return  {
        "flags": {
            "userid": "kaidan",
            "wid": "39"
        },
        "usr": "kaidan",
        "deviations": [
            {
                "name": "Kai  Danesen",
                "id": 96,
                "timeIn": "2023-03-16T08:05",
                "timeOut": "2023-03-16T10:45",
                "watchStart": "",
                "watchEnd": "",
                "deviationIn": "-",
                "deviationOut": "-",
                "reasonIn": "192",
                "reasonOut": "192",
                "watchId": null,
                "presentId": null,
                "isAnvist": false,
                "toHourBank": "0,00",
                "costplaceid": -1,
                "costplacelist": [
                    {
                        "cpid": 39,
                        "cpname": "Avdeling 2/Felles 1020/KNA 12"
                    },
                    {
                        "cpid": 59,
                        "cpname": "Avdeling 1/Bolig-A/Bolig-A"
                    }
                ]
            },
            {
                "name": "Asle Tarvik",
                "id": 98,
                "timeIn": "2023-03-16T15:15",
                "timeOut": "2023-03-16T23:45",
                "watchStart": "2023-03-16T15:15",
                "watchEnd": "2023-03-16T23:00",
                "deviationIn": "-",
                "deviationOut": "+45 min",
                "reasonIn": "-5",
                "reasonOut": "661",
                "watchId": 1147645,
                "presentId": null,
                "isAnvist": false,
                "toHourBank": "0,00",
                "costplaceid": -1,
                "costplacelist": [
                    {
                        "cpid": 39,
                        "cpname": "Avdeling 2/Felles 1020/KNA 12"
                    },
                    {
                        "cpid": 59,
                        "cpname": "Avdeling 1/Bolig-A/Bolig-A"
                    },
                    {
                        "cpid": 257,
                        "cpname": "Avdeling 12/VA_tjenesten-4600/"
                    },
                    {
                        "cpid": 217,
                        "cpname": "Avdeling 10/Otta/Otta"
                    }
                ]
            },
            {
                "name": "Kai  Danesen",
                "id": 99,
                "timeIn": "2023-03-16T10:56",
                "timeOut": "2023-03-16T10:57",
                "watchStart": "",
                "watchEnd": "",
                "deviationIn": "-",
                "deviationOut": "-",
                "reasonIn": "192",
                "reasonOut": "192",
                "watchId": null,
                "presentId": null,
                "isAnvist": false,
                "toHourBank": "0,00",
                "costplaceid": -1,
                "costplacelist": [
                    {
                        "cpid": 39,
                        "cpname": "Avdeling 2/Felles 1020/KNA 12"
                    },
                    {
                        "cpid": 59,
                        "cpname": "Avdeling 1/Bolig-A/Bolig-A"
                    }
                ]
            },
            {
                "name": "Kai  Danesen",
                "id": 100,
                "timeIn": "2023-03-17T06:30",
                "timeOut": "2023-03-17T06:30",
                "watchStart": "",
                "watchEnd": "",
                "deviationIn": "-",
                "deviationOut": "-",
                "reasonIn": "192",
                "reasonOut": "192",
                "watchId": null,
                "presentId": null,
                "isAnvist": false,
                "toHourBank": "0,00",
                "costplaceid": -1,
                "costplacelist": [
                    {
                        "cpid": 39,
                        "cpname": "Avdeling 2/Felles 1020/KNA 12"
                    },
                    {
                        "cpid": 59,
                        "cpname": "Avdeling 1/Bolig-A/Bolig-A"
                    }
                ]
            },
            {
                "name": "Kai  Danesen",
                "id": 101,
                "timeIn": "2023-03-17T06:30",
                "timeOut": "2023-03-17T06:30",
                "watchStart": "",
                "watchEnd": "",
                "deviationIn": "-",
                "deviationOut": "-",
                "reasonIn": "192",
                "reasonOut": "192",
                "watchId": null,
                "presentId": null,
                "isAnvist": false,
                "toHourBank": "0,00",
                "costplaceid": 59,
                "costplacelist": [
                    {
                        "cpid": 39,
                        "cpname": "Avdeling 2/Felles 1020/KNA 12"
                    },
                    {
                        "cpid": 59,
                        "cpname": "Avdeling 1/Bolig-A/Bolig-A"
                    }
                ]
            },
            {
                "name": "Asle Tarvik",
                "id": 102,
                "timeIn": "2023-03-23T07:44",
                "timeOut": "2023-03-23T12:55",
                "watchStart": "",
                "watchEnd": "",
                "deviationIn": "-",
                "deviationOut": "-",
                "reasonIn": "661",
                "reasonOut": "661",
                "watchId": null,
                "presentId": null,
                "isAnvist": false,
                "toHourBank": "0,00",
                "costplaceid": 39,
                "costplacelist": [
                    {
                        "cpid": 39,
                        "cpname": "Avdeling 2/Felles 1020/KNA 12"
                    },
                    {
                        "cpid": 59,
                        "cpname": "Avdeling 1/Bolig-A/Bolig-A"
                    },
                    {
                        "cpid": 257,
                        "cpname": "Avdeling 12/VA_tjenesten-4600/"
                    },
                    {
                        "cpid": 217,
                        "cpname": "Avdeling 10/Otta/Otta"
                    }
                ]
            }
        ],
        "reasonsIn": [
            {
                "id": -5,
                "value": "-5",
                "text": "Normal arbeidstid",
                "isComing": true,
                "isLeaving": true
            },
            {
                "id": 192,
                "value": "192",
                "text": "Utrykning",
                "isComing": true,
                "isLeaving": true
            },
            {
                "id": 372,
                "value": "372",
                "text": "Møte frivillig",
                "isComing": true,
                "isLeaving": true
            },
            {
                "id": 659,
                "value": "659",
                "text": "Ekstrapersonell",
                "isComing": true,
                "isLeaving": true
            },
            {
                "id": 660,
                "value": "660",
                "text": "Opplæring",
                "isComing": true,
                "isLeaving": true
            },
            {
                "id": 661,
                "value": "661",
                "text": "Ekstra pga uro",
                "isComing": true,
                "isLeaving": true
            },
            {
                "id": 759,
                "value": "759",
                "text": "Møte pålagt",
                "isComing": true,
                "isLeaving": true
            },
            {
                "id": 962,
                "value": "962",
                "text": "Utrykning2",
                "isComing": true,
                "isLeaving": true
            }
        ],
        "reasonsOut": [
            {
                "id": -5,
                "value": "-5",
                "text": "Normal arbeidstid",
                "isComing": true,
                "isLeaving": true
            },
            {
                "id": 192,
                "value": "192",
                "text": "Utrykning",
                "isComing": true,
                "isLeaving": true
            },
            {
                "id": 372,
                "value": "372",
                "text": "Møte frivillig",
                "isComing": true,
                "isLeaving": true
            },
            {
                "id": 659,
                "value": "659",
                "text": "Ekstrapersonell",
                "isComing": true,
                "isLeaving": true
            },
            {
                "id": 660,
                "value": "660",
                "text": "Opplæring",
                "isComing": true,
                "isLeaving": true
            },
            {
                "id": 661,
                "value": "661",
                "text": "Ekstra pga uro",
                "isComing": true,
                "isLeaving": true
            },
            {
                "id": 759,
                "value": "759",
                "text": "Møte pålagt",
                "isComing": true,
                "isLeaving": true
            },
            {
                "id": 962,
                "value": "962",
                "text": "Utrykning2",
                "isComing": true,
                "isLeaving": true
            }
        ]
    };
}

app.router.get("/FetchDeviations", function (userid) {
  const result = myDeviations3();

  console.log(result)
  this.res.json(result);

});
//app.router.get(`${homeUrl}/FetchDeviations`, function () {
app.router.get("/Deviation/FetchDeviations", function () {
  const result = {
        reasonsIn : [normalArbeidsTid,
                     {value:"1", text:"Reason 1"},
                     {value:"2", text:"Reason 2"}],
        reasonsOut: [normalArbeidsTid,
                     {value:"3", text:"Reason 3"},
                     {value:"4", text:"Reason 4"}],
        deviations: myDeviations()};
  this.res.json(result);
});

app.router.post("/Deviation/DiscardMany", function () {
  console.log(this.req.url);
  console.log(this.req.body);
  const result = {ok: true, msg: "Jada"};
  this.res.json(result);
});
app.router.post("/Deviation/ApproveMany", function () {
  console.log(this.req.url);
  console.log(this.req.body);
  const result = {ok: true, msg: "Jada"};
  this.res.json(result);
});
app.router.post("/Edit", function () {
  const result = {ok: true, msg: "Avvik beregnet OK!"};
  this.res.json(result);
});

module.exports = app;

if (process.mainModule ===  module) {
  console.log("app staring on :3000...");
  app.start(3000);
}
