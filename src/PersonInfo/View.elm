module PersonInfo.View exposing (view)

{- }
   ( colClass
   , colClass2A
   , colClass2B
   , compToTableRow
   , competenceTable
   , contactInfo
   , economyInfo
   , empToTableRow
   , employmentTable
   , emptyTab
   , formCheck
   , formGroup
   , formGroup2
   , hbankdetailToTableRow
   , hourbankTable
   , ml
   , nextOfKinTable
   , nextOfKindInfo
   , num
   , tabHeader1
   , tabHeader2
   , tabHeader3
   , tabHeader4
   , tabItem
   , tabPane
   , tx
   , view
   )
-}

import Common.Buttons as BTN
import Common.Misc exposing (getLangValue)
import Html as H
import Html.Attributes as A
import Html.Events as E
import PersonInfo.Model exposing (Language, Model)
import PersonInfo.Types
    exposing
        ( Competence
        , ContactInfo
        , EconomyInfo
        , Employment
        , HourbankDetail
        , HourbankStat
        , Msg(..)
        , NextOfKin
        , Personalia
        )


colClass : String
colClass =
    "col-md-6"


colClass2A : String
colClass2A =
    "col-md-4"


colClass2B : String
colClass2B =
    "col-md-8"


tx : String
tx =
    "text"


ml : String
ml =
    "email"


num : String
num =
    "number"


formCheck : String -> Bool -> Msg -> H.Html Msg
formCheck label isChecked event =
    let
        checkBoxInput =
            if isChecked == True then
                H.input [ E.onClick event, A.id label, A.type_ "checkbox", A.class "form-check-input", A.attribute "checked" "checked" ] []

            else
                H.input [ E.onClick event, A.id label, A.type_ "checkbox", A.class "form-check-input" ] []
    in
    H.div [ A.class colClass ]
        [ H.div [ A.class "form-check form-check-inline" ]
            [ checkBoxInput
            , H.label [ A.attribute "for" label, A.class "form-check-label" ] [ H.text label ]
            ]
        ]


formGroup : String -> String -> String -> (String -> Msg) -> H.Html Msg
formGroup label inputType value event =
    H.div [ A.class colClass ]
        [ H.div [ A.class "form-group" ]
            [ H.label [] [ H.text label ]
            , H.input [ E.onInput event, A.type_ inputType, A.class "form-control", A.value value ] []
            ]
        ]


formGroup2 : String -> String -> String -> (String -> Msg) -> String -> String -> String -> (String -> Msg) -> H.Html Msg
formGroup2 label inputType value event label2 inputType2 value2 event2 =
    H.div
        [ A.class colClass ]
        [ H.div
            [ A.class "row" ]
            [ H.div
                [ A.class colClass2A ]
                [ H.div
                    [ A.class "form-group" ]
                    [ H.label
                        []
                        [ H.text label ]
                    , H.input
                        [ A.value value, E.onInput event, A.type_ inputType, A.class "form-control" ]
                        []
                    ]
                ]
            , H.div
                [ A.class colClass2B ]
                [ H.div
                    [ A.class "form-group" ]
                    [ H.label
                        []
                        [ H.text label2 ]
                    , H.input
                        [ A.value value2, E.onInput event2, A.type_ inputType2, A.style "width" "98%", A.class "form-control" ]
                        []
                    ]
                ]
            ]
        ]




compToTableRow : Competence -> H.Html Msg
compToTableRow comp =
    let
        toDate =
            Maybe.withDefault "-" comp.toDate
    in
    H.tr []
        [ H.td [] [ H.text comp.competenceName ]
        , H.td [] [ H.text comp.description ]
        , H.td [] [ H.text toDate ]
        , H.td [] [ H.text comp.mustCheck ]
        ]


personaliaInfo : Language -> Personalia -> String
personaliaInfo lang p =
    let
        personalia =
            getLangValue "personalia" lang

        lonnsnr =
            getLangValue "lonnsnr" lang

        fodselsdato =
            getLangValue "fodselsdato" lang
    in
    --"Personalia: " ++ p.lastName ++ ", " ++ p.firstName ++ ", lønnsnr: " ++ p.salaryNr ++ ", fødselsdato: " ++ p.birthDate
    personalia ++ ": " ++ p.lastName ++ ", " ++ p.firstName ++ ", " ++ lonnsnr ++ ": " ++ p.salaryNr ++ ", " ++ fodselsdato ++ ": " ++ p.birthDate


