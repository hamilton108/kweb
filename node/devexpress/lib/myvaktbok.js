jQuery(document).ready(function () {
    const fetchWorkPlacesUrl = `${KDO.mainUrl}/Home/WorkPlaces`;
    const fetchUrl = `${KDO.mainUrl}/Vaktbok/Fetch`;
    //const saveUrl = `${KDO.mainUrl}/Home/SaveSalaryPeriods`;
    const setTabHeader = (heading) => {
        const header = document.getElementById("tab-header");
        header.text = heading;
    };
    $("body").on("click", "#tab-1", function (e) {
        setTabHeader("Vaktbok");
    });
    $("body").on("click", "#tab-2", function (e) {
        setTabHeader("Ajourhold");
    });

    DevExpress.viz.currentTheme(KDO.theme);
    $(function () {
        var vakbokStore;
        const dataGridVaktbok = $("#vaktbokGrid").dxDataGrid({
            height: 500,
            keyExpr: "id",
            paging: {
                enabled: true
            },
            editing: {
                mode: "cell",
                allowUpdating: false
            },
            selection: {
                allowSelectAll: false,
                mode: "multiple",
                showCheckBoxesMode: "always"
            },
            onContentReady: function (e) {
                const grid = $("#vaktbokGrid").dxDataGrid("instance");
                const ds = grid.getDataSource();
                if (ds !== null) {
                    var selx = [];
                    const items = ds.items();
                    for (var i = 0; i < items.length; ++i) {
                        if (items[i].approve === true) {
                            selx.push(i);
                        }
                    }
                    e.component.selectRowsByIndexes(selx);
                }
            },
            columns: [
              {
                  dataField: "name",
                  caption: "Navn",
                  width: 180
              },
              {
                  dataField: "watchName",
                  caption: "Vakt",
                  width: 180
              },
              {
                  //dataField: "dateTimefrom",1
                  caption: "Fra",
                  width: 180,
                  cellTemplate: function (container, options) {
                      const s = options.data.dateTimeFrom;
                      $("<label/>").text("09.10 : 07:45").appendTo(container);
                  }
              },
              {
                  dataField: "to",
                  caption: "Til",
                  width: 180
              },
              {
                  caption: "Avvik",
                  width: 40,
                  cellTemplate: function (container, options) {
                      const userId = document.getElementById("userid").value;
                    $("<button/>").addClass("btn btn-success").text("Ny")
                        .on('dxclick', function () {
                            //window.open(`${hourlistUrl}?userid=${userId}`);
                            alert("Hi");
                        })
                        .appendTo(container);
                  }
              },
              {
                  dataField: "competence",
                  caption: "Kompetanse",
                  width: 180
              },
              {
                  dataField: "tasks",
                  caption: "Arbeidsoppgaver",
                  width: 180
              },
            ]
        }).dxDataGrid("instance");

        const dataGridAjourhold = $("#ajourholdGrid").dxDataGrid({
            height: 500,
            keyExpr: "id",
            paging: {
                enabled: true
            },
            editing: {
                mode: "cell",
                allowUpdating: false
            },
            selection: {
                allowSelectAll: false,
                mode: "multiple",
                showCheckBoxesMode: "always"
            },
            // public class CoverWeb
            //     public long Ajourdvid { get; set; }
            //     public DateTime Fra { get; set; }
            //     public DateTime Til { get; set; }
            //     public decimal Lengde { get; set; }
            //     public long Turnusenhetid { get; set; }
            //     public long Lonnsnr { get; set; }
            //     public string Etternavn { get; set; }
            //     public string Fornavn { get; set; }
            //     public string Vakttypenavn { get; set; }
            //     public string CompetenceString { get; set; }
            //     public string TaskString { get; set; }
            //     public long Ajourtypeid { get; set; }
            columns: [
              {
                  dataField: "len",
                  caption: "Lengde",
                  width: 180
              },
              {
                  dataField: "fromDate",
                  caption: "Fra",
                  width: 180
              },
              {
                  dataField: "toDate",
                  caption: "Til",
                  width: 180
              },
              {
                  dataField: "toDate",
                  caption: "Til",
                  width: 180
              },
              {
                  caption: "Avvik",
                  width: 65,
                  cellTemplate: function (container, options) {
                      const userId = document.getElementById("userid").value;
                    $("<button/>").addClass("btn btn-success").text("Ny")
                        .on('dxclick', function () {
                            //window.open(`${hourlistUrl}?userid=${userId}`);
                            alert("Hi");
                        })
                        .appendTo(container);
                  }
              },
              {
                  dataField: "competence",
                  caption: "Kompetanse",
                  width: 180
              },
              {
                  dataField: "tasks",
                  caption: "Arbeidsoppgaver",
                  width: 180
              },
            ]
        }).dxDataGrid("instance");

        const fetchWorkPlaces = () => {
            const userId = document.getElementById("userid").value;
            const workPlace = document.getElementById("workplace");
            const curUrl = `${fetchWorkPlacesUrl}?userid=${userId}`
            fetch(curUrl)
                    .then(data => {
                        return data.json();
                    }).then(result => {
                      workPlace.options.add(KDO.Utils.createHtmlOption("-1", "-----"));
                      result.forEach(o => workPlace.options.add(KDO.Utils.createHtmlOption(o.value, o.text)));
                    });
        };

        const fetchVaktbok = () => {
            const wp = document.getElementById("workplace").value;
            if (wp === "-1") {
                return;
            }
            const curDate = document.getElementById("vaktbok-date").value;
            if (KDO.Utils.isEmpty(curDate)) {
                return;
            }
            const userId = document.getElementById("userid").value;
            const curUrl = `${fetchUrl}?userid=${userId}&workPlace=${wp}&curDate=${curDate}`;

            console.log(curUrl);

            fetch(curUrl)
                    .then(data => {
                        return data.json();
                    }).then(result => {
                        vakbokStore = new DevExpress.data.ArrayStore(result.vaktbok);
                        $("#vaktbokGrid").dxDataGrid("instance").option("dataSource", vakbokStore);
                    });
        };

        $("body").on("change", "#workplace", function (e) {
            //const wp = KDO.Utils.getOptionValue(this);
            fetchVaktbok();
            e.preventDefault();
            e.stopPropagation();
        });
        $("body").on("change", "#vaktbok-date", function (e) {
            //const wp = KDO.Utils.getOptionValue(this);
            fetchVaktbok();
            e.preventDefault();
            e.stopPropagation();
        });
        fetchWorkPlaces();
        // const fetchSalaryPeriods = () => {
        //     const userId = document.getElementById("userid").value;
        //     const curUrl = `${fetchUrl}?userid=${userId}`
        //     fetch(curUrl)
        //             .then(data => {
        //                 return data.json();
        //             }).then(result => {
        //                 watchesStore = new DevExpress.data.ArrayStore(result);
        //                 $("#gridContainer").dxDataGrid("instance").option("dataSource", watchesStore);
        //             });
        // };

        // const saveSalaryPeriods = ws => {
        //     const userId = document.getElementById("userid").value;
        //     const wsForSave = ws.map(
        //       function (v) {
        //           // Opprinnelig approve er gammel verdi, ny approve må være motsatt
        //           return { id: v.data.id, status: !v.data.approve }
        //       }
        //     )
        //     const wsJson = JSON.stringify(wsForSave);
        //     fetch(`${saveUrl}?userid=${userId}`, {
        //         method: "post",
        //         headers: {
        //             "Accept": "application/json, text/plain, */*",
        //             "Content-Type": "application/json"
        //         },
        //         body: wsJson
        //     }).then(res=>res.json());
        // };
        // const saveBtn = document.getElementById("gridSave");
        // saveBtn.addEventListener("click", e => {
        //     const grid = $("#gridContainer").dxDataGrid("instance");
        //     const rows = grid.getVisibleRows();
        //     const toBeSaved = rows.filter(r => r.isSelected !== r.data.approve);
        //     saveSalaryPeriods(toBeSaved);
        //     //---- Må sette approve til !approve for å gjøre record til en allerede saved record
        //     toBeSaved.forEach(x => x.data.approve = !x.data.approve);
        //     e.stopPropagation();
        //     e.preventDefault();
        // });
        //fetchSalaryPeriods();
    });
});
