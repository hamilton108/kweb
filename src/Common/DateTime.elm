module Common.DateTime exposing
    ( IsoDateTime
    , hourStrCompare
    , hourStrDiff
    , hs2Tup
    , iso8601diff
    , iso8601diffHours
    , iso8601diffMinutes
    , iso8601fmt1
    , iso8601toMillis
    )

import Iso8601 as I
import String as S
import Time


hourMillis : Float
hourMillis =
    3600000.0


minuteMillis : Float
minuteMillis =
    60000.0


type alias IsoDateTime =
    { date : String
    , time : String
    }


iso8601toMillis : IsoDateTime -> Int
iso8601toMillis iso =
    let
        posix =
            I.toTime <| iso.date ++ "T" ++ iso.time ++ ":00Z"
    in
    case posix of
        Ok p ->
            Time.posixToMillis p

        Err _ ->
            0


iso8601diff : IsoDateTime -> IsoDateTime -> Int
iso8601diff d1 d2 =
    let
        m1 =
            iso8601toMillis d1

        m2 =
            iso8601toMillis d2
    in
    m2 - m1


iso8601diffHours : IsoDateTime -> IsoDateTime -> Float
iso8601diffHours d1 d2 =
    (toFloat <| iso8601diff d1 d2) / hourMillis


iso8601diffMinutes : IsoDateTime -> IsoDateTime -> Float
iso8601diffMinutes d1 d2 =
    (toFloat <| iso8601diff d1 d2) / minuteMillis


iso8601fmt1 : IsoDateTime -> String
iso8601fmt1 iso =
    -- 2018-10-17T07:30
    let
        d =
            String.slice 8 10 iso.date

        m =
            String.slice 5 7 iso.date
    in
    d ++ "." ++ m ++ " " ++ iso.time



-- hourStrToTuple : List String -> ( Int, Int )


hs2Tup hx =
    case hx of
        [ h, m ] ->
            ( Maybe.withDefault 0 (S.toInt h), Maybe.withDefault 0 (S.toInt m) )

        _ ->
            ( 0, 0 )



-- ( M.unpackEither h S.toInt 0
-- , M.unpackEither m S.toInt 0
-- )


hourStrCompare : String -> String -> Int
hourStrCompare hx1 hx2 =
    let
        ( h1, m1 ) =
            hs2Tup (S.split ":" hx1)

        ( h2, m2 ) =
            hs2Tup (S.split ":" hx2)

        t1 =
            h1 * 60 + m1

        t2 =
            h2 * 60 + m2
    in
    if t2 > t1 then
        1

    else if t1 < t2 then
        -1

    else
        0


hourStrDiff : String -> String -> Float
hourStrDiff hx1 hx2 =
    let
        ( h1, m1 ) =
            hs2Tup (S.split ":" hx1)

        ( h2, m2 ) =
            hs2Tup (S.split ":" hx2)

        h =
            h2 - h1

        m =
            m2 - m1

        hx =
            if h < 0 then
                h + 24

            else
                h
    in
    toFloat ((hx * 60) + m) / 60.0



--dateStrDiff : String -> String -> Float
-- dateStrDiff d1 d2 =
{-
   let
       ( h1, m1 ) =
           hourStrToTuple (S.split ":" hx1)

       ( h2, m2 ) =
           hourStrToTuple (S.split ":" hx2)

       h =
           h2 - h2

       m =
           m2 - m1

       mTot =
           (h * 60) - m
   in
       (toFloat mTot) / 60.0
-}
