module Ajourhold.Commands exposing
    ( canSendData
    , canSendData3
    , canSendData_
    , fetchCoverFor
    , fetchSlideFrom
    , fetchSlideTo
    , fetchWatches
    , fetchWatches2
    , fetchWatchesSwapFrom
    , fetchWatchesSwapTo
    , fetchWatches_
    , fetchHourBankForWorkPlace 
    , fromAjCat
    , getWatchDef
    , isDateFromLess
    , sendData
    , toJsonFloat
    , toJsonInt
    , toJsonString
    )

import Ajourhold.Decoders as AD
import Ajourhold.Types as T
    exposing
        ( DataSentStatus
        , MainUrl(..)
        , Model
        , Msg(..)
        , MyDate(..)
        , SendMsg(..)
        , SlideMsg(..)
        , UserId(..)
        , WatchCategory(..)
        , WatchDef
        , WatchDefDict
        , WatchInfo
        , WatchMsg(..)
        , WorkPlace(..)
        )
import Common.DateTimeUtil as DU
import Common.Misc as M
import Dict
import Http
import Json.Decode as JD
import Json.Decode.Pipeline as JP
import Json.Encode as JE
import String



-- mainUrl : String
-- mainUrl =
--     "/AjourholdRequest"


canSendData : Model -> Bool
canSendData m =
    case m.ajcat of
        2 ->
            -- Utrykning
            canSendData2 m

        3 ->
            -- Vaktbytte
            canSendData3 m

        _ ->
            canSendData_ m


canSendData_ : Model -> Bool
canSendData_ m =
    (m.dateFrom /= Nothing)
        && (m.selectedWorkPlace /= Nothing)
        && (m.selectedReasonCode /= Nothing)
        && (m.melding /= Nothing)


canSendData2 : Model -> Bool
canSendData2 m =
    (m.dateFrom /= Nothing)
        && (m.selectedWorkPlace /= Nothing)
        && (m.selectedReasonCode /= Nothing)
        && (m.selectedWatch /= Nothing)
        && (m.melding /= Nothing)


canSendData3 : Model -> Bool
canSendData3 m =
    (m.dateFrom /= Nothing)
        && (m.selectedWorkPlace /= Nothing)
        && (m.selectedWatch /= Nothing)
        && (m.selectedWorkPlace2 /= Nothing)
        && (m.selectedWatch2 /= Nothing)
        && (m.melding /= Nothing)


type alias AjCatDict =
    Dict.Dict Int Int



{---------------- From KDO.Common --------------------
   public enum MessageType
   {
       All = 0,
       Mertid = 1,
       Utrykning = 2,
       Fravaer = 4,
       Avspasering = 8,
       Ajourhold = 15, // Mertid + Utrykning + Fravaer + Avspasering
       SickLeave = 16,
       HourlistMessage = 32,
       Request = 64,
       General = 128,
       Vacation = 256,
       Swap = 512,
       Slide = 1024,
       GenereltTillegg = 2048
   };

-}


ajCatDict : AjCatDict
ajCatDict =
    Dict.fromList
        [ ( 1, 8 ) -- Avspasering
        , ( 2, 2 ) -- Uttrykning
        , ( 3, 512 ) -- Vaktbytte
        , ( 6, 4 ) -- Fravaer
        , ( 7, 1 ) -- Extra
        , ( 15, 1024 ) -- Forskyvning
        , ( 18, 256 ) -- Ferie
        , ( 19, 2048 ) -- Generelt tillegg
        ]


fromAjCat : Int -> Int
fromAjCat k =
    -- String.fromInt <| Maybe.withDefault -1 (Dict.get k ajCatDict)
    Maybe.withDefault -1 (Dict.get k ajCatDict)


getWatchDef : String -> Maybe WatchDefDict -> WatchDef
getWatchDef key wdDict =
    case wdDict of
        Nothing ->
            T.defaultWatchDef

        Just wd ->
            let
                item =
                    Dict.get key wd
            in
            case item of
                Nothing ->
                    T.defaultWatchDef

                Just found ->
                    found


