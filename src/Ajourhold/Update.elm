module Ajourhold.Update exposing
    ( calcSumHours
    , initModel
    , resetModel
    , update
    , updateCoverFor
    , updateSwap
    , updateWatch1
    , updateWatch2
    )

import Ajourhold.Commands as C
import Ajourhold.Types as T
    exposing
        ( MainUrl(..)
        , Model
        , Msg(..)
        , SendMsg(..)
        , SlideMsg(..)
        , UserId(..)
        , WatchCategory(..)
        , WatchMsg(..)
        )
import Common.DateTimeUtil as DU
import Common.Misc as M
import Common.ModalDialog as DLG
import Dict exposing (Dict)
import Json.Decode as JD


initModel : MainUrl -> Int -> Dict String String -> Model
initModel mainUrl ajcat lang =
    { mainUrl = mainUrl
    , ajcat = ajcat
    , lang = lang
    , userId = "-1"
    , reasonCodes = Nothing
    , melding = Nothing
    , selectedReasonCode = Nothing
    , workPlaces = Nothing
    , selectedWorkPlace = Nothing
    , workPlaces2 = Nothing
    , selectedWorkPlace2 = Nothing
    , watches = Nothing
    , selectedWatch = Nothing
    , watchDefs = Nothing
    , watches2 = Nothing
    , selectedWatch2 = Nothing
    , watchDefs2 = Nothing
    , dlgAlert = DLG.DialogHidden
    , dateFrom = Nothing -- Just "2018-01-28"
    , dateTo = Nothing
    , hourFrom = Nothing
    , hourTo = Nothing
    , sumHours = Nothing
    , hourFrom2 = Nothing
    , hourTo2 = Nothing
    , sumHours2 = Nothing
    , saldo = Nothing
    , toTimeBank = Nothing
    , vacation = "0"
    }


calcSumHours :
    Maybe String
    -> Maybe String
    -> String
calcSumHours hourFrom hourTo =
    if (hourFrom == Nothing) || (hourTo == Nothing) then
        "0.0"

    else
        let
            h1 =
                Maybe.withDefault "00:00" hourFrom

            h2 =
                Maybe.withDefault "00:00" hourTo
        in
        String.fromFloat (M.toDecimal (DU.hourStrDiff h1 h2) 100.0)


resetModel : Model -> DLG.DialogState -> Model
resetModel model dlgState =
    let
        newModel =
            initModel model.mainUrl model.ajcat model.lang
    in
    { newModel
        | userId = model.userId
        , workPlaces = model.workPlaces
        , workPlaces2 = model.workPlaces2
        , saldo = model.saldo
        , reasonCodes = model.reasonCodes
        , dlgAlert = dlgState
    }



{-
   watchChanged : WatchCategory -> Model -> String -> Model
   watchChanged wcat model s =
               let
                   w = C.getWatchDef s model
                   sumStr = M.formatNumberStr w.len 2
                   m =
                       { model | sumHours = Just sumStr, hourFrom = Just w.hourFrom, hourTo = Just w.hourTo, isExtra = Just w.isExtra }
               in
                   case wcat of
                      Watch2 -> { m | selectedWatch2 = Just s }
                      _ -> { m | selectedWatch = Just s }
-}


maybeDate : String -> Maybe String
maybeDate s =
    if String.length s == 0 then
        Nothing

    else
        Just s


