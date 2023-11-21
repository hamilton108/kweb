module Tidreg.Commands exposing (approveMany, discardMany, fetchDeviations, findReason, editDeviation)

import Common.ComboBox as CB
import Common.Decoders as CD
import Http
import Json.Encode as JE
import Tidreg.Decoders as D
import Tidreg.Types as T exposing (Msg(..), Model)


mainUrl =
    "Deviation"



-- getReason : Bool -> String -> Maybe WatchDefDict -> WatchDef
-- getReason isComing key wdDict =
--     case wdDict of
--         Nothing ->
--             T.defaultWatchDef
--
--         Just wd ->
--             let
--                 item =
--                     Dict.get key wd
--             in
--             case item of
--                 Nothing ->
--                     T.defaultWatchDef
--
--                 Just found ->
--                     found


defaultReason : CB.ComboBoxItem
defaultReason =
    CB.ComboBoxItem "-5" "Normal ArbeidsTid"


findReason : String -> CB.SelectItems -> CB.ComboBoxItem
findReason reasonId items =
    let
        result =
            List.head <| List.filter (\t -> t.val == reasonId) items
    in
    case result of
        Nothing ->
            defaultReason

        Just r ->
            r


fetchDeviations : T.Flags -> Cmd T.Msg
fetchDeviations flags =
    let
        url =
            "FetchDeviations?userid=" ++ flags.userid ++ "&wid=" ++ flags.wid   --mainUrl ++ "/FetchDeviations?userid=" ++ flags.userid ++ "&wid=" ++ flags.wid  
    in
    Http.send DeviationsFetched <|
        Http.get url D.modelDecoder


asHttpBodyInt : List Int -> Http.Body
asHttpBodyInt lx =
    let
        x =
            JE.list JE.int lx
    in
    Http.stringBody "application/json" (JE.encode 0 x)


discardMany : List T.Deviation -> Cmd T.Msg
discardMany devx =
    let
        url =
            "DiscardMany" --mainUrl ++ "/DiscardMany"

        ids =
            List.map .oid devx

        jbody =
            asHttpBodyInt ids
    in
    Http.send
        Discarded
    <|
        Http.post url jbody CD.jsonStatusDecoder


maybeIntToJson : Maybe Int -> JE.Value
maybeIntToJson v =
    case v of
        Nothing ->
            JE.null

        Just vx ->
            JE.int vx


deviationToHttpBody : T.Deviation -> List ( String, JE.Value )
deviationToHttpBody d =
    let
        rin =
            Maybe.withDefault -5 <| String.toInt d.reasonIn

        rout =
            Maybe.withDefault -5 <| String.toInt d.reasonOut
    in
    [ ( "tidRegId", JE.int d.oid )
    , ( "realDate", JE.string d.regTimeOut.date )
    , ( "watchId", maybeIntToJson d.watchId )
    , ( "presentId", maybeIntToJson d.presentId )
    , ( "reasonIn", JE.int rin )
    , ( "reasonOut", JE.int rout )
    ]

deviationToHttpBodySingle : T.Deviation -> List ( String, JE.Value )
deviationToHttpBodySingle d =
    let
        rin =
            Maybe.withDefault -5 <| String.toInt d.reasonIn

        rout =
            Maybe.withDefault -5 <| String.toInt d.reasonOut
        tout =
            Maybe.withDefault "0" d.toHourBank

        costplace = 
            d.costPlaceId
    in
    [ ( "tidRegId", JE.int d.oid )
    , ( "reasonIn", JE.int rin )
    , ( "reasonOut", JE.int rout )
    , ( "regInDate", JE.string d.regTimeIn.date )
    , ( "regOutDate", JE.string d.regTimeOut.date )
    , ( "regInTime", JE.string d.regTimeIn.time )
    , ( "regOutTime", JE.string d.regTimeOut.time )
    , ( "toHourBank", JE.string tout )
    , ( "costplace", JE.int costplace)
    ]


asHttpBodyDev : List T.Deviation -> Http.Body
asHttpBodyDev lx =
    let
        x =
            JE.list JE.object <| List.map deviationToHttpBody lx
    in
    Http.stringBody "application/json" (JE.encode 0 x)

asHttpBodyDevSingle : T.Deviation -> Http.Body
asHttpBodyDevSingle lx =
    let
        x =
            JE.object <| deviationToHttpBodySingle lx
    in
    Http.stringBody "application/json" (JE.encode 0 x)


approveMany : Model -> List T.Deviation -> Cmd T.Msg
approveMany model devx =
    let
        url =
            "ApproveMany?userid=" ++ model.flags.userid --mainUrl ++ "/ApproveMany?userid=" ++ model.flags.userid

        jbody =
            asHttpBodyDev devx
    in
    Http.send
        Approved
    <|
        Http.post url jbody CD.jsonStatusDecoder

editDeviation : T.Deviation -> Cmd T.Msg
editDeviation dev =
    let
        url =
            "Edit" --mainUrl ++ "/Edit"

        jbody =
            asHttpBodyDevSingle dev
    in
    Http.send
        Edited
    <|
        Http.post url jbody CD.jsonStatusDecoder