isExtra : Model -> Maybe String
isExtra model =
    case model.selectedWatch of
        Nothing ->
            Nothing

        Just w ->
            let
                curWd =
                    getWatchDef w model.watchDefs
            in
            Just curWd.isExtra


isDateFromLess : Model -> Bool
isDateFromLess model =
    case model.dateFrom of
        Nothing ->
            True

        Just dx ->
            case model.dateTo of
                Nothing ->
                    False

                Just dx2 ->
                    dx > dx2


toJsonString : Maybe String -> JE.Value
toJsonString s =
    case s of
        Nothing ->
            JE.null

        Just sx ->
            JE.string sx


toJsonInt : Maybe String -> JE.Value
toJsonInt s =
    case s of
        Nothing ->
            JE.null

        Just sx ->
            let
                si =
                    String.toInt sx
            in
            case si of
                Just six ->
                    JE.int six

                Nothing ->
                    JE.null


toJsonFloat : Maybe String -> JE.Value
toJsonFloat s =
    case s of
        Nothing ->
            JE.null

        Just sx ->
            let
                si =
                    String.toFloat sx
            in
            case si of
                Just six ->
                    JE.float six

                Nothing ->
                    JE.null


ajCatDateFrom : Model -> JE.Value
ajCatDateFrom model =
    if model.ajcat == 2 then
        case model.selectedWatch of
            Just selWatch ->
                let
                    wd =
                        getWatchDef selWatch model.watchDefs
                in
                if wd.startDate /= model.dateFrom then
                    let
                        mhf =
                            Maybe.withDefault "00:00" model.hourFrom

                        cmp =
                            DU.hourStrCompare wd.hourFrom mhf
                    in
                    if cmp == 1 then
                        toJsonString wd.startDate

                    else
                        toJsonString model.dateFrom

                else
                    toJsonString wd.startDate

            Nothing ->
                JE.null

    else
        toJsonString model.dateFrom


sendData : Model -> Cmd Msg
sendData model =
    let
        (MainUrl mainUrl) =
            model.mainUrl

        url =
            mainUrl ++ "/SaveMessageCenter"

        ajCat =
            model.ajcat

        myDateTo =
            model.dateTo

        myHourFrom =
            case ajCat of
                3 ->
                    -- Vaktbytte
                    Nothing

                _ ->
                    model.hourFrom

        myHourTo =
            case ajCat of
                3 ->
                    -- Vaktbytte
                    Nothing

                _ ->
                    model.hourTo

        stem =
            [ ( "userId", JE.string model.userId )
            , ( "msgType", JE.int (fromAjCat model.ajcat) )
            , ( "workPlace", toJsonInt model.selectedWorkPlace )

            -- , ( "dateFrom", toJsonString model.dateFrom )
            , ( "dateFrom", ajCatDateFrom model )
            , ( "dateTo", toJsonString myDateTo )
            , ( "hourFrom", toJsonString myHourFrom )
            , ( "hourTo", toJsonString myHourTo )
            , ( "ajourId", JE.null )
            , ( "reason", toJsonInt model.selectedReasonCode )
            , ( "timeBank", toJsonFloat model.toTimeBank )
            , ( "msg", toJsonString model.melding )
            , ( "isExtra", toJsonString (isExtra model) )
            ]

        params =
            case ajCat of
                3 ->
                    -- Vaktbytte
                    ( "turnuslinjeId", toJsonInt model.selectedWatch )
                        :: ( "turnuslinjeId2", toJsonInt model.selectedWatch2 )
                        :: ( "ajourDvId", JE.null )
                        :: stem

                7 ->
                    -- Ekstraarbeid
                    ( "ajourDvId", toJsonInt model.selectedWatch )
                        :: ( "turnuslinjeId", JE.null )
                        :: ( "turnuslinjeId2", JE.null )
                        :: stem

                15 ->
                    -- Forskjøvet vakt --
                    ( "turnuslinjeId", toJsonInt model.selectedWatch )
                        :: ( "turnuslinjeId2", toJsonInt model.selectedWatch2 )
                        :: ( "ajourDvId", JE.null )
                        :: ( "hourFrom2", toJsonString model.hourFrom2 )
                        :: ( "hourTo2", toJsonString model.hourTo2 )
                        :: stem

                _ ->
                    ( "turnuslinjeId", toJsonInt model.selectedWatch )
                        :: ( "turnuslinjeId2", JE.null )
                        :: ( "ajourDvId", JE.null )
                        :: stem

        jbody =
            M.asHttpBody params

        myDecoder =
            JD.succeed DataSentStatus
                |> JP.required "ok" JD.bool
                |> JP.required "msg" JD.string
    in
    Http.send
        (SendData << Sent)
    <|
        Http.post url jbody myDecoder


