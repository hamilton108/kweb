module Common.Decoders exposing (iso8601Decoder, jsonStatusDecoder)

import Common.DateTime exposing (IsoDateTime)
import Common.Types as CT
import Json.Decode as JD
import Json.Decode.Pipeline as JP


jsonStatusDecoder : JD.Decoder CT.JsonStatusMsg
jsonStatusDecoder =
    JD.succeed CT.JsonStatusMsg
        |> JP.required "ok" JD.bool
        |> JP.required "msg" JD.string



{-
   isoConverter : Int -> String -> JD.Decoder String
   isoConverter index iso =
       let
           resultFn =
               if index == 1 then
                   Maybe.withDefault "1899-12-31" << List.head

               else
                   Maybe.withDefault "00:00" << List.head << List.drop 1

           isoSplit =
               String.split "T" iso

           result =
               resultFn isoSplit
       in
       JD.succeed result


   iso8601DateDecoder : JD.Decoder String
   iso8601DateDecoder =
       JD.string |> JD.andThen (isoConverter 1)


   iso8601TimeDecoder : JD.Decoder String
   iso8601TimeDecoder =
       JD.string |> JD.andThen (isoConverter 2)
-}


iso8601Decoder : JD.Decoder IsoDateTime
iso8601Decoder =
    let
        -- 0123456789 10  11 12 13 14 15
        -- 2018-10-17 T   0  7  :  3  0
        converter : String -> JD.Decoder IsoDateTime
        converter iso =
            let
                dx =
                    String.left 10 iso

                tm =
                    String.right 5 iso

                result =
                    { date = dx, time = tm }
            in
            -- Debug.log ("iso8601Decoder: dx: " ++ dx ++ ", tm: " ++ tm)
            JD.succeed result
    in
    JD.string |> JD.andThen converter
