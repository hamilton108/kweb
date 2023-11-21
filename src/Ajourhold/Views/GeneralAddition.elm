module Ajourhold.Views.GeneralAddition exposing (view)

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
import Common.Misc exposing (getLangValue)

view : Model -> H.Html Msg
view model =
    let
        from_date_str =
            getLangValue "fra_dato" model.lang
            
        to_date_str =
            getLangValue "til_dato" model.lang

        date1 =
            VI.gridAjourItem VI.gA1
                (VI.dateItem from_date_str model.dateFrom (SimpleDateChanged 1))

        date2 =
            VI.gridAjourItem VI.gA2
                (VI.dateItem to_date_str model.dateTo (SimpleDateChanged 2))

        workPlace1 =
            VI.workPlace1 model
                WorkPlaceChanged
                VI.gB1
    in
    H.div
        [ A.class "grid-ajour-cells" ]
        [ date1
        , date2
        , workPlace1
        , VI.fromHour model (IsDisabled False) VI.gC1
        , VI.toHour model (IsDisabled False) VI.gC2
        , VI.sumHour model VI.gC3
        , VI.reasons model VI.gD1
        , VI.message model VI.gD23
        , VI.btn model VI.gE1
        , DLG.alert model.dlgAlert AlertOk
        ]



{-
   let
       dateGroup =
           H.div [ A.class "row ajour" ]
               [ VI.dateItem "Fra dato:" model.dateFrom (SimpleDateChanged 1)
               , VI.dateItem "Til dato:" model.dateTo (SimpleDateChanged 2)
               ]

       workPlace =
           let
               px =
                   VI.wrapSelectItems "-------" model.workPlaces

               py =
                   VI.wrapSelectItems "-------" model.watches

               isMissing =
                   model.selectedWorkPlace == Nothing
           in
           H.div [ A.class "row ajour" ]
               [ VI.selectRow model.selectedWorkPlace isMissing False "Arbeidssted:" px WorkPlaceChanged
               ]

       hourGroup =
           H.div [ A.class "row ajour" ]
               [ VI.hourItem "Fra kl:" model.hourFrom (HourChanged 1) False
               , VI.hourItem "Til kl:" model.hourTo (HourChanged 2) False
               , VI.sumHourItem "Timer:" model.sumHours
               ]

       reasonGroup =
           let
               rc =
                   VI.wrapSelectItems ST.pickReasonCode model.reasonCodes

               isMissingReason =
                   model.selectedReasonCode == Nothing

               reasons =
                   VI.selectRow model.selectedReasonCode isMissingReason False ST.reasonCodes rc ReasonCodeChanged

               melding =
                   VI.meldingInput model.melding
           in
           H.div [ A.class "row ajour" ] [ reasons, melding ]
   in
   H.div
       [ A.class "container" ]
       [ dateGroup
       , workPlace
       , hourGroup
       , reasonGroup
       , H.div [ A.class "row ajour" ]
           [ H.div [ A.class "form-group col-sm-12" ]
               [ BTN.button BTN.Success "Lagre" (C.canSendData model) (SendData Send)
               ]
           ]
       , DLG.alert model.dlgAlert AlertOk
       ]
-}
