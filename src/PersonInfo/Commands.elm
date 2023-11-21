module PersonInfo.Commands exposing
    ( addNextOfKin
    , deleteNextOfKin
    , fetchInitData
    , mainUrl
    , updateContactInfo
    , updateNextOfKin
    )

import Common.Misc as M
import Http
import Json.Decode as JD
import Json.Decode.Pipeline as JP
import Json.Encode as JE
import PersonInfo.Types
    exposing
        ( ContactInfo
        , DataSentStatus
        , EconomyInfo
        , Employment
        , InitData
        , Msg(..)
        , NextOfKin
        , Personalia
        , Competence
        , HourbankStat
        , HourbankDetail
        )


mainUrl =
    "PersonInfo"


paramsFor : NextOfKin -> List ( String, JE.Value )
paramsFor nok =
    [ ( "kinId", JE.int nok.kinId )
    , ( "navn", JE.string nok.navn )
    , ( "relasjon", JE.string nok.relasjon )
    , ( "adresse", JE.string nok.adresse )
    , ( "adresse2", JE.string nok.adresse2 )
    , ( "tlf", JE.string nok.tlf )
    , ( "postNr", JE.string nok.postNr )
    , ( "postSted", JE.string nok.postSted )
    ]


addNextOfKin : String -> NextOfKin -> Cmd Msg
addNextOfKin userId nok =
    let
        url =
            mainUrl ++ "/AddNextOfKin?userid=" ++ userId

        params =
            paramsFor nok

        jbody =
            M.asHttpBody params

        myDecoder =
            JD.succeed DataSentStatus
                |> JP.required "ok" JD.bool
                |> JP.required "msg" JD.string
                |> JP.required "oid" (JD.nullable JD.int)
    in
    Http.send
        NextOfKinAdded
    <|
        Http.post url jbody myDecoder


updateNextOfKin : String -> NextOfKin -> Cmd Msg
updateNextOfKin userId nok =
    let
        url =
            mainUrl ++ "/UpdateNextOfKin?userid=" ++ userId

        params =
            paramsFor nok

        jbody =
            M.asHttpBody params

        myDecoder =
            JD.succeed DataSentStatus
                |> JP.required "ok" JD.bool
                |> JP.required "msg" JD.string
                |> JP.hardcoded Nothing
    in
    Http.send
        NextOfKinUpdated
    <|
        Http.post url jbody myDecoder


deleteNextOfKin : String -> NextOfKin -> Cmd Msg
deleteNextOfKin userId nok =
    let
        url =
            mainUrl ++ "/DeleteNextOfKin?userid=" ++ userId ++ "&kinid=" ++ String.fromInt nok.kinId

        myDecoder =
            JD.succeed DataSentStatus
                |> JP.required "ok" JD.bool
                |> JP.required "msg" JD.string
                |> JP.hardcoded (Just nok.kinId)
    in
    Http.send
        NextOfKinDeleted
    <|
        Http.get url myDecoder


updateContactInfo userId ci =
    let
        url =
            mainUrl ++ "/UpdateContactInfo?userid=" ++ userId

        params =
            [ ( "address", JE.string ci.address )
            , ( "address2", JE.string ci.address2 )
            , ( "postCode", JE.string ci.postCode )
            , ( "place", JE.string ci.place )
            , ( "country", JE.string ci.country )
            , ( "tlfPrivate", JE.string ci.tlfPrivate )
            , ( "tlfWork", JE.string ci.tlfWork )
            , ( "mobile", JE.string ci.mobile )
            , ( "email", JE.string ci.email )
            , ( "email2", JE.string ci.email2 )
            , ( "receiveSms", JE.bool ci.receiveSms )
            ]

        jbody =
            M.asHttpBody params

        myDecoder =
            JD.succeed DataSentStatus
                |> JP.required "ok" JD.bool
                |> JP.required "msg" JD.string
                |> JP.hardcoded Nothing
    in
    Http.send
        ContactInfoUpdated
    <|
        Http.post url jbody myDecoder


