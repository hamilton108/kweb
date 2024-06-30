
jQuery(document).ready(function () {
    const locUrl = `${KDO.mainUrl}/Home/GetCulture`;

  //Run this first.
  var locLang = "no";
  var curDic = KDO.lang.langDictionary.no;
  var curElmDic = KDO.lang.langDictionary.elm_no;
  const getLocale = async () => {

    var ret = "no";
    await fetch(locUrl)
      .then(data => {
        return data.json();
      }).then(result => {
        ret = result;
        locLang = ret != null ? ret : "no";
        if (locLang == "en") {
          curDic = KDO.lang.langDictionary.en;
          curElmDic = KDO.lang.langDictionary.elm_en;
        }

        const app7 = initElm(7); // Ekstraarbeid
        const app6 = initElm(6); // Fravær
        const app1 = initElm(1); // Avspasering
        const app18 = initElm(18); // Ferie
        const app3 = initElm(3); // Vaktbytte (Swap)
        const app19 = initElm(19); // Generelt tillegg
        const app2 = initElm(2); // Uttrykning
        const app15 = initElm(15); // Forskyvning (Slide)
        const userid = document.getElementById("userid").value;
        fetch(myUrl + "?userid=" + userid)
          .then(data => {
            return data.json();
          }).then(result => {
            app18.ports.initDataFetched.send(initDataFor(18, result));
            app19.ports.initDataFetched.send(initDataFor(19, result));
            app15.ports.initDataFetched.send(initDataFor(15, result));
            app3.ports.workPlacesFetched.send(initDataFor(3,result));
          });

        const fetchCurDayInitData = function (userId, messageType) {
          fetch(myCurDayInitUrl + "?userId=" + userid + "&messageType=" + messageType)
            .then(data => {
              return data.json();
            }).then(result => {
              switch (messageType) {
                case 1:
                  app1.ports.initDataCurDayFetched.send(curDayInitDataFor(messageType, result));
                  break;
                case 2:
                  app2.ports.initDataCurDayFetched.send(curDayInitDataFor(messageType, result));
                  break;
                case 6:
                  app6.ports.initDataCurDayFetched.send(curDayInitDataFor(messageType, result));
                  break;
                case 7:
                  app7.ports.initDataCurDayFetched.send(curDayInitDataFor(messageType, result));
                  break;
              }
            });
        };

        fetchCurDayInitData(userid, 1);
        fetchCurDayInitData(userid, 2);
        fetchCurDayInitData(userid, 6);
        fetchCurDayInitData(userid, 7);

        return ret != null ? ret : "no";
      });


  }

  var locale = getLocale();


  const setTabHeader = (heading) => {
    const header = document.getElementById("tab-header");
    header.text = heading;
  };

  $("body").on("click", "#tab-1", function (e) {
    setTabHeader(curDic.Ekstraarbeid);
  });
  $("body").on("click", "#tab-2", function (e) {
    setTabHeader(curDic.Fraver);
  });
  $("body").on("click", "#tab-3", function (e) {
    setTabHeader(curDic.Avspasering);
  });
  $("body").on("click", "#tab-4", function (e) {
    setTabHeader(curDic.Ferie);
  });
  $("body").on("click", "#tab-5", function (e) {
    setTabHeader(curDic.Vaktbytte);
  });
  $("body").on("click", "#tab-6", function (e) {
    setTabHeader(curDic.Generelttillegg);
  });
  $("body").on("click", "#tab-7", function (e) {
    setTabHeader(curDic.Utrykning);
  });
  $("body").on("click", "#tab-8", function (e) {
    setTabHeader(curDic.Forskyvning);
  });

  const myCurDayInitUrl = `${KDO.mainUrl}/AjourholdRequest/InitDataCurDay`;

  const myUrl = `${KDO.mainUrl}/AjourholdRequest/InitData`;
  const initElm = (category) => {
    const node = document.getElementById(`elm${category}`);
    const app = Elm.Ajourhold.Requests.init({
      node: node,
      flags: {
          "mainurl": `${KDO.mainUrl}/AjourholdRequest`, "ajcat": category, "lang": curElmDic
      }
    });
    return app;
  };

  const curDayInitDataFor = function(ajCat, myData) {
    const result = {
      "userId": myData.userId,
      "curUnitid": myData.curUnitid,
      "curWatchid": myData.curWatchid,
      "curDate": myData.curDate,
      "curHbank": myData.curHbank,
      "watches": myData.watches,
      "watchdefs": myData.watchdefs,
      "workPlaces": myData.workPlaces,
      "reasonCodes": myData["reasonCodes"][`r${ajCat}`],
      "reasonCodesUnits": myData["reasonCodesUnits"][`r${ajCat}`]
    }
    return result;
  }
  const initDataFor = function(ajCat, myData) {
    const result = {
      "userId": myData.userId,
      "workPlaces": myData.workPlaces,
      "saldo": myData.saldo,
      "vacation": myData.vacation,
      "reasonCodes": [],
      "reasonCodesUnits": myData["reasonCodesUnits"][`r${ajCat}`]
    }
    return result;
  }

})
