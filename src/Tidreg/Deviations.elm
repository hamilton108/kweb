port module Tidreg.Deviations exposing (..)

import Browser
import Json.Decode as JD
import Json.Decode.Pipeline as JP
import Tidreg.Commands as C
import Tidreg.Types as T exposing (Msg(..))
import Tidreg.Update as U
import Tidreg.View as V


port refresh : (JD.Value -> msg) -> Sub msg

subscriptions : T.Model -> Sub T.Msg
subscriptions _ =
    refresh (myWorkPlaceDecoder >> Refresh)

myWorkPlaceDecoder : JD.Value -> Result JD.Error T.Flags
myWorkPlaceDecoder =
    let
        myDecoder =
            JD.succeed T.Flags
                |> JP.required "userid" JD.string
                |> JP.required "wid" JD.string
    in
    JD.decodeValue myDecoder

main : Program T.Flags T.Model T.Msg
main =
    Browser.element
        { init = init
        , view = V.view
        , update = U.update
        , subscriptions = subscriptions -- \_ -> Sub.none
        }


init : T.Flags -> ( T.Model, Cmd T.Msg )
init flags =
    ( U.initModel flags, C.fetchDeviations flags )