updateWatch1 : WatchMsg -> Model -> ( Model, Cmd Msg )
updateWatch1 msg model =
    case msg of
        Changed s ->
            let
                w =
                    C.getWatchDef s model.watchDefs

                sumStr =
                    M.formatNumberStr w.len 2
            in
            ( { model
                | selectedWatch = Just s
                , sumHours = Just sumStr
                , hourFrom = Just w.hourFrom
                , hourTo = Just w.hourTo
              }
            , Cmd.none
            )

        DateChanged index s ->
            let
                myDateFrom =
                    maybeDate s

                curModel =
                    if index == 1 then
                        { model
                            | dateFrom = myDateFrom
                            , selectedWatch = Nothing
                            , hourFrom = Nothing
                            , hourTo = Nothing
                        }

                    else
                        { model
                            | dateTo = myDateFrom
                            , selectedWatch = Nothing
                            , hourFrom = Nothing
                            , hourTo = Nothing
                        }

                curCmd =
                    C.fetchWatches model.mainUrl model.ajcat model.userId model.selectedWorkPlace myDateFrom model.dateTo
            in
            ( curModel, curCmd )

        Fetch s ->
            let
                wp =
                    Just s

                curWp = 
                    T.toWorkPlace model.selectedWorkPlace

                newWp = 
                    T.toWorkPlace wp 

                curCmd =

                    if s == "-1" then
                        Cmd.none

                    else if C.isDateFromLess model then
                        C.fetchTimebankWorkPlace model.mainUrl (UserId model.userId) curWp newWp 

                    else
                        Cmd.batch [
                            C.fetchWatches model.mainUrl model.ajcat model.userId wp model.dateFrom model.dateTo
                            , C.fetchTimebankWorkPlace model.mainUrl (UserId model.userId) curWp newWp 
                        ]
            in
                let 
                    newModel = 
                        if s == "-1" then
                            { model
                                | selectedWorkPlace = wp
                                , selectedWatch = Nothing
                                , watches = Nothing
                                , watchDefs = Nothing
                                , hourFrom = Nothing
                                , hourTo = Nothing
                                , sumHours = Nothing
                                , saldo = Nothing
                            }
                        else
                            { model
                                | selectedWorkPlace = wp
                                , selectedWatch = Nothing
                                , watches = Nothing
                                , watchDefs = Nothing
                                , hourFrom = Nothing
                                , hourTo = Nothing
                                , sumHours = Nothing
                            }
                in 
                ( newModel , curCmd )

        Fetched (Ok s) ->
            ( { model | watches = s.watches, watchDefs = s.watchDefs }, Cmd.none )

        Fetched (Err s) ->
            ( DLG.errorAlert Nothing "updateWatch1 Error:" s model, Cmd.none )

        TimebankFetched (Ok s) ->
            let 
                mySaldo =
                    String.fromFloat (M.toDecimal s.value 100.0)
            in
            ( { model
                | saldo = Just mySaldo 
              }
            , Cmd.none 
            )

        TimebankFetched (Err s) ->
            ( DLG.errorAlert Nothing "updateWatch1 Error:" s model, Cmd.none )

updateWatch2 : WatchMsg -> Model -> ( Model, Cmd Msg )
updateWatch2 msg model =
    case msg of
        Changed s ->
            ( { model | selectedWatch2 = Just s }, Cmd.none )

        DateChanged _ _ ->
            ( model, Cmd.none )

        Fetch s ->
            let
                wp =
                    Just s

                curCmd =
                    if s == "-1" then
                        Cmd.none

                    else
                        C.fetchWatches2 model.mainUrl model.userId wp model.dateFrom model.dateTo
            in
            ( { model
                | selectedWorkPlace2 = wp
                , selectedWatch2 = Nothing
                , watches2 = Nothing
              }
            , curCmd
            )

        Fetched (Ok s) ->
            ( { model | watches = s.watches, watchDefs = s.watchDefs }, Cmd.none )

        --( { model | watches2 = Just s.watches }, Cmd.none )
        Fetched (Err s) ->
            ( DLG.errorAlert Nothing "updateWatch2 Error:" s model, Cmd.none )

        TimebankFetched (Ok s) ->
            ( model, Cmd.none )

        TimebankFetched (Err s) ->
            ( DLG.errorAlert Nothing "updateWatch1 Error:" s model, Cmd.none )


