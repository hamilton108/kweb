module Common.Events exposing (onChange)

import Html as H
import Html.Events as E
import Json.Decode as JD



--onChange : (String -> a) -> VD.Property a


onChange : (String -> a) -> H.Attribute a
onChange tagger =
    E.on "change" (JD.map tagger E.targetValue)
