module Common.ModalDialog exposing (AlertCategory(..), Alertable, ClassDesc, DialogState(..), alert, defaultClassDesc, dialogStatePrm, errorAlert, modalDialog)

import Common.Misc as M
import Html as H
import Html.Attributes as A
import Html.Events as E
import Http


type AlertCategory
    = Info
    | Warn
    | Error


type DialogState
    = DialogHidden
    | DialogVisible
    | DialogVisibleAlert String String AlertCategory


dialogStatePrm : DialogState -> ( String, String )
dialogStatePrm s =
    case s of
        DialogHidden ->
            ( "0", "none" )

        _ ->
            ( "1", "auto" )


type alias ClassDesc =
    { dlgClass : String
    , titleClass : String
    , okClass : String
    , cancelClass : String
    }


defaultClassDesc : ClassDesc
defaultClassDesc =
    { dlgClass = ""
    , titleClass = ""
    , okClass = "btn btn-outline-success btn-modal-dlg"
    , cancelClass = "btn btn-outline-danger btn-modal-dlg"
    }


modalDialog :
    String
    -> DialogState
    -> a
    -> a
    -> Maybe ClassDesc
    -> List (H.Html a)
    -> H.Html a
modalDialog title dialogState ok cancel clazz content =
    let
        myClazz =
            case clazz of
                Nothing ->
                    defaultClassDesc

                Just clzz ->
                    clzz

        titleDiv =
            H.h4 [ A.class myClazz.titleClass ] [ H.text title ]

        okButton =
            H.button [ A.class myClazz.okClass, E.onClick ok ] [ H.text "OK" ]

        cancelButton =
            H.button [ A.class myClazz.cancelClass, E.onClick cancel ] [ H.text "Cancel" ]

        buttons =
            [ okButton
            , cancelButton
            ]

        ( opc, ptre ) =
            dialogStatePrm dialogState

        myContent =
            titleDiv
                :: content
                ++ buttons
    in
    H.div [ A.class "modalDialog400", A.style "opacity" opc, A.style "pointer-events" ptre ]
        [ H.div [ A.class myClazz.dlgClass ] myContent
        ]



{-
   <button type="button" class="btn btn-primary">Primary</button>
   <button type="button" class="btn btn-secondary">Secondary</button>
   <button type="button" class="btn btn-success">Success</button>
   <button type="button" class="btn btn-danger">Danger</button>
   <button type="button" class="btn btn-warning">Warning</button>
   <button type="button" class="btn btn-info">Info</button>
   <button type="button" class="btn btn-light">Light</button>
   <button type="button" class="btn btn-dark">Dark</button>

   <button type="button" class="btn btn-link">Link</button>
-}


alert : DialogState -> a -> H.Html a
alert state ok =
    case state of
        DialogVisibleAlert title msg alertCat ->
            let
                titleDiv =
                    H.h4 [] [ H.text title ]

                btnClass =
                    case alertCat of
                        Info ->
                            "btn btn-info"

                        Warn ->
                            "btn btn-warning"

                        Error ->
                            "btn btn-danger"

                okButton =
                    H.button [ A.class btnClass, E.onClick ok ] [ H.text "OK" ]

                content =
                    H.div [] [ H.p [] [ H.text msg ] ]
            in
            H.div [ A.class "modalDialog", A.style "opacity" "1", A.style "pointer-events" "auto" ]
                [ H.div []
                    [ titleDiv, content, okButton ]
                ]

        _ ->
            H.div [ A.class "modalDialog", A.style "opacity" "0", A.style "pointer-events" "none" ]
                []


type alias Alertable a =
    { a | dlgAlert : DialogState }


errorAlert : Maybe String -> String -> Http.Error -> Alertable a -> Alertable a
errorAlert title errMsg httpErr model =
    let
        title_ =
            Maybe.withDefault "Error!" title

        errStr =
            errMsg ++ M.httpErr2str httpErr
    in
    { model | dlgAlert = DialogVisibleAlert title_ errStr Error }
