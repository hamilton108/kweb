module PersonInfo.Update exposing (update)

-- import Common.ModalDialog as DLG

import Common.Misc as M
import PersonInfo.Commands as C
import PersonInfo.Model exposing (Model, emptyNextOfKin)
import PersonInfo.Types exposing (Msg(..), TabCategory(..))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop _ ->
            ( model, Cmd.none )

        InitDataFetched (Ok s) ->
            ( { model
                | personalia = Just s.personalia
                , employments = s.employments
                , contactInfo = Just s.contactInfo
                , economy = Just s.economy
                , nextOfKin = s.nextOfKin
                , nextOfKinShadow = emptyNextOfKin -- s.nextOfKin.kinId
                , competence = s.competence
                , hourbankstat = Just s.hourbankstat
                , hourbankdetails = s.hourbankdetail
              }
            , Cmd.none
            )

        InitDataFetched (Err s) ->
            Debug.log (M.httpErr2str s)
                ( model, Cmd.none )

        TabChanged index ->
            ( { model | tabIndex = index }, Cmd.none )

        ContactInfoChanged index s ->
            case model.contactInfo of
                Nothing ->
                    ( model, Cmd.none )

                Just ci ->
                    let
                        cix =
                            case index of
                                1 ->
                                    { ci | address = s }

                                2 ->
                                    { ci | address2 = s }

                                3 ->
                                    { ci | postCode = s }

                                4 ->
                                    { ci | place = s }

                                5 ->
                                    { ci | country = s }

                                6 ->
                                    { ci | tlfPrivate = s }

                                7 ->
                                    { ci | tlfWork = s }

                                8 ->
                                    { ci | mobile = s }

                                9 ->
                                    { ci | email = s }

                                10 ->
                                    { ci | email2 = s }

                                _ ->
                                    ci
                    in
                    ( { model | contactInfo = Just cix }, Cmd.none )

        EconomyInfoChanged index s ->
            case model.economy of
                Nothing ->
                    ( model, Cmd.none )

                Just ei ->
                    let
                        eix =
                            case index of
                                1 ->
                                    { ei | skatteKommune = s }

                                2 ->
                                    { ei | ansettelsesTypeNavn = s }

                                3 ->
                                    { ei | avgiftSone = 1 }

                                4 ->
                                    { ei | startDato = s }

                                5 ->
                                    { ei | sluttDato = s }

                                _ ->
                                    { ei | fagforening = s }
                    in
                    ( { model | economy = Just eix }, Cmd.none )

        MottaSMSChanged ->
            case model.contactInfo of
                Nothing ->
                    ( model, Cmd.none )

                Just ci ->
                    let
                        cix =
                            { ci | receiveSms = not ci.receiveSms }
                    in
                    ( { model | contactInfo = Just cix }, Cmd.none )

        VikarChanged ->
            case model.economy of
                Nothing ->
                    ( model, Cmd.none )

                Just ci ->
                    let
                        cix =
                            { ci | vikar = not ci.vikar }
                    in
                    ( { model | economy = Just cix }, Cmd.none )

        UpdateContactInfo ->
            case model.contactInfo of
                Nothing ->
                    ( model, Cmd.none )

                Just ci ->
                    ( model, C.updateContactInfo model.userId ci )

        ContactInfoUpdated (Ok _) ->
            ( model, Cmd.none )

        ContactInfoUpdated (Err s) ->
            Debug.log (M.httpErr2str s)
                ( model, Cmd.none )

        NextOfKinChanged index s ->
            let
                shadow =
                    model.nextOfKinShadow

                cix =
                    case index of
                        1 ->
                            { shadow | navn = s }

                        2 ->
                            { shadow | relasjon = s }

                        3 ->
                            { shadow | adresse = s }

                        4 ->
                            { shadow | adresse2 = s }

                        5 ->
                            { shadow | tlf = s }

                        6 ->
                            { shadow | postNr = s }

                        _ ->
                            { shadow | postSted = s }
            in
            ( { model | nextOfKinShadow = cix }, Cmd.none )

        AddNextOfKin ->
            ( model, C.addNextOfKin model.userId model.nextOfKinShadow )

        NextOfKinAdded (Ok s) ->
            let
                shadow =
                    model.nextOfKinShadow

                newOid =
                    Maybe.withDefault -1 s.oid

                newKin =
                    { shadow | kinId = newOid }
            in
            Debug.log (Debug.toString s)
                ( { model
                    | nextOfKin = newKin :: model.nextOfKin
                    , nextOfKinShadow = emptyNextOfKin
                  }
                , Cmd.none
                )

        NextOfKinAdded (Err s) ->
            Debug.log (M.httpErr2str s)
                ( model, Cmd.none )

        EditNextOfKin nok ->
            ( { model
                | nextOfKinShadow = nok
                , isEditMode = True
              }
            , Cmd.none
            )

        UpdateNextOfKin ->
            ( { model
                | isEditMode = False
              }
            , C.updateNextOfKin model.userId model.nextOfKinShadow
            )

        NextOfKinUpdated (Ok _) ->
            let
                replaceFn shadow x =
                    if x.kinId == shadow.kinId then
                        shadow

                    else
                        x

                newList =
                    List.map (replaceFn model.nextOfKinShadow) model.nextOfKin
            in
            ( { model
                | nextOfKinShadow = emptyNextOfKin
                , nextOfKin = newList
              }
            , Cmd.none
            )

        NextOfKinUpdated (Err s) ->
            Debug.log (M.httpErr2str s)
                ( model, Cmd.none )

        DeleteNextOfKin nok ->
            ( model, C.deleteNextOfKin model.userId nok )

        NextOfKinDeleted (Ok s) ->
            let
                kinId =
                    Maybe.withDefault -1 s.oid

                newList =
                    List.filter (\t -> t.kinId /= kinId) model.nextOfKin
            in
            ( { model | nextOfKin = newList }, Cmd.none )

        NextOfKinDeleted (Err _) ->
            ( model, Cmd.none )

        CancelNextOfKin ->
            ( { model
                | isEditMode = False
                , nextOfKinShadow = emptyNextOfKin
              }
            , Cmd.none
            )



-- ( DLG.errorAlert Nothing "DataFetched Error:" s model, Cmd.none )