fetchWatchesSwapFrom :
    MainUrl
    -> String
    -> Maybe String
    -> Maybe String
    -> Cmd Msg
fetchWatchesSwapFrom (MainUrl mainUrl) userId workPlace dateFrom =
    if (workPlace == Nothing) || (dateFrom == Nothing) then
        Cmd.none

    else
        let
            myCmd =
                WatchMsgFor (Swap 1) << Fetched

            df =
                Maybe.withDefault "-" dateFrom

            wp =
                Maybe.withDefault "-" workPlace

            url =
                mainUrl ++ "/WatchesFor" ++ "?messageType=512" ++ "&workPlace=" ++ wp ++ "&userid=" ++ userId ++ "&dateFrom=" ++ df ++ "&dateTo=" ++ df
        in
        Http.send myCmd <| Http.get url AD.watchInfoDecoder


fetchWatchesSwapTo :
    MainUrl
    -> String
    -> Maybe String
    -> Maybe String
    -> Maybe String
    -> Maybe String
    -> Cmd Msg
fetchWatchesSwapTo (MainUrl mainUrl) userId workPlace dateFrom dateTo orgwatchid =
    if
        (workPlace == Nothing)
            || (dateFrom == Nothing)
    then
        Cmd.none

    else
        let
            myCmd =
                WatchMsgFor (Swap 2) << Fetched

            df =
                Maybe.withDefault "-" dateFrom

            dt =
                Maybe.withDefault "-" dateTo

            wp =
                Maybe.withDefault "-" workPlace

            wid =
                Maybe.withDefault "-" orgwatchid

            url =
                mainUrl ++ "/WatchesForSwapTo?workPlace=" ++ wp ++ "&userid=" ++ userId ++ "&dateFrom=" ++ df ++ "&dateTo=" ++ dt ++ "&orgwid=" ++ wid
        in
        Http.send myCmd <| Http.get url AD.watchInfoDecoder



-- AD.watchInfoDecoder


fetchCoverFor :
    MainUrl
    -> String
    -> Maybe String
    -> Maybe String
    -> Maybe String
    -> Cmd Msg
fetchCoverFor mu userId workPlace dateFrom dateTo =
    fetchWatches_
        mu
        Nothing
        "/CoverFor"
        (WatchMsgFor CoverFor << Fetched)
        userId
        workPlace
        dateFrom
        dateTo


fetchWatches :
    MainUrl
    -> Int
    -> String
    -> Maybe String
    -> Maybe String
    -> Maybe String
    -> Cmd Msg
fetchWatches mu ajCat userId workPlace dateFrom dateTo =
    fetchWatches_
        mu
        (Just ajCat)
        "/WatchesFor"
        (WatchMsgFor Watch1 << Fetched)
        userId
        workPlace
        dateFrom
        dateTo


fetchWatches2 :
    MainUrl
    -> String
    -> Maybe String
    -> Maybe String
    -> Maybe String
    -> Cmd Msg
fetchWatches2 mu userId workPlace dateFrom dateTo =
    fetchWatches_
        mu
        Nothing
        "/WatchesForSwapTo"
        (WatchMsgFor Watch2 << Fetched)
        userId
        workPlace
        dateFrom
        dateTo


fetchWatches_ :
    MainUrl
    -> Maybe Int
    -> String
    -> (Result Http.Error WatchInfo -> Msg)
    -> String
    -> Maybe String
    -> Maybe String
    -> Maybe String
    -> Cmd Msg
