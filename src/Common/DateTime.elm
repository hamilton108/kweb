module Common.DateTime exposing
    ( IsoDateTime
    , dayMillis
    , hourStrCompare
    , hourStrDiff
    , hs2Tup
    , incDayStr
    , iso8601diff
    , iso8601diffHours
    , iso8601diffMinutes
    , iso8601fmt1
    , iso8601toMillis
    )

import Iso8601 as I
import Maybe
import String as S
import Time


hourMillis : Float
hourMillis =
    3600000.0


minuteMillis : Float
minuteMillis =
    60000.0


dayMillis : Int
dayMillis =
    3600000 * 24


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


incDayIso : IsoDateTime -> IsoDateTime
incDayIso iso =
    let
        millis =
            iso8601toMillis iso + dayMillis

        ts =
            I.fromTime (Time.millisToPosix millis)

        result =
            case S.split "T" ts of
                [ d, h ] ->
                    let
                        hm =
                            String.slice 0 5 h
                    in
                    { date = d, time = hm }

                _ ->
                    { date = "2024-01-01", time = "00:00" }
    in
    result


incDayStr_ : String -> Maybe String
incDayStr_ sx =
    let
        iso =
            { date = sx, time = "00:00" }

        isoInc =
            incDayIso iso
    in
    Just isoInc.date


incDayStr : Maybe String -> Maybe String
incDayStr s =
    s |> Maybe.andThen incDayStr_



{-
   case s of
       Nothing ->
           Nothing

       Just sx ->
           let
               iso =
                   { date = sx, time = "00:00" }

               isoInc =
                   incDayIso iso
           in
           Just isoInc.date
-}
-- iso8601toPosix : IsoDateTime -> Maybe Time.Posix
-- iso8601toPosix iso =
--     let
--         posix =
--             I.toTime <| iso.date ++ "T" ++ iso.time ++ ":00Z"
--     in
--     case posix of
--         Ok p ->
--             Just p
--         Err _ ->
--             Nothing


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


hs2Tup : List String -> ( Int, Int )
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