updateCoverFor : WatchMsg -> Model -> ( Model, Cmd Msg )
updateCoverFor msg model =
    case msg of
        Changed s ->
            let
                w =
                    C.getWatchDef s model.watchDefs

                sumStr =
                    M.formatNumberStr w.len 2
            in
            ( { model
                | selectedWatch = Just s
                , selectedReasonCode = Just w.reason
                , hourFrom = Just w.hourFrom
                , hourTo = Just w.hourTo
                , sumHours = Just sumStr
              }
            , Cmd.none
            )

        DateChanged _ s ->
            let
                myDateFrom =
                    maybeDate s

                curCmd =
                    C.fetchCoverFor model.mainUrl model.userId model.selectedWorkPlace myDateFrom model.dateTo
            in
            ( { model
                | dateFrom = myDateFrom
                , selectedWatch = Nothing
                , hourFrom = Nothing
                , hourTo = Nothing
                , selectedReasonCode = Nothing
              }
            , curCmd
            )

        Fetch s ->
            let
                wp =
                    Just s

                curCmd =
                    if s == "-1" then
                        Cmd.none

                    else
                        let
                            curWp = 
                                T.toWorkPlace model.selectedWorkPlace

                            newWp = 
                                T.toWorkPlace wp 
                        in
                        Cmd.batch [
                            C.fetchCoverFor model.mainUrl model.userId wp model.dateFrom model.dateTo
                            , C.fetchTimebankWorkPlace model.mainUrl (UserId model.userId) curWp newWp 
                        ]
            in
                let 
                    newModel = 
                        if s == "-1" then
                            { model
                                | selectedWorkPlace = wp
                                , selectedWatch = Nothing
                                , watches = Nothing
                                , watchDefs = Nothing
                                , selectedReasonCode = Nothing
                                , hourFrom = Nothing
                                , hourTo = Nothing
                                , sumHours = Nothing
                                , saldo = Nothing
                            }
                        else
                            { model
                                | selectedWorkPlace = wp
                                , selectedWatch = Nothing
                                , watches = Nothing
                                , watchDefs = Nothing
                                , selectedReasonCode = Nothing
                                , hourFrom = Nothing
                                , hourTo = Nothing
                                , sumHours = Nothing
                            }
                in 
                ( newModel , curCmd )

        Fetched (Ok s) ->
            ( { model | watches = s.watches, watchDefs = s.watchDefs }, Cmd.none )

        Fetched (Err s) ->
            ( DLG.errorAlert Nothing "updateCoverFor Error:" s model, Cmd.none )

        TimebankFetched (Ok s) ->
            ( model, Cmd.none )

        TimebankFetched (Err s) ->
            ( DLG.errorAlert Nothing "updateWatch1 Error:" s model, Cmd.none )


