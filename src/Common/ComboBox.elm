module Common.ComboBox exposing (..)

import Html as H
import Html.Attributes as A
import VirtualDom as VD
import Json.Decode as Json exposing (field)


type alias ComboBoxItem =
    { val : String
    , txt : String
    }


type alias SelectItems =
    List ComboBoxItem


selectOption : Maybe String -> ComboBoxItem -> VD.Node a
selectOption selected item =
    case selected of
        Nothing ->
            H.option
                [ A.value item.val
                ]
                [ H.text item.txt ]

        Just s ->
            H.option
                [ A.value item.val
                , A.selected (s == item.val)
                ]
                [ H.text item.txt ]


emptySelectOption : Maybe String -> VD.Node a
emptySelectOption title =
    let
        title_ =
            Maybe.withDefault "-" title
    in
        H.option
            [ A.value "-1"
            ]
            [ H.text title_ ]


comboBoxItemDecoder : Json.Decoder ComboBoxItem
comboBoxItemDecoder =
    Json.map2
        ComboBoxItem
        (field "value" Json.string)
        (field "text" Json.string)


comboBoxItemListDecoder : Json.Decoder (List ComboBoxItem)
comboBoxItemListDecoder =
    Json.list comboBoxItemDecoder