fetchWatches_ (MainUrl mainUrl) ajCat ajaxCall myCmd userId workPlace dateFrom dateTo =
    if (workPlace == Nothing) || (dateFrom == Nothing) then
        Cmd.none

    else if Maybe.withDefault "-1" workPlace == "-1" then
        Cmd.none

    else
        let
            df =
                Maybe.withDefault "-" dateFrom

            dt =
                Maybe.withDefault df dateTo

            wp =
                Maybe.withDefault "-" workPlace

            url =
                case ajCat of
                    Nothing ->
                        mainUrl ++ ajaxCall ++ "?workPlace=" ++ wp ++ "&userid=" ++ userId ++ "&dateFrom=" ++ df ++ "&dateTo=" ++ dt

                    Just ajCat_ ->
                        mainUrl ++ ajaxCall ++ "?messageType=" ++ (String.fromInt <| fromAjCat ajCat_) ++ "&workPlace=" ++ wp ++ "&userid=" ++ userId ++ "&dateFrom=" ++ df ++ "&dateTo=" ++ dt

            {-
               decoder =
                   JP.decode WatchInfo
                       |> JP.required "watches" (JD.nullable CB.comboBoxItemListDecoder)
                       |> JP.required "watchdefs" (JD.nullable (JD.dict AD.watchDefDecoder))
            -}
        in
        Http.send myCmd <| Http.get url AD.watchInfoDecoder


slideUrl : MainUrl -> UserId -> WorkPlace -> MyDate -> Bool -> String
slideUrl (MainUrl mainUrl) (UserId userId) wp curDate isSlideFrom =
    let
        slide =
            if isSlideFrom == True then
                "/WatchesFor" ++ "?messageType=15" ++ "&workPlace=" ++ T.fromWorkPlace wp ++ "&userid=" ++ userId ++ "&dateFrom=" ++ T.fromMyDate curDate ++ "&dateTo=" ++ T.fromMyDate curDate

            else
                ""

        -- "/WatchesForSlideTo" ++ "?twp=" ++ T.fromWorkPlace wp ++ "&odf=" ++ T.fromMyDate curDate  ++ "&userid=" ++ userId ++ "&tlid=" ++ T.Watch1  ++ "&dateTo=" ++ T.fromMyDate curDate
    in
    mainUrl ++ slide



--++ userId ++ "/" ++ T.fromWorkPlace wp ++ "/" ++ T.fromMyDate curDate


fetchSlideFrom : MainUrl -> UserId -> WorkPlace -> MyDate -> Cmd Msg
fetchSlideFrom (MainUrl mainUrl) (UserId userId) wp cd =
    if (wp == NoWorkPlace) || (cd == NoDate) then
        Cmd.none

    else
        let
            url =
                mainUrl ++ "/WatchesFor?messageType=4" ++ "&workPlace=" ++ T.fromWorkPlace wp ++ "&userid=" ++ userId ++ "&dateFrom=" ++ T.fromMyDate cd ++ "&dateTo=" ++ T.fromMyDate cd

            --slideUrl userId wp cd True
        in
        Http.send (SlideMsgFor << SlideWatchFetched 1) <| Http.get url AD.watchInfoDecoder


fetchSlideTo : MainUrl -> UserId -> WorkPlace -> Maybe String -> MyDate -> MyDate -> Cmd Msg
fetchSlideTo (MainUrl mainUrl) (UserId userId) wp tlid odf cd =
    if (wp == NoWorkPlace) || (cd == NoDate) || (odf == NoDate) || (tlid == Nothing) then
        Cmd.none

    else
        let
            tl =
                Maybe.withDefault "-" tlid

            url =
                mainUrl ++ "/WatchesForSlideTo?twp=" ++ T.fromWorkPlace wp ++ "&odf=" ++ T.fromMyDate odf ++ "&userid=" ++ userId ++ "&tlid=" ++ tl ++ "&dt=" ++ T.fromMyDate cd

            --slideUrl userId wp cd False
        in
        Http.send (SlideMsgFor << SlideWatchFetched 2) <| Http.get url AD.watchInfoDecoder

fetchHourBankForWorkPlace : UserId -> WorkPlace -> WorkPlace -> Cmd Msg 
fetchHourBankForWorkPlace (UserId userId) origWp newWp =
    if  (newWp == NoWorkPlace) || 
        (origWp == newWp) then
        Cmd.none
    else
        Cmd.none