updateSwap : Int -> WatchMsg -> Model -> ( Model, Cmd Msg )
updateSwap index msg model =
    case msg of
        Changed s ->
            if index == 1 then
                ( { model | selectedWatch = Just s }, Cmd.none )

            else
                ( { model | selectedWatch2 = Just s }, Cmd.none )

        DateChanged _ s ->
            let
                newDate =
                    maybeDate s

                wp =
                    if index == 1 then
                        model.selectedWorkPlace

                    else
                        model.selectedWorkPlace2

                updMod =
                    if index == 1 then
                        { model | dateFrom = newDate, selectedWatch = Nothing, watches = Nothing }

                    else
                        { model | dateTo = newDate, selectedWatch2 = Nothing, watches2 = Nothing }

                curCmd =
                    if s == "-1" then
                        Cmd.none

                    else if index == 1 then
                        C.fetchWatchesSwapFrom updMod.mainUrl updMod.userId wp newDate

                    else
                        C.fetchWatchesSwapTo updMod.mainUrl updMod.userId wp updMod.dateFrom newDate model.selectedWatch
            in
            --Debug.log "swap"
            ( updMod, curCmd )

        Fetch s ->
            let
                wp =
                    Just s

                updMod =
                    if index == 1 then
                        { model | selectedWorkPlace = wp, selectedWatch = Nothing, watches = Nothing }

                    else
                        { model | selectedWorkPlace2 = wp, selectedWatch2 = Nothing, watches2 = Nothing }

                curCmd =
                    if s == "-1" then
                        Cmd.none

                    else if index == 1 then
                        C.fetchWatchesSwapFrom updMod.mainUrl updMod.userId wp updMod.dateFrom

                    else
                        C.fetchWatchesSwapTo updMod.mainUrl updMod.userId wp updMod.dateFrom updMod.dateTo updMod.selectedWatch
            in
            ( updMod, curCmd )

        Fetched (Ok s) ->
            if index == 1 then
                ( { model | watches = s.watches }, Cmd.none )

            else
                ( { model | watches2 = s.watches }, Cmd.none )

        Fetched (Err s) ->
            ( DLG.errorAlert Nothing "updateSwap Error:" s model, Cmd.none )

        TimebankFetched (Ok s) ->
            ( model, Cmd.none )

        TimebankFetched (Err s) ->
            ( DLG.errorAlert Nothing "updateWatch1 Error:" s model, Cmd.none )

updateSlide : SlideMsg -> Model -> ( Model, Cmd Msg )
updateSlide msg model =
    case msg of
        SlideDateChanged index s ->
            let
                curDate =
                    T.toMyDate <| Just s

                curFromDate =
                    T.toMyDate <| model.dateFrom

                curWp =
                    T.toWorkPlace model.selectedWorkPlace

                usr =
                    UserId model.userId

                slideFn =
                    if index == 1 then
                        C.fetchSlideFrom model.mainUrl usr curWp curDate

                    else
                        C.fetchSlideTo model.mainUrl usr curWp model.selectedWatch curFromDate curDate

                newModel =
                    if index == 1 then
                        { model | dateFrom = Just s }

                    else
                        { model | dateTo = Just s }
            in
            ( newModel, slideFn )

        SlideWatchChanged index s ->
            let
                w =
                    if index == 1 then
                        C.getWatchDef s model.watchDefs

                    else
                        C.getWatchDef s model.watchDefs2

                sumStr =
                    M.formatNumberStr w.len 2

                newModel =
                    if index == 1 then
                        { model
                            | selectedWatch = Just s
                            , hourFrom = Just w.hourFrom
                            , hourTo = Just w.hourTo
                            , sumHours = Just sumStr
                        }

                    else
                        { model
                            | selectedWatch2 = Just s
                            , hourFrom2 = Just w.hourFrom
                            , hourTo2 = Just w.hourTo
                            , sumHours2 = Just sumStr
                        }
            in
            ( newModel, Cmd.none )

        SlideWorkPlaceChanged index s ->
            let
                curDate =
                    if index == 1 then
                        T.toMyDate model.dateFrom

                    else
                        T.toMyDate model.dateTo

                curFromDate =
                    T.toMyDate model.dateFrom

                curWp =
                    T.toWorkPlace <| Just s

                usr =
                    UserId model.userId

                slideFn =
                    if index == 1 then
                        C.fetchSlideFrom model.mainUrl usr curWp curDate

                    else
                        C.fetchSlideTo model.mainUrl usr curWp model.selectedWatch curFromDate curDate

                newModel =
                    if index == 1 then
                        { model | selectedWorkPlace = Just s, selectedWatch = Nothing }

                    else
                        { model | selectedWorkPlace2 = Just s, selectedWatch2 = Nothing }
            in
            ( newModel, slideFn )

        SlideWatchFetched index (Ok s) ->
            let
                newModel =
                    if index == 1 then
                        { model | watches = s.watches, watchDefs = s.watchDefs, selectedWatch = Nothing }

                    else
                        -- { model | watches = s.watches2, watchDefs2 = s.watchDefs }
                        { model | watches2 = s.watches, watchDefs2 = s.watchDefs, selectedWatch2 = Nothing }
            in
            ( newModel, Cmd.none )

        SlideWatchFetched _ (Err err) ->
            ( DLG.errorAlert Nothing "updateSlide Error:" err model, Cmd.none )


