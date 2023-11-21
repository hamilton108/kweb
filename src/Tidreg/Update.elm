module Tidreg.Update exposing (initModel, update)

import Common.DateTime as DT
import Common.ModalDialog as DLG
import Tidreg.Commands as C
import Tidreg.Types exposing (Flags, Deviation, Model, Msg(..))



initModel : Flags -> Model 
initModel flags =
    {  flags = flags
      ,  deviations = []
    , selectedDeviation = Nothing
    , reasonsIn = []
    , reasonsOut = []
    , dlgEdit = DLG.DialogHidden
    , dlgAlert = DLG.DialogHidden
    }


areSelected : Bool -> List Deviation -> List Deviation
areSelected isSelected deviations =
    List.filter (\t -> t.isSelected == isSelected) deviations


toggleSelected : Deviation -> Deviation
toggleSelected deviation =
    { deviation | isSelected = not deviation.isSelected }



-- setDate : Deviation -> Int -> String -> Deviation
-- setDate d index dx =
--     { deviation | isSelected = not deviation.isSelected }


fmtDevDiff : Float -> String
fmtDevDiff v =
    (String.fromInt <| round v) ++ "min"


updateDateTime : Model -> Deviation -> Int -> Bool -> String -> ( Model, Cmd Msg )
updateDateTime model deviation index isDate s =
    let
        ( curDate, curWatchDt ) =
            if index == 1 then
                ( deviation.regTimeIn, deviation.watchStart )

            else
                ( deviation.regTimeOut, deviation.watchEnd )

        newDate =
            if isDate == True then
                { curDate | date = s }

            else
                { curDate | time = s }

        diffMinutes =
            if index == 1 then
                DT.iso8601diffMinutes newDate curWatchDt

            else
                DT.iso8601diffMinutes curWatchDt newDate

        newDev =
            if index == 1 then
                { deviation | 
                regTimeIn = newDate, 
                deviationIn = if deviation.watchId == Nothing then "-" else fmtDevDiff diffMinutes }

            else
                { deviation | 
                regTimeOut = newDate, 
                deviationOut = if deviation.watchId == Nothing then "-" else fmtDevDiff diffMinutes }

        newList =
            List.sortBy .oid <| newDev :: List.filter (\t -> t.oid /= deviation.oid) model.deviations
    in
    -- Debug.log "updateDateTime "
    ( { model | deviations = newList, selectedDeviation = Just newDev }, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Approve ->
            let
                selx =
                    areSelected True model.deviations
            in
            ( model, C.approveMany model selx )

        Approved (Ok s) ->
            let
                unSelected =
                    areSelected False model.deviations
            in
            ( { model | deviations = unSelected }, Cmd.none )

        Approved (Err s) ->
            ( model, Cmd.none )

        Discard ->
            ( model, C.discardMany <| areSelected True model.deviations )

        Discarded (Ok s) ->
            let
                unSelected =
                    areSelected False model.deviations
            in
            ( { model | deviations = unSelected }, Cmd.none )

        Discarded (Err s) ->
            ( model, Cmd.none )

        Edit deviation ->
            -- Debug.log "Timebank"
            ( { model | dlgEdit = DLG.DialogVisible, selectedDeviation = Just deviation }, Cmd.none )

        DlgEdit isOk -> 
            let 
                cmd = 
                    if isOk == True then
                        case model.selectedDeviation of 
                            Nothing -> Cmd.none
                            Just dev -> C.editDeviation dev
                    else    
                        Cmd.none
            in
            ( { model | dlgEdit = DLG.DialogHidden }, cmd )

        DateChanged deviation index s ->
            updateDateTime model deviation index True s

        HourChanged deviation index s ->
            updateDateTime model deviation index False s

        ToHourbankChanged deviation s ->
            let
                

                newDev =
                    { deviation | toHourBank = Just s }

                newList =
                    List.sortBy .oid <| newDev :: List.filter (\t -> t.oid /= deviation.oid) model.deviations
            in
            ( { model | deviations = newList, selectedDeviation = Just newDev }, Cmd.none )

        CbChanged deviation ->
            let
                newDev =
                    toggleSelected deviation

                newList =
                    List.sortBy .oid <| newDev :: List.filter (\t -> t.oid /= deviation.oid) model.deviations
            in
            ( { model | deviations = newList }, Cmd.none )

        DeviationsFetched (Ok result) ->
            ( result, Cmd.none )

        DeviationsFetched (Err err) ->
            ( DLG.errorAlert Nothing "DeviationsFetched Error:" err model, Cmd.none )

        Refresh (Ok result) ->
            ( model, C.fetchDeviations result)

        Refresh (Err err) ->
            ( model, Cmd.none )

        ReasonChanged deviation index s ->
            let
                reasons =
                    if index == 1 then
                        model.reasonsIn

                    else
                        model.reasonsOut

                newDev =
                    if index == 1 then
                        { deviation | reasonIn = s }

                    else
                        { deviation | reasonOut = s }

                newList =
                    List.sortBy .oid <| newDev :: List.filter (\t -> t.oid /= deviation.oid) model.deviations
            in
            ( { model | deviations = newList, selectedDeviation = Just newDev }, Cmd.none )

        CostPlaceChanged deviation s ->
            let
                newCpId = case (String.toInt s) of 
                            Nothing -> -1
                            Just si -> si
                newDev = 
                    { deviation | costPlaceId = newCpId }

                newList =
                    List.sortBy .oid <| newDev :: List.filter (\t -> t.oid /= deviation.oid) model.deviations
            in
            --Debug.log "CostPlaceChanged"
            ( { model | deviations = newList, selectedDeviation = Just newDev }, Cmd.none )

        Edited (Ok s) ->
            (  model, Cmd.none )

        Edited (Err s) ->
            ( model, Cmd.none )



{-
   let
       newModel =
           if index == 1 then
               { model | selectedReasonIn = Just s }

           else
               { model | selectedReasonOut = Just s }
   in
   ( newModel, Cmd.none )
-}
