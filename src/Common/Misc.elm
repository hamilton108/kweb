module Common.Misc exposing
    ( asHttpBody
    , commaOrDot
    , flip
    , formatNumberStr
    , getLangValue
    , httpErr2str
    , replace
    , toDecimal
    , unpackEither
    , unpackMaybe
    )

import Dict exposing (Dict)
import Http
import Json.Encode as JE
import Regex as RE
import String


getLangValue : String -> Dict String String -> String
getLangValue key dict =
    dict
        |> Dict.get key
        |> Maybe.withDefault "empty"


flip : (a -> b -> c) -> b -> a -> c
flip fn x y =
    fn y x


replace : String -> String -> String -> String
replace from to str =
    String.split from str |> String.join to


commaOrDot : RE.Regex
commaOrDot =
    Maybe.withDefault RE.never <| RE.fromString "[,|.]"


formatNumberStr : String -> Int -> String
formatNumberStr str numDecimals =
    let
        splitList =
            --RE.split RE.All (RE.regex "[,|.]") str
            RE.split commaOrDot str

        decimalPart =
            List.drop 1 splitList |> List.head |> Maybe.withDefault "00" |> String.left numDecimals

        numPart =
            List.head splitList |> Maybe.withDefault "0"
    in
    numPart ++ "." ++ decimalPart


unpackMaybe : Maybe a -> (a -> b) -> b -> b
unpackMaybe obj fn default =
    Maybe.withDefault default <| Maybe.map fn obj


unpackEither : String -> (String -> Result String a) -> a -> a
unpackEither s f default =
    let
        x =
            f s
    in
    case x of
        Ok okx ->
            okx

        Err _ ->
            default


asHttpBody : List ( String, JE.Value ) -> Http.Body
asHttpBody lx =
    let
        x =
            JE.object lx
    in
    Http.stringBody "application/json" (JE.encode 0 x)


toDecimal : Float -> Float -> Float
toDecimal value roundFactor =
    let
        valx =
            toFloat <| round <| value * roundFactor
    in
    valx / roundFactor



{-
   type ColXs
       = CX606
       | CX408
       | CX309
       | CX210
       | CX204


   colXs : ColXs -> ( String, String )
   colXs x =
       case x of
           CX606 ->
               ( "col-xs-6 col-form-label", "col-xs-6" )

           CX408 ->
               ( "col-xs-4 col-form-label", "col-xs-8" )

           CX309 ->
               ( "col-xs-3 col-form-label", "col-xs-9" )

           CX210 ->
               ( "col-xs-2 col-form-label", "col-xs-10" )

           CX204 ->
               ( "col-xs-2 col-form-label", "col-xs-4" )

-}


httpErr2str : Http.Error -> String
httpErr2str err =
    case err of
        Http.Timeout ->
            "Timeout"

        Http.NetworkError ->
            "NetworkError"

        Http.BadUrl s ->
            "BadUrl: " ++ s

        Http.BadStatus _ ->
            "BadStatus: "

        Http.BadPayload s _ ->
            "BadPayload: " ++ s
