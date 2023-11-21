module PersonInfo.Model exposing (Flags, Language, Model, emptyNextOfKin, init, initModel)

import Dict exposing (Dict)
import Json.Decode as JD
import PersonInfo.Types
    exposing
        ( Competence
        , ContactInfo
        , EconomyInfo
        , Employment
        , HourbankDetail
        , HourbankStat
        , Msg(..)
        , NextOfKin
        , Personalia
        )

import PersonInfo.Commands as C
type alias Flags =
    { userId : String
    , lang : JD.Value
    }


type alias Language =
    Dict String String


type alias Model =
    { userId : String
    , lang : Language
    , tabIndex : Int
    , personalia : Maybe Personalia
    , employments : List Employment
    , contactInfo : Maybe ContactInfo
    , economy : Maybe EconomyInfo
    , nextOfKin : List NextOfKin
    , nextOfKinShadow : NextOfKin
    , isEditMode : Bool
    , competence : List Competence
    , hourbankstat : Maybe HourbankStat
    , hourbankdetails : List HourbankDetail
    }



--emptyNextOfKin : Int -> NextOfKin
--emptyNextOfKin kinId =


emptyNextOfKin : NextOfKin
emptyNextOfKin =
    { kinId = 0
    , navn = ""
    , relasjon = ""
    , adresse = ""
    , adresse2 = ""
    , tlf = ""
    , postNr = ""
    , postSted = ""
    }


initModel : String -> Dict String String -> Model
initModel userId lang =
    { userId = userId
    , lang = lang
    , tabIndex = 1
    , personalia = Nothing
    , employments = []
    , contactInfo = Nothing
    , economy = Nothing
    , nextOfKin = []
    , nextOfKinShadow = emptyNextOfKin -- 0
    , isEditMode = False
    , competence = []
    , hourbankstat = Nothing
    , hourbankdetails = []
    }


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        lang =
            flags.lang
                |> JD.decodeValue (JD.dict JD.string)
                |> Result.withDefault Dict.empty
    in
    ( initModel flags.userId lang, C.fetchInitData flags.userId )
    --( initModel flags.userId lang, Cmd.none )
