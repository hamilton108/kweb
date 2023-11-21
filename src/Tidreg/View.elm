module Tidreg.View exposing (view, selectOption_)

import Common.Buttons as BTN
import Common.ComboBox as CB
import Common.DateTime as DT
import Common.ModalDialog as DLG
import Common.ViewItems as VI
import Html as H
import Html.Attributes as A
import Html.Events as E
import Tidreg.Commands as C
import Tidreg.Types exposing (emptyCostPlace, Deviation, CostPlace, Model, Msg(..))
import Common.ComboBox exposing (ComboBoxItem)
import VirtualDom exposing (Node)
import Common.ComboBox exposing (emptySelectOption)



{-
   <table class="table grid-data" id="tbl-deviations">
       <thead>
           <tr>
               <th scope="col">-</th>
               <th scope="col">Navn</th>
               <th scope="col">Reg. tid inn</th>
               <th scope="col">Vakt start</th>
               <th scope="col">Årsak inn</th>
               <th scope="col">Avvik inn</th>
               <th scope="col">Reg. tid ut</th>
               <th scope="col">Vakt slutt</th>
               <th scope="col">Årsak ut</th>
               <th scope="col">Avvik ut</th>
           </tr>
       </thead>
       <tbody>
           <tr>
               <td><input type="checkbox" class="cb-deviation"/></td>
               <td>Kai Danesen</td>
               <td>15.10 07:45</td>

        <tr>
            <td><input type="checkbox" /></td>
            <td>@row.Name</td>
            <td>@row.RegTimeIn</td>
            <td>@row.WatchStart</td>
            <td>@row.DeviationIn</td>
            <td>@row.RegTimeOut</td>
            <td>@row.WatchEnd</td>
            <td>@row.DeviationOut</td>
        </tr>

-}


tableHeader : H.Html Msg
tableHeader =
    H.thead []
        [ H.tr []
            [ H.th [ A.scope "col" ] [ H.text "-" ]
            , H.th [ A.scope "col" ] [ H.text "Navn" ]
            , H.th [ A.scope "col" ] [ H.text "Inn" ]
            , H.th [ A.scope "col" ] [ H.text "Vakt start" ]
            , H.th [ A.scope "col" ] [ H.text "Årsak inn" ]
            , H.th [ A.scope "col" ] [ H.text "Kostnadssted" ]
            , H.th [ A.scope "col" ] [ H.text "Avvik inn" ]
            , H.th [ A.scope "col" ] [ H.text "Ut" ]
            , H.th [ A.scope "col" ] [ H.text "Vakt slutt" ]
            , H.th [ A.scope "col" ] [ H.text "Årsak ut" ]
            , H.th [ A.scope "col" ] [ H.text "Avvik ut" ]
            ]
        ]


findCostPlace : List CostPlace -> Int -> CostPlace
findCostPlace costPlaces costPlaceId = 
    let
        search = List.filter (\x -> x.cpId == costPlaceId) costPlaces
    in
    case List.head search of 
        Nothing -> emptyCostPlace costPlaceId "--"
        Just hit -> hit

toRow : CB.SelectItems -> CB.SelectItems -> Deviation -> H.Html Msg
toRow reasonsIn reasonsOut d =
    let
        curIn =
            C.findReason d.reasonIn reasonsIn

        curOut =
            C.findReason d.reasonOut reasonsOut

        costPlace = findCostPlace d.costPlaces  d.costPlaceId
    in
    H.tr []
        [ H.td []
            [ H.input
                [ A.type_ "checkbox", A.class "styled", A.checked d.isSelected, E.onClick (CbChanged d) ]
                []
            ]

        -- [ H.div [ A.class "checkbox" ]
        --     [ H.input [ A.type_ "checkbox", A.class "styled", A.checked d.isSelected, E.onClick (CbChanged d) ] []
        --     , H.label [] [ H.text "" ]
        --     ]
        -- ]
        , H.td []
            [ BTN.button BTN.Success d.name True (Edit d)
            ]
        , H.td [] [ H.text <| DT.iso8601fmt1 d.regTimeIn ]
        , H.td [] [ H.text <| DT.iso8601fmt1 d.watchStart ]
        , H.td [] [ H.text curIn.txt ]
        , H.td [] [ H.text costPlace.cpName]
        , H.td [] [ H.text d.deviationIn ]
        , H.td [] [ H.text <| DT.iso8601fmt1 d.regTimeOut ]
        , H.td [] [ H.text <| DT.iso8601fmt1 d.watchEnd ]
        , H.td [] [ H.text curOut.txt ]
        , H.td [] [ H.text d.deviationOut ]
        ]


table : List Deviation -> CB.SelectItems -> CB.SelectItems -> H.Html Msg
table devx reasonsIn reasonsOut =
    let
        toRowFn =
            toRow reasonsIn reasonsOut
    in
    H.table [ A.class "table table-bordered grid-data" ]
        [ tableHeader
        , H.tbody []
            (List.map toRowFn devx)
        ]