competenceTable : Language -> Maybe Personalia -> List Competence -> H.Html Msg
competenceTable lang personalia comps =
    let
        l_komp =
            getLangValue "kompetanse" lang

        l_besk =
            getLangValue "beskrivelse" lang

        l_utlop =
            getLangValue "utlopsdato" lang

        l_sjekk =
            getLangValue "maa_sjekkes" lang

        personaliaString =
            case personalia of
                Nothing ->
                    "-"

                Just p ->
                    personaliaInfo lang p

        compRows =
            List.map compToTableRow comps
    in
    H.div []
        [ H.text personaliaString
        , H.table [ A.class "table" ]
            [ H.thead []
                [ H.tr []
                    [ H.th [ A.attribute "scope" "col" ]
                        [ H.text l_komp ]
                    , H.th [ A.attribute "scope" "col" ]
                        [ H.text l_besk ]
                    , H.th [ A.attribute "scope" "col" ]
                        [ H.text l_utlop ]
                    , H.th [ A.attribute "scope" "col" ]
                        [ H.text l_sjekk ]
                    ]
                ]
            , H.tbody [] compRows
            ]
        ]


hbankdetailToTableRow : HourbankDetail -> H.Html Msg
hbankdetailToTableRow hbank =
    let
        toKtext =
            Maybe.withDefault "-" hbank.correctiontext
    in
    H.tr []
        [ H.td [] [ H.text hbank.valuedate ]
        , H.td [] [ H.text hbank.amount ]
        , H.td [] [ H.text hbank.hourbanktype ]
        , H.td [] [ H.text toKtext ]
        , H.td [] [ H.text hbank.depwgname ]
        ]


hourbankTable : Language -> Maybe HourbankStat -> List HourbankDetail -> H.Html Msg
hourbankTable lang hourbankstat hbanks =
    let
        personaliaString =
            case hourbankstat of
                Nothing ->
                    "-"

                Just hb ->
                    getLangValue "saldo" lang ++ ":   " ++ hb.allhourbanktotal ++ "       \n" ++ getLangValue "avsp_saldo" lang ++ ": " ++ hb.allhourbankavspas ++ getLangValue "disp_avik_saldo" lang ++ "            \n" ++ hb.allhourbankdisp

        hbankRows =
            List.map hbankdetailToTableRow hbanks
    in
    H.div []
        [ H.pre [] [ H.text personaliaString ]
        , H.table [ A.class "table" ]
            [ H.thead []
                [ H.tr []
                    [ H.th [ A.attribute "scope" "col" ]
                        [ H.text (getLangValue "dato" lang) ]
                    , H.th [ A.attribute "scope" "col" ]
                        [ H.text (getLangValue "timer" lang) ]
                    , H.th [ A.attribute "scope" "col" ]
                        [ H.text (getLangValue "timebank_type" lang) ]
                    , H.th [ A.attribute "scope" "col" ]
                        [ H.text (getLangValue "korreksjonstekst" lang) ]
                    , H.th [ A.attribute "scope" "col" ]
                        [ H.text (getLangValue "v_a" lang) ]
                    ]
                ]
            , H.tbody [] hbankRows
            ]
        ]


empToTableRow : Employment -> H.Html Msg
empToTableRow emp =
    let
        toDate =
            Maybe.withDefault "-" emp.toDate
    in
    H.tr []
        [ H.td [] [ H.text emp.avd, H.text " / ", H.text emp.yrk ]
        , H.td [] [ H.text emp.fromDate ]
        , H.td [] [ H.text toDate ]
        , H.td [] [ H.text emp.stKode ]
        , H.td [] [ H.text emp.fraction ]
        , H.td [] [ H.text emp.baseHours ]

        {-
           , H.td [] [ H.text emp.hoursPrWeek ]
           , H.td [] [ H.text "-" ]
           , H.td [] [ H.text "-" ]
        -}
        ]


