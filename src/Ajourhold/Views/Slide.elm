module Ajourhold.Views.Slide exposing (view)

import Ajourhold.Types
    exposing
        ( IsDisabled(..)
        , Model
        , Msg(..)
        , SlideMsg(..)
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
                (SlideMsgFor << SlideDateChanged 1)

        workPlace1 =
            VI.workPlace1 model
                (SlideMsgFor << SlideWorkPlaceChanged 1)
                VI.gA2

        watch1 =
            VI.watch1 model
                False
                (SlideMsgFor << SlideWatchChanged 1)
                VI.gA3

        date2 =
            VI.dateTo model
                (SlideMsgFor << SlideDateChanged 21)
                VI.gC1

        workPlace2 =
            VI.workPlace2 model
                (SlideMsgFor << SlideWorkPlaceChanged 22)
                VI.gC2

        watch2 =
            VI.watch2 model
                False
                (SlideMsgFor << SlideWatchChanged 2)
                VI.gC3
    in
    H.div
        [ A.class "grid-ajour-cells" ]
        [ date1
        , workPlace1
        , watch1
        , VI.fromHour model (IsDisabled True) VI.gB1
        , VI.toHour model (IsDisabled True) VI.gB2
        , VI.sumHour model VI.gB3
        , date2
        , workPlace2
        , watch2
        , VI.fromHour2 model (IsDisabled False) VI.gD1
        , VI.toHour2 model (IsDisabled False) VI.gD2
        , VI.sumHour2 model VI.gD3
        , VI.reasons model VI.gE1
        , VI.message model VI.gE23
        , VI.btn model VI.gF1
        , DLG.alert model.dlgAlert AlertOk
        ]
