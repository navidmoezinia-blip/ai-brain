# UTMB Emergency Department Note — template reference

Canonical field map for Stage 5 NOTE output. This is the Epic SmartPhrase
skeleton (dot-phrase codes), not a real patient — safe to keep verbatim.
If Navid says the template changed, re-paste the current dot-phrase version
and update this file; it's the authority STAGE 5's three-way split is built
against.

```
UTMB Emergency Department Note

Patient Name: @NAME@
Date of Birth: @DOB@ @AGE@ @SEX@
Treatment Room: @CERMSGREFRESH(273464)@
Medical Record Number: @MRN@
Primary Care Physician: @PCP@

Patient Escorted by:  @DBLINK(EPT,10363,1)@
Mode of Arrival: @DBLINK(EPT,490,1)@
EMS Treatment Prior to ED Arrival:
@FLOWOB2(601920)@
@FLOWOB2(604070)@

Travel and Exposure Screening:
@FLOW2(36200000139)@
@FLOW2(36200000117)@


Chief Complaint:
@CHIEFCOMPLAINT@

History of Present Illness:
@HPISEC@
@SFHPI@
{Is there a mental health component to today's visit?:13583}

Past Medical History/Immunizations:
@PMH@
@FLOWOB2(607020)@
@FLOWOB2(611350)@

Allergies:
@ALLERGY@

Past Social History:
@EDSHIS@

Past Surgical History:
@SURGICALHX@

Review of Systems:
@UTMBREVIEWOFSYSTEMSBYAGE@

Physical Exam:
@PESEC@
@EDTRIAGEVITALS@
@PHYSEXAM@

Radiology:
@EDRADRESULTS@

Lab Results:
@EDLABRESULTS@


EKG:
If EKG completed, see Procedure Note.

Orders and Treatments:
@ORDERSENC@
@ENCMEDSHORT@

First Provider Eval:
@EDFIRSTPROVIDEREVAL@

@ADMISSIONCARE@

ED COURSE
@EDCOURSE@

@RESULTSEC@

Procedures:
@PROCDOC@

MDM:
@APSEC@
@MDM2023@
[MDM risk help text - blue, disappears on sign]

Flowsheet Documentation:
[flowsheet FLOWOB2 pulls]

Scoring Tools:
@UTMBABCD2@ @UTMBCHADS2@ @UTMBCHA2DS2VASC@ @UTMBCURB65@ @UTMBGCS@
@UTMBHEARTSCORE@ @UTMBLRINEC@ @UTMBNEXUS@ @UTMBPORTSCORE@ @UTMBSFSR@
@UTMBPERC@ @UTMBNEWORLEANS@ @UTMBCANCTT@ @UTMBPARC@ @UTMBPECARN@ @UTMBPAS@

Disposition/Condition:
@EDDISPO@

Discharge Medications:
@DISCHARGE@

Follow-up:
@EDFU@

Electronically signed by:
```

## Field disposition (what Stage 5 actually does with each)

**FREE-TEXT — he writes it, I draft it from what's actually been given:**
`@HPISEC@`/`@SFHPI@` (HPI), `@PESEC@`/`@PHYSEXAM@` (exam), `@APSEC@`/`@MDM2023@`
(assessment & plan / MDM), `@EDCOURSE@`/`@RESULTSEC@` (course), `@PROCDOC@`
(procedures).

**FILTERED HISTORY — replaces Epic's raw autopop, doesn't sit beside it or go
silent.** Same high-yield filter as PRIORS at Stage 1, written as short
chart-ready prose in place of the blue field:
`@PMH@`, `@SURGICALHX@`, `@ALLERGY@`, `@EDSHIS@` (social), family history when
pertinent, `@UTMBREVIEWOFSYSTEMSBYAGE@` (ROS).

**UNTOUCHED — pure Epic autopop, nothing to filter in a discrete value:**
identifiers (`@NAME@`/`@DOB@`/`@MRN@`/`@PCP@` — never echoed regardless),
arrival/EMS (`@DBLINK@`, `@FLOWOB2@` triage pulls), exposure screening,
chief complaint checkbox, `@EDTRIAGEVITALS@`, `@EDRADRESULTS@`,
`@EDLABRESULTS@`, `@ORDERSENC@`, `@ENCMEDSHORT@`, `@EDFIRSTPROVIDEREVAL@`,
the scoring-tool calculators, `@EDDISPO@` (discrete picker — reasoning goes
in MDM instead), `@DISCHARGE@`, `@EDFU@`.
