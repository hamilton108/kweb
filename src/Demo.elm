module Demo exposing (Ax, Bux, Point, ax, dax, dic, jsonString, myDecoder, point, what)

import Dict exposing (Dict, fromList)
import Json.Decode as JD
import Json.Decode.Pipeline as JP
import Json.Encode as JE
import Parser exposing ((|.), (|=), Parser, float, int, run, spaces, succeed, symbol)


type alias Point =
    { x : Float
    , y : Float
    }


type alias IsoDateTime =
    { date : String
    , time : String
    }


s =
    "2018-10-23"


tm : Parser Point
tm =
    succeed Point
        |= float
        |= float


point : Parser Point
point =
    succeed Point
        |. symbol "("
        |. spaces
        |= float
        |. spaces
        |. symbol ","
        |. spaces
        |= float
        |. spaces
        |. symbol ")"


type alias Ax =
    { a : Int, b : String, b2 : String }



--  dic = Dict.fromList [(2,Ax 1 "a"),(3, Ax 2 "b")]


jsonString =
    "{ \"alice\": { \"a\": 3, \"b\": \"Hax\", \"b2\": \"Hux\" }, \"bob\": { \"a\": 45, \"b\": \"Kex\", \"b2\": \"Kox\" }}"


myDecoder =
    JD.succeed Ax
        |> JP.required "a" JD.int
        |> JP.required "b" JD.string
        |> JP.required "b2" JD.string



-- dic : Result String (Dict String Ax)


dic =
    JD.decodeString (JD.dict myDecoder) jsonString


dax : Dict Int Ax
dax =
    fromList [ ( 1, Ax 1 "a" "a2" ), ( 2, Ax 2 "b" "b2" ) ]


type alias Bux r =
    { r | b2 : String }


ax =
    Ax 1 "b" "b2"


what : Bux r -> String
what bux =
    bux.b2
