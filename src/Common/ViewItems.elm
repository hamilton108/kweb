module Common.ViewItems exposing (GridPosition(..), dateItem, formGroupItem, gridItem, hourItem, inputItem, selectRow,  textItem)

import Html as H
import Html.Attributes as A
import Html.Events as E


type GridPosition
    = GridPosition String


gridItem : GridPosition -> H.Html msg -> H.Html msg
gridItem (GridPosition clazz) item =
    H.div [ A.class clazz ] [ item ]


formGroupItem : String -> String -> H.Html msg -> H.Html msg
formGroupItem clazz title myInput =
    H.div [ A.class "form-group" ]
        [ H.label [ A.class clazz ]
            [ H.text title ]
        , myInput
        ]


hourItem : String -> Maybe String -> (String -> msg) -> Bool -> H.Html msg
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

textItem : String -> Maybe String -> (String -> msg) -> Bool -> H.Html msg
textItem title hourValue event isDisabled =
    let
        isMissing =
            hourValue == Nothing

        hourValue_ =
            Maybe.withDefault "0" hourValue

        clazz =
            if isMissing == True then
                "col-form-label missing"

            else
                "col-form-label"

        myInput =
            inputItem "text" hourValue_ "form-control text" (Just event) isDisabled
    in
    formGroupItem clazz title myInput



dateItem : String -> Maybe String -> (String -> msg) -> H.Html msg
dateItem title value event =
    let
        isMissing =
            value == Nothing

        value_ =
            Maybe.withDefault "" value

        dateClazz =
            "form-control date start-date"

        myClazz =
            if isMissing == True then
                "col-form-label missing"

            else
                "col-form-label"

        myInput =
            H.input [ A.value value_, A.type_ "date", A.class dateClazz, E.onInput event ] []
    in
    formGroupItem myClazz title myInput


inputItem : String -> String -> String -> Maybe (String -> msg) -> Bool -> H.Html msg
inputItem inputType value clazz event isDisabled =
    case event of
        Nothing ->
            H.input [ A.value value, A.type_ inputType, A.class clazz, A.disabled isDisabled ] []

        Just event_ ->
            H.input [ A.value value, E.onInput event_, A.type_ inputType, A.class clazz, A.disabled isDisabled ] []


selectRow :
    Maybe String
    -> Bool
    -> Bool
    -> String
    -> List (H.Html msg)
    -> (String -> msg)
    -> H.Html msg
selectRow value isMissing isDisabled title mySelects myMsg =
    let
        valx =
            Maybe.withDefault "-1" value

        mySelect =
            H.select
                [ E.onInput myMsg
                , A.class "form-control select"
                , A.value valx
                , A.disabled isDisabled
                -- , A.selected True
                ]
                mySelects

        myClazz =
            if isMissing == True then
                "col-form-label missing"
            else 
                "col-form-label"
    in
    formGroupItem myClazz title mySelect

{-
selectRowInt :
    Maybe Int
    -> Bool
    -> Bool
    -> String
    -> List (H.Html msg)
    -> (String -> msg)
    -> H.Html msg
selectRowInt value isMissing isDisabled title mySelects myMsg =
    let
        vali =
            Maybe.withDefault -1 value

        valx = String.fromInt vali

        mySelect =
            H.select
                [ E.onInput myMsg
                , A.class "form-control select"
                , A.value valx
                , A.disabled isDisabled
                ]
                mySelects

        myClazz =
            if isMissing == True then
                "col-form-label missing"
            else 
                "col-form-label"
    in
    formGroupItem myClazz title mySelect
    -}
