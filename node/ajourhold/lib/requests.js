
jQuery(document).ready(function() {
  const setTabHeader = (heading) => {
      const header = document.getElementById("tab-header");
      header.text = heading;
  };

  $("body").on("click", "#tab-1", function (e) {
      setTabHeader("Ekstraarbeid");
  });
  $("body").on("click", "#tab-2", function (e) {
      setTabHeader("Fravær");
  });
  $("body").on("click", "#tab-3", function (e) {
      setTabHeader("Avspasering");
  });
  $("body").on("click", "#tab-4", function (e) {
      setTabHeader("Ferie");
  });
  $("body").on("click", "#tab-5", function (e) {
      setTabHeader("Vaktbytte");
  });
  $("body").on("click", "#tab-6", function (e) {
      setTabHeader("Generelt tillegg");
  });
  $("body").on("click", "#tab-7", function (e) {
      setTabHeader("Utrykning");
  });
  $("body").on("click", "#tab-8", function (e) {
      setTabHeader("Forskyvning");
  });

  //const mainUrl = "http://172.17.0.4:3000";
  const mainUrl = "http://localhost:3000/AjourholdRequest";

  const myUrl = `${mainUrl}/InitData`;

  const myLangValues = () => {
    return {
        "fra_dato" : "Fra dato",
        "til_dato" : "Til dato",
        "dekke_for" : "Dekke for",
        "vakt" : "Vakt:",
        "arbeidssted" : "Arbeidssted:",
        "timer" : "Timer:",
        "aarsakskoder" : "Årsakskoder",
        "melding" : "Melding",
        "timebank_saldo" : "Timebank saldo",
        "til_timebank" : "Til timebank",
        "lagre" : "Lagre",
        "fra_kl" : "Fra kl",
        "til_kl" : "Til kl",
    };
  };
  const initElm = (category) => {
    const node = document.getElementById(`elm${category}`);
    const myFlags = { lang: myLangValues(), ajcat: category, mainurl: mainUrl };
    const app = Elm.Ajourhold.Requests.init({
      node: node,
      flags: myFlags
    });
    return app;
  };
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
      app7.ports.initDataFetched.send(initDataFor("r7", result));
      app6.ports.initDataFetched.send(initDataFor("r6", result));
      app1.ports.initDataFetched.send(initDataFor("r1", result));
      app18.ports.initDataFetched.send(initDataFor("r18", result));
      app19.ports.initDataFetched.send(initDataFor("r19", result));
      app2.ports.initDataFetched.send(initDataFor("r2", result));
      app15.ports.initDataFetched.send(initDataFor("r15", result));
      app3.ports.workPlacesFetched.send(result);
    });

  const initDataFor = function(ajCat, myData) {
    const result = {
      "userId": myData.userId,
      "workPlaces": myData.workPlaces,
      "saldo": myData.saldo,
      "vacation": myData.vacation,
      "reasonCodes": myData["reasonCodes"][ajCat]
    }
    return result;
  }
})
