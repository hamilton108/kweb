module Ajourhold.Types exposing
    ( AjourCategory
    , DataSentStatus
    , Flags
    , GridPosition(..)
    , InitData
    , InitDataCurDay
    , IsDisabled(..)
    , MainUrl(..)
    , Model
    , Msg(..)
    , MyDate(..)
    , SendMsg(..)
    , SlideMsg(..)
    , TimebankWorkPlace
    , UserId(..)
    , WatchCategory(..)
    , WatchDef
    , WatchDefDict
    , WatchInfo
    , WatchMsg(..)
    , WorkPlace(..)
    , curReasonCodes
    , curReasonCodesStr
    , defaultWatchDef
    , fromMyDate
    , fromWorkPlace
    , toMyDate
    , toWorkPlace
    )

import Ajourhold.AjourCatEnum exposing (AjourCatEnum)
import Common.ComboBox as CB
import Common.ModalDialog as DLG
import Dict exposing (Dict)
import Http
import Json.Decode as JD



{-
      type Dollar
          = Dollar Int


      map : (Int -> Int) -> Dollar -> Dollar
      map f (Dollar i) =
          Dollar <| f i
   wfn : WorkPlace -> String
   wfn x =
       case x of
           WorkPlace z ->
               z

           NoWorkPlace ->
               "???"

-}


type alias AjourCategory =
    Int


type alias Flags =
    { mainurl : String
    , ajcat : AjourCategory
    , lang : JD.Value --Dict String String
    }


type GridPosition
    = GridPosition String


type IsDisabled
    = IsDisabled Bool


type WorkPlace
    = WorkPlace String
    | NoWorkPlace


type MyDate
    = MyDate String
    | NoDate


type UserId
    = UserId String


type MainUrl
    = MainUrl String


toWorkPlace : Maybe String -> WorkPlace
toWorkPlace s =
    case s of
        Nothing ->
            NoWorkPlace

        Just sx ->
            if sx == "-1" then
                NoWorkPlace

            else
                WorkPlace sx


fromWorkPlace : WorkPlace -> String
fromWorkPlace wp =
    case wp of
        NoWorkPlace ->
            "-1"

        WorkPlace s ->
            s


toMyDate : Maybe String -> MyDate
toMyDate s =
    case s of
        Nothing ->
            NoDate

        Just sx ->
            if sx == "-1" then
                NoDate

            else
                MyDate sx


fromMyDate : MyDate -> String
fromMyDate dx =
    case dx of
        NoDate ->
            "-1"

        MyDate s ->
            s


type alias InitData =
    { userId : String
    , workPlaces : CB.SelectItems
    , saldo : Float
    , vacation : String
    , reasonCodesUnits : Dict String CB.SelectItems
    }


type alias InitDataCurDay =
    { userId : String
    , curUnitId : String
    , curWatchid : String
    , curDate : String
    , curHbank : TimebankWorkPlace
    , watches : CB.SelectItems
    , watchDefs : WatchDefDict
    , workPlaces : CB.SelectItems
    , reasonCodes : CB.SelectItems
    , reasonCodesUnits : Dict String CB.SelectItems
    }


curReasonCodes : WorkPlace -> Dict String CB.SelectItems -> CB.SelectItems
curReasonCodes wp d = 
    if wp == NoWorkPlace then
        []
    else
        let 
            curWp = fromWorkPlace wp
        in
        d 
            |> Dict.get curWp
            |> Maybe.withDefault []


curReasonCodesStr : Maybe String -> Dict String CB.SelectItems -> CB.SelectItems
curReasonCodesStr s d = 
    curReasonCodes (toWorkPlace s) d

type alias WatchDef =
    { len : String
    , hourFrom : String
    , hourTo : String
    , reason : String
    , isExtra : String
    , startDate : Maybe String
    }


defaultWatchDef : WatchDef
defaultWatchDef =
    WatchDef "0.0" "00:00" "00:00" "-1" "false" Nothing


type alias WatchDefDict =
    Dict String WatchDef


type alias WatchInfo =
    { watches : Maybe (List CB.ComboBoxItem)
    , watchDefs : Maybe WatchDefDict
    }


type alias DataSentStatus =
    { ok : Bool, msg : String }


type alias TimebankWorkPlace =
    { value : Float
    }


type WatchCategory
    = Watch1
    | Watch2
    | CoverFor
    | Swap Int
    | Emergency


type WatchMsg
    = Changed String
    | DateChanged Int String
    | Fetch String
    | Fetched (Result Http.Error WatchInfo)
    | TimebankFetched (Result Http.Error TimebankWorkPlace)



-- | Fetched (Result Http.Error CB.SelectItems)


type SendMsg
    = Send
    | Sent (Result Http.Error DataSentStatus)


type SlideMsg
    = SlideDateChanged Int String
    | SlideWatchChanged Int String
    | SlideWorkPlaceChanged Int String
    | SlideWatchFetched Int (Result Http.Error WatchInfo)



-- type EmergencyMsg
--     = EmerDateChanged Int String
--     | EmerWatchChanged Int String
--     | EmerWorkPlaceChanged Int String
--     | EmerWatchFetched Int (Result Http.Error WatchInfo)


type Msg
    = AlertOk
    | WorkPlacesFetched (Result JD.Error InitData)
    | InitDataFetched (Result JD.Error InitData)
    | InitDataCurDayFetched (Result JD.Error InitDataCurDay)
    | ReasonCodeChanged String
    | MeldingChanged String
    | WorkPlaceChanged String
    | SimpleDateChanged Int String
      --| DateChanged Int String
      --| DateChanged2 Int String
    | HourChanged Int String
    | ToTimeBankChanged String
    | WatchMsgFor WatchCategory WatchMsg
    | SendData SendMsg
    | SlideMsgFor SlideMsg


type alias Model =
    { mainUrl : MainUrl
    , ajcat : AjourCatEnum
    , lang : Dict String String
    , userId : String
    , reasonCodes : CB.SelectItems
    , reasonCodesUnits : Dict String CB.SelectItems
    , selectedReasonCode : Maybe String
    , melding : Maybe String
    , workPlaces : Maybe CB.SelectItems
    , selectedWorkPlace : Maybe String
    , workPlaces2 : Maybe CB.SelectItems
    , selectedWorkPlace2 : Maybe String
    , watches : Maybe CB.SelectItems
    , selectedWatch : Maybe String
    , watchDefs : Maybe WatchDefDict
    , watches2 : Maybe CB.SelectItems
    , selectedWatch2 : Maybe String
    , watchDefs2 : Maybe WatchDefDict
    , dlgAlert : DLG.DialogState
    , dateFrom : Maybe String
    , dateTo : Maybe String
    , hourFrom : Maybe String
    , hourTo : Maybe String
    , sumHours : Maybe String
    , hourFrom2 : Maybe String
    , hourTo2 : Maybe String
    , sumHours2 : Maybe String
    , saldo : Maybe String
    , toTimeBank : Maybe String
    , vacation : String
    }
