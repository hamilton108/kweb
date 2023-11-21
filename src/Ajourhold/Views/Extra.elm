module Ajourhold.Views.Extra exposing (view)

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
        date1 =
            VI.dateFrom model
                (WatchMsgFor CoverFor << DateChanged 1)

        workPlace1 =
            VI.workPlace1 model
                (WatchMsgFor CoverFor << Fetch)
                VI.gB1

        watch1 =
            VI.watch1 model
                False
                (WatchMsgFor CoverFor << Changed)
                VI.gB2
    in
    H.div
        [ A.class "grid-ajour-cells" ]
        [ date1
        , workPlace1
        , watch1
        , VI.fromHour model (IsDisabled False) VI.gC1
        , VI.toHour model (IsDisabled False) VI.gC2
        , VI.sumHour model VI.gC3
        , VI.toHourBank model
        , VI.hourBankBalance model
        , VI.reasons model VI.gE1
        , VI.message model VI.gE23
        , VI.btn model VI.gF1
        , DLG.alert model.dlgAlert AlertOk
        ]