employmentTable : Language -> Maybe Personalia -> List Employment -> H.Html Msg
employmentTable lang personalia emps =
    let
        personaliaString =
            case personalia of
                Nothing ->
                    "-"

                Just p ->
                    personaliaInfo lang p

        -- "Personalia: " ++ p.lastName ++ ", " ++ p.firstName ++ ", lønnsnr: " ++ p.salaryNr ++ ", fødselsdato: " ++ p.birthDate
        empRows =
            List.map empToTableRow emps
    in
    H.div []
        [ H.text personaliaString
        , H.table [ A.class "table" ]
            [ H.thead []
                [ H.tr []
                    [ H.th [ A.attribute "scope" "col" ]
                        [ H.text (getLangValue "v_a" lang) ]
                    , H.th [ A.attribute "scope" "col" ]
                        [ H.text (getLangValue "fra" lang) ]
                    , H.th [ A.attribute "scope" "col" ]
                        [ H.text (getLangValue "til" lang) ]
                    , H.th [ A.attribute "scope" "col" ]
                        [ H.text (getLangValue "st_kode" lang) ]
                    , H.th [ A.attribute "scope" "col" ]
                        [ H.text (getLangValue "brok" lang) ]
                    , H.th [ A.attribute "scope" "col" ]
                        [ H.text (getLangValue "basis_timer" lang) ]

                    {-
                       , H.th [ A.attribute "scope" "col" ]
                           [ H.text "Timer uke" ]

                       , H.th [ A.attribute "scope" "col" ]
                           [ H.text "Basislønn" ]
                       , H.th [ A.attribute "scope" "col" ]
                           [ H.text "Årslønn" ]

                    -}
                    ]
                ]
            , H.tbody [] empRows
            ]
        ]


defaultContactInfo : ContactInfo
defaultContactInfo =
    { address = ""
    , address2 = ""
    , postCode = ""
    , place = ""
    , country = ""
    , tlfPrivate = ""
    , tlfWork = ""
    , mobile = ""
    , email = ""
    , email2 = ""
    , receiveSms = True
    }


contactInfo : Language -> Maybe ContactInfo -> H.Html Msg
contactInfo lang ci =
    let
        x =
            Maybe.withDefault defaultContactInfo ci
    in
    H.div [ A.class "container" ]
        [ H.form
            []
            [ H.div [ A.class "row" ]
                [ formGroup (getLangValue "adr" lang) tx x.address (ContactInfoChanged 1)
                , formGroup (getLangValue "tlf_privat" lang) tx x.tlfPrivate (ContactInfoChanged 6)
                ]
            , H.div [ A.class "row" ]
                [ formGroup (getLangValue "adr_2" lang) tx x.address2 (ContactInfoChanged 2)
                , formGroup (getLangValue "tlf_arb" lang) tx x.tlfWork (ContactInfoChanged 7)
                ]
            , H.div [ A.class "row" ]
                [ formGroup2 (getLangValue "postnr" lang) tx x.postCode (ContactInfoChanged 3) (getLangValue "sted" lang) tx x.place (ContactInfoChanged 4)
                , formGroup (getLangValue "mobil" lang) tx x.mobile (ContactInfoChanged 8)
                ]
            , H.div [ A.class "row" ]
                [ formGroup (getLangValue "land" lang) tx x.country (ContactInfoChanged 5)
                , formGroup (getLangValue "epost" lang) ml x.email (ContactInfoChanged 9)
                ]
            , H.div [ A.class "row" ]
                [ formCheck (getLangValue "motta_sms" lang) x.receiveSms MottaSMSChanged
                , formGroup (getLangValue "epost_2" lang) ml x.email2 (ContactInfoChanged 10)
                ]
            ]
        , BTN.button BTN.Success (getLangValue "lagre" lang) True UpdateContactInfo
        ]


defaultEconomyInfo : EconomyInfo
defaultEconomyInfo =
    { skatteKommune = ""
    , ansettelsesTypeNavn = ""
    , avgiftSone = 2
    , vikar = True
    , startDato = ""
    , sluttDato = ""
    , fagforening = ""
    }


