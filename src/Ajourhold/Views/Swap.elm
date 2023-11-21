module Ajourhold.Views.Swap exposing (view)

import Ajourhold.Types
    exposing
        ( Model
        , Msg(..)
        , WatchCategory(..)
        , WatchMsg(..)
        )
import Ajourhold.Views.ViewItems as VI
import Common.ModalDialog as DLG
import Html as H
import Html.Attributes as A



-- Vaktbytte


view : Model -> H.Html Msg
view model =
    let
        date1 =
            VI.dateFrom model
                (WatchMsgFor (Swap 1) << DateChanged 1)

        workPlace1 =
            VI.workPlace1 model
                (WatchMsgFor (Swap 1) << Fetch)
                VI.gB1

        watch1 =
            VI.watch1 model
                False
                (WatchMsgFor (Swap 1) << Changed)
                VI.gB2

        date2 =
            VI.dateTo model
                (WatchMsgFor (Swap 2) << DateChanged 1)
                VI.gC1

        workPlace2 =
            VI.workPlace2 model
                (WatchMsgFor (Swap 2) << Fetch)
                VI.gD1

        watch2 =
            VI.watch2 model
                False
                (WatchMsgFor (Swap 2) << Changed)
                VI.gD2
    in
     
    H.div
        [ A.class "grid-ajour-cells" ]
        [ date1
        , workPlace1
        , watch1
        , date2
        , workPlace2
        , watch2
        , VI.message model VI.gE23
        , VI.btn model VI.gE1
        , DLG.alert model.dlgAlert AlertOk
        ]