updateEmergency : WatchMsg -> Model -> ( Model, Cmd Msg )
updateEmergency msg model =
    case msg of
        Changed s ->
            let
                w =
                    C.getWatchDef s model.watchDefs

                sumStr =
                    M.formatNumberStr w.len 2
            in
            ( { model
                | selectedWatch = Just s
                , sumHours = Just sumStr
                , hourFrom = Just w.hourFrom
                , hourTo = Just w.hourTo
              }
            , Cmd.none
            )

        DateChanged _ s ->
            let
                myDateFrom =
                    maybeDate s

                curModel =
                    { model
                        | dateFrom = myDateFrom
                        , selectedWatch = Nothing
                        , hourFrom = Nothing
                        , hourTo = Nothing
                    }

                curCmd =
                    C.fetchWatches model.mainUrl 2 model.userId model.selectedWorkPlace myDateFrom model.dateTo
            in
            ( curModel, curCmd )

        Fetch s ->
            let
                wp =
                    Just s

                curWp = 
                    T.toWorkPlace model.selectedWorkPlace

                newWp = 
                    T.toWorkPlace wp 

                curCmd =
                    if s == "-1" then
                        Cmd.none

                    else if C.isDateFromLess model then
                        C.fetchTimebankWorkPlace model.mainUrl (UserId model.userId) curWp newWp 

                    else
                        Cmd.batch [
                            C.fetchWatches model.mainUrl model.ajcat model.userId wp model.dateFrom model.dateTo
                            , C.fetchTimebankWorkPlace model.mainUrl (UserId model.userId) curWp newWp 
                        ]
            in
                let 
                    newModel = 
                        if s == "-1" then
                            { model
                                | selectedWorkPlace = wp
                                , selectedWatch = Nothing
                                , watches = Nothing
                                , watchDefs = Nothing
                                , hourFrom = Nothing
                                , hourTo = Nothing
                                , sumHours = Nothing
                                , saldo = Nothing
                            }
                        else
                            { model
                                | selectedWorkPlace = wp
                                , selectedWatch = Nothing
                                , watches = Nothing
                                , watchDefs = Nothing
                                , hourFrom = Nothing
                                , hourTo = Nothing
                                , sumHours = Nothing
                            }
                in
                ( newModel , curCmd )

        Fetched (Ok s) ->
            ( { model | watches = s.watches, watchDefs = s.watchDefs }, Cmd.none )

        Fetched (Err s) ->
            ( DLG.errorAlert Nothing "updateEmergency Error:" s model, Cmd.none )

        TimebankFetched (Ok s) ->
            ( model, Cmd.none )

        TimebankFetched (Err s) ->
            ( DLG.errorAlert Nothing "updateWatch1 Error:" s model, Cmd.none )

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        WatchMsgFor category wmsg ->
            case category of
                Watch1 ->
                    updateWatch1 wmsg model

                Watch2 ->
                    updateWatch2 wmsg model

                CoverFor ->
                    updateCoverFor wmsg model

                Swap index ->
                    updateSwap index wmsg model

                Emergency ->
                    updateEmergency wmsg model

        AlertOk ->
            ( { model | dlgAlert = DLG.DialogHidden }, Cmd.none )

        InitDataFetched (Ok s) ->
            -- let
            --     mySaldo =
            --         String.fromFloat (M.toDecimal s.saldo 100.0)
            -- in
            -- ( { model | userId = s.userId, vacation = s.vacation, workPlaces = Just s.workPlaces, saldo = Just mySaldo, reasonCodes = s.reasonCodes }, Cmd.none )
            ( { model | userId = s.userId, vacation = s.vacation, workPlaces = Just s.workPlaces, reasonCodes = s.reasonCodes }, Cmd.none )

        InitDataFetched (Err s) ->
            ( { model | dlgAlert = DLG.DialogVisibleAlert "Subscriptions" ("InitDataFetched Error: " ++ JD.errorToString s) DLG.Error }, Cmd.none )

        WorkPlaceChanged s ->
            ( { model | selectedWorkPlace = Just s }, Cmd.none )

        WorkPlacesFetched (Ok s) ->
            let
                mySaldo =
                    String.fromFloat (M.toDecimal s.saldo 100.0)
            in
            ( { model | userId = s.userId, vacation = s.vacation, workPlaces = Just s.workPlaces, workPlaces2 = Just s.workPlaces, saldo = Just mySaldo }, Cmd.none )

        WorkPlacesFetched (Err s) ->
            ( { model | dlgAlert = DLG.DialogVisibleAlert "Subscriptions" ("WorkPlacesFetched Error: " ++ JD.errorToString s) DLG.Error }, Cmd.none )

        ReasonCodeChanged s ->
            ( { model | selectedReasonCode = Just s }, Cmd.none )

        MeldingChanged s ->
            ( { model | melding = Just s }, Cmd.none )

        SimpleDateChanged index s ->
            let
                curDate =
                    maybeDate s

                updMod =
                    if index == 1 then
                        { model | dateFrom = curDate }

                    else
                        { model | dateTo = curDate }
            in
            ( updMod, Cmd.none )

        HourChanged index s ->
            let
                updMod =
                    case index of
                        1 ->
                            let
                                curSumHours =
                                    calcSumHours (Just s) model.hourTo
                            in
                            { model | sumHours = Just curSumHours, selectedWatch = Nothing, hourFrom = Just s }

                        2 ->
                            let
                                curSumHours =
                                    calcSumHours model.hourFrom (Just s)
                            in
                            { model | sumHours = Just curSumHours, selectedWatch = Nothing, hourTo = Just s }

                        21 ->
                            let
                                curSumHours =
                                    calcSumHours (Just s) model.hourTo2
                            in
                            { model | sumHours2 = Just curSumHours, selectedWatch2 = Nothing, hourFrom2 = Just s }

                        31 ->
                            let
                                curSumHours =
                                    calcSumHours (Just s) model.hourTo
                            in
                            { model | sumHours = Just curSumHours, hourFrom = Just s }

                        32 ->
                            let
                                curSumHours =
                                    calcSumHours model.hourFrom (Just s)
                            in
                            { model | sumHours = Just curSumHours, hourTo = Just s }

                        _ ->
                            -- 22
                            let
                                curSumHours =
                                    calcSumHours model.hourFrom2 (Just s)
                            in
                            { model | sumHours2 = Just curSumHours, selectedWatch2 = Nothing, hourTo2 = Just s }
            in
            ( updMod, Cmd.none )

        ToTimeBankChanged s ->
            ( { model | toTimeBank = Just s }, Cmd.none )

        SendData sendMsg ->
            case sendMsg of
                Send ->
                    ( model, C.sendData model )

                Sent (Ok s) ->
                    let
                        dialogState =
                            if s.ok == True then
                                let
                                    title =
                                        M.getLangValue "data_sent_ok" model.lang
                                in
                                DLG.DialogVisibleAlert title s.msg DLG.Info

                            else
                                let
                                    title =
                                        M.getLangValue "data_sent_err" model.lang
                                in
                                DLG.DialogVisibleAlert title s.msg DLG.Error

                        newModel =
                            resetModel model dialogState
                    in
                    ( newModel, Cmd.none )

                Sent (Err s) ->
                    ( DLG.errorAlert Nothing "Noe gikk galt under lagring:" s model, Cmd.none )

        SlideMsgFor slideMsg ->
            updateSlide slideMsg model
