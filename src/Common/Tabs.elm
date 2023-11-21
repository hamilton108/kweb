module Common.Tabs exposing (tabItem, tabPane)

import Html as H
import Html.Attributes as A
import Html.Events as E


tabItem : String -> String -> Int -> msg -> H.Html msg
tabItem href title _ event =
    H.a [ E.onClick event, A.class "dropdown-item", A.attribute "data-toggle" "tab", A.href href, A.attribute "role" "tab" ]
        [ H.text title ]


tabPane : String -> Int -> Int -> H.Html msg -> H.Html msg
tabPane tabId myIndex tabIndex childElements =
    let
        clazz =
            if myIndex == tabIndex then
                "tab-pane active"

            else
                "tab-pane"
    in
    H.div
        [ A.class clazz, A.id tabId, A.attribute "role" "tabpanel" ]
        [ childElements
        ]
