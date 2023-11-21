module Common.DateTimeUtil exposing (hourStrCompare, hourStrDiff, hs2Tup)

import String as S



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