fetchInitData : String -> Cmd Msg
fetchInitData userId =
    let
        url =
            mainUrl ++ "/PersonInfoFor?userid=" ++ userId

        empDecoder =
            JD.succeed Employment
                |> JP.required "avd" JD.string
                |> JP.required "yrk" JD.string
                |> JP.required "fromDate" JD.string
                |> JP.required "toDate" (JD.nullable JD.string)
                |> JP.required "stKode" JD.string
                |> JP.required "fraction" JD.string
                |> JP.required "baseHours" JD.string
                |> JP.required "hoursPrWeek" JD.string

        compDecoder =
            JD.succeed Competence
                |> JP.required "komppergrid" JD.int
                |> JP.required "competenceName" JD.string
                |> JP.required "description" JD.string
                |> JP.required "toDate" (JD.nullable JD.string)
                |> JP.required "mustCheck" JD.string

        hbankstatDecoder =
            JD.succeed HourbankStat
                
                |> JP.required "allhourbanktotal" JD.string
                |> JP.required "allhourbankavspas" JD.string
                |> JP.required "allhourbankdisp" JD.string
                |> JP.required "periodhourbanktotal" (JD.nullable JD.string)
                |> JP.required "periodhourbankavspas" (JD.nullable JD.string)
                |> JP.required "periodhourbankdisp" (JD.nullable JD.string)

        hbankdetailDecoder =
            JD.succeed HourbankDetail
                
                |> JP.required "depwgname" JD.string
                |> JP.required "hourbanktype" JD.string
                |> JP.required "valuedate" JD.string
                |> JP.required "correctiontext" (JD.nullable JD.string)
                |> JP.required "amount" JD.string

        persDecoder =
            JD.succeed Personalia
                |> JP.required "firstName" JD.string
                |> JP.required "lastName" JD.string
                |> JP.required "salaryNr" JD.string
                |> JP.required "birthDate" JD.string

        contactInfoDecoder =
            JD.succeed ContactInfo
                |> JP.required "address" JD.string
                |> JP.required "address2" JD.string
                |> JP.required "postCode" JD.string
                |> JP.required "place" JD.string
                |> JP.required "country" JD.string
                |> JP.required "tlfPrivate" JD.string
                |> JP.required "tlfWork" JD.string
                |> JP.required "mobile" JD.string
                |> JP.required "email" JD.string
                |> JP.required "email2" JD.string
                |> JP.required "receiveSms" JD.bool

        economyInfoDecoder =
            JD.succeed EconomyInfo
                |> JP.required "skatteKommune" JD.string
                |> JP.required "ansettelsesTypeNavn" JD.string
                |> JP.required "avgiftSone" JD.int
                |> JP.required "vikar" JD.bool
                |> JP.required "startDato" JD.string
                |> JP.required "sluttDato" JD.string
                |> JP.required "fagforening" JD.string

        nextOfKinDecoder =
            JD.succeed NextOfKin
                |> JP.required "kinId" JD.int
                |> JP.required "navn" JD.string
                |> JP.required "relasjon" JD.string
                |> JP.required "adresse" JD.string
                |> JP.required "adresse2" JD.string
                |> JP.required "tlf" JD.string
                |> JP.required "postNr" JD.string
                |> JP.required "postSted" JD.string

        decoder =
            JD.succeed InitData
                |> JP.required "personalia" persDecoder
                |> JP.required "emps" (JD.list empDecoder)
                |> JP.required "contactInfo" contactInfoDecoder
                |> JP.required "economyInfo" economyInfoDecoder
                |> JP.required "nextOfKin" (JD.list nextOfKinDecoder)
                |> JP.required "competence" (JD.list compDecoder)
                |> JP.required "hourbankstat" hbankstatDecoder
                 |> JP.required "hourbankdetails" (JD.list hbankdetailDecoder)

    in
    Http.send
        InitDataFetched
    <|
        Http.get url decoder
