module Ajourhold.Decoders exposing (myInitDataDecoder, myWorkPlacesDecoder, watchDefDecoder, watchInfoDecoder, timebankWorkPlaceDecoder)

import Ajourhold.Types exposing (InitData, WatchDef, WatchInfo, TimebankWorkPlace)
import Common.ComboBox as CB
import Json.Decode as JD
import Json.Decode.Pipeline as JP
import Result exposing (Result)


myInitDataDecoder : JD.Value -> Result JD.Error InitData
myInitDataDecoder =
    let
        myDecoder =
            JD.succeed InitData
                |> JP.required "userId" JD.string
                |> JP.required "workPlaces" CB.comboBoxItemListDecoder
                |> JP.required "saldo" JD.float
                |> JP.required "vacation" JD.string
                |> JP.required "reasonCodes" (JD.nullable CB.comboBoxItemListDecoder)
    in
    JD.decodeValue myDecoder


myWorkPlacesDecoder : JD.Value -> Result JD.Error InitData
myWorkPlacesDecoder =
    let
        myDecoder =
            JD.succeed InitData
                |> JP.required "userId" JD.string
                |> JP.required "workPlaces" CB.comboBoxItemListDecoder
                |> JP.required "saldo" JD.float
                |> JP.required "vacation" JD.string
                |> JP.hardcoded Nothing
    in
    JD.decodeValue myDecoder


watchDefDecoder : JD.Decoder WatchDef
watchDefDecoder =
    JD.succeed WatchDef
        |> JP.required "len" JD.string
        |> JP.required "hourFrom" JD.string
        |> JP.required "hourTo" JD.string
        |> JP.required "reason" JD.string
        |> JP.required "isExtra" JD.string
        |> JP.optional "startDate" (JD.nullable JD.string) Nothing


watchInfoDecoder : JD.Decoder WatchInfo
watchInfoDecoder =
    JD.succeed WatchInfo
        |> JP.required "watches" (JD.nullable CB.comboBoxItemListDecoder)
        |> JP.required "watchdefs" (JD.nullable (JD.dict watchDefDecoder))

timebankWorkPlaceDecoder : JD.Decoder TimebankWorkPlace
timebankWorkPlaceDecoder =
    JD.succeed TimebankWorkPlace
        |> JP.required "value" JD.float
