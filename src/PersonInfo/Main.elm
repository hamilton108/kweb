module PersonInfo.Main exposing (main)

--exposing (Msg(..))
-- import PersonInfo.Types exposing (Msg)

import Browser
import PersonInfo.Model exposing (Flags, Model, init)
import PersonInfo.Types exposing (Msg)
import PersonInfo.Update exposing (update)
import PersonInfo.View exposing (view)


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
