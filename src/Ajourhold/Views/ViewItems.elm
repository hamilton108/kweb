module Ajourhold.Views.ViewItems exposing
    ( btn
    , dateFrom
    , dateItem
    , dateItem2
    , dateTo
    , dateTo2
    , formGroupItem
    , fromHour
    , fromHour2
    , gA1
    , gA2
    , gA3
    , gB1
    , gB2
    , gB3
    , gC1
    , gC2
    , gC3
    , gD1
    , gD2
    , gD23
    , gD3
    , gE1
    , gE2
    , gE23
    , gF1
    , gF23
    , gG1
    , gridAjourItem
    , hourBankBalance
    , inputItem
    , message
    , reasons
    , sumHour
    , sumHour2
    , toHour
    , toHour2
    , toHourBank
    , watch1
    , watch2
    , workPlace1
    , workPlace2
    , wrapSelectItems
    )

import Ajourhold.AjourCatEnum exposing (AjourCatEnum(..))
import Ajourhold.Commands as C
import Ajourhold.Types
    exposing
        ( GridPosition(..)
        , IsDisabled(..)
        , Model
        , Msg(..)
        , SendMsg(..)
        )
import Common.Buttons as BTN
import Common.ComboBox as CB
import Common.Misc exposing (getLangValue)
import Html as H
import Html.Attributes as A
import Html.Events as E
import VirtualDom as VD



{-
   dateGroupParam1 : { d1 : String, d2 : String }
   dateGroupParam1 =
       { d1 = "Fra dato:"
       , d2 = "Til dato:"
       }


   dateGroupParam2 : { d1 : String, d2 : String }
   dateGroupParam2 =
       { d1 = "Til dato slutt:"
       , d2 = "Til slutt slutt:"
       }

-}


gA1 : GridPosition
gA1 =
    GridPosition "grid-ajour-a1"


gA2 : GridPosition
gA2 =
    GridPosition "grid-ajour-a2"


gA3 : GridPosition
gA3 =
    GridPosition "grid-ajour-a3"


gB1 : GridPosition
gB1 =
    GridPosition "grid-ajour-b1"


gB2 : GridPosition
gB2 =
    GridPosition "grid-ajour-b2"


gB3 : GridPosition
gB3 =
    GridPosition "grid-ajour-b3"


gC1 : GridPosition
gC1 =
    GridPosition "grid-ajour-c1"


gC2 : GridPosition
gC2 =
    GridPosition "grid-ajour-c2"


gC3 : GridPosition
gC3 =
    GridPosition "grid-ajour-c3"


gD1 : GridPosition
gD1 =
    GridPosition "grid-ajour-d1"


gD2 : GridPosition
gD2 =
    GridPosition "grid-ajour-d2"


gD3 : GridPosition
gD3 =
    GridPosition "grid-ajour-d3"


gD23 : GridPosition
gD23 =
    GridPosition "grid-ajour-d23"


gE1 : GridPosition
gE1 =
    GridPosition "grid-ajour-e1"


gE2 : GridPosition
gE2 =
    GridPosition "grid-ajour-e2"



{-
   gE12 : GridPosition
   gE12 =
       GridPosition "grid-ajour-e12"
-}


gE23 : GridPosition
gE23 =
    GridPosition "grid-ajour-e23"


gF1 : GridPosition
gF1 =
    GridPosition "grid-ajour-f1"


gF23 : GridPosition
gF23 =
    GridPosition "grid-ajour-f23"


gG1 : GridPosition
gG1 =
    GridPosition "grid-ajour-g1"


dateFrom : Model -> (String -> Msg) -> H.Html Msg
dateFrom model msg =
    let
        title =
            getLangValue "fra_dato" model.lang
    in
    gridAjourItem gA1
        (dateItem title model.dateFrom msg)


dateTo2 : Model -> (String -> Msg) -> GridPosition -> Bool -> H.Html Msg
dateTo2 model msg gpos checkMissing =
    let
        title =
            getLangValue "til_dato" model.lang
    in
    gridAjourItem gpos
        (dateItem2 title model.dateTo msg checkMissing)


dateTo : Model -> (String -> Msg) -> GridPosition -> H.Html Msg
dateTo model msg gpos =
    dateTo2 model msg gpos True


watch1 : Model -> Bool -> (String -> Msg) -> GridPosition -> H.Html Msg
watch1 model isDisabled msg gpos =
    let
        py =
            wrapSelectItems "-------" Nothing model.watches

        title =
            if model.ajcat == AceExtra then
                getLangValue "dekke_for" model.lang
                --"Dekke for:"

            else
                getLangValue "vakt" model.lang

        --"Vakt:"
        wp2 =
            selectRow False isDisabled title py msg
    in
    gridAjourItem gpos wp2



-- gridAjourItem gB2 wp2


watch2 : Model -> Bool -> (String -> Msg) -> GridPosition -> H.Html Msg
watch2 model isDisabled msg gpos =
    let
        title =
            getLangValue "vakt" model.lang

        py =
            wrapSelectItems "-------" Nothing model.watches2

        w2 =
            selectRow False isDisabled title py msg
    in
    gridAjourItem gpos w2



