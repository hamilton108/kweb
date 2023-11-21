jQuery(document).ready(function () {
    const fetchUrl = `${KDO.mainUrl}/Home/SalaryPeriodsFor`;
    const saveUrl = `${KDO.mainUrl}/Home/SaveSalaryPeriods`;
    const detailUrl = `${KDO.mainUrl}/Home/SalaryPeriodDetail`;
    const hourlistUrl = `${KDO.mainUrl}/Home/SalaryPeriodHourlist`;
    DevExpress.viz.currentTheme(KDO.theme);
    $(function () {
        var watchesStore;
        const dataGrid = $("#gridContainer").dxDataGrid({
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
                const grid = $("#gridContainer").dxDataGrid("instance");
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
                  dataField: "wp",
                  caption: "Virksomhet/arbeidssted",
                  width: 180
              },
              {
                  dataField: "contract",
                  caption: "Type",
                  width: 180
              },
              {
                  caption: "Kontrakt",
                  width: 65,
                  cellTemplate: function (container, options) {
                      const userId = document.getElementById("userid").value;
                    $('<a/>').addClass('grid-link')
                        .text('Vis')
                        .on('dxclick', function () {
                            window.open(`${hourlistUrl}?userid=${userId}`);
                        })
                        .appendTo(container);
                  }
              },
                {
                    caption: "",
                    width: 100,
                  cellTemplate: function(container, options) {
                    $('<a/>').addClass('grid-link')
                        .text('Ny')
                        .on('dxclick', function () {
                          alert(options.data.id);
                        })
                        .appendTo(container);
                  }
                },
            ]
        }).dxDataGrid("instance");

        const fetchSalaryPeriods = () => {
            const userId = document.getElementById("userid").value;
            const curUrl = `${fetchUrl}?userid=${userId}`
            fetch(curUrl)
                    .then(data => {
                        return data.json();
                    }).then(result => {
                        watchesStore = new DevExpress.data.ArrayStore(result);
                        $("#gridContainer").dxDataGrid("instance").option("dataSource", watchesStore);
                    });
        };

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
