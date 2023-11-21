module Tidreg.Types exposing (emptyCostPlace, Deviation, CostPlace,Flags, GridPosition(..), Model, Msg(..))

import Json.Decode as JD
import Common.ComboBox as CB
import Common.DateTime as DT
import Common.ModalDialog as DLG
import Common.Types as CT
import Dict exposing (Dict)
import Http


type alias ReasonDict =
    Dict String CB.ComboBoxItem


type GridPosition
    = GridPosition String


type alias Flags =
    {
        userid : String
        , wid : String
    }


type Msg
    = Approve
    | Approved (Result Http.Error CT.JsonStatusMsg)
    | Discard
    | Discarded (Result Http.Error CT.JsonStatusMsg)
    | Edit Deviation
    | DlgEdit Bool
    | DateChanged Deviation Int String
    | HourChanged Deviation Int String
    | CbChanged Deviation
    | DeviationsFetched (Result Http.Error Model)
    | Refresh (Result JD.Error Flags)
    | ReasonChanged Deviation Int String
    | CostPlaceChanged Deviation String
    | Edited (Result Http.Error CT.JsonStatusMsg)
    | ToHourbankChanged Deviation String


{-

   public interface IDeviationDTO
    {
        long TidRegId { get; }
        string Name { get; }
        string RegTimeIn { get; }
        string WatchStart { get; }
        string DeviationIn { get; }
        string RegTimeOut { get; }
        string WatchEnd { get; }
        string DeviationOut { get; }
        string SumDeviation { get; }
        int Category { get; }
        long Turnuslinjeid { get; }
        long IsoYear { get; }
        long IsoWeek { get; }
        long Tilstedeid { get; }
    }
-}

type alias CostPlace =
    { cpId : Int
    , cpName : String
    }


emptyCostPlace : Int -> String -> CostPlace 
emptyCostPlace cpid name = CostPlace cpid name

type alias Deviation =
    { isSelected : Bool
    , oid : Int
    , name : String
    , regTimeIn : DT.IsoDateTime
    , watchStart : DT.IsoDateTime
    , reasonIn : String
    , deviationIn : String
    , regTimeOut : DT.IsoDateTime
    , watchEnd : DT.IsoDateTime
    , reasonOut : String
    , deviationOut : String
    , watchId : Maybe Int
    , presentId : Maybe Int
    , toHourBank : Maybe String
    , costPlaceId : Int 
    , costPlaces : List CostPlace
    }


type alias Model =
    { flags: Flags 
    , deviations : List Deviation
    , selectedDeviation : Maybe Deviation
    , reasonsIn : CB.SelectItems
    , reasonsOut : CB.SelectItems
    , dlgEdit : DLG.DialogState
    , dlgAlert : DLG.DialogState
    }
