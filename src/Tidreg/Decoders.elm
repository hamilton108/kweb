module Tidreg.Decoders exposing (modelDecoder)

import Common.ComboBox as CB
import Common.Decoders as CDEC
import Common.ModalDialog as DLG
import Json.Decode as JD
import Json.Decode.Pipeline as JP
import Tidreg.Types as T



{-
   type alias Deviation =
       { isSelected : Bool
       , regId : Int
       , name : String
       , regTimeIn : String
       , watchStart : String
       , reasonIn : String
       , deviationIn : String
       , regTimeOut : String
       , watchEnd : String
       , reasonOut : String
       , deviationOut : String
       }
-}

costPlaceDecoder : JD.Decoder T.CostPlace
costPlaceDecoder =
    JD.succeed T.CostPlace
        |> JP.required "cpid" JD.int
        |> JP.required "cpname" JD.string


deviationDecoder : JD.Decoder T.Deviation
deviationDecoder =
    JD.succeed T.Deviation
        |> JP.hardcoded False
        |> JP.required "id" JD.int
        |> JP.required "name" JD.string
        |> JP.required "timeIn" CDEC.iso8601Decoder
        |> JP.required "watchStart" CDEC.iso8601Decoder
        |> JP.required "reasonIn" JD.string
        |> JP.required "deviationIn" JD.string
        |> JP.required "timeOut" CDEC.iso8601Decoder
        |> JP.required "watchEnd" CDEC.iso8601Decoder
        |> JP.required "reasonOut" JD.string
        |> JP.required "deviationOut" JD.string
        |> JP.required "watchId" (JD.nullable JD.int)
        |> JP.required "presentId" (JD.nullable JD.int)
        |> JP.required "toHourBank" (JD.nullable JD.string)
        |> JP.required "costplaceid" JD.int
        |> JP.required "costplacelist" (JD.list costPlaceDecoder)


modelDecoder : JD.Decoder T.Model
modelDecoder =
    JD.succeed T.Model
        |> JP.required "flags" flagsDecoder
        |> JP.required "deviations" (JD.list deviationDecoder)
        |> JP.hardcoded Nothing
        |> JP.required "reasonsIn" CB.comboBoxItemListDecoder
        |> JP.required "reasonsOut" CB.comboBoxItemListDecoder
        |> JP.hardcoded DLG.DialogHidden
        |> JP.hardcoded DLG.DialogHidden


flagsDecoder : JD.Decoder T.Flags
flagsDecoder =
    JD.succeed T.Flags
        |> JP.required "userid" JD.string
        |> JP.required "wid" JD.string
        