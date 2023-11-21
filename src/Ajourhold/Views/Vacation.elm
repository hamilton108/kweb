module Ajourhold.Views.Vacation exposing (view)

import Ajourhold.Types
    exposing
        ( Model
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

        vacationInput =
            VI.inputItem "string" model.vacation "form-control" Nothing True

        ferie_tilgode_str = 
            getLangValue "ferie_tilgode" model.lang

        vacation =
            VI.gridAjourItem VI.gC1
                (VI.formGroupItem "col-form-label" ferie_tilgode_str vacationInput)
    in
    H.div
        [ A.class "grid-ajour-cells" ]
        [ date1
        , date2
        , workPlace1
        , vacation
        , VI.reasons model VI.gD1
        , VI.message model VI.gD23
        , VI.btn model VI.gE1
        , DLG.alert model.dlgAlert AlertOk
        ]