costPlacesAsSelectItems : List CostPlace -> CB.SelectItems
costPlacesAsSelectItems cp = 
     ComboBoxItem "-1" "-" :: List.map (\x -> (ComboBoxItem (String.fromInt x.cpId) x.cpName)) cp

{-
costPlacesAsSelectItems2 = 
    List.map (CB.selectOption (Just "59")) 
    [ -- ComboBoxItem "-1" "-"
    ComboBoxItem "39" "39"
    , ComboBoxItem "59" "59"
    , ComboBoxItem "217" "217"
    , ComboBoxItem "257" "257"
    ]
    -}

view : Model -> H.Html Msg
view model =
    let
        header =
            case model.selectedDeviation of
                Nothing ->
                    ""

                Just d ->
                    "Endre: " ++ d.name
    in
    H.div [ A.class "grid-main3" ]
        [ H.div [ A.class "grid-h" ]
            [ H.div [ A.class "grid-btn" ]
                [ BTN.button BTN.Success "Godkjenn" True Approve
                , BTN.button BTN.Danger "Forkast" True Discard
                ]
            ]
        , table model.deviations model.reasonsIn model.reasonsOut
        , DLG.modalDialog header
            model.dlgEdit
            (DlgEdit True)
            (DlgEdit False)
            Nothing
            (dlgContent model.selectedDeviation model.reasonsIn model.reasonsOut)
        ]


gpos : VI.GridPosition
gpos =
    VI.GridPosition ""

{-
hourBankBalance : H.Html Msg
hourBankBalance =
    let
        mySaldo =
            "12.30"

        -- Maybe.withDefault "0.00" model.saldo
        timebankSaldoInput =
            VI.inputItem "number" mySaldo "form-control timebank" Nothing True

        tbs =
            VI.formGroupItem "col-form-label" "Timebank saldo:" timebankSaldoInput
    in
    VI.gridItem gpos tbs

toHourBank : H.Html Msg
toHourBank =
    let
        myToTimeBank =
            "0.00"

        -- Maybe.withDefault "0.00" model.toTimeBank
        tilTimebankInput =
            VI.inputItem "number" myToTimeBank "form-control timebank" Nothing False

        ttb =
            VI.formGroupItem "col-form-label" "Til timebank:" tilTimebankInput
    in
    VI.gridItem gpos ttb
-}


selectOption_ : ComboBoxItem -> Node a
selectOption_ =
    CB.selectOption (Just "-5")


dlgContent : Maybe Deviation -> CB.SelectItems -> CB.SelectItems -> List (H.Html Msg)
dlgContent deviation reasonsIn reasonsOut =
    case deviation of
        Nothing ->
            []

        Just d ->
            let
                reasonsIn_ = 
                    List.map  (CB.selectOption <| Just d.reasonIn) reasonsIn

                reasonsOut_ =
                    List.map (CB.selectOption <| Just d.reasonOut) reasonsOut

                regDateIn =
                    Just d.regTimeIn.date

                regTimeIn =
                    Just d.regTimeIn.time

                regDateOut =
                    Just d.regTimeOut.date

                regTimeOut =
                    Just d.regTimeOut.time
                
                toHourBank =
                    d.toHourBank

                selectedCostPlaceId =
                    String.fromInt d.costPlaceId

                costPlacesSi = 
                     List.map (CB.selectOption <| Just selectedCostPlaceId) (costPlacesAsSelectItems d.costPlaces)

            in
            --Debug.log (Maybe.withDefault "--" toHourBank)
            [ VI.dateItem "Fra dato:" regDateIn (DateChanged d 1)
            , VI.hourItem "Inn:" regTimeIn (HourChanged d 1) False
            , VI.selectRow (Just d.reasonIn) False False "Årsak inn:" reasonsIn_ (ReasonChanged d 1)
            , VI.selectRow (Just selectedCostPlaceId) False False "Koststed:" costPlacesSi (CostPlaceChanged d)
            , VI.dateItem "Til dato:" regDateOut (DateChanged d 2)
            , VI.hourItem "Ut:" regTimeOut (HourChanged d 2) False
            , VI.selectRow (Just d.reasonOut) False False "Årsak ut:" reasonsOut_ (ReasonChanged d 2)
            , VI.textItem "Til timebank:" toHourBank (ToHourbankChanged d) False
           -- , hourBankBalance
            ]



-- [ VI.dateItem "Fra dato:" regDateIn (DateChanged d 1)
-- , VI.hourItem "Inn:" regTimeIn (HourChanged d 1) False
-- , VI.dateItem "Til dato:" regDateOut (DateChanged d 2)
-- , VI.hourItem "Ut:" regTimeOut (HourChanged d 2) False
-- ]
-- [ VI.selectRow (Just d.reasonIn) False False "Årsak inn" reasonsIn_ (ReasonChanged d 1)
-- , VI.selectRow (Just d.reasonOut) False False "Årsak ut" reasonsOut_ (ReasonChanged d 2)
-- ]
