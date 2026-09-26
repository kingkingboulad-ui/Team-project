"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Lang = "en" | "ar";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
}

/*
|--------------------------------------------------------------------------
| TRANSLATIONS
|--------------------------------------------------------------------------
| Keep your en and ar translations here.
|
| IMPORTANT:
| Use flat keys:
|
| "common.back": "Back"
|
| NOT:
|
| common: {
|   back: "Back"
| }
|
*/

const translations: Record<Lang, Record<string, string>> = {
  // =========================================================
  // ENGLISH
  // =========================================================
  en: {
    // =======================================================
    // NAVBAR
    // =======================================================

    home: "Home",
    nurseConnect: "NurseConnect",
    findNurse: "Find a Nurse",
    forNurses: "For Nurses",
    aiAssistant: "AI Care Assistant",
    arabic: "عربي",
    english: "English",
    signIn: "Sign In",
    getStarted: "Get Started",

    // =======================================================
    // HERO
    // =======================================================

    trustedByFamilies: "Trusted by 10,000+ families",

    trustedCareTitle: "Trusted Care,",
    trustedCareHighlight: "When You Need It.",

    professionalNursingCare: "Professional Nursing Care",

    expertNursesTitle: "Expert Nurses,",
    rightAtHome: "Right at Home.",

    careYouCanTrustEyebrow: "Care You Can Trust",

    yourHealthTitle: "Your Health,",
    ourPriority: "Our Priority.",

    trustedCareDescription:
      "Connect with qualified nurses and caregivers who are ready to provide the care you or your loved ones need at home.",

    professionalCareDescription:
      "Get compassionate and professional nursing care from qualified caregivers in the comfort of your home.",

    personalizedHealthcareDescription:
      "Personalized home healthcare designed around you and your loved ones, delivered by caring professionals.",

    findNurseHero: "Find a Nurse",
    imANurse: "I'm a Nurse",

    professionalNurseAlt:
      "Professional nurse providing home healthcare",

    previousSlide: "Previous slide",
    nextSlide: "Next slide",
    goToSlide: "Go to slide",

    registeredNurse: "Registered Nurse",
    visitConfirmed: "Visit Confirmed",
    todayAtTwo: "Today at 2:00 PM",

    familiesServed: "Families Served",
    verifiedNurses: "Verified Nurses",
    averageRating: "Average Rating",
    supportAvailable: "Support Available",

    // =======================================================
    // HERO SEARCH
    // =======================================================

    findYourIdealCaregiver: "Find your ideal caregiver",

    chooseCarePreferences:
      "Choose your care preferences and find the right professional for you.",

    careType: "Care Type",
    allCareTypes: "All Care Types",

    careSchedule: "Care Schedule",
    oneTimeVisit: "One-time Visit",
    recurringCare: "Recurring Care",
    fullSupport247: "24/7 Full Support",

    location: "Location",

    locationPlaceholder:
      "e.g. San Jose, Oakland, Tripoli...",

    findCare: "Find Care",

    // =======================================================
    // CARE CATEGORIES
    // =======================================================

    all: "All",
    elderlyCare: "Elderly Care",
    postSurgery: "Post-Surgery",
    medicationSupport: "Medication Support",
    dailyAssistance: "Daily Assistance",
    companionship: "Companionship",
    disabilitySupport: "Disability Support",
    palliativeCare: "Palliative Care",

    // =======================================================
    // AI CARE ASSISTANT
    // =======================================================

    notSureWhatCareYouNeed:
      "Not sure what care you need?",

    letOurAI: "Let our",

    aiCareAssistant: "AI Care Assistant",

    analyzeSymptoms:
      "analyze your symptoms and match you with the right nurse.",

    // =======================================================
    // HOW IT WORKS
    // =======================================================

    simpleProcess: "SIMPLE PROCESS",

    howNurseConnectWorks:
      "How NurseConnect Works",

    tellUsYourNeeds: "Tell Us Your Needs",

    tellUsYourNeedsDescription:
      "Share your care requirements, schedule, and location so we understand exactly what your family needs.",

    getMatchedInstantly:
      "Get Matched Instantly",

    getMatchedDescription:
      "Our AI reviews vetted, licensed nurses nearby and matches you with the best fit for your care and budget.",

    bookAndRelax: "Book & Relax",

    bookAndRelaxDescription:
      "Confirm your booking, message your nurse directly, and track every visit from your NurseConnect dashboard.",

    // =======================================================
    // AI MATCH
    // =======================================================

    poweredByAI: "Powered by AI",

    letAIHelp:
      "Let AI Help You Find the Right Care",

    aiMatchingDescription:
      "Answer a few quick questions about your care needs and our matching engine will surface licensed nurses nearby who fit your schedule, budget, and specialty requirements.",

    tryAIMatching: "Try AI Matching",

    aiMatchSummary: "AI Match Summary",

    aiMatchSummaryDescription:
      "Based on your answers, here's a caregiver profile tailored to your family's needs.",

    recommendedCareType:
      "Recommended Care Type",

    postSurgicalRecovery:
      "Post-Surgical Recovery",

    visitFrequency: "Visit Frequency",

    dailyMorningsPreferred:
      "Daily, Mornings Preferred",

    matchesNearby: "Matches Nearby",

    nursesAvailable: "12 Nurses Available",

    estimatedResponse:
      "Estimated Response",

    underTwoHours: "Under 2 hours",

    viewMyMatches: "View My Matches",

    // =======================================================
    // NURSES
    // =======================================================

    ourTeam: "Our Team",
    meetOurNurses: "Meet Our Nurses",
    viewAllNurses: "View All Nurses →",

    noNursesAvailable:
      "No registered nurses available at the moment.",

    generalHomeCare: "General / Home Care",

    available: "Available",
    bookNow: "Book Now",

    // =======================================================
    // CARE YOU CAN TRUST
    // =======================================================

    whyFamiliesChooseUs:
      "Why Families Choose Us",

    careYouCanTrust:
      "Care You Can Trust.",

    whyChooseDescription:
      "Every nurse on NurseConnect is verified, rated, and ready to provide the standard of care your family deserves.",

    backgroundVerified:
      "Background-Verified",

    backgroundVerifiedDescription:
      "Every nurse completes license verification, background checks, and reference screening before joining.",

    ratingsReviews: "Ratings & Reviews",

    ratingsReviewsDescription:
      "Real feedback from families helps you choose a caregiver with confidence, every time.",

    flexibleScheduling:
      "Flexible Scheduling",

    flexibleSchedulingDescription:
      "Book one-off visits, recurring care, or 24/7 support — whatever fits your family's routine.",

    secureMessaging:
      "Secure Messaging",

    secureMessagingDescription:
      "Coordinate directly with your nurse through encrypted, in-app messaging at every step.",

    securePayments:
      "Secure Payments",

    securePaymentsDescription:
      "Transparent pricing and protected payments, released only once care is confirmed.",

    licensedInsured:
      "Licensed & Insured",

    licensedInsuredDescription:
      "All caregivers are licensed professionals covered by liability insurance for your peace of mind.",

    // =======================================================
    // CTA
    // =======================================================

    readyToFindTrustedCare:
      "Ready to Find Trusted Care?",

    readyToFindDescription:
      "Join thousands of families who trust NurseConnect for compassionate, verified in-home nursing care.",

    getStartedToday:
      "Get Started Today",

    joinAsNurse:
      "Join as a Nurse",

    // =======================================================
    // READY TO START
    // =======================================================

    readyToStart: "Ready to Start?",

    readyToStartDescription:
      "Join thousands of nurses who have built rewarding careers through NurseConnect.",

    joinAsANurseToday:
      "Join as a Nurse Today",

    // =======================================================
    // FOOTER
    // =======================================================

    trustedByThousands:
      "Trusted by Thousands of Families",

    footerDescription:
      "Connecting families with trusted, licensed nurses for compassionate in-home care — whenever and wherever it's needed.",

    forPatients: "FOR PATIENTS",
    requestCare: "Request Care",
    howItWorks: "How It Works",

    forNursesFooter: "FOR NURSES",
    nurseDashboard: "Nurse Dashboard",
    howToApply: "How to Apply",
    nurseResources: "Nurse Resources",

    company: "COMPANY",
    aboutUs: "About Us",
    safetyTrust: "Safety & Trust",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    contactUs: "Contact Us",

    emergencySupport: "Emergency Support",
    available247: "AVAILABLE 24/7",

    allRightsReserved:
      "All rights reserved.",

    // =======================================================
    // GENERAL
    // =======================================================

    Find_your_ideal_caregiver:
      "Find your ideal caregiver",

    hourlyRate: "Hourly Rate",
    experience: "Experience",
    rating: "Rating",

    // =======================================================
    // FIND NURSE
    // =======================================================

    findANurse: "Find a Nurse",

    findNurseDescription:
      "Find qualified nurses who can provide the care you need.",

    findQualifiedNurses:
      "Find qualified nurses who can provide the care you need.",

    searchNurses: "Search nurses...",

    searchByNameSpecialtyLocation:
      "Search by name, specialty or location...",

    sort: "Sort",
    sortBy: "Sort By",

    topRated: "Top Rated",
    sortTopRated: "Sort: Top Rated",

    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",

    nameAZ: "Name: A-Z",
    mostExperienced: "Most Experienced",

    filters: "Filters",
    filterNurses: "Filter Nurses",

    refineSearch:
      "Refine your search based on rating, price, experience and location.",

    clearFilters: "Clear Filters",

    minRating: "Minimum Rating",
    minimumRating: "Minimum Rating",
    anyRating: "Any Rating",

    priceRange: "Price Range",
    anyPrice: "Any Price",

    under50: "Under $50 / hr",
    price50To65: "$50 - $65 / hr",
    above65: "Above $65",
    price65Plus: "$65+ / hr",

    experienceRange: "Experience",
    anyExperience: "Any Experience",

    oneToThreeYears: "1 - 3 years",
    experience1To3: "1 - 3 Years",

    threeToFiveYears: "3 - 5 years",
    experience3To5: "3 - 5 Years",

    fivePlusYears: "5+ years",
    experience5Plus: "5+ Years",

    locationFilter: "Location",
    locationExample: "e.g. Beirut",

    results: "Results",
    nursesFound: "nurses found",

    rate: "Rate",
    rateNurse: "Rate Nurse",

    outOfFiveStars:
      "out of 5 stars",

    feedbackReview:
      "Feedback / Review",

    optional: "Optional",

    writeExperience:
      "Write your experience with this nurse...",

    cancel: "Cancel",
    submitRating: "Submit Rating",

    loadingNurses:
      "Loading nurses...",

    failedToLoadNurses:
      "Failed to load nurses",

    errorConnectingBackend:
      "Error connecting to backend server",

    noNursesFound:
      "No nurses found",

    tryAnotherSearch:
      "Try another name, specialty, location, category or filter.",

    previous: "Previous",
    next: "Next",

    ratingSubmitted:
      "Your rating has been submitted successfully.",

    failedSubmitRating:
      "Failed to submit rating. Please make sure you are logged in.",

    nurse: "Nurse",

    // =======================================================
    // NURSE CARD
    // =======================================================

    nurseProfessional:
      "Nurse Professional",

    generalHealthcare:
      "General Healthcare",

    locationNotAvailable:
      "Location not available",

    yrsExperience:
      "yrs experience",

    experienceNotSpecified:
      "Experience not specified",

    profile: "Profile",
    book: "Book",

    // =======================================================
    // AUTH / PROFILE
    // =======================================================

    patient: "Patient",
    admin: "Admin",

    myProfile: "My Profile",
    nurseWorkspace: "Nurse Workspace",
    adminDashboard: "Admin Dashboard",
    systemSettings: "System Settings",
    signOut: "Sign Out",
    signedInAs: "Signed in as",

    welcomeBack: "Welcome Back",

    pleaseSignIn:
      "Please sign in to your account.",

    patientLogin: "Patient Login",
    nurseLogin: "Nurse Login",

    emailAddress: "Email Address",
    password: "Password",

    forgotPassword:
      "Forgot password?",

    rememberMe: "Remember me",

    signingIn: "Signing In...",

    orContinueWith:
      "or continue with",

    googleLoginUnavailable:
      "Google Login service is unavailable",

    dontHaveAccount:
      "Don't have an account?",

    wantToJoinNetwork:
      "Want to join our network?",

    loginError:
      "An error occurred while signing in. Please try again later.",

    googleLoginFailed:
      "Failed to sign in with Google",

    medicalStaffAlt:
      "Medical staff collaborating",

    compassionateCareTitle:
      "Compassionate care, professional connection.",

    compassionateCareDescription:
      "Streamlining communication and critical workflows for better patient outcomes.",

    // =======================================================
    // WHO NEEDS CARE
    // =======================================================

    whoNeedsCare:
      "Who needs care?",

    selectPrimaryPerson:
      "Select the primary person requiring nursing services to help us tailor the experience.",

    myself: "Myself",
    parent: "Parent",
    child: "Child",

    personWithDisability:
      "Person with disability",

    spousePartner:
      "Spouse / Partner",

    selectNurseToContinue:
      "Please select a nurse to continue your booking.",

    // =======================================================
    // WHEN & WHERE
    // =======================================================

    whenAndWhere: "When & Where",

    whenWhereDescription:
      "Tell us when and where you need nursing care.",

    startDate: "Start Date",
    careDuration: "Care Duration",
    selectDuration: "Select duration",

    oneHour: "1 Hour",
    twoHours: "2 Hours",
    fourHours: "4 Hours",
    eightHours: "8 Hours",
    twelveHours: "12 Hours",
    twentyFourHours: "24 Hours",

    careAddress: "Care Address",

    enterCareAddressPlaceholder:
      "Enter your care address",

    search: "Search",
    searching: "Searching...",

    addressSearchHint:
      "Enter your address and press Search or Enter.",

    careLocation: "Care Location",

    mapLocationHint:
      "You can also select a location directly on the map.",

    latitude: "Latitude",
    longitude: "Longitude",

    enterCareAddress:
      "Please enter a care address.",

    addressNotFound:
      "Address not found. Please try another address.",

    addressSearchError:
      "Something went wrong while searching for this address.",

    selectStartDate:
      "Please select a start date.",

    selectCareDuration:
      "Please select the care duration.",

    // =======================================================
    // COMMON
    // =======================================================

    "common.back": "Back",
    "common.continue": "Continue",

    // =======================================================
    // DESCRIBE NEEDS
    // =======================================================

    "describeNeeds.title":
      "Describe your needs",

    "describeNeeds.description":
      "Please provide details about the care needed so we can match you with the right nurse.",

    "describeNeeds.placeholder":
      "E.g. my mother is 82 years old and has difficulty walking. She needs help with daily medication management, getting around the house safely, and companionship a few times a week...",

    "describeNeeds.privacy":
      "I understand my information will be shared with matched nurses per our Privacy Policy.",

    // =======================================================
    // REVIEW
    // =======================================================

    "review.title":
      "Review & Submit",

    "review.description":
      "Please verify the details of your care request before submitting.",

    "review.preferredNurse":
      "Preferred nurse",

    "review.careFor":
      "Care for",

    "review.careType":
      "Care type",

    "review.startDate":
      "Start date",

    "review.duration":
      "Duration",

    "review.location":
      "Location",

    "review.notes":
      "Notes",

    "review.terms":
      "By submitting, you agree to our Terms of Service and Privacy Policy. Confirmation is typically provided within 24–48 hours.",

    "review.nurseRequired":
      "Preferred nurse is required. Please select a nurse first.",

    "review.submitError":
      "Something went wrong. Please try again.",

    "review.submitting":
      "Submitting...",

    "review.submit":
      "Submit Care Request →",

    "review.oneHour": "1 Hour",
    "review.twoHours": "2 Hours",
    "review.fourHours": "4 Hours",
    "review.eightHours": "8 Hours",
    "review.twelveHours": "12 Hours",
    "review.twentyFourHours": "24 Hours",

    // =======================================================
    // CONFIRMATION
    // =======================================================

    "confirmation.title":
      "Care Request Submitted!",

    "confirmation.description":
      "We're matching you with the best suitable nurse in your area. You'll receive a confirmation shortly.",

    "confirmation.preferredNurse":
      "Preferred Nurse",

    "confirmation.careFor":
      "Care For",

    "confirmation.careType":
      "Care Type",

    "confirmation.startDate":
      "Start Date",

    "confirmation.duration":
      "Duration",

    "confirmation.location":
      "Location",

    "confirmation.oneHour":
      "1 Hour",

    "confirmation.twoHours":
      "2 Hours",

    "confirmation.fourHours":
      "4 Hours",

    "confirmation.eightHours":
      "8 Hours",

    "confirmation.twelveHours":
      "12 Hours",

    "confirmation.twentyFourHours":
      "24 Hours",

    "confirmation.dashboard":
      "View My Dashboard",

    "confirmation.browseNurses":
      "Browse Nurses",

    // =======================================================
    // ABOUT
    // =======================================================

    "about.ourStory":
      "Our Story",

    "about.trustedCare":
      "Trusted Care Starts With Trusted People",

    "about.heroDescription":
      "NurseConnect was created to bridge the gap between families looking for trusted home care and licensed nurses ready to provide it, with a simpler experience and greater confidence for everyone.",

    "about.familiesServed":
      "Families Served",

    "about.verifiedNurses":
      "Verified Nurses",

    "about.citiesCovered":
      "Cities Covered",

    "about.averageRating":
      "Average Rating",

    "about.howWeStarted":
      "How We Started",

    "about.builtByANurse":
      "Built by a nurse who lived the problem",

    "about.storyParagraph1":
      "NurseConnect started in 2023 after one of our co-founders, a former ICU nurse, spent weeks trying to find reliable home care for her grandmother. Between unreliable referrals, unclear credentials, and no easy way to see other families' experiences, the process took much longer than it should have.",

    "about.storyParagraph2":
      "We built the platform we wished existed: every nurse is verified for their license and background, with real reviews from real families and a simple way to book, communicate, and manage care in one place.",

    "about.foundedIn":
      "Founded in San Francisco",

    "about.licensedChecked":
      "Licensed & background-checked",

    "about.supportAvailable":
      "Support available for families and nurses, every day of the year",

    "about.whatWeStandFor":
      "What We Stand For",

    "about.ourValues":
      "Our Values",

    "about.compassionFirst":
      "Compassion First",

    "about.compassionDescription":
      "Every matching process starts with compassion. We look for nurses who treat patients like people, not simply as a list of tasks.",

    "about.trustSafety":
      "Trust & Safety",

    "about.trustSafetyDescription":
      "Every nurse on the platform goes through license verification, background checks, and reference screening.",

    "about.communityDriven":
      "Community-Driven",

    "about.communityDescription":
      "Real family ratings and reviews help us maintain and continuously improve the quality of our network.",

    "about.simpleByDesign":
      "Simple by Design",

    "about.simpleDescription":
      "Finding trusted care should not be complicated. We bring booking, communication, and care management together in one place.",

    "about.leadership":
      "Leadership",

    "about.meetTheTeam":
      "Meet the Team",

    "about.coFounderCEO":
      "Co-Founder & CEO",

    "about.danaBio":
      "A former ICU nurse who experienced firsthand how difficult it can be for families to find reliable home care.",

    "about.coFounderCTO":
      "Co-Founder & CTO",

    "about.marcusBio":
      "Builds the matching and scheduling systems that connect families with the right nurses efficiently.",

    "about.headOfNursePartnerships":
      "Head of Nurse Partnerships",

    "about.privacyBio":
      "Leads nurse onboarding and credential verification to help maintain a trusted professional network.",

    "about.joinUs":
      "Join Us in Redefining Home Care",

    "about.ctaDescription":
      "Whether you need care for a loved one or want to join our nurse network, we'd be happy to have you with us.",

    "about.getStarted":
      "Get Started",

    "about.joinAsNurse":
      "Join as a Nurse",

	  "safety.title": "Safety & Trust",
"safety.heroDescription":
  "Your safety and peace of mind are at the heart of everything we do.",

"safety.ourCommitment": "Our Commitment to Safety",
"safety.commitmentDescription":
  "We work to create a trusted and respectful care experience for every family.",

"safety.verifiedNurses": "Verified Nurses",
"safety.verifiedNursesDesc":
  "We review nurse profiles and professional information to help families find trusted care providers.",

"safety.professionalStandards": "Professional Standards",
"safety.professionalStandardsDesc":
  "Nurses are expected to provide care with professionalism, respect, and responsibility.",

"safety.safeCare": "Safe Care",
"safety.safeCareDesc":
  "We promote a safe care environment where patients and nurses can feel comfortable and respected.",

"safety.trustedCommunity": "Trusted Community",
"safety.trustedCommunityDesc":
  "We believe trust grows through transparency, communication, and respectful care.",

"safety.trustTitle": "Care You Can Trust",
"safety.trustDescription":
  "NurseConnect connects families with nurses while keeping safety, respect, and quality care at the center of the experience.",
"safety.badge": "Patient & Nurse Safety",

"safety.title": "Your Safety Comes First",

"safety.heroDescription":
  "We are committed to creating a trusted, respectful, and safe care experience for every patient and nurse.",

"safety.verifiedNurses": "Verified Nurses",
"safety.verifiedNursesDesc":
  "We review nurse profiles and professional information to help families connect with trusted care providers.",
"safety.verifiedNursesCheck": "Professional information reviewed",

"safety.secureBooking": "Secure Booking",
"safety.secureBookingDesc":
  "Our booking process is designed to keep care requests clear, organized, and easy to manage.",
"safety.secureBookingCheck": "Simple and transparent booking",

"safety.transparentProfiles": "Transparent Profiles",
"safety.transparentProfilesDesc":
  "View nurse information, specialties, experience, and care details before making your choice.",
"safety.transparentProfilesCheck": "Clear nurse information",

"safety.familyFocused": "Family-Focused Care",
"safety.familyFocusedDesc":
  "We help families find suitable nursing care while keeping communication, respect, and comfort at the center.",
"safety.familyFocusedCheck": "Care built around your needs",

"safety.safetyNoteTitle": "A Care Experience Built on Trust",
"safety.safetyNoteDescription":
  "We encourage patients and nurses to communicate clearly, respect one another, and use the platform responsibly.",
"safety.badge": "Patient & Nurse Safety",

"privacy.badge": "Privacy & Data Protection",
"privacy.title": "Privacy Policy",
"privacy.description":
  "Your privacy matters to us. Here is how NurseConnect handles and protects your personal information in a clear and simple way.",
"privacy.readTime": "3 min read",
"privacy.dataProtection": "Data Protection",

"privacy.trustOneTitle": "Privacy First",
"privacy.trustOneDescription":
  "We treat your personal information with care and respect.",

"privacy.trustTwoTitle": "Secure Information",
"privacy.trustTwoDescription":
  "We use appropriate security measures to help protect your information.",

"privacy.trustThreeTitle": "No Unnecessary Sharing",
"privacy.trustThreeDescription":
  "We only share information when it is needed to provide our services.",

"privacy.collectTitle": "1. Information We Collect",
"privacy.collectTag": "Information",
"privacy.collectDescription":
  "We may collect information such as your name, contact details, account information, booking details, and information you provide when requesting care.",

"privacy.useTitle": "2. How We Use Your Information",
"privacy.useTag": "Purpose",
"privacy.useDescription":
  "We use your information to create and manage your account, connect you with nurses, process care requests, communicate with you, and improve our services.",

"privacy.protectionTitle": "3. How We Protect Your Information",
"privacy.protectionTag": "Security",
"privacy.protectionDescription":
  "We take reasonable technical and organizational measures to protect your information against unauthorized access, loss, misuse, or disclosure.",

"privacy.rightsTitle": "4. Your Privacy Rights",
"privacy.rightsTag": "Your Control",
"privacy.rightsDescription":
  "You may review or update your account information and contact us if you have questions about your personal data or want to request changes.",

"privacy.contactTitle": "5. Contact Us About Privacy",
"privacy.contactTag": "Support",
"privacy.contactDescription":
  "If you have a question about how we handle your information, please contact our privacy team for assistance.",

"privacy.protectionBoxTitle": "Protecting Your Information",
"privacy.protectionBoxDescription":
  "We follow security practices designed to help keep your account and personal information protected.",

"privacy.protectionStepOne": "Account Access",
"privacy.protectionStepOneStatus": "Protected",

"privacy.protectionStepTwo": "Information Storage",
"privacy.protectionStepTwoStatus": "Protected",

"privacy.protectionStepThree": "Service Access",
"privacy.protectionStepThreeStatus": "Controlled",

"privacy.protectionCheckOne": "Access is limited to authorized use",
"privacy.protectionCheckTwo": "Information is handled responsibly",
"privacy.protectionCheckThree": "We work to protect your personal data",

"privacy.contactBoxLabel": "Privacy Support",
"privacy.contactBoxTitle": "Questions About Privacy?",
"privacy.contactBoxDescription":
  "Our team is here to help with privacy-related questions.",
// =========================================================
// TERMS OF SERVICE - ENGLISH
// =========================================================

"terms.badge": "Terms of Service",
"terms.title": "Terms of Service",

"terms.description":
  "Simple and clear terms for using NurseConnect, requesting care, and connecting with nurses.",

"terms.simpleTerms": "Simple & Clear",
"terms.trust": "Built on Trust",

"terms.noticeTitle": "Please Read Before Using NurseConnect",

"terms.noticeDescription":
  "By using NurseConnect, you agree to use the platform responsibly and follow these terms. These terms help keep the experience clear, respectful, and safe for patients and nurses.",

"terms.sectionsLabel": "Platform Guidelines",

"terms.sectionsTitle": "Our Main Terms",

"terms.useTitle": "1. Using NurseConnect",

"terms.useDescription":
  "NurseConnect helps patients and families discover nurses and submit care requests through the platform.",

"terms.useCheck":
  "Use the platform responsibly",

"terms.accountsTitle": "2. Accounts & Information",

"terms.accountsDescription":
  "You are responsible for providing accurate information and keeping your account details up to date.",

"terms.accountsCheck":
  "Keep your information accurate",

"terms.bookingTitle": "3. Bookings & Requests",

"terms.bookingDescription":
  "Care requests should include accurate details about the person receiving care, requested services, date, time, and location.",

"terms.bookingCheck":
  "Provide accurate booking details",

"terms.responsibilitiesTitle": "4. Patient & Nurse Responsibilities",

"terms.responsibilitiesDescription":
  "Patients and nurses are expected to communicate respectfully, arrive as agreed, and follow applicable professional and safety requirements.",

"terms.responsibilitiesCheck":
  "Respectful communication",

"terms.safetyTitle": "5. Safety & Appropriate Use",

"terms.safetyDescription":
  "NurseConnect should not be used for emergencies or unlawful activities. In an emergency, contact your local emergency services.",

"terms.safetyCheck":
  "Use the platform safely",

"terms.contactTitle": "6. Questions & Contact",

"terms.contactDescription":
  "If you have questions about these terms or how NurseConnect works, you can contact our team for assistance.",

"terms.contactCheck":
  "We're here to help",

"terms.ctaTitle": "Have Questions About Our Terms?",

"terms.ctaDescription":
  "Contact us if you need clarification about using NurseConnect or these terms.",

"terms.contactButton": "Contact Us",

"terms.homeButton": "Return to Home",
"privacy.ctaTitle": "Have Questions About Your Privacy?",
"privacy.ctaDescription":
  "Contact us if you have questions about your information or how NurseConnect handles your data.",

"privacy.contactButton": "Contact Privacy Team",
"privacy.homeButton": "Return to Home",
"safety.trustedCare": "Trusted Care, Every Step of the Way",
"safety.trustedCareDescription":
  "Explore nurse profiles and find care that matches your needs.",

"safety.findNurse": "Find a Nurse",  
// =========================================================
// CONTACT - ENGLISH
// =========================================================

"contact.badge": "We're Here to Help",

"contact.title": "How Can We Help?",

"contact.description":
  "Whether you have a question about care, need help with a booking, or want to join our nurse network, our team is here to help.",

"contact.support": "Support & Assistance",

"contact.response": "We'll get back to you",

"contact.formLabel": "Send a Message",

"contact.formTitle": "Tell Us How We Can Help",

"contact.name": "Full Name",

"contact.namePlaceholder": "Your name",

"contact.email": "Email Address",

"contact.emailPlaceholder": "you@example.com",

"contact.subject": "Subject",

"contact.subjectGeneral": "General Inquiry",

"contact.subjectBooking": "Booking Support",

"contact.subjectNurse": "Nurse Registration",

"contact.subjectAccount": "Account Support",

"contact.message": "Message",

"contact.messagePlaceholder":
  "Tell us how we can help...",

"contact.sendButton": "Send Message",

"contact.formNote":
  "Please avoid sharing sensitive medical information through this form.",

"contact.successTitle": "Message Sent",

"contact.successDescription":
  "Thank you for contacting NurseConnect. Our team will review your message and get back to you.",

"contact.sendAnother": "Send Another Message",

"contact.emailTitle": "Email Us",

"contact.emailDescription":
  "For general questions, support, or other inquiries, send us an email.",

"contact.phoneTitle": "Phone",

"contact.phoneDescription":
  "For direct assistance, you can contact our team by phone.",

"contact.phoneNumber": "+961 00 000 000",

"contact.locationTitle": "Our Location",

"contact.locationDescription":
  "NurseConnect is based in Lebanon and serves patients and nurses through our online platform.",

"contact.location": "Tripoli, Lebanon",

"contact.emergencyTitle": "Medical Emergency?",

"contact.emergencyDescription":
  "NurseConnect is not an emergency service. If you are experiencing a medical emergency, contact your local emergency services immediately.",

"contact.infoOneTitle": "Patient Support",

"contact.infoOneDescription":
  "Get help with bookings, accounts, and care requests.",

"contact.infoTwoTitle": "Support Hours",

"contact.infoTwoDescription":
  "Our team will respond to your message as soon as possible.",

"contact.infoThreeTitle": "Privacy Matters",

"contact.infoThreeDescription":
  "Please only share the information needed to handle your request.",
},

  // =========================================================
  // ARABIC
  // =========================================================

  ar: {
    // =======================================================
    // NAVBAR
    // =======================================================

    home: "الرئيسية",
    nurseConnect: "NurseConnect",
    findNurse: "ابحث عن ممرض",
    forNurses: "للممرضين",
    aiAssistant: "مساعد الرعاية بالذكاء الاصطناعي",

    arabic: "عربي",
    english: "English",

    signIn: "تسجيل الدخول",
    getStarted: "ابدأ الآن",

    // =======================================================
    // HERO
    // =======================================================

    trustedByFamilies:
      "موثوق به من أكثر من 10,000 عائلة",

    trustedCareTitle:
      "رعاية موثوقة،",

    trustedCareHighlight:
      "عندما تحتاج إليها.",

    professionalNursingCare:
      "رعاية تمريضية احترافية",

    expertNursesTitle:
      "ممرضون متخصصون،",

    rightAtHome:
      "مباشرة في منزلك.",

    careYouCanTrustEyebrow:
      "رعاية يمكنك الوثوق بها",

    yourHealthTitle:
      "صحتك،",

    ourPriority:
      "هي أولويتنا.",

    trustedCareDescription:
      "تواصل مع ممرضين ومقدمي رعاية مؤهلين والمستعدين لتقديم الرعاية التي تحتاجها أنت أو أحباؤك في المنزل.",

    professionalCareDescription:
      "احصل على رعاية تمريضية إنسانية واحترافية من مقدمي رعاية مؤهلين وأنت في راحة منزلك.",

    personalizedHealthcareDescription:
      "رعاية صحية منزلية مخصصة لك ولأحبائك، يقدمها متخصصون يهتمون بك.",

    findNurseHero:
      "ابحث عن ممرض",

    imANurse:
      "أنا ممرض",

    professionalNurseAlt:
      "ممرض محترف يقدم الرعاية الصحية المنزلية",

    previousSlide:
      "الشريحة السابقة",

    nextSlide:
      "الشريحة التالية",

    goToSlide:
      "انتقل إلى الشريحة",

    registeredNurse:
      "ممرض مسجل",

    visitConfirmed:
      "تم تأكيد الزيارة",

    todayAtTwo:
      "اليوم الساعة 2:00 مساءً",

    familiesServed:
      "عائلات تمت خدمتها",

    verifiedNurses:
      "ممرضون موثّقون",

    averageRating:
      "متوسط التقييم",

    supportAvailable:
      "دعم متوفر على مدار الساعة",

    // =======================================================
    // HERO SEARCH
    // =======================================================

    findYourIdealCaregiver:
      "اعثر على مقدم الرعاية المثالي لك",

    chooseCarePreferences:
      "اختر تفضيلات الرعاية الخاصة بك واعثر على المتخصص المناسب لك.",

    careType:
      "نوع الرعاية",

    allCareTypes:
      "جميع أنواع الرعاية",

    careSchedule:
      "جدول الرعاية",

    oneTimeVisit:
      "زيارة لمرة واحدة",

    recurringCare:
      "رعاية متكررة",

    fullSupport247:
      "دعم كامل على مدار الساعة",

    location:
      "الموقع",

    locationPlaceholder:
      "مثال: بيروت، طرابلس، جونية...",

    findCare:
      "ابحث عن الرعاية",

    // =======================================================
    // CARE CATEGORIES
    // =======================================================

    all: "الكل",

    elderlyCare:
      "رعاية كبار السن",

    postSurgery:
      "رعاية ما بعد الجراحة",

    medicationSupport:
      "المساعدة في الأدوية",

    dailyAssistance:
      "المساعدة اليومية",

    companionship:
      "المرافقة",

    disabilitySupport:
      "دعم ذوي الإعاقة",

    palliativeCare:
      "الرعاية التلطيفية",

    // =======================================================
    // AI
    // =======================================================

    notSureWhatCareYouNeed:
      "لست متأكدًا من الرعاية التي تحتاجها؟",

    letOurAI:
      "دع",

    aiCareAssistant:
      "مساعد الرعاية بالذكاء الاصطناعي",

    analyzeSymptoms:
      "يحلل أعراضك ويطابقك مع الممرض المناسب.",

    // =======================================================
    // HOW IT WORKS
    // =======================================================

    simpleProcess:
      "خطوات بسيطة",

    howNurseConnectWorks:
      "كيف تعمل NurseConnect؟",

    tellUsYourNeeds:
      "أخبرنا باحتياجاتك",

    tellUsYourNeedsDescription:
      "شاركنا احتياجات الرعاية والجدول الزمني والموقع، لنفهم بالضبط ما تحتاجه عائلتك.",

    getMatchedInstantly:
      "احصل على المطابقة فورًا",

    getMatchedDescription:
      "يقوم الذكاء الاصطناعي بمراجعة الممرضين المرخصين والموثوقين القريبين منك، ويطابقك مع الأنسب لاحتياجاتك وميزانيتك.",

    bookAndRelax:
      "احجز واستمتع براحة البال",

    bookAndRelaxDescription:
      "أكد حجزك، وتواصل مباشرة مع ممرضك، وتابع كل زيارة من خلال لوحة تحكم NurseConnect.",

    joinAsANurse:
      "انضمي كممرضة 🩺",

    // =======================================================
    // AI MATCH
    // =======================================================

    poweredByAI:
      "مدعوم بالذكاء الاصطناعي",

    letAIHelp:
      "دع الذكاء الاصطناعي يساعدك في العثور على الرعاية المناسبة",

    aiMatchingDescription:
      "أجب عن بعض الأسئلة السريعة حول احتياجاتك للرعاية، وسيعرض لك نظام المطابقة ممرضين مرخصين بالقرب منك يتناسبون مع جدولك وميزانيتك واحتياجاتك التخصصية.",

    tryAIMatching:
      "جرّب المطابقة بالذكاء الاصطناعي",

    aiMatchSummary:
      "ملخص المطابقة بالذكاء الاصطناعي",

    aiMatchSummaryDescription:
      "بناءً على إجاباتك، إليك ملف مقدم رعاية مناسب لاحتياجات عائلتك.",

    recommendedCareType:
      "نوع الرعاية المقترح",

    postSurgicalRecovery:
      "التعافي بعد الجراحة",

    visitFrequency:
      "عدد الزيارات",

    dailyMorningsPreferred:
      "يوميًا، ويفضل في الصباح",

    matchesNearby:
      "المطابقات القريبة",

    nursesAvailable:
      "12 ممرضًا متاحًا",

    estimatedResponse:
      "وقت الاستجابة المتوقع",

    underTwoHours:
      "أقل من ساعتين",

    viewMyMatches:
      "عرض المطابقات",

    // =======================================================
    // NURSES
    // =======================================================

    ourTeam:
      "فريقنا",

    meetOurNurses:
      "تعرّف على ممرضينا",

    viewAllNurses:
      "عرض جميع الممرضين ←",

    noNursesAvailable:
      "لا يوجد ممرضون مسجلون متاحون حاليًا.",

    generalHomeCare:
      "الرعاية العامة / المنزلية",

    available:
      "متاح",

    bookNow:
      "احجز الآن",

    // =======================================================
    // CARE YOU CAN TRUST
    // =======================================================

    whyFamiliesChooseUs:
      "لماذا تختارنا العائلات؟",

    careYouCanTrust:
      "رعاية يمكنك الوثوق بها.",

    whyChooseDescription:
      "يتم التحقق من كل ممرض على NurseConnect وتقييمه، وهو مستعد لتقديم مستوى الرعاية الذي تستحقه عائلتك.",

    backgroundVerified:
      "تم التحقق من الخلفية",

    backgroundVerifiedDescription:
      "يخضع كل ممرض للتحقق من الترخيص وفحص الخلفية والتحقق من المراجع قبل الانضمام.",

    ratingsReviews:
      "التقييمات والمراجعات",

    ratingsReviewsDescription:
      "تساعدك آراء العائلات الحقيقية على اختيار مقدم الرعاية بثقة في كل مرة.",

    flexibleScheduling:
      "جدولة مرنة",

    flexibleSchedulingDescription:
      "احجز زيارات لمرة واحدة، أو رعاية متكررة، أو دعمًا على مدار الساعة، بما يناسب روتين عائلتك.",

    secureMessaging:
      "مراسلة آمنة",

    secureMessagingDescription:
      "تواصل مباشرة مع ممرضك من خلال نظام مراسلة آمن ومشفّر داخل التطبيق في كل خطوة.",

    securePayments:
      "مدفوعات آمنة",

    securePaymentsDescription:
      "أسعار واضحة ومدفوعات محمية، ولا يتم تحريرها إلا بعد تأكيد الرعاية.",

    licensedInsured:
      "مرخصون ومؤمّنون",

    licensedInsuredDescription:
      "جميع مقدمي الرعاية متخصصون مرخصون ومشمولون بتأمين المسؤولية لمنحك راحة البال.",

    // =======================================================
    // CTA
    // =======================================================

    readyToFindTrustedCare:
      "هل أنت مستعد للعثور على رعاية موثوقة؟",

    readyToFindDescription:
      "انضم إلى آلاف العائلات التي تثق بـ NurseConnect للحصول على رعاية تمريضية منزلية إنسانية وموثوقة.",

    getStartedToday:
      "ابدأ اليوم",

    joinAsNurse:
      "انضم كممرض",

    readyToStart:
      "هل أنت مستعد للبدء؟",

    readyToStartDescription:
      "انضم إلى آلاف الممرضين الذين بنوا مسيرات مهنية ناجحة من خلال NurseConnect.",

    joinAsANurseToday:
      "انضم كممرض اليوم",

    // =======================================================
    // FOOTER
    // =======================================================

    trustedByThousands:
      "موثوق به من آلاف العائلات",

    footerDescription:
      "نربط العائلات بممرضين موثوقين ومرخصين لتوفير رعاية منزلية إنسانية، متى وأينما كانت الحاجة إليها.",

    forPatients:
      "للمرضى",

    requestCare:
      "طلب الرعاية",

    howItWorks:
      "كيف يعمل التطبيق؟",

    forNursesFooter:
      "للممرضين",

    nurseDashboard:
      "لوحة تحكم الممرض",

    howToApply:
      "كيفية التقديم",

    nurseResources:
      "موارد الممرضين",

    company:
      "الشركة",

    aboutUs:
      "من نحن",

    safetyTrust:
      "الأمان والثقة",

    privacyPolicy:
      "سياسة الخصوصية",

    termsOfService:
      "شروط الخدمة",

    contactUs:
      "تواصل معنا",

    emergencySupport:
      "دعم الطوارئ",

    available247:
      "متاح على مدار الساعة",

    allRightsReserved:
      "جميع الحقوق محفوظة.",

    // =======================================================
    // GENERAL
    // =======================================================

    Find_your_ideal_caregiver:
      "اعثر على مقدم الرعاية المثالي لك",

    hourlyRate:
      "السعر بالساعة",

    experience:
      "الخبرة",

    rating:
      "التقييم",

    // =======================================================
    // PROFILE / AUTH
    // =======================================================

    patient:
      "مريض",

    nurse:
      "ممرضة",

    admin:
      "مسؤول",

    myProfile:
      "الملف الشخصي",

    nurseWorkspace:
      "مساحة عمل الممرضة",

    adminDashboard:
      "لوحة تحكم المسؤول",

    systemSettings:
      "إعدادات النظام",

    signOut:
      "تسجيل الخروج",

    signedInAs:
      "مسجل الدخول باسم",

    // =======================================================
    // COMMON
    // =======================================================

    "common.back":
      "رجوع",

    "common.continue":
      "متابعة",

    // =======================================================
    // WHO NEEDS CARE
    // =======================================================

    whoNeedsCare:
      "من يحتاج إلى الرعاية؟",

    selectPrimaryPerson:
      "اختر الشخص الأساسي الذي يحتاج إلى خدمات التمريض لمساعدتنا على تخصيص تجربتك.",

    myself:
      "أنا",

    parent:
      "أحد الوالدين",

    child:
      "طفل",

    personWithDisability:
      "شخص من ذوي الإعاقة",

    spousePartner:
      "الزوج / الشريك",

    selectNurseToContinue:
      "يرجى اختيار ممرض للمتابعة في عملية الحجز.",

    // =======================================================
    // WHEN & WHERE
    // =======================================================

    whenAndWhere:
      "متى وأين؟",

    whenWhereDescription:
      "أخبرنا متى وأين تحتاج إلى رعاية تمريضية.",

    startDate:
      "تاريخ البدء",

    careDuration:
      "مدة الرعاية",

    selectDuration:
      "اختر المدة",

    oneHour:
      "ساعة واحدة",

    twoHours:
      "ساعتان",

    fourHours:
      "4 ساعات",

    eightHours:
      "8 ساعات",

    twelveHours:
      "12 ساعة",

    twentyFourHours:
      "24 ساعة",

    careAddress:
      "عنوان الرعاية",

    enterCareAddressPlaceholder:
      "أدخل عنوان مكان الرعاية",

    search:
      "بحث",

    searching:
      "جارٍ البحث...",

    addressSearchHint:
      "أدخل عنوانك واضغط على بحث أو Enter.",

    careLocation:
      "موقع الرعاية",

    mapLocationHint:
      "يمكنك أيضًا تحديد الموقع مباشرةً على الخريطة.",

    latitude:
      "خط العرض",

    longitude:
      "خط الطول",

    enterCareAddress:
      "يرجى إدخال عنوان الرعاية.",

    addressNotFound:
      "لم يتم العثور على العنوان. يرجى تجربة عنوان آخر.",

    addressSearchError:
      "حدث خطأ أثناء البحث عن هذا العنوان.",

    selectStartDate:
      "يرجى اختيار تاريخ البدء.",

    selectCareDuration:
      "يرجى اختيار مدة الرعاية.",

    // =======================================================
    // DESCRIBE NEEDS
    // =======================================================

    "describeNeeds.title":
      "صِف احتياجاتك",

    "describeNeeds.description":
      "يرجى تقديم تفاصيل حول الرعاية المطلوبة حتى نتمكن من مطابقتك مع الممرضة المناسبة.",

    "describeNeeds.placeholder":
      "مثال: والدتي تبلغ من العمر 82 عامًا وتواجه صعوبة في المشي. تحتاج إلى المساعدة في إدارة الأدوية اليومية، والتنقل بأمان داخل المنزل، والرفقة عدة مرات في الأسبوع...",

    "describeNeeds.privacy":
      "أفهم أن معلوماتي ستتم مشاركتها مع الممرضات المطابقات وفقًا لسياسة الخصوصية الخاصة بنا.",

    // =======================================================
    // REVIEW
    // =======================================================

    "review.title":
      "مراجعة وإرسال",

    "review.description":
      "يرجى التحقق من تفاصيل طلب الرعاية قبل إرساله.",

    "review.preferredNurse":
      "الممرضة المفضلة",

    "review.careFor":
      "الرعاية لـ",

    "review.careType":
      "نوع الرعاية",

    "review.startDate":
      "تاريخ البدء",

    "review.duration":
      "المدة",

    "review.location":
      "الموقع",

    "review.notes":
      "ملاحظات",

    "review.terms":
      "بإرسال الطلب، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا. عادةً ما يتم تأكيد الطلب خلال 24–48 ساعة.",

    "review.nurseRequired":
      "يجب اختيار ممرضة مفضلة. يرجى اختيار ممرضة أولاً.",

    "review.submitError":
      "حدث خطأ ما. يرجى المحاولة مرة أخرى.",

    "review.submitting":
      "جارٍ الإرسال...",

    "review.submit":
      "إرسال طلب الرعاية ←",

    "review.oneHour":
      "ساعة واحدة",

    "review.twoHours":
      "ساعتان",

    "review.fourHours":
      "4 ساعات",

    "review.eightHours":
      "8 ساعات",

    "review.twelveHours":
      "12 ساعة",

    "review.twentyFourHours":
      "24 ساعة",

    // =======================================================
    // CONFIRMATION
    // =======================================================

    "confirmation.title":
      "تم إرسال طلب الرعاية!",

    "confirmation.description":
      "نحن نبحث لك عن الممرضة الأنسب في منطقتك. ستتلقى تأكيدًا قريبًا.",

    "confirmation.preferredNurse":
      "الممرضة المفضلة",

    "confirmation.careFor":
      "الرعاية لـ",

    "confirmation.careType":
      "نوع الرعاية",

    "confirmation.startDate":
      "تاريخ البدء",

    "confirmation.duration":
      "المدة",

    "confirmation.location":
      "الموقع",

    "confirmation.oneHour":
      "ساعة واحدة",

    "confirmation.twoHours":
      "ساعتان",

    "confirmation.fourHours":
      "4 ساعات",
"safety.badge": "سلامة المرضى والممرضين",

"safety.title": "سلامتك أولويتنا",

"safety.heroDescription":
  "نلتزم بتوفير تجربة رعاية موثوقة ومحترمة وآمنة لكل مريض وممرض.",

"safety.verifiedNurses": "ممرضون موثوقون",
"safety.verifiedNursesDesc":
  "نراجع ملفات الممرضين والمعلومات المهنية لمساعدة العائلات في التواصل مع مقدمي رعاية موثوقين.",
"safety.verifiedNursesCheck": "تمت مراجعة المعلومات المهنية",

"safety.secureBooking": "حجز آمن ومنظم",
"safety.secureBookingDesc":
  "صممنا عملية الحجز لتكون واضحة ومنظمة وسهلة لإدارة طلبات الرعاية.",
"safety.secureBookingCheck": "حجز بسيط وواضح",

"safety.transparentProfiles": "ملفات تعريف واضحة",
"safety.transparentProfilesDesc":
  "يمكنك الاطلاع على معلومات الممرض وتخصصاته وخبرته وتفاصيل الرعاية قبل اتخاذ قرارك.",
"safety.transparentProfilesCheck": "معلومات واضحة عن الممرض",

"safety.familyFocused": "رعاية تركز على العائلة",
"safety.familyFocusedDesc":
  "نساعد العائلات في العثور على الرعاية المناسبة مع الحفاظ على التواصل والاحترام والراحة في صميم التجربة.",
"safety.familyFocusedCheck": "رعاية مصممة وفق احتياجاتك",

"safety.safetyNoteTitle": "تجربة رعاية مبنية على الثقة",
"safety.safetyNoteDescription":
  "نشجع المرضى والممرضين على التواصل بوضوح واحترام بعضهم البعض واستخدام المنصة بطريقة مسؤولة.",

"safety.trustedCare": "رعاية موثوقة في كل خطوة",

"safety.trustedCareDescription":
  "استكشف ملفات الممرضين واعثر على الرعاية التي تناسب احتياجاتك.",

"safety.findNurse": "ابحث عن ممرض",
    "confirmation.eightHours":
      "8 ساعات",

    "confirmation.twelveHours":
      "12 ساعة",

    "confirmation.twentyFourHours":
      "24 ساعة",
"privacy.badge": "الخصوصية وحماية البيانات",
"privacy.title": "سياسة الخصوصية",
"privacy.description":
  "خصوصيتك مهمة بالنسبة لنا. نوضح هنا بطريقة بسيطة وواضحة كيفية تعامل NurseConnect مع معلوماتك الشخصية وحمايتها.",
"privacy.readTime": "قراءة خلال 3 دقائق",
"privacy.dataProtection": "حماية البيانات",

"privacy.trustOneTitle": "الخصوصية أولاً",
"privacy.trustOneDescription":
  "نتعامل مع معلوماتك الشخصية بعناية واحترام.",

"privacy.trustTwoTitle": "معلومات محمية",
"privacy.trustTwoDescription":
  "نستخدم إجراءات أمنية مناسبة للمساعدة في حماية معلوماتك.",

"privacy.trustThreeTitle": "عدم المشاركة غير الضرورية",
"privacy.trustThreeDescription":
  "لا نشارك معلوماتك إلا عندما يكون ذلك ضروريًا لتقديم خدماتنا.",

"privacy.collectTitle": "1. المعلومات التي نجمعها",
"privacy.collectTag": "المعلومات",
"privacy.collectDescription":
  "قد نجمع معلومات مثل اسمك وبيانات التواصل ومعلومات حسابك وتفاصيل الحجز والمعلومات التي تقدمها عند طلب الرعاية.",

"privacy.useTitle": "2. كيفية استخدام معلوماتك",
"privacy.useTag": "الاستخدام",
"privacy.useDescription":
  "نستخدم معلوماتك لإنشاء حسابك وإدارته، وربطك بالممرضين، ومعالجة طلبات الرعاية، والتواصل معك، وتحسين خدماتنا.",

"privacy.protectionTitle": "3. كيفية حماية معلوماتك",
"privacy.protectionTag": "الأمان",
"privacy.protectionDescription":
  "نتخذ إجراءات تقنية وتنظيمية مناسبة للمساعدة في حماية معلوماتك من الوصول غير المصرح به أو الفقدان أو سوء الاستخدام أو الكشف غير المصرح به.",

"privacy.rightsTitle": "4. حقوقك المتعلقة بالخصوصية",
"privacy.rightsTag": "تحكمك",
"privacy.rightsDescription":
  "يمكنك مراجعة معلومات حسابك أو تحديثها، كما يمكنك التواصل معنا إذا كانت لديك أسئلة حول بياناتك الشخصية أو إذا أردت طلب تعديلها.",

"privacy.contactTitle": "5. التواصل معنا بشأن الخصوصية",
"privacy.contactTag": "الدعم",
"privacy.contactDescription":
  "إذا كان لديك أي سؤال حول كيفية تعاملنا مع معلوماتك، يمكنك التواصل مع فريق الخصوصية للحصول على المساعدة.",

"privacy.protectionBoxTitle": "حماية معلوماتك",
"privacy.protectionBoxDescription":
  "نتبع ممارسات أمنية تهدف إلى المساعدة في حماية حسابك ومعلوماتك الشخصية.",

"privacy.protectionStepOne": "الوصول إلى الحساب",
"privacy.protectionStepOneStatus": "محمي",

"privacy.protectionStepTwo": "تخزين المعلومات",
"privacy.protectionStepTwoStatus": "محمي",

"privacy.protectionStepThree": "الوصول إلى الخدمات",
"privacy.protectionStepThreeStatus": "مراقب",

"privacy.protectionCheckOne": "الوصول محدود للاستخدام المصرح به",
"privacy.protectionCheckTwo": "نتعامل مع المعلومات بمسؤولية",
"privacy.protectionCheckThree": "نعمل على حماية بياناتك الشخصية",

"privacy.contactBoxLabel": "دعم الخصوصية",
"privacy.contactBoxTitle": "لديك أسئلة حول الخصوصية؟",
"privacy.contactBoxDescription":
  "فريقنا موجود لمساعدتك في أي أسئلة تتعلق بالخصوصية.",

"privacy.ctaTitle": "لديك أسئلة حول خصوصيتك؟",
"privacy.ctaDescription":
  "تواصل معنا إذا كانت لديك أسئلة حول معلوماتك أو كيفية تعامل NurseConnect مع بياناتك.",

"privacy.contactButton": "تواصل مع فريق الخصوصية",
"privacy.homeButton": "العودة إلى الرئيسية",
    "confirmation.dashboard":
      "عرض لوحة التحكم",

    "confirmation.browseNurses":
      "تصفح الممرضات",

    // =======================================================
    // ABOUT
    // =======================================================

    "about.ourStory":
      "قصتنا",

    "about.trustedCare":
      "الرعاية الموثوقة تبدأ بأشخاص موثوقين",

    "about.heroDescription":
      "تم إنشاء NurseConnect لسد الفجوة بين العائلات التي تحتاج إلى رعاية منزلية موثوقة والممرضين المرخصين المستعدين لتقديمها، بطريقة أسهل وبمزيد من الثقة للطرفين.",

    "about.familiesServed":
      "عائلة تم خدمتها",

    "about.verifiedNurses":
      "ممرضون موثوقون",

    "about.citiesCovered":
      "مدينة مشمولة",

    "about.averageRating":
      "متوسط التقييم",

    "about.howWeStarted":
      "كيف بدأنا",

    "about.builtByANurse":
      "أسسها ممرض عاش المشكلة بنفسه",

    "about.storyParagraph1":
      "بدأت NurseConnect في عام 2023 بعدما أمضت إحدى مؤسساتنا المشاركات، وهي ممرضة سابقة في وحدة العناية المركزة، أسابيع في محاولة العثور على رعاية منزلية موثوقة لجدتها. وبين الإحالات غير الموثوقة، وعدم وضوح المؤهلات، وعدم وجود طريقة للاطلاع على تقييمات العائلات الأخرى، استغرق الأمر وقتًا أطول بكثير مما ينبغي.",

    "about.storyParagraph2":
      "أنشأنا المنصة التي كنا نتمنى وجودها: كل ممرض يخضع للتحقق من خلفيته وترخيصه، مع تقييمات حقيقية من عائلات حقيقية، وطريقة بسيطة للحجز والتواصل والدفع، كل ذلك في مكان واحد.",

    "about.foundedIn":
      "تأسست في سان فرانسيسكو",

    "about.licensedChecked":
      "مرخصون وخضعوا للتحقق من الخلفية",

    "about.supportAvailable":
      "دعم متوفر للعائلات والممرضين طوال أيام السنة",

    "about.whatWeStandFor":
      "ما نؤمن به",

    "about.ourValues":
      "قيمنا",

    "about.compassionFirst":
      "التعاطف أولًا",

    "about.compassionDescription":
      "كل عملية مطابقة تبدأ بالتعاطف. نبحث عن ممرضين يعاملون المرضى كأفراد من العائلة، وليس كمجرد قائمة مهام.",

    "about.trustSafety":
      "الثقة والأمان",

    "about.trustSafetyDescription":
      "يخضع كل ممرض على المنصة للتحقق من الترخيص وفحص الخلفية والتحقق من المراجع.",

    "about.communityDriven":
      "بناءً على المجتمع",

    "about.communityDescription":
      "تساعد تقييمات ومراجعات العائلات الحقيقية في الحفاظ على جودة شبكتنا وتحسينها باستمرار.",

    "about.simpleByDesign":
      "البساطة في التصميم",

    "about.simpleDescription":
      "العثور على رعاية موثوقة لا يجب أن يكون أمرًا معقدًا. نوفر الحجز والتواصل والدفع في مكان واحد.",

    "about.leadership":
      "فريق القيادة",

    "about.meetTheTeam":
      "تعرّف على فريقنا",

    "about.coFounderCEO":
      "الشريك المؤسس والرئيس التنفيذي",

    "about.danaBio":
      "ممرضة سابقة في وحدة العناية المركزة، شهدت بنفسها مدى صعوبة العثور على رعاية منزلية موثوقة للعائلات.",

    "about.coFounderCTO":
      "الشريك المؤسس والرئيس التنفيذي للتكنولوجيا",

    "about.marcusBio":
      "يطور أنظمة المطابقة والجدولة التي تربط العائلات بالممرض المناسب بسرعة.",

    "about.headOfNursePartnerships":
      "رئيس قسم شراكات الممرضين",

    "about.privacyBio":
      "تتولى عملية انضمام الممرضين والتحقق من مؤهلاتهم للحفاظ على شبكة واسعة وموثوقة.",

    "about.joinUs":
      "انضم إلينا لإعادة تعريف الرعاية المنزلية",

    "about.ctaDescription":
      "سواء كنت بحاجة إلى رعاية لأحد أحبائك أو ترغب في الانضمام إلى شبكة الممرضين لدينا، يسعدنا انضمامك إلينا.",

    "about.getStarted":
      "ابدأ الآن",

    "about.joinAsNurse":
      "انضم كممرض",

	  "safety.title": "الأمان والثقة",
"safety.heroDescription":
  "سلامتك وراحتك هما في صميم كل ما نقوم به.",

"safety.ourCommitment": "التزامنا بالسلامة",
"safety.commitmentDescription":
  "نعمل على توفير تجربة رعاية موثوقة ومحترمة لكل عائلة.",

"safety.verifiedNurses": "ممرضون موثوقون",
"safety.verifiedNursesDesc":
  "نراجع ملفات الممرضين والمعلومات المهنية لمساعدة العائلات في العثور على مقدمي رعاية موثوقين.",

"safety.professionalStandards": "المعايير المهنية",
"safety.professionalStandardsDesc":
  "نحرص على أن يتم تقديم الرعاية بمهنية واحترام ومسؤولية.",

"safety.safeCare": "رعاية آمنة",
"safety.safeCareDesc":
  "نسعى إلى توفير بيئة رعاية آمنة يشعر فيها المرضى والممرضون بالراحة والاحترام.",

"safety.trustedCommunity": "مجتمع قائم على الثقة",
"safety.trustedCommunityDesc":
  "نؤمن بأن الثقة تُبنى من خلال الشفافية والتواصل والرعاية المحترمة.",

"safety.trustTitle": "رعاية يمكنك الوثوق بها",
"safety.trustDescription":
  "تربط NurseConnect العائلات بالممرضين مع وضع السلامة والاحترام وجودة الرعاية في صميم التجربة.",
 // =========================================================
// TERMS OF SERVICE - ARABIC
// =========================================================

"terms.badge": "شروط الاستخدام",

"terms.title": "شروط الاستخدام",

"terms.description":
  "شروط بسيطة وواضحة لاستخدام NurseConnect وطلب الرعاية والتواصل مع الممرضين.",

"terms.simpleTerms": "شروط واضحة وبسيطة",

"terms.trust": "مبنية على الثقة",

"terms.noticeTitle": "يرجى القراءة قبل استخدام NurseConnect",

"terms.noticeDescription":
  "باستخدامك لمنصة NurseConnect، فإنك توافق على استخدام المنصة بطريقة مسؤولة والالتزام بهذه الشروط. تساعد هذه الشروط في الحفاظ على تجربة واضحة ومحترمة وآمنة للمرضى والممرضين.",

"terms.sectionsLabel": "إرشادات المنصة",

"terms.sectionsTitle": "أهم شروطنا",

"terms.useTitle": "1. استخدام NurseConnect",

"terms.useDescription":
  "تساعد NurseConnect المرضى والعائلات في اكتشاف الممرضين وإرسال طلبات الرعاية من خلال المنصة.",

"terms.useCheck":
  "استخدم المنصة بطريقة مسؤولة",

"terms.accountsTitle": "2. الحسابات والمعلومات",

"terms.accountsDescription":
  "أنت مسؤول عن تقديم معلومات صحيحة والحفاظ على تحديث بيانات حسابك.",

"terms.accountsCheck":
  "حافظ على دقة معلوماتك",

"terms.bookingTitle": "3. الحجوزات والطلبات",

"terms.bookingDescription":
  "يجب أن تتضمن طلبات الرعاية معلومات دقيقة عن الشخص الذي سيحصل على الرعاية والخدمات المطلوبة والتاريخ والوقت والموقع.",

"terms.bookingCheck":
  "قدّم تفاصيل دقيقة عن الحجز",

"terms.responsibilitiesTitle": "4. مسؤوليات المريض والممرض",

"terms.responsibilitiesDescription":
  "يُتوقع من المرضى والممرضين التواصل باحترام والالتزام بالمواعيد المتفق عليها واتباع متطلبات السلامة والمهنية المعمول بها.",

"terms.responsibilitiesCheck":
  "التواصل باحترام",

"terms.safetyTitle": "5. السلامة والاستخدام المناسب",

"terms.safetyDescription":
  "لا ينبغي استخدام NurseConnect في حالات الطوارئ أو الأنشطة غير القانونية. في حالات الطوارئ، تواصل مع خدمات الطوارئ المحلية.",

"terms.safetyCheck":
  "استخدم المنصة بأمان",

"terms.contactTitle": "6. الأسئلة والتواصل",

"terms.contactDescription":
  "إذا كانت لديك أسئلة حول هذه الشروط أو حول كيفية عمل NurseConnect، يمكنك التواصل مع فريقنا للحصول على المساعدة.",

"terms.contactCheck":
  "نحن هنا لمساعدتك",

"terms.ctaTitle": "لديك أسئلة حول شروط الاستخدام؟",

"terms.ctaDescription":
  "تواصل معنا إذا كنت بحاجة إلى توضيح حول استخدام NurseConnect أو هذه الشروط.",

"terms.contactButton": "تواصل معنا",

"terms.homeButton": "العودة إلى الرئيسية",
// =========================================================
// CONTACT - ARABIC
// =========================================================

"contact.badge": "نحن هنا لمساعدتك",

"contact.title": "كيف يمكننا مساعدتك؟",

"contact.description":
  "سواء كان لديك سؤال حول الرعاية، أو تحتاج إلى مساعدة في الحجز، أو ترغب في الانضمام إلى شبكة الممرضين لدينا، فريقنا هنا لمساعدتك.",

"contact.support": "الدعم والمساعدة",

"contact.response": "سنقوم بالرد عليك",

"contact.formLabel": "أرسل لنا رسالة",

"contact.formTitle": "أخبرنا كيف يمكننا مساعدتك",

"contact.name": "الاسم الكامل",

"contact.namePlaceholder": "أدخل اسمك",

"contact.email": "البريد الإلكتروني",

"contact.emailPlaceholder": "you@example.com",

"contact.subject": "الموضوع",

"contact.subjectGeneral": "استفسار عام",

"contact.subjectBooking": "المساعدة في الحجز",

"contact.subjectNurse": "تسجيل ممرض",

"contact.subjectAccount": "مساعدة الحساب",

"contact.message": "الرسالة",

"contact.messagePlaceholder":
  "أخبرنا كيف يمكننا مساعدتك...",

"contact.sendButton": "إرسال الرسالة",

"contact.formNote":
  "يرجى عدم مشاركة معلومات طبية حساسة من خلال هذا النموذج.",

"contact.successTitle": "تم إرسال الرسالة",

"contact.successDescription":
  "شكرًا لتواصلك مع NurseConnect. سيقوم فريقنا بمراجعة رسالتك والتواصل معك.",

"contact.sendAnother": "إرسال رسالة أخرى",

"contact.emailTitle": "راسلنا عبر البريد الإلكتروني",

"contact.emailDescription":
  "للاستفسارات العامة أو الدعم أو أي أسئلة أخرى، يمكنك التواصل معنا عبر البريد الإلكتروني.",

"contact.phoneTitle": "الهاتف",

"contact.phoneDescription":
  "للحصول على مساعدة مباشرة، يمكنك التواصل مع فريقنا عبر الهاتف.",

"contact.phoneNumber": "+961 00 000 000",

"contact.locationTitle": "موقعنا",

"contact.locationDescription":
  "يقع NurseConnect في لبنان ويخدم المرضى والممرضين من خلال منصتنا الإلكترونية.",

"contact.location": "طرابلس، لبنان",

"contact.emergencyTitle": "هل تواجه حالة طبية طارئة؟",

"contact.emergencyDescription":
  "NurseConnect ليست خدمة طوارئ. إذا كنت تواجه حالة طبية طارئة، تواصل فورًا مع خدمات الطوارئ المحلية.",

"contact.infoOneTitle": "دعم المرضى",

"contact.infoOneDescription":
  "احصل على المساعدة في الحجوزات والحسابات وطلبات الرعاية.",

"contact.infoTwoTitle": "ساعات الدعم",

"contact.infoTwoDescription":
  "سيقوم فريقنا بالرد على رسالتك في أقرب وقت ممكن.",

"contact.infoThreeTitle": "خصوصيتك مهمة",

"contact.infoThreeDescription":
  "يرجى مشاركة المعلومات الضرورية فقط لمعالجة طلبك.",
 },
};

