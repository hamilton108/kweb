module PersonInfo.Types exposing
    ( ContactInfo
    , DataSentStatus
    , EconomyInfo
    , Employment
    , InitData
    , Msg(..)
    , NextOfKin
    , Personalia
    , TabCategory(..)
    , Competence
    , HourbankStat
    , HourbankDetail
    )

import Http


type TabCategory
    = TContactInfo
    | TEconomy
    | TNextOfKin


type alias DataSentStatus =
    { ok : Bool, msg : String, oid : Maybe Int }


type Msg
    = Noop String
    | InitDataFetched (Result Http.Error InitData)
    | MottaSMSChanged
    | VikarChanged
    | ContactInfoChanged Int String
    | EconomyInfoChanged Int String
    | UpdateContactInfo
    | ContactInfoUpdated (Result Http.Error DataSentStatus)
    | NextOfKinChanged Int String
    | AddNextOfKin
    | NextOfKinAdded (Result Http.Error DataSentStatus)
    | EditNextOfKin NextOfKin
    | UpdateNextOfKin
    | NextOfKinUpdated (Result Http.Error DataSentStatus)
    | DeleteNextOfKin NextOfKin
    | NextOfKinDeleted (Result Http.Error DataSentStatus)
    | CancelNextOfKin
    | TabChanged Int



{- }
   | TabChangedTo TabCategory
   | ContactInfoFetched (Result Http.Error ContactInfo)
   | EconomyFetched (Result Http.Error EconomyInfo)
   | NextOfKinFetched (Result Http.Error NextOfKin)
-}


type alias Personalia =
    { firstName : String
    , lastName : String
    , salaryNr : String
    , birthDate : String
    }


type alias Employment =
    { avd : String
    , yrk : String
    , fromDate : String
    , toDate : Maybe String
    , stKode : String
    , fraction : String
    , baseHours : String
    , hoursPrWeek : String
    }

type alias Competence =
    { komppergrid : Int
    , competenceName : String
    , description : String
    , toDate : Maybe String
    , mustCheck : String
    }

type alias HourbankStat =
    { allhourbanktotal : String
    , allhourbankavspas : String
    , allhourbankdisp : String
    , periodhourbanktotal : Maybe String
    , periodhourbankavspas : Maybe String
    , periodhourbankdisp : Maybe String
    }

type alias HourbankDetail =
    { depwgname : String
    , hourbanktype : String
    , valuedate : String
    , correctiontext : Maybe String
    , amount : String
    }

type alias EconomyInfo =
    { skatteKommune : String
    , ansettelsesTypeNavn : String
    , avgiftSone : Int
    , vikar : Bool
    , startDato : String
    , sluttDato : String
    , fagforening : String
    }


type alias ContactInfo =
    { address : String
    , address2 : String
    , postCode : String
    , place : String
    , country : String
    , tlfPrivate : String
    , tlfWork : String
    , mobile : String
    , email : String
    , email2 : String
    , receiveSms : Bool
    }


type alias NextOfKin =
    { kinId : Int
    , navn : String
    , relasjon : String
    , adresse : String
    , adresse2 : String
    , tlf : String
    , postNr : String
    , postSted : String
    }


type alias InitData =
    { personalia : Personalia
    , employments : List Employment
    , contactInfo : ContactInfo
    , economy : EconomyInfo
    , nextOfKin : List NextOfKin
    , competence : List Competence
    , hourbankstat : HourbankStat
    , hourbankdetail : List HourbankDetail
    }
