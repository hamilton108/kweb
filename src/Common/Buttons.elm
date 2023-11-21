module Common.Buttons exposing (BootstrapButton(..), button, buttonClass)

import Html as H
import Html.Attributes as A
import Html.Events as E
import VirtualDom as VD


type BootstrapButton
    = Success
    | Danger
    | DlgSuccess
    | DlgDanger


buttonClass : BootstrapButton -> String
buttonClass b =
    case b of
        Success ->
            "btn btn-outline-success"

        Danger ->
            "btn btn-outline-danger"

        DlgSuccess ->
            "btn btn-outline-success btn-modal-dlg"

        DlgDanger ->
            "btn btn-outline-danger btn-modal-dlg"


button :
    BootstrapButton
    -> String
    -> Bool
    -> a
    -> VD.Node a
button b caption isEnabled clickEvent =
    H.button [ A.class (buttonClass b), E.onClick clickEvent, A.type_ "button", A.disabled (not isEnabled) ] [ H.text caption ]