economyInfo : Language -> Maybe EconomyInfo -> H.Html Msg
economyInfo lang ei =
    let
        x =
            Maybe.withDefault defaultEconomyInfo ei
    in
    H.div [ A.class "container" ]
        [ H.form []
            [ H.div [ A.class "row" ]
                [ formGroup (getLangValue "skattekommune" lang) tx x.skatteKommune (EconomyInfoChanged 1)
                ]
            , H.div [ A.class "row" ]
                [ formGroup (getLangValue "ans_forhold" lang) tx x.ansettelsesTypeNavn (EconomyInfoChanged 2)
                , formGroup (getLangValue "avg_sone" lang) tx (String.fromInt x.avgiftSone) (EconomyInfoChanged 3)
                ]
            , H.div [ A.class "row" ]
                [ formCheck (getLangValue "vikar" lang) x.vikar VikarChanged
                , formGroup (getLangValue "pensjonskasse" lang) tx "-" Noop
                ]
            , H.div [ A.class "row" ]
                [ formGroup (getLangValue "begynt" lang) tx x.startDato (EconomyInfoChanged 4)
                , formGroup (getLangValue "fagforening" lang) tx x.fagforening (EconomyInfoChanged 5)
                ]
            , H.div [ A.class "row" ]
                [ formGroup (getLangValue "sluttet" lang) tx x.sluttDato (EconomyInfoChanged 6)
                ]
            ]
        ]


nextOfKinRow : String -> String -> NextOfKin -> H.Html Msg
nextOfKinRow endre_txt slett_txt nk =
    H.tr []
        [ H.td []
            [ BTN.button BTN.Success endre_txt True (EditNextOfKin nk)
            ]
        , H.td []
            [ BTN.button BTN.Danger slett_txt True (DeleteNextOfKin nk)
            ]
        , H.td [] [ H.text nk.navn ]
        , H.td [] [ H.text nk.relasjon ]
        , H.td [] [ H.text nk.tlf ]
        , H.td [] [ H.text nk.adresse ]
        , H.td [] [ H.text nk.adresse2 ]
        , H.td [] [ H.text nk.postNr ]
        , H.td [] [ H.text nk.postSted ]
        ]


nextOfKinTable : Language -> List NextOfKin -> H.Html Msg
nextOfKinTable lang nox =
    let
        endre_txt =
            getLangValue "endre" lang

        slett_txt =
            getLangValue "slett" lang

        rows =
            List.map (nextOfKinRow endre_txt slett_txt) nox
    in
    H.table [ A.class "table" ]
        [ H.thead []
            [ H.tr []
                [ H.th [ A.attribute "scope" "col" ]
                    []
                , H.th [ A.attribute "scope" "col" ]
                    []
                , H.th [ A.attribute "scope" "col" ]
                    [ H.text (getLangValue "navn" lang) ]
                , H.th [ A.attribute "scope" "col" ]
                    [ H.text (getLangValue "relasjon" lang) ]
                , H.th [ A.attribute "scope" "col" ]
                    [ H.text (getLangValue "tlf" lang) ]
                , H.th [ A.attribute "scope" "col" ]
                    [ H.text (getLangValue "adr" lang) ]
                , H.th [ A.attribute "scope" "col" ]
                    [ H.text (getLangValue "adr_2" lang) ]
                , H.th [ A.attribute "scope" "col" ]
                    [ H.text (getLangValue "postnr" lang) ]
                , H.th [ A.attribute "scope" "col" ]
                    [ H.text (getLangValue "poststed" lang) ]
                ]
            ]
        , H.tbody [] rows
        ]


nextOfKindInfo : Language -> List NextOfKin -> NextOfKin -> Bool -> H.Html Msg
nextOfKindInfo lang nok shadow isEditMode =
    let
        saveMsg =
            if isEditMode == True then
                UpdateNextOfKin

            else
                AddNextOfKin
    in
    H.div [ A.class "container" ]
        [ H.form []
            [ H.div [ A.class "row" ]
                [ formGroup (getLangValue "navn" lang) tx shadow.navn (NextOfKinChanged 1)
                , formGroup (getLangValue "adr" lang) tx shadow.adresse (NextOfKinChanged 3)
                ]
            , H.div [ A.class "row" ]
                [ formGroup (getLangValue "relasjon" lang) tx shadow.relasjon (NextOfKinChanged 2)
                , formGroup (getLangValue "adr_2" lang) tx shadow.adresse2 (NextOfKinChanged 4)
                ]
            , H.div [ A.class "row" ]
                [ formGroup (getLangValue "tlf" lang) tx shadow.tlf (NextOfKinChanged 5)
                , formGroup2 (getLangValue "postnr" lang) tx shadow.postNr (NextOfKinChanged 6) (getLangValue "sted" lang) tx shadow.postSted (NextOfKinChanged 7)
                ]
            ]
        , BTN.button BTN.Success (getLangValue "lagre" lang) True saveMsg
        , BTN.button BTN.Danger (getLangValue "avbryt" lang) True CancelNextOfKin
        , nextOfKinTable lang nok
        ]


