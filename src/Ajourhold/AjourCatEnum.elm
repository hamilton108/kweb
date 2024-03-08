module Ajourhold.AjourCatEnum exposing (AjourCatEnum(..), fromEnum, toEnum)

-- ajCatDict : AjCatDict
-- ajCatDict =
--     Dict.fromList
--         [ ( 1, 8 ) -- Avspasering
--         , ( 2, 2 ) -- Uttrykning
--         , ( 3, 512 ) -- Vaktbytte
--         , ( 6, 4 ) -- Fravaer
--         , ( 7, 1 ) -- Extra
--         , ( 15, 1024 ) -- Forskyvning
--         , ( 18, 256 ) -- Ferie
--         , ( 19, 2048 ) -- Generelt tillegg
--         ]


type AjourCatEnum
    = AceTimeoff
    | AceEmergency
    | AceSwap
    | AceAbsence
    | AceExtra
    | AceSlide
    | AceVacation
    | AceGeneralAddition
    | AceNone


fromEnum : AjourCatEnum -> Int
fromEnum cat =
    case cat of
        AceTimeoff ->
            1

        AceEmergency ->
            2

        AceSwap ->
            3

        AceAbsence ->
            6

        AceExtra ->
            7

        AceSlide ->
            15

        AceVacation ->
            18

        AceGeneralAddition ->
            19

        AceNone ->
            99


toEnum : Int -> AjourCatEnum
toEnum i =
    case i of
        1 ->
            AceTimeoff

        2 ->
            AceEmergency

        3 ->
            AceSwap

        6 ->
            AceAbsence

        7 ->
            AceExtra

        15 ->
            AceSlide

        18 ->
            AceVacation

        19 ->
            AceGeneralAddition

        _ ->
            AceNone