-- gridAjourItem gD2 w2


workPlace1 : Model -> (String -> Msg) -> GridPosition -> H.Html Msg
workPlace1 model msg gpos =
    let
        title =
            getLangValue "arbeidssted" model.lang

        px =
            wrapSelectItems "-------" model.selectedWorkPlace model.workPlaces

        isMissing =
            model.selectedWorkPlace == Nothing

        wp1 =
            selectRow isMissing False title px msg
    in
    gridAjourItem gpos wp1


workPlace2 : Model -> (String -> Msg) -> GridPosition -> H.Html Msg
workPlace2 model msg gpos =
    let
        title =
            getLangValue "arbeidssted" model.lang

        px =
            wrapSelectItems "-------" Nothing model.workPlaces

        isMissing =
            model.selectedWorkPlace == Nothing

        wp2 =
            selectRow isMissing False title px msg
    in
    gridAjourItem gpos wp2



-- gridAjourItem gD1 wp2


sumHour : Model -> GridPosition -> H.Html Msg
sumHour model gpos =
    let
        title =
            getLangValue "timer" model.lang
    in
    gridAjourItem gpos
        (sumHourItem title model.sumHours)


sumHour2 : Model -> GridPosition -> H.Html Msg
sumHour2 model gpos =
    let
        title =
            getLangValue "timer" model.lang
    in
    gridAjourItem gpos
        (sumHourItem title model.sumHours2)


wrapSelectItemsReasons firstLineTitle selected items =
    CB.emptySelectOption (Just firstLineTitle)
        :: List.map (selectOption_ selected) items


reasons : Model -> GridPosition -> H.Html Msg
reasons model gpos =
    let
        title =
            getLangValue "aarsakskoder" model.lang

        rc =
            wrapSelectItemsReasons "-------" Nothing model.reasonCodes

        isMissingReason =
            model.selectedReasonCode == Nothing

        r =
            selectRow isMissingReason False title rc ReasonCodeChanged
    in
    gridAjourItem gpos r


message : Model -> GridPosition -> H.Html Msg
message model gpos =
    let
        title =
            getLangValue "melding" model.lang
    in
    gridAjourItem gpos
        (meldingInput title model.melding)


hourBankBalance : Model -> H.Html Msg
hourBankBalance model =
    let
        title =
            getLangValue "timebank_saldo" model.lang

        mySaldo =
            Maybe.withDefault "0.00" model.saldo

        timebankSaldoInput =
            inputItem "number" mySaldo "form-control timebank" Nothing True

        tbs =
            formGroupItem "col-form-label" title timebankSaldoInput
    in
    gridAjourItem gD2 tbs


toHourBank : Model -> H.Html Msg
toHourBank model =
    let
        title =
            getLangValue "til_timebank" model.lang

        myToTimeBank =
            Maybe.withDefault "0.00" model.toTimeBank

        tilTimebankInput =
            inputItem "number" myToTimeBank "form-control timebank" (Just ToTimeBankChanged) False

        ttb =
            formGroupItem "col-form-label" title tilTimebankInput
    in
    gridAjourItem gD1 ttb


btn : Model -> GridPosition -> H.Html Msg
btn model (GridPosition gpos) =
    let
        title =
            getLangValue "lagre" model.lang
    in
    H.div [ A.class gpos ]
        [ H.div [ A.class "form-group" ]
            [ BTN.button BTN.Success title (C.canSendData model) (SendData Send) ]
        ]



{-
   let
       clazz =
           case model.ajCat of
               3 ->
                   gE1

               18 ->
                   gE1

               19 ->
                   gE1

               _ ->
                   gF1
   in
   H.div [ A.class clazz ]
       [ H.div [ A.class "form-group" ]
           [ BTN.button BTN.Success "Lagre" (C.canSendData model) (SendData Send) ]
       ]
-}


fromHour : Model -> IsDisabled -> GridPosition -> H.Html Msg
fromHour model (IsDisabled isDisabled) gpos =
    let
        title =
            getLangValue "fra_kl" model.lang

        index =
            if model.ajcat == AceEmergency then
                31

            else
                1
    in
    gridAjourItem gpos
        (hourItem title model.hourFrom (HourChanged index) isDisabled)


toHour : Model -> IsDisabled -> GridPosition -> H.Html Msg
toHour model (IsDisabled isDisabled) gpos =
    let
        title =
            getLangValue "til_kl" model.lang

        index =
            if model.ajcat == AceEmergency then
                32

            else
                2
    in
    gridAjourItem gpos
        (hourItem title model.hourTo (HourChanged index) isDisabled)


fromHour2 : Model -> IsDisabled -> GridPosition -> H.Html Msg
fromHour2 model (IsDisabled isDisabled) gpos =
    let
        title =
            getLangValue "fra_kl" model.lang
    in
    gridAjourItem gpos
        (hourItem title model.hourFrom2 (HourChanged 21) isDisabled)


toHour2 : Model -> IsDisabled -> GridPosition -> H.Html Msg
toHour2 model (IsDisabled isDisabled) gpos =
    let
        title =
            getLangValue "til_kl" model.lang
    in
    gridAjourItem gpos
        (hourItem title model.hourTo2 (HourChanged 22) isDisabled)