tabItem : String -> String -> Int -> H.Html Msg
tabItem href title index =
    H.a [ E.onClick (TabChanged index), A.class "dropdown-item", A.attribute "data-toggle" "tab", A.href href, A.attribute "role" "tab" ]
        [ H.text title ]


tabPane : String -> Int -> Int -> H.Html Msg -> H.Html Msg
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


tabHeader1 : Language -> String
tabHeader1 lang =
    getLangValue "kompetanse" lang


tabHeader2 : Language -> String
tabHeader2 lang =
    getLangValue "stillinger" lang



--"Stillinger"


tabHeader3 : Language -> String
tabHeader3 lang =
    getLangValue "kontaktinfo" lang



--"Kontaktinformasjon"


tabHeader4 : Language -> String
tabHeader4 lang =
    getLangValue "okonomi" lang



--"Ansettelse/økonomi"


tabHeader5 : Language -> String
tabHeader5 lang =
    getLangValue "paarorende" lang



--"Pårørende"


tabHeader6 : Language -> String
tabHeader6 lang =
    getLangValue "timebank" lang



--"Timebank"


view : Model -> H.Html Msg
view model =
    let
        tabTitle =
            case model.tabIndex of
                1 ->
                    tabHeader1 model.lang

                2 ->
                    tabHeader2 model.lang

                3 ->
                    tabHeader3 model.lang

                4 ->
                    tabHeader4 model.lang

                5 ->
                    tabHeader5 model.lang

                _ ->
                    tabHeader6 model.lang
    in
    H.div [ A.class "container-fluid  container-fluid--left-offset" ]
        [ H.div [ A.class "page-header" ]
            [ H.ul [ A.class "nav kdo-header-dropdown", A.attribute "role" "tablist" ]
                [ H.li [ A.class "nav-item dropdown" ]
                    [ H.a
                        [ A.class "nav-link dropdown-toggle"
                        , A.attribute "data-toggle" "dropdown"
                        , A.href "#"
                        , A.attribute "role" "button"
                        , A.attribute "aria-haspopup" "true"
                        , A.attribute "aria-expanded" "false"
                        ]
                        [ H.text tabTitle
                        , H.div [ A.class "dropdown-menu" ]
                            [ tabItem "#tab1" (tabHeader1 model.lang) 1
                            , tabItem "#tab2" (tabHeader2 model.lang) 2
                            , tabItem "#tab3" (tabHeader3 model.lang) 3
                            , tabItem "#tab4" (tabHeader4 model.lang) 4
                            , tabItem "#tab5" (tabHeader5 model.lang) 5
                            , tabItem "#tab6" (tabHeader6 model.lang) 6
                            ]
                        ]
                    ]
                ]
            ]
        , H.div [ A.class "row" ]
            [ H.div [ A.class "col-sm-10" ]
                [ H.div [ A.class "tab-content" ]
                    [ tabPane "tab1" 1 model.tabIndex (competenceTable model.lang model.personalia model.competence)
                    , tabPane "tab2" 2 model.tabIndex (employmentTable model.lang model.personalia model.employments)
                    , tabPane "tab3" 3 model.tabIndex (contactInfo model.lang model.contactInfo)
                    , tabPane "tab4" 4 model.tabIndex (economyInfo model.lang model.economy)
                    , tabPane "tab5" 5 model.tabIndex (nextOfKindInfo model.lang model.nextOfKin model.nextOfKinShadow model.isEditMode)
                    , tabPane "tab6" 6 model.tabIndex (hourbankTable model.lang model.hourbankstat model.hourbankdetails)
                    ]
                ]
            ]
        ]
