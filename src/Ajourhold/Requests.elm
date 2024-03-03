port module Ajourhold.Requests exposing (init, initDataFetched, main, subscriptions, workPlacesFetched)

import Ajourhold.Decoders as DC
import Ajourhold.Types exposing (Flags, MainUrl(..), Model, Msg(..))
import Ajourhold.Update exposing (initModel, update)
import Ajourhold.View exposing (view)
import Browser
import Dict
import Json.Decode as JD


port initDataFetched : (JD.Value -> msg) -> Sub msg


port workPlacesFetched : (JD.Value -> msg) -> Sub msg


port initDataCurDayFetched : (JD.Value -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ initDataFetched (DC.myInitDataDecoder >> InitDataFetched)
        , workPlacesFetched (DC.myWorkPlacesDecoder >> WorkPlacesFetched)
        , initDataCurDayFetched (DC.myInitDataCurDayDecoder >> InitDataCurDayFetched)
        ]


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


init : Flags -> ( Model, Cmd Msg )
init flags =
    -- ( initModel flags, fetchInitData flags )
    let
        lang =
            flags.lang
                |> JD.decodeValue (JD.dict JD.string)
                |> Result.withDefault Dict.empty
    in
    ( initModel (MainUrl flags.mainurl) flags.ajcat lang, Cmd.none )