gridAjourItem : GridPosition -> H.Html Msg -> H.Html Msg
gridAjourItem (GridPosition clazz) item =
    H.div [ A.class clazz ] [ item ]


formGroupItem : String -> String -> H.Html Msg -> H.Html Msg
formGroupItem clazz title myInput =
    H.div [ A.class "form-group" ]
        [ H.label [ A.class clazz ]
            [ H.text title ]
        , myInput
        ]


dateItem2 : String -> Maybe String -> (String -> Msg) -> Bool -> H.Html Msg
dateItem2 title value event checkMissing =
    let
        isMissing =
            value == Nothing

        value_ =
            Maybe.withDefault "" value

        dateClazz =
            "form-control date start-date"

        myClazz =
            if checkMissing == True then
                if isMissing == True then
                    "missing"

                else
                    ""

            else
                ""

        myInput =
            H.input [ A.value value_, A.type_ "date", A.class dateClazz, E.onInput event ] []
    in
    formGroupItem myClazz title myInput


dateItem : String -> Maybe String -> (String -> Msg) -> H.Html Msg
dateItem title value event =
    dateItem2 title value event True



{-
   selectRow2 :
       Maybe String
       -> Bool
       -> String
       -> List (H.Html Msg)
       -> (String -> Msg)
       -> H.Html Msg
   selectRow2 value isMissing title mySelects myMsg =
       let
           valx =
               Maybe.withDefault "-1" value

           mySelect =
               H.select
                   [ CE.onChange myMsg -- E.onInput myMsg
                   , A.class "form-control select"
                   , A.value valx
                   ]
                   mySelects

           myClazz =
               if isMissing == True then
                   "col-form-label col-sm-12 missing"

               else
                   "col-form-label col-sm-12"
       in
       H.div [ A.class "form-group col-sm-4" ]
           [ H.label [ A.class myClazz ]
               [ H.text title ]
           , H.div [ A.class "col-sm-12" ]
               [ mySelect
               ]
           ]
-}


selectRow :
    Bool
    -> Bool
    -> String
    -> List (H.Html Msg)
    -> (String -> Msg)
    -> H.Html Msg
selectRow isMissing isDisabled title mySelects myMsg =
    let
        -- valx =
        --     Maybe.withDefault "-1" value
        mySelect =
            H.select
                [ E.onInput myMsg
                , A.class "form-control select"

                -- , A.value valx
                , A.disabled isDisabled
                ]
                mySelects

        myClazz =
            if isMissing == True then
                "missing"

            else
                ""
    in
    formGroupItem myClazz title mySelect


selectOption_ : Maybe String -> CB.ComboBoxItem -> VD.Node a
selectOption_ selected =
    CB.selectOption selected



-- Nothing
--wrapSelectItems : String -> Maybe (List a) -> List a


wrapSelectItems firstLineTitle selected items =
    let
        items_ =
            Maybe.withDefault [] items
    in
    CB.emptySelectOption (Just firstLineTitle)
        :: List.map (selectOption_ selected) items_



-- wrapSelectItemsWithDefaults items =
--     let
--         items_ =
--             Maybe.withDefault [] items
--     in
--     --CB.emptySelectOption (Just firstLineTitle)
--     List.map selectOption_ items_


meldingInput : String -> Maybe String -> H.Html Msg
meldingInput title msgContent =
    let
        myContent =
            Maybe.withDefault "" msgContent

        myClazz =
            case msgContent of
                Nothing ->
                    "col-form-label missing"

                Just _ ->
                    "col-form-label"

        myInput =
            H.textarea [ A.value myContent, E.onInput MeldingChanged, A.class "form-control melding", A.rows 3 ] []
    in
    formGroupItem myClazz title myInput


sumHourItem : String -> Maybe String -> H.Html Msg
sumHourItem title mySumHour =
    let
        mySumHour_ =
            Maybe.withDefault "0.0" mySumHour

        myInput =
            H.input [ A.type_ "number", A.class "form-control time", A.disabled True, A.value mySumHour_ ] []
    in
    formGroupItem "col-form-label" title myInput


inputItem : String -> String -> String -> Maybe (String -> Msg) -> Bool -> H.Html Msg
inputItem inputType value clazz event isDisabled =
    case event of
        Nothing ->
            H.input [ A.value value, A.type_ inputType, A.class clazz, A.disabled isDisabled ] []

        Just event_ ->
            H.input [ A.value value, E.onInput event_, A.type_ inputType, A.class clazz, A.disabled isDisabled ] []


hourItem : String -> Maybe String -> (String -> Msg) -> Bool -> H.Html Msg
hourItem title hourValue event isDisabled =
    let
        isMissing =
            hourValue == Nothing

        hourValue_ =
            Maybe.withDefault "00:00" hourValue

        clazz =
            if isMissing == True then
                "col-form-label missing"

            else
                "col-form-label"

        myInput =
            inputItem "time" hourValue_ "form-control time" (Just event) isDisabled
    in
    formGroupItem clazz title myInput
