module Ajourhold.Views.Timeoff exposing (..)

import Ajourhold.Views.Absence as ABS
import Ajourhold.Types exposing (Model, Msg)
import Html as H


view : Model -> H.Html Msg
view model =
    ABS.view model
