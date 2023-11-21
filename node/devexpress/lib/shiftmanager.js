var KDO = KDO || {};
var DEBUG = false;
KDO.mainUrl = "http://172.17.0.2:3000";
KDO.theme = "generic.light";

KDO.Utils = (function () {
    const createHtmlOption = (value, text) => {
        const opt = document.createElement("option");
        opt.value = value;
        opt.text = text;
        return opt;
    };
    const getOptionValue = obj => {
        const index = obj.selectedIndex;
        return obj.options[index].value;
    };
    const dateToISO8601 = dx => {
        /*
        const y = dx.getFullYear();
        const m = dx.getMont() + 1;
        var ms;
        if (m < 10) {
          ms = "0" + m;
        }
        else {
          ms = m;
        }

        const d = dx.getDate();
        var ds;
        if (d < 10) {
          ds = "0" + d;
        }
        else {
          dms = d;
        }
        return `${y}-${ms}-${ds}`
        */
        return dx.toISOString().split("T")[0];
    };
    const incMonths = (dx,n) => {
        const result = new Date(dx);
        result.setMonth(dx.getMonth() + n);
        return result;
    };
    const incDays = (dx,n) => {
        const result = new Date(dx);
        result.setDate(dx.getDate() + n);
        return result;
    };
    const isEmpty = (s) => {
      if (!s) {
        return true;
      }
      if (0 === s.length) {
        return true;
      }
    };
    const isBlank = (s) => {
      return (!s || /^\s*$/.test(s));
    };
    return {
        createHtmlOption: createHtmlOption,
        getOptionValue: getOptionValue,
        dateToISO8601: dateToISO8601,
        incMonths: incMonths,
        incDays: incDays,
        isEmpty: isEmpty 
    };
})();
