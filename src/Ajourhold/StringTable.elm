module Ajourhold.StringTable exposing (dataSentOk, dataSentTitle, dataSentTitleErr, pickReasonCode, reasonCodes)


pickReasonCode : String
pickReasonCode =
    "-- Velg årsakskode --"


reasonCodes : String
reasonCodes =
    "Årsakskoder:"


dataSentTitle : String
dataSentTitle =
    "Registrering av forespørsel"


dataSentTitleErr : String
dataSentTitleErr =
    "(Feil) Registrering av forespørsel"


dataSentOk : String
dataSentOk =
    "Forespørselen er lagret!"
