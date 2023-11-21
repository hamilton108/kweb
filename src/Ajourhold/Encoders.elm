module Ajourhold.Encoders exposing (encodeWorkPlace)

import Ajourhold.Types as T
import Json.Encode as JE


encodeWorkPlace : T.WorkPlace -> JE.Value
encodeWorkPlace wp =
    case wp of
        T.NoWorkPlace ->
            JE.null

        T.WorkPlace s ->
            JE.string s



{-
   encodeUserId : T.UserId -> JE.Value
   encodeUserId (T.UserId usr) =
       JE.string usr
-}
