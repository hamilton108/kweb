module Ajourhold.Views.Absence exposing (view)

import Ajourhold.Commands as C
import Ajourhold.Types
    exposing
        ( IsDisabled(..)
        , Model
        , Msg(..)
        , SendMsg(..)
        , WatchCategory(..)
        , WatchMsg(..)
        )
import Ajourhold.Views.ViewItems as VI
import Common.ModalDialog as DLG
import Html as H
import Html.Attributes as A


view : Model -> H.Html Msg
view model =
    let
        isDisabled =
            model.dateTo
                /= Nothing
                || C.isDateFromLess model

        date1 =
            VI.dateFrom model
                (WatchMsgFor Watch1 << DateChanged 1)

        date2 =
            VI.dateTo2 model
                (WatchMsgFor Watch1 << DateChanged 2)
                VI.gA2
                False

        watch1 =
            VI.watch1 model
                isDisabled
                (WatchMsgFor Watch1 << Changed)
                VI.gB2

        workPlace1 =
            VI.workPlace1 model
                (WatchMsgFor Watch1 << Fetch)
                VI.gB1

        -- else
        --     VI.workPlaceWithDefaults1 model
        --         (WatchMsgFor Watch1 << Fetch)
        --         VI.gB1
    in
    H.div
        [ A.class "grid-ajour-cells" ]
        [ date1
        , date2
        , watch1
        , workPlace1
        , VI.fromHour model (IsDisabled False) VI.gC1
        , VI.toHour model (IsDisabled False) VI.gC2
        , VI.sumHour model VI.gC3
        , VI.hourBankBalance model
        , VI.reasons model VI.gE1
        , VI.message model VI.gE23
        , VI.btn model VI.gF1
        , DLG.alert model.dlgAlert AlertOk
        ]