// =========================================================
// CONTEXT
// =========================================================

const LanguageContext =
  createContext<LanguageContextType>({
    lang: "en",

    toggleLang: () => {},

    dir: "ltr",

    t: (key: string) => key,
  });

// =========================================================
// PROVIDER
// =========================================================

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] =
    useState<Lang>("en");

  // ---------------------------------------------------------
  // Load saved language
  // ---------------------------------------------------------

  useEffect(() => {
    const savedLang =
      localStorage.getItem("preferred_lang");

    const saved: Lang =
      savedLang === "ar"
        ? "ar"
        : "en";

    setLang(saved);

    document.documentElement.dir =
      saved === "ar"
        ? "rtl"
        : "ltr";

    document.documentElement.lang =
      saved;
  }, []);

  // ---------------------------------------------------------
  // Toggle language
  // ---------------------------------------------------------

  const toggleLang = () => {
    const next: Lang =
      lang === "en"
        ? "ar"
        : "en";

    setLang(next);

    localStorage.setItem(
      "preferred_lang",
      next
    );

    document.documentElement.dir =
      next === "ar"
        ? "rtl"
        : "ltr";

    document.documentElement.lang =
      next;
  };

  // ---------------------------------------------------------
  // Translation function
  // ---------------------------------------------------------

  const t = (key: string): string => {
    return (
      translations[lang]?.[key] ??
      translations.en?.[key] ??
      key
    );
  };

  // ---------------------------------------------------------
  // Direction
  // ---------------------------------------------------------

  const dir =
    lang === "ar"
      ? "rtl"
      : "ltr";

  // ---------------------------------------------------------
  // Provider
  // ---------------------------------------------------------

  return (
    <LanguageContext.Provider
      value={{
        lang,
        toggleLang,
        dir,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// =========================================================
// HOOK
// =========================================================

export const useLanguage =
  () => useContext(LanguageContext);