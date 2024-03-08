module Ajourhold.View exposing (view)

import Ajourhold.AjourCatEnum exposing (AjourCatEnum(..))
import Ajourhold.Types exposing (Model, Msg(..), SendMsg(..))
import Ajourhold.Views.Absence as ABS
import Ajourhold.Views.Emergency as EM
import Ajourhold.Views.Extra as EXTRA
import Ajourhold.Views.GeneralAddition as GA
import Ajourhold.Views.Slide as SL
import Ajourhold.Views.Swap as SWAP
import Ajourhold.Views.Timeoff as TIMO
import Ajourhold.Views.Vacation as VAC
import Html as H



{-
   public enum MessageType
       All = 0,
       Mertid = 1,
       Utrykning = 2,
       Fravaer = 4,
       Avspasering = 8,
       Ajourhold = 15, // Mertid + Utrykning + Fravaer + Avspasering
       SickLeave = 16,
       HourlistMessage = 32,
       Request = 64,
       General = 128,
       Vacation = 256,
       Swap = 512,
       Slide = 1024,
       GenereltTillegg = 2048
-}


view : Model -> H.Html Msg
view model =
    case model.ajcat of
        AceExtra ->
            EXTRA.view model

        AceEmergency ->
            EM.view model

        AceAbsence ->
            ABS.view model

        AceTimeoff ->
            TIMO.view model

        AceVacation ->
            VAC.view model

        AceSwap ->
            SWAP.view model

        AceSlide ->
            SL.view model

        _ ->
            -- 19
            GA.view model
