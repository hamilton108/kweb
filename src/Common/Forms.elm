module Common.Forms exposing (..)

import VirtualDom as VD
import Html as H
import Html.Attributes as A
import Common.Misc exposing (ColXs(..), colXs)
import Tuple exposing (first, second)


-- import Html.Events as E
{-
   <div class="form-group">
     <label for="credit" style="display:block;">Kredit:</label>
     <select class="form-control" name="preset" id="credit">
                 {% for konto in ns4102 %}
                 <option value="{{konto.value}}">{{konto.name}}</option>
                 {% endfor %}
             </select>
   </div>
-}


formGroup : String -> String -> ColXs -> H.Html a -> VD.Node a
formGroup id lbl cx input =
    let
        cx_ =
            colXs cx
    in
        H.div [ A.class "form-group row" ]
            [ H.label [ A.for id, A.class (first cx_) ] [ H.text lbl ]
            , H.div [ A.class (second cx_) ]
                [ input ]
            ]
