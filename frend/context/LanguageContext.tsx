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

const translations: Record<Lang, Record<string, any>> = {
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
    findYourIdealCaregiver:
      "Find your ideal caregiver",

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

    aiCareAssistant:
      "AI Care Assistant",

    analyzeSymptoms:
      "analyze your symptoms and match you with the right nurse.",

    // =======================================================
    // HOW IT WORKS
    // =======================================================
    simpleProcess: "SIMPLE PROCESS",

    howNurseConnectWorks:
      "How NurseConnect Works",

    tellUsYourNeeds:
      "Tell Us Your Needs",

    tellUsYourNeedsDescription:
      "Share your care requirements, schedule, and location so we understand exactly what your family needs.",

    getMatchedInstantly:
      "Get Matched Instantly",

    getMatchedDescription:
      "Our AI reviews vetted, licensed nurses nearby and matches you with the best fit for your care and budget.",

    bookAndRelax:
      "Book & Relax",

    bookAndRelaxDescription:
      "Confirm your booking, message your nurse directly, and track every visit from your NurseConnect dashboard.",

    // =======================================================
    // AI MATCH SECTION
    // =======================================================
    poweredByAI:
      "Powered by AI",

    letAIHelp:
      "Let AI Help You Find the Right Care",

    aiMatchingDescription:
      "Answer a few quick questions about your care needs and our matching engine will surface licensed nurses nearby who fit your schedule, budget, and specialty requirements.",

    tryAIMatching:
      "Try AI Matching",

    aiMatchSummary:
      "AI Match Summary",

    aiMatchSummaryDescription:
      "Based on your answers, here's a caregiver profile tailored to your family's needs.",

    recommendedCareType:
      "Recommended Care Type",

    postSurgicalRecovery:
      "Post-Surgical Recovery",

    visitFrequency:
      "Visit Frequency",

    dailyMorningsPreferred:
      "Daily, Mornings Preferred",

    matchesNearby:
      "Matches Nearby",

    nursesAvailable:
      "12 Nurses Available",

    estimatedResponse:
      "Estimated Response",

    underTwoHours:
      "Under 2 hours",

    viewMyMatches:
      "View My Matches",

    // =======================================================
    // MEET OUR NURSES
    // =======================================================
    ourTeam:
      "Our Team",

    meetOurNurses:
      "Meet Our Nurses",

    viewAllNurses:
      "View All Nurses →",

    noNursesAvailable:
      "No registered nurses available at the moment.",

    generalHomeCare:
      "General / Home Care",

    available:
      "Available",

    bookNow:
      "Book Now",

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

    ratingsReviews:
      "Ratings & Reviews",

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
    readyToStart:
      "Ready to Start?",

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

    forPatients:
      "FOR PATIENTS",

    requestCare:
      "Request Care",

    howItWorks:
      "How It Works",

    forNursesFooter:
      "FOR NURSES",

    nurseDashboard:
      "Nurse Dashboard",

    howToApply:
      "How to Apply",

    nurseResources:
      "Nurse Resources",

    company:
      "COMPANY",

    aboutUs:
      "About Us",

    safetyTrust:
      "Safety & Trust",

    privacyPolicy:
      "Privacy Policy",

    termsOfService:
      "Terms of Service",

    contactUs:
      "Contact Us",

    emergencySupport:
      "Emergency Support",

    available247:
      "AVAILABLE 24/7",

    allRightsReserved:
      "All rights reserved.",

    // =======================================================
    // GENERAL
    // =======================================================
    Find_your_ideal_caregiver:
      "Find your ideal caregiver",

    hourlyRate:
      "Hourly Rate",

    experience:
      "Experience",

    rating:
      "Rating",

    // =======================================================
    // TESTIMONIALS
    // =======================================================
    testimonialEmilyQuote:
      "NurseConnect made it so easy to find a caregiver for my mother. The AI matching found someone with dementia care experience within a day.",

    testimonialEmilyName:
      "Emily Paul",

    testimonialEmilyRole:
      "Daughter & Caregiver",

    testimonialDanielQuote:
      "As a new parent recovering from surgery, having a vetted nurse show up on time, every time, gave our whole family peace of mind.",

    testimonialDanielName:
      "Daniel Martin",

    testimonialDanielRole:
      "New Parent",

    testimonialJohnQuote:
      "The verification process is thorough and it shows. Our nurse was professional, warm, and genuinely invested in my father's recovery.",

    testimonialJohnName:
      "John Roberts",

    testimonialJohnRole:
      "Son & Care Coordinator",

    // =======================================================
    // FIND NURSE PAGE
    // =======================================================
    findANurse:
      "Find a Nurse",

    findNurseDescription:
      "Find qualified nurses who can provide the care you need.",

    findQualifiedNurses:
      "Find qualified nurses who can provide the care you need.",

    searchNurses:
      "Search nurses...",

    searchByNameSpecialtyLocation:
      "Search by name, specialty or location...",

    sort:
      "Sort",

    sortBy:
      "Sort By",

    topRated:
      "Top Rated",

    sortTopRated:
      "Sort: Top Rated",

    priceLowToHigh:
      "Price: Low to High",

    priceHighToLow:
      "Price: High to Low",

    nameAZ:
      "Name: A-Z",

    mostExperienced:
      "Most Experienced",

    filters:
      "Filters",

    filterNurses:
      "Filter Nurses",

    refineSearch:
      "Refine your search based on rating, price, experience and location.",

    clearFilters:
      "Clear Filters",

    minRating:
      "Minimum Rating",

    minimumRating:
      "Minimum Rating",

    anyRating:
      "Any Rating",

    priceRange:
      "Price Range",

    anyPrice:
      "Any Price",

    under50:
      "Under $50 / hr",

    price50To65:
      "$50 - $65 / hr",

    above65:
      "Above $65",

    price65Plus:
      "$65+ / hr",

    experienceRange:
      "Experience",

    anyExperience:
      "Any Experience",

    oneToThreeYears:
      "1 - 3 years",

    experience1To3:
      "1 - 3 Years",

    threeToFiveYears:
      "3 - 5 years",

    experience3To5:
      "3 - 5 Years",

    fivePlusYears:
      "5+ years",

    experience5Plus:
      "5+ Years",

    locationFilter:
      "Location",

    locationExample:
      "e.g. Beirut",

    results:
      "Results",

    nursesFound:
      "nurses found",

    rate:
      "Rate",

    rateNurse:
      "Rate Nurse",

    outOfFiveStars:
      "out of 5 stars",

    feedbackReview:
      "Feedback / Review",

    optional:
      "Optional",

    writeExperience:
      "Write your experience with this nurse...",

    cancel:
      "Cancel",

    submitRating:
      "Submit Rating",

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

    previous:
      "Previous",

    next:
      "Next",

    ratingSubmitted:
      "Your rating has been submitted successfully.",

    failedSubmitRating:
      "Failed to submit rating. Please make sure you are logged in.",

    nurse:
      "Nurse",

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

    profile:
      "Profile",

    book:
      "Book",

    // =======================================================
    // FOR NURSES - HERO
    // =======================================================
    joinOurNursingCommunity:
      "Join Our Nursing Community",

    makeADifference:
      "Make a Difference.",

    careForOthers:
      "Care for Others.",

    connectWithPatients:
      "Connect with patients who need professional nursing care and make a real difference in their lives.",

    professionalNursingOpportunities:
      "Professional Nursing Opportunities",

    yourSkills:
      "Your Skills,",

    theirCare:
      "Their Care.",

    findMeaningfulOpportunities:
      "Find meaningful nursing opportunities and provide compassionate care to patients and families.",

    growWithNurseConnect:
      "Grow With NurseConnect",

    careWithPurpose:
      "Care With Purpose.",

    growYourCareer:
      "Grow Your Career.",

    buildYourNursingCareer:
      "Build your nursing career while helping people get the quality care they deserve.",

    findOpportunities:
      "Find Opportunities",

    families:
      "Families",

    nurses:
      "Nurses",

    satisfaction:
      "Satisfaction",

    professionalNurse:
      "Professional nurse",

    verifiedNurse:
      "Verified Nurse",

    professionalCaregiver:
      "Professional Caregiver",

    newOpportunity:
      "New Opportunity",

    findYourNextPatient:
      "Find your next patient",

    // =======================================================
    // FOR NURSES - HOW IT WORKS
    // =======================================================
    shareCareRequirements:
      "Share your care requirements, schedule, and location so we understand exactly what your family needs.",

    aiReviewsNurses:
      "Our AI reviews vetted, licensed nurses nearby and matches you with the best fit for your care and budget.",

    confirmYourBooking:
      "Confirm your booking, message your nurse directly, and track every visit from your NurseConnect dashboard.",

    everyNurseCompletes:
      "Every nurse completes license verification, background checks, and reference screening before joining.",

    ratingsAndReviews:
      "Ratings & Reviews",

    realFeedback:
      "Real feedback from families helps you choose a caregiver with confidence, every time.",

    bookOneOffVisits:
      "Book one-off visits, recurring care, or 24/7 support — whatever fits your family's routine.",

    coordinateDirectly:
      "Coordinate directly with your nurse through encrypted, in-app messaging at every step.",

    transparentPricing:
      "Transparent pricing and protected payments, released only once care is confirmed.",

    licensedAndInsured:
      "Licensed & Insured",

    allCaregivers:
      "All caregivers are licensed professionals covered by liability insurance for your peace of mind.",

    // =======================================================
    // FOR NURSES - BENEFITS
    // =======================================================
    everythingYouNeed:
      "Everything You Need",

    howNurseConnectSupportsYou:
      "How NurseConnect Supports You",

    nurseFeaturesDescription:
      "We built every feature with nurses in mind — from profile management to secure payments.",

    createYourProfile:
      "Create Your Profile",

    createYourProfileDescription:
      "Build a professional profile highlighting your qualifications, specializations, and experience in nursing.",

    setYourAvailability:
      "Set Your Availability",

    setYourAvailabilityDescription:
      "You're in control. Set your own schedule and only accept requests that fit your availability.",

    chooseYourCareTypes:
      "Choose Your Care Types",

    chooseYourCareTypesDescription:
      "Specialize in the areas you're most skilled in. Focus on patients you can genuinely help.",

    receiveCareRequests:
      "Receive Care Requests",

    receiveCareRequestsDescription:
      "Patients in your area can send you care requests that match your professional specializations.",

    communicateSecurely:
      "Communicate Securely",

    communicateSecurelyDescription:
      "Use our encrypted messaging system to coordinate with clients and families safely.",

    trackYourEarnings:
      "Track Your Earnings",

    trackYourEarningsDescription:
      "Transparent, weekly payouts. View your earnings history and manage your finances all in one place.",

    buildYourReputation:
      "Build Your Reputation",

    buildYourReputationDescription:
      "Collect verified reviews from patients. Great care leads to more bookings and higher rates.",

    manageBookings:
      "Manage Bookings",

    manageBookingsDescription:
      "A simple, clean dashboard to manage all your appointments and patient information.",

    // =======================================================
    // FOR NURSES - HOW TO JOIN
    // =======================================================
    howToJoin:
      "How to Join",

    gettingStarted:
      "Getting started takes less than 10 minutes.",

    createAccount:
      "Create Account",

    createAccountDescription:
      "Sign up with your professional details.",

    buildProfile:
      "Build Profile",

    buildProfileDescription:
      "Add your qualifications, specializations, and photo.",

    passVerification:
      "Pass Verification",

    passVerificationDescription:
      "We verify your license and run a background check.",

    startConnecting:
      "Start Connecting",

    startConnectingDescription:
      "Go live and start receiving care requests.",

    // =======================================================
    // NURSE TESTIMONIAL
    // =======================================================
    nurseTestimonial:
      "Nurse Testimonial",

    nurseTestimonialQuote:
      "NurseConnect gave me the freedom to do the work I love on my own terms. I set my own schedule, choose my patients, and earn more than I ever did at a clinic.",

    nurseExperienceLocation:
      "12 years experience • Oakland, CA",

    // =======================================================
    // AI PAGE
    // =======================================================
    aiCareAssistantDescription:
      "Describe your situation in plain language and I will recommend the right type of care and nurse profile for you.",

    describeTheSituation:
      "Describe the Situation",

    startVoiceInput:
      "Start Voice Input",

    stopRecording:
      "Stop Recording",

    listening:
      "Listening...",

    voiceInput:
      "Voice Input",

    careAssistantPlaceholder:
      "Type or speak: e.g. My mother is 75 and needs help with medication, walking, and daily monitoring after hip surgery...",

    toAnalyze:
      "to analyze",

    analyzing:
      "Analyzing...",

    analyzeNeeds:
      "Analyze Needs",

    tryAnExample:
      "Try an Example",

    microphonePermissionDenied:
      "Microphone permission denied. Please allow access in browser settings.",

    voiceCaptureError:
      "Voice capture error occurred. Please try speaking again.",

    speechRecognitionNotSupported:
      "Your browser does not support voice speech recognition. Please use Google Chrome or Microsoft Edge.",

    aiClinicalTriage:
      "AI Clinical Triage in Progress...",

    aiClinicalTriageDescription:
      "Scanning symptoms, assessing risk parameters, and matching specialized clinical profiles.",

    aiResultsWillAppearHere:
      "Your AI Results Will Appear Here",

    aiResultsDescription:
      'Describe your care situation on the left and click "Analyze Needs" to receive personalized recommendations.',

    urgentMedicalAttention:
      "Urgent Medical Attention Required (Red Flag Detected)",

    urgentMedicalAttentionDescription:
      "The symptoms described suggest potential acute instability. Contact emergency medical services immediately or proceed to the nearest emergency department without delaying for home care.",

    careProtocol:
      "Care Protocol",

    priority:
      "Priority",

    criticalParametersToMonitor:
      "Critical Parameters to Monitor",

    immediateActionSteps:
      "Immediate Action Steps",

    primaryRecommendedNurse:
      "Primary Recommended Nurse",

    viewNurseCV:
      "View Nurse CV",

    noCVAvailable:
      "No CV available",

    bookAppointment:
      "Book Appointment",

    secondaryAlternativeMatch:
      "Secondary Alternative Match",

    viewAlternateCV:
      "View Alternate CV",

    selectBackup:
      "Select Backup",

    cv:
      "CV",

    officialRegisteredCredentials:
      "Official Registered Credentials",

    open:
      "Open",

    close:
      "Close",

    nurseCV:
      "Nurse CV",

    // =======================================================
    // NURSE PROFILE / DASHBOARD
    // =======================================================
    "nurse.registeredNurse":
      "Registered Nurse",

    "nurse.loadingData":
      "Loading nurse data...",

    "nurse.profileNotAccessible":
      "Profile Not Accessible",

    "nurse.pleaseLogin":
      "Please log in.",

    "nurse.signIn":
      "Sign In",

    "nurse.applicationUnderReview":
      "Nurse Application Under Review",

    "nurse.waitingApproval":
      "Your profile is currently waiting for admin approval.",

    "nurse.cancel":
      "Cancel",

    "nurse.editProfile":
      "Edit Profile",

    "nurse.change":
      "Change",

    "nurse.uploadNewPhoto":
      "Upload new profile photo",

    "nurse.viewMyCV":
      "View My CV",

    "nurse.hourlyRate":
      "Hourly Rate",

    "nurse.totalBookings":
      "Total Bookings",

    "nurse.experience":
      "Experience",

    "nurse.years":
      "yrs",

    "nurse.reviews":
      "Reviews",

    "nurse.curriculumVitae":
      "Curriculum Vitae (CV)",

    "nurse.verifiedSubmitted":
      "Verified and submitted to the administration",

    "nurse.noCV":
      "No CV uploaded yet",

    "nurse.previewCV":
      "Preview CV",

    "nurse.openNewTab":
      "Open in new tab",

    "nurse.notProvided":
      "Not Provided",

    "nurse.editProfileDetails":
      "Edit Profile Details",

    "nurse.updateQualifications":
      "Update your clinical qualifications, contact details and documents.",

    "nurse.profileImage":
      "Profile Image",

    "nurse.replaceCV":
      "Replace CV / Resume",

    "nurse.uploadPDFImage":
      "Click to upload PDF/Image",

    "nurse.specialization":
      "Specialization",

    "nurse.experienceExample":
      "e.g. 5 yrs, 1-3",

    "nurse.rate":
      "Rate ($ / hr)",

    "nurse.locationCity":
      "Location / City",

    "nurse.phoneNumber":
      "Phone Number",

    "nurse.saveAllChanges":
      "Save All Changes",

    "nurse.allPatientBookings":
      "All Patient Bookings",

    "nurse.manageBookings":
      "Manage, update, and remove incoming care requests.",

    "nurse.total":
      "Total",

    "nurse.noBookings":
      "No bookings assigned to you yet.",

    "nurse.request":
      "Request",

    "nurse.bookedOn":
      "Booked on",

    "nurse.careType":
      "Care Type",

    "nurse.for":
      "For",

    "nurse.dateDuration":
      "Date & Duration",

    "nurse.patientContact":
      "Patient Contact",

    "nurse.noPhone":
      "No phone",

    "nurse.location":
      "Location",

    "nurse.viewMap":
      "View Map",

    "nurse.notes":
      "Notes",

    "nurse.pending":
      "Pending",

    "nurse.accepted":
      "Accepted",

    "nurse.rejected":
      "Rejected",

    "nurse.completed":
      "Completed",

    "nurse.decline":
      "Decline",

    "nurse.acceptBooking":
      "Accept Booking",

    "nurse.markCompleted":
      "Mark as Completed",

    "nurse.cvPreview":
      "Curriculum Vitae Preview",

    "nurse.open":
      "Open",

    "nurse.confirmDelete":
      "Are you sure you want to delete this booking record?",

    "nurse.failedUpdateStatus":
      "Failed to update status.",

    "nurse.failedDelete":
      "Failed to delete booking.",

    "nurse.failedUpdateProfile":
      "Failed to update profile details.",

    "nurse.couldNotLoad":
      "Could not load your profile and bookings.",

    // =======================================================
    // LOGIN
    // =======================================================
    welcomeBack:
      "Welcome Back",

    pleaseSignIn:
      "Please sign in to your account.",

    patientLogin:
      "Patient Login",

    nurseLogin:
      "Nurse Login",

    emailAddress:
      "Email Address",

    password:
      "Password",

    forgotPassword:
      "Forgot password?",

    rememberMe:
      "Remember me",

    signingIn:
      "Signing In...",

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
    // PATIENT REGISTER
    // =======================================================
    trustedSecure:
      "Trusted & Secure",

    empoweringHealthcareJourney:
      "Empowering your healthcare journey.",

    healthcareJourneyDescription:
      "Access verified, compassionate nursing care directly from your home. We're here to support your family's health.",

    findCareFamilyDeserves:
      "Find the care your family deserves.",

    joinNurseConnectDescription:
      "Join NurseConnect to connect with verified, compassionate nurses in your area.",

    firstName:
      "First Name",

    lastName:
      "Last Name",

    firstNamePlaceholder:
      "Jane",

    lastNamePlaceholder:
      "Doe",

    phoneNumber:
      "Phone Number",

    phonePlaceholder:
      "(555) 000-0000",

    creatingAccount:
      "Creating Account...",

    createPatientAccount:
      "Create Patient Account",

    securePrivate:
      "Secure & Private.",

    securePrivateDescription:
      "HIPAA compliant platform with 256-bit encryption ensuring your data remains completely private.",

    alreadyHaveAccount:
      "Already have an account?",

    registrationError:
      "An error occurred while creating the account. Please try again later.",

    // =======================================================
    // NURSE REGISTRATION
    // =======================================================
    accountCreation:
      "ACCOUNT CREATION",

    joinTrustedProfessionals:
      "Join our network of trusted healthcare professionals.",

    nurseApplicationDescription:
      "Please provide your personal information, profile photo, and credentials for verification. Our team reviews all applications within 24–48 hours.",

    personalInformation:
      "01 / Personal Information",

    fullLegalName:
      "Full Legal Name",

    fullNamePlaceholder:
      "Jane Doe",

    professionalProfile:
      "02 / Professional Profile",

    primarySpecialization:
      "Primary Specialization",

    selectSpecialization:
      "Select specialization...",

    pediatricCare:
      "Pediatric Care",

    geriatricCare:
      "Geriatric Care",

    icuCriticalCare:
      "ICU / Critical Care",

    postOperativeCare:
      "Post-Operative Care",

    yearsOfExperience:
      "Years of Experience",

    selectYears:
      "Select years...",

    lessThanOneYear:
      "Less than 1 year",

    oneToThreeYears:
      "1 - 3 years",

    threeToFiveYears:
      "3 - 5 years",

    fiveToTenYears:
      "5–10 years",

    tenPlusYears:
      "10+ years",

    currentLocation:
      "Current Location / Region",

    selectCareCategories:
      "Select Care Categories / Services Provided",

    selected:
      "selected",

    homeCare:
      "Home Care",

    postSurgeryCare:
      "Post-Surgery Care",

    woundDressing:
      "Wound Dressing",

    ivTherapy:
      "IV Therapy & Injections",

    icuSupport:
      "ICU Support",

    physicalTherapy:
      "Physical Therapy Assistance",

    typeOfCare:
      "Type of care",

    selectPrimaryCareType:
      "Please select the primary type of care required. You can discuss specific details later.",

    mobilityAssistance:
      "Mobility Assistance",

    other:
      "Other",

    back:
      "Back",

    continue:
      "Continue",

    profilePhotoCvUpload:
      "03 / Profile Photo & CV Upload",

    acceptedFormats:
      "Accepted formats: JPG, PNG, WEBP, PDF (Max 5MB)",

    profilePicture:
      "Profile Picture (Photo)",

    clickToUploadPhoto:
      "Click to upload photo",

    curriculumVitae:
      "Curriculum Vitae (CV)",

    clickToUploadCv:
      "Click to upload CV",

    submitting:
      "Submitting...",

    submitRegistration:
      "Submit Registration",

    logIn:
      "Log In",

    uploadProfilePhoto:
      "Please upload a profile photo.",

    uploadCv:
      "Please upload your CV.",

    selectAtLeastOneCategory:
      "Please select at least one care category / service.",

    nurseRegistrationError:
      "An error occurred while creating the account. Please try again later.",

    // =======================================================
    // WHO NEEDS CARE
    // =======================================================
    whoNeedsCare:
      "Who needs care?",

    selectPrimaryPerson:
      "Select the primary person requiring nursing services to help us tailor the experience.",

    myself:
      "Myself",

    parent:
      "Parent",

    child:
      "Child",

    personWithDisability:
      "Person with disability",

    spousePartner:
      "Spouse / Partner",

    selectNurseToContinue:
      "Please select a nurse to continue your booking.",

    // =======================================================
    // WHEN & WHERE
    // =======================================================
    whenAndWhere:
      "When & Where",

    whenWhereDescription:
      "Tell us when and where you need nursing care.",

    startDate:
      "Start Date",

    careDuration:
      "Care Duration",

    selectDuration:
      "Select duration",

    oneHour:
      "1 Hour",

    twoHours:
      "2 Hours",

    fourHours:
      "4 Hours",

    eightHours:
      "8 Hours",

    twelveHours:
      "12 Hours",

    twentyFourHours:
      "24 Hours",

    careAddress:
      "Care Address",

    enterCareAddressPlaceholder:
      "Enter your care address",

    search:
      "Search",

    searching:
      "Searching...",

    addressSearchHint:
      "Enter your address and press Search or Enter.",

    careLocation:
      "Care Location",

    mapLocationHint:
      "You can also select a location directly on the map.",

    latitude:
      "Latitude",

    longitude:
      "Longitude",

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
	joinAsANurse:
	"Join as a Nurse",
	   patient: "Patient", nurse: "Nurse", admin: "Admin", myProfile: "My Profile", nurseWorkspace: "Nurse Workspace", adminDashboard: "Admin Dashboard", systemSettings: "System Settings", signOut: "Sign Out", signedInAs: "Signed in as",

	// English
familiesServed: "Families Served",
verifiedNurses: "Verified Nurses",
averageRating: "Average Rating",
supportAvailable: "Support Available",

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

    "review.oneHour":
      "1 Hour",

    "review.twoHours":
      "2 Hours",

    "review.fourHours":
      "4 Hours",

    "review.eightHours":
      "8 Hours",

    "review.twelveHours":
      "12 Hours",

    "review.twentyFourHours":
      "24 Hours",

    // =======================================================
    // LICENSE VERIFICATION
    // =======================================================
    "licenseVerification.registrationSubmitted":
      "REGISTRATION SUBMITTED",

    "licenseVerification.onboardingStatus":
      "Onboarding Status",

    "licenseVerification.trackApplication":
      "Track your application and complete the required steps.",

    "licenseVerification.accountCreated":
      "ACCOUNT CREATED",

    "licenseVerification.licenseVerification":
      "LICENSE VERIFICATION",

    "licenseVerification.backgroundCheck":
      "BACKGROUND CHECK",

    "licenseVerification.activation":
      "ACTIVATION",

    "licenseVerification.activeProcess":
      "ACTIVE PROCESS",

    "licenseVerification.inProgress":
      "IN PROGRESS",

    "licenseVerification.reviewDescription":
      "We have received your documents and your professional credentials are currently being reviewed. This verification helps ensure all nurses meet our professional standards.",

    "licenseVerification.documentsSubmitted":
      "DOCUMENTS SUBMITTED",

    "licenseVerification.nursingLicense":
      "Nursing License",

    "licenseVerification.curriculumVitae":
      "Curriculum Vitae",

    "licenseVerification.verificationStatus":
      "VERIFICATION STATUS",

    "licenseVerification.documentsUnderReview":
      "Documents Under Review",

    "licenseVerification.usuallyCompleted":
      "Usually completed within 24–48 hours.",

    "licenseVerification.secureMessage":
      "Your documents are securely reviewed by our verification team. You will be notified when this step is complete.",

    "licenseVerification.requiredActions":
      "REQUIRED ACTIONS",

    "licenseVerification.applicationSubmitted":
      "Application Submitted",

    "licenseVerification.noActionRequired":
      "Your registration has been successfully submitted. No additional action is required at this stage.",

    "licenseVerification.nextStep":
      "NEXT STEP",

    // =======================================================
    // BACKGROUND CHECK
    // =======================================================
    "backgroundCheck.registrationSubmitted":
      "REGISTRATION SUBMITTED",

    "backgroundCheck.title":
      "Background Check",

    "backgroundCheck.stepDescription":
      "Step 3 of 4 in your onboarding process.",

    "backgroundCheck.profile":
      "PROFILE",

    "backgroundCheck.license":
      "LICENSE",

    "backgroundCheck.background":
      "BACKGROUND",

    "backgroundCheck.activation":
      "ACTIVATION",

    "backgroundCheck.currentStatus":
      "CURRENT STATUS",

    "backgroundCheck.inProgress":
      "IN PROGRESS",

    "backgroundCheck.description":
      "Your background check has been initiated. Our verification team is reviewing the required information before your account can be activated.",

    "backgroundCheck.requiredActions":
      "REQUIRED ACTIONS",

    "backgroundCheck.verificationInformation":
      "Verification Information",

    "backgroundCheck.informationDescription":
      "Please make sure that the information provided during registration is accurate and complete.",

    "backgroundCheck.reviewInformation":
      "Review Information",

    "backgroundCheck.securityMessage":
      "Your information is handled securely and is only used for professional verification purposes.",

    "backgroundCheck.verificationScope":
      "Verification Scope",

    "backgroundCheck.criminalRecords":
      "Criminal Records Search",

    "backgroundCheck.sexRegistry":
      "Sex Registry Check",

    "backgroundCheck.employmentVerification":
      "Employment Verification",

    "backgroundCheck.educationVerification":
      "Education Verification",

    "backgroundCheck.timeline":
      "Timeline",

    "backgroundCheck.requestSubmitted":
      "Request Submitted",

    "backgroundCheck.backgroundStarted":
      "Background check started",

    "backgroundCheck.backgroundReview":
      "Background Review",

    "backgroundCheck.currentlyInProgress":
      "Currently in progress",

    "backgroundCheck.approval":
      "Approval",

    "backgroundCheck.waitingVerification":
      "Waiting for verification",

    // =======================================================
    // ACTIVATED
    // =======================================================
    "activated.registrationSubmitted":
      "REGISTRATION SUBMITTED",

    "activated.title":
      "Account Activated",

    "activated.profile":
      "PROFILE",

    "activated.license":
      "LICENSE",

    "activated.background":
      "BACKGROUND",

    "activated.activation":
      "ACTIVATION",

    "activated.successTitle":
      "Account Activated & Ready for Work!",

    "activated.successDescription":
      "Welcome to the team. Your clinical credentials have been verified, and your profile is now active on NurseConnect.",

    "activated.firstSteps":
      "Your First Steps",

    "activated.completeProfile":
      "Complete Your Profile",

    "activated.completeProfileDescription":
      "Add your professional experience and preferences so patients can find you.",

    "activated.setAvailability":
      "Set Your Availability",

    "activated.setAvailabilityDescription":
      "Choose when you are available for new nursing requests.",

    "activated.browseRequests":
      "Browse Care Requests",

    "activated.browseRequestsDescription":
      "View suitable patient requests and apply to provide care.",

    "activated.nurseConnect":
      "NURSECONNECT",

    "activated.registeredNurse":
      "Registered Nurse",

    "activated.profileReady":
      "Your profile is ready.",

    "activated.profileReadyDescription":
      "Patients can now discover your profile and send care requests.",

    "activated.goToProfile":
      "Go to Profile",

    "activated.startFindingRequests":
      "Start Finding Care Requests",

    // =======================================================
    // PATIENT PROFILE
    // =======================================================
    "patientProfile.loading":
      "Loading your profile & bookings...",

    "patientProfile.accessDenied":
      "Access Denied",

    "patientProfile.loginToContinue":
      "Please sign in to continue.",

    "patientProfile.signIn":
      "Sign In",

    "patientProfile.memberSince":
      "Member since",

    "patientProfile.noPhone":
      "No phone provided",

    "patientProfile.bookNewCare":
      "Book New Care",

    "patientProfile.careRequestsStatus":
      "Your Care Requests & Status",

    "patientProfile.followUp":
      "Follow up on your bookings and check whether your request is approved.",

    "patientProfile.requests":
      "Requests",

    "patientProfile.noCareRequests":
      "No care requests yet",

    "patientProfile.noCareRequestsDescription":
      "You have not booked any healthcare provider yet. Choose a qualified nurse for your family.",

    "patientProfile.findNurse":
      "Find a Nurse",

    "patientProfile.booking":
      "Booking",

    "patientProfile.createdOn":
      "Created on",

    "patientProfile.accepted":
      "Accepted",

    "patientProfile.pending":
      "Pending",

    "patientProfile.rejected":
      "Declined",

    "patientProfile.completed":
      "Completed",

    "patientProfile.serviceType":
      "Service Type",


    "patientProfile.for":
      "For",

    "patientProfile.schedule":
      "Schedule",

    "patientProfile.selectedNurse":
      "Selected Nurse",

    "patientProfile.generalBooking":
      "General Booking",

    "patientProfile.careAddress":
      "Care Address",

    "patientProfile.specialNotes":
      "Special Notes",
	"common.back":
	"Back" ,
	"common.continue":
	"Continue",
	"confirmation.title": "Care Request Submitted!",
"confirmation.description":
  "We're matching you with the best suitable nurse in your area. You'll receive a confirmation shortly.",

"confirmation.preferredNurse": "Preferred Nurse",
"confirmation.careFor": "Care For",
"confirmation.careType": "Care Type",
"confirmation.startDate": "Start Date",
"confirmation.duration": "Duration",
"confirmation.location": "Location",

"confirmation.oneHour": "1 Hour",
"confirmation.twoHours": "2 Hours",
"confirmation.fourHours": "4 Hours",
"confirmation.eightHours": "8 Hours",
"confirmation.twelveHours": "12 Hours",
"confirmation.twentyFourHours": "24 Hours",

"confirmation.dashboard": "View My Dashboard",
"confirmation.browseNurses": "Browse Nurses",
  },

  // =========================================================
  // ARABIC
  // =========================================================
  ar: {
    // =======================================================
    // NAVBAR
    // =======================================================
    home:
      "الرئيسية",

    nurseConnect:
      "NurseConnect",

    findNurse:
      "ابحث عن ممرض",

    forNurses:
      "للممرضين",

    aiAssistant:
      "مساعد الرعاية بالذكاء الاصطناعي",

    arabic:
      "عربي",

    english:
      "English",

    signIn:
      "تسجيل الدخول",

    getStarted:
      "ابدأ الآن",

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
// Arabic
familiesServed: "عائلات تمت خدمتها",
verifiedNurses: "ممرضون موثّقون",
averageRating: "متوسط التقييم",
supportAvailable: "دعم متوفر على مدار الساعة",
common: {
  back: "رجوع",
  continue: "متابعة",
},
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
    all:
      "الكل",

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
    // AI CARE ASSISTANT
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
	joinAsANurse:
	"انضمي كممرضة 🩺",
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

    // =======================================================
    // READY TO START
    // =======================================================
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
    // TESTIMONIALS
    // =======================================================
    testimonialEmilyQuote:
      "جعلت NurseConnect العثور على مقدم رعاية لوالدتي أمرًا سهلًا جدًا. ساعدتني المطابقة بالذكاء الاصطناعي في العثور على شخص لديه خبرة في رعاية مرضى الخرف خلال يوم واحد.",

    testimonialEmilyName:
      "إميلي بول",

    testimonialEmilyRole:
      "ابنة ومقدمة رعاية",

    testimonialDanielQuote:
      "بصفتي والدًا جديدًا أتعافى من عملية جراحية، فإن وجود ممرض موثوق يصل في الوقت المحدد في كل مرة منح عائلتنا بأكملها راحة البال.",

    testimonialDanielName:
      "دانيال مارتن",

    testimonialDanielRole:
      "والد جديد",

    testimonialJohnQuote:
      "عملية التحقق دقيقة وشاملة، وهذا يظهر في مستوى الخدمة. كان ممرضنا محترفًا وودودًا ومهتمًا حقًا بتعافي والدي.",

    testimonialJohnName:
      "جون روبرتس",

    testimonialJohnRole:
      "ابن ومنسق للرعاية",

    // =======================================================
    // FIND NURSE
    // =======================================================
    findANurse:
      "ابحث عن ممرض",

    findNurseDescription:
      "اعثر على ممرضين مؤهلين يمكنهم تقديم الرعاية التي تحتاجها.",

    findQualifiedNurses:
      "اعثر على ممرضين مؤهلين يمكنهم تقديم الرعاية التي تحتاجها.",

    searchNurses:
      "ابحث عن ممرضين...",

    searchByNameSpecialtyLocation:
      "ابحث بالاسم أو التخصص أو الموقع...",

    sort:
      "ترتيب",

    sortBy:
      "ترتيب حسب",

    topRated:
      "الأعلى تقييمًا",

    sortTopRated:
      "الترتيب: الأعلى تقييمًا",

    priceLowToHigh:
      "السعر: من الأقل إلى الأعلى",

    priceHighToLow:
      "السعر: من الأعلى إلى الأقل",

    nameAZ:
      "الاسم: من أ إلى ي",

    mostExperienced:
      "الأكثر خبرة",

    filters:
      "الفلاتر",

    filterNurses:
      "تصفية الممرضين",

    refineSearch:
      "حسّن بحثك حسب التقييم والسعر والخبرة والموقع.",

    clearFilters:
      "مسح الفلاتر",

    minRating:
      "الحد الأدنى للتقييم",

    minimumRating:
      "الحد الأدنى للتقييم",

    anyRating:
      "أي تقييم",

    priceRange:
      "نطاق السعر",

    anyPrice:
      "أي سعر",

    under50:
      "أقل من 50$ / ساعة",

    price50To65:
      "50$ - 65$ / ساعة",

    above65:
      "أكثر من 65$",

    price65Plus:
      "65$+ / ساعة",

    experienceRange:
      "الخبرة",

    anyExperience:
      "أي خبرة",

    oneToThreeYears:
      "من سنة إلى 3 سنوات",

    experience1To3:
      "من سنة إلى 3 سنوات",

    threeToFiveYears:
      "من 3 إلى 5 سنوات",

    experience3To5:
      "من 3 إلى 5 سنوات",

    fivePlusYears:
      "5 سنوات أو أكثر",

    experience5Plus:
      "5 سنوات أو أكثر",

    locationFilter:
      "الموقع",

    locationExample:
      "مثال: بيروت",

    results:
      "النتائج",

    nursesFound:
      "ممرضين تم العثور عليهم",

    rate:
      "تقييم",

    rateNurse:
      "تقييم الممرض",

    outOfFiveStars:
      "من أصل 5 نجوم",

    feedbackReview:
      "ملاحظات / مراجعة",

    optional:
      "اختياري",

    writeExperience:
      "اكتب تجربتك مع هذا الممرض...",

    cancel:
      "إلغاء",

    submitRating:
      "إرسال التقييم",

    loadingNurses:
      "جاري تحميل الممرضين...",

    failedToLoadNurses:
      "فشل تحميل الممرضين",

    errorConnectingBackend:
      "حدث خطأ أثناء الاتصال بالخادم",

    noNursesFound:
      "لم يتم العثور على ممرضين",

    tryAnotherSearch:
      "جرّب اسمًا أو تخصصًا أو موقعًا أو فئة أو فلترًا آخر.",

    previous:
      "السابق",

    next:
      "التالي",

    ratingSubmitted:
      "تم إرسال تقييمك بنجاح.",

    failedSubmitRating:
      "فشل إرسال التقييم. يرجى التأكد من تسجيل الدخول.",

    nurse:
      "ممرض",

    // =======================================================
    // NURSE CARD
    // =======================================================
    nurseProfessional:
      "ممرض متخصص",

    generalHealthcare:
      "الرعاية الصحية العامة",

    locationNotAvailable:
      "الموقع غير متوفر",

    yrsExperience:
      "سنوات من الخبرة",

    experienceNotSpecified:
      "الخبرة غير محددة",

    profile:
      "الملف الشخصي",

    book:
      "احجز",
// Profile 
patient: "مريض",
nurse: "ممرضة", admin: "مسؤول", myProfile: "الملف الشخصي", nurseWorkspace: "مساحة عمل الممرضة", adminDashboard: "لوحة تحكم المسؤول", systemSettings: "إعدادات النظام", signOut: "تسجيل الخروج", signedInAs: "مسجل الدخول باسم",
    // =======================================================
    // FOR NURSES
    // =======================================================
    joinOurNursingCommunity:
      "انضم إلى مجتمع التمريض لدينا",

    makeADifference:
      "أحدث فرقًا.",

    careForOthers:
      "اهتم بالآخرين.",

    connectWithPatients:
      "تواصل مع المرضى الذين يحتاجون إلى رعاية تمريضية متخصصة وأحدث فرقًا حقيقيًا في حياتهم.",

    professionalNursingOpportunities:
      "فرص مهنية في مجال التمريض",

    yourSkills:
      "مهاراتك،",

    theirCare:
      "رعايتهم.",

    findMeaningfulOpportunities:
      "اعثر على فرص تمريضية مميزة وقدّم رعاية إنسانية للمرضى وعائلاتهم.",

    growWithNurseConnect:
      "تطوّر مع NurseConnect",

    careWithPurpose:
      "قدّم الرعاية بهدف.",

    growYourCareer:
      "طوّر مسيرتك المهنية.",

    buildYourNursingCareer:
      "طوّر مسيرتك المهنية في مجال التمريض وساعد الناس في الحصول على الرعاية الصحية التي يستحقونها.",

    findOpportunities:
      "اكتشف الفرص",

    families:
      "عائلات",

    nurses:
      "ممرضون",

    satisfaction:
      "نسبة الرضا",

    professionalNurse:
      "ممرض متخصص",

    verifiedNurse:
      "ممرض موثّق",

    professionalCaregiver:
      "مقدّم رعاية متخصص",

    newOpportunity:
      "فرصة جديدة",

    findYourNextPatient:
      "اعثر على مريضك القادم",

    shareCareRequirements:
      "شاركنا متطلبات الرعاية والجدول الزمني والموقع حتى نفهم تمامًا ما تحتاجه عائلتك.",

    aiReviewsNurses:
      "يقوم الذكاء الاصطناعي لدينا بمراجعة الممرضين المرخّصين والموثوقين بالقرب منك ويطابقك مع الأنسب لاحتياجاتك وميزانيتك.",

    confirmYourBooking:
      "أكد حجزك، وتواصل مباشرةً مع ممرضك، وتابع كل زيارة من خلال لوحة تحكم NurseConnect.",

    everyNurseCompletes:
      "يخضع كل ممرض للتحقق من الترخيص وفحص الخلفية والتحقق من المراجع قبل الانضمام.",

    ratingsAndReviews:
      "التقييمات والمراجعات",

    realFeedback:
      "تساعدك آراء العائلات الحقيقية على اختيار مقدم الرعاية المناسب بثقة في كل مرة.",

    bookOneOffVisits:
      "احجز زيارات لمرة واحدة، أو رعاية متكررة، أو دعمًا على مدار الساعة طوال أيام الأسبوع — بما يناسب روتين عائلتك.",

    coordinateDirectly:
      "تواصل مباشرةً مع ممرضك من خلال مراسلة مشفّرة داخل التطبيق في كل خطوة.",

    transparentPricing:
      "أسعار واضحة ومدفوعات محمية لا يتم تحريرها إلا بعد تأكيد تقديم الرعاية.",

    licensedAndInsured:
      "مرخّصون ومؤمّنون",

    allCaregivers:
      "جميع مقدمي الرعاية هم متخصصون مرخّصون ومغطّون بتأمين المسؤولية لراحة بالك.",

    // =======================================================
    // BENEFITS
    // =======================================================
    everythingYouNeed:
      "كل ما تحتاجه",

    howNurseConnectSupportsYou:
      "كيف يدعمك NurseConnect",

    nurseFeaturesDescription:
      "صممنا كل ميزة مع وضع احتياجات الممرضين في الاعتبار — من إدارة الملف الشخصي إلى المدفوعات الآمنة.",

    createYourProfile:
      "أنشئ ملفك الشخصي",

    createYourProfileDescription:
      "أنشئ ملفًا مهنيًا يبرز مؤهلاتك وتخصصاتك وخبرتك في مجال التمريض.",

    setYourAvailability:
      "حدد أوقات توفرك",

    setYourAvailabilityDescription:
      "أنت من يحدد جدولك. اختر أوقات عملك واقبل فقط الطلبات التي تناسب أوقات توفرك.",

    chooseYourCareTypes:
      "اختر أنواع الرعاية",

    chooseYourCareTypesDescription:
      "تخصص في المجالات التي تتمتع فيها بأكبر قدر من الخبرة، وركّز على المرضى الذين يمكنك مساعدتهم فعليًا.",

    receiveCareRequests:
      "استقبل طلبات الرعاية",

    receiveCareRequestsDescription:
      "يمكن للمرضى في منطقتك إرسال طلبات رعاية تتناسب مع تخصصاتك المهنية.",

    communicateSecurely:
      "تواصل بأمان",

    communicateSecurelyDescription:
      "استخدم نظام المراسلة المشفّر لدينا للتواصل بأمان مع العملاء والعائلات.",

    trackYourEarnings:
      "تابع أرباحك",

    trackYourEarningsDescription:
      "مدفوعات أسبوعية واضحة وشفافة. يمكنك عرض سجل أرباحك وإدارة أموالك من مكان واحد.",

    buildYourReputation:
      "ابنِ سمعتك المهنية",

    buildYourReputationDescription:
      "اجمع تقييمات موثّقة من المرضى. الرعاية الجيدة تساعدك في الحصول على المزيد من الحجوزات وزيادة أسعارك.",

    manageBookings:
      "إدارة الحجوزات",

    manageBookingsDescription:
      "لوحة تحكم بسيطة ومنظمة لإدارة جميع مواعيدك ومعلومات المرضى.",

    // =======================================================
    // HOW TO JOIN
    // =======================================================
    howToJoin:
      "كيفية الانضمام",

    gettingStarted:
      "البدء يستغرق أقل من 10 دقائق.",

    createAccount:
      "إنشاء حساب",

    createAccountDescription:
      "سجّل حسابك باستخدام معلوماتك المهنية.",

    buildProfile:
      "إنشاء الملف الشخصي",

    buildProfileDescription:
      "أضف مؤهلاتك وتخصصاتك وصورتك الشخصية.",

    passVerification:
      "اجتياز التحقق",

    passVerificationDescription:
      "نتحقق من ترخيصك ونجري فحصًا للخلفية.",

    startConnecting:
      "ابدأ بالتواصل",

    startConnectingDescription:
      "فعّل ملفك وابدأ باستقبال طلبات الرعاية.",

    // =======================================================
    // NURSE TESTIMONIAL
    // =======================================================
    nurseTestimonial:
      "تجربة ممرض",

    nurseTestimonialQuote:
      "منحني NurseConnect الحرية لأقوم بالعمل الذي أحبه بالطريقة التي تناسبني. أحدد جدولي بنفسي، وأختار مرضاي، وأكسب أكثر مما كنت أكسبه في العيادة.",

    nurseExperienceLocation:
      "12 سنة من الخبرة • أوكلاند، كاليفورنيا",

    // =======================================================
    // AI PAGE
    // =======================================================
    aiCareAssistantDescription:
      "صف حالتك بطريقة بسيطة وسأقترح لك نوع الرعاية المناسب وملف الممرض المناسب لاحتياجاتك.",

    describeTheSituation:
      "صف الحالة",

    startVoiceInput:
      "بدء الإدخال الصوتي",

    stopRecording:
      "إيقاف التسجيل",

    listening:
      "جارٍ الاستماع...",

    voiceInput:
      "إدخال صوتي",

    careAssistantPlaceholder:
      "اكتب أو تحدث، مثال: والدتي تبلغ 75 عامًا وتحتاج إلى المساعدة في تناول الأدوية والمشي والمتابعة اليومية بعد عملية الورك...",

    toAnalyze:
      "للتحليل",

    analyzing:
      "جارٍ التحليل...",

    analyzeNeeds:
      "تحليل الاحتياجات",

    tryAnExample:
      "جرّب مثالًا",

    microphonePermissionDenied:
      "تم رفض إذن استخدام الميكروفون. يرجى السماح بالوصول إليه من إعدادات المتصفح.",

    voiceCaptureError:
      "حدث خطأ أثناء التقاط الصوت. يرجى المحاولة مرة أخرى.",

    speechRecognitionNotSupported:
      "متصفحك لا يدعم التعرف على الكلام. يرجى استخدام Google Chrome أو Microsoft Edge.",

    aiClinicalTriage:
      "جارٍ إجراء التقييم السريري بالذكاء الاصطناعي...",

    aiClinicalTriageDescription:
      "جارٍ تحليل الأعراض وتقييم عوامل الخطورة ومطابقة الحالات مع ملفات تمريضية متخصصة.",

    aiResultsWillAppearHere:
      "ستظهر نتائج الذكاء الاصطناعي هنا",

    aiResultsDescription:
      'صف حالة الرعاية الخاصة بك على اليسار واضغط على "تحليل الاحتياجات" للحصول على توصيات مخصصة.',

    urgentMedicalAttention:
      "مطلوب عناية طبية عاجلة (تم اكتشاف علامة خطرة)",

    urgentMedicalAttentionDescription:
      "الأعراض التي تم وصفها قد تشير إلى حالة صحية حادة وغير مستقرة. اتصل بخدمات الطوارئ الطبية فورًا أو توجّه إلى أقرب قسم طوارئ دون تأخير للحصول على الرعاية المنزلية.",

    careProtocol:
      "بروتوكول الرعاية",

    priority:
      "الأولوية",

    criticalParametersToMonitor:
      "المؤشرات الحيوية المهمة للمراقبة",

    immediateActionSteps:
      "خطوات الرعاية الفورية",

    primaryRecommendedNurse:
      "الممرض الموصى به الأساسي",

    viewNurseCV:
      "عرض السيرة الذاتية للممرض",

    noCVAvailable:
      "السيرة الذاتية غير متوفرة",

    bookAppointment:
      "حجز موعد",

    secondaryAlternativeMatch:
      "الممرض البديل المقترح",

    viewAlternateCV:
      "عرض السيرة الذاتية البديلة",

    selectBackup:
      "اختيار البديل",

    cv:
      "السيرة الذاتية",

    officialRegisteredCredentials:
      "المؤهلات الرسمية المسجلة",

    open:
      "فتح",

    close:
      "إغلاق",

    nurseCV:
      "السيرة الذاتية للممرض",

    // =======================================================
    // NURSE PROFILE / DASHBOARD
    // =======================================================
    "nurse.registeredNurse":
      "ممرّض/ة مسجّل/ة",

    "nurse.loadingData":
      "جارٍ تحميل بيانات الممرّض/ة...",

    "nurse.profileNotAccessible":
      "الملف الشخصي غير متاح",

    "nurse.pleaseLogin":
      "يرجى تسجيل الدخول.",

    "nurse.signIn":
      "تسجيل الدخول",

    "nurse.applicationUnderReview":
      "طلب الانضمام كممرّض/ة قيد المراجعة",

    "nurse.waitingApproval":
      "ملفك الشخصي بانتظار موافقة المسؤول.",

    "nurse.cancel":
      "إلغاء",

    "nurse.editProfile":
      "تعديل الملف الشخصي",

    "nurse.change":
      "تغيير",

    "nurse.uploadNewPhoto":
      "اضغط لاختيار صورة شخصية جديدة",

    "nurse.viewMyCV":
      "عرض سيرتي الذاتية",

    "nurse.hourlyRate":
      "الأجر بالساعة",

    "nurse.totalBookings":
      "إجمالي الحجوزات",

    "nurse.experience":
      "الخبرة",

    "nurse.years":
      "سنة",

    "nurse.reviews":
      "التقييمات",

    "nurse.curriculumVitae":
      "السيرة الذاتية (CV)",

    "nurse.verifiedSubmitted":
      "تم التحقق منها وإرسالها إلى الإدارة",

    "nurse.noCV":
      "لم يتم رفع السيرة الذاتية بعد",

    "nurse.previewCV":
      "معاينة السيرة الذاتية",

    "nurse.openNewTab":
      "فتح في علامة تبويب جديدة",

    "nurse.notProvided":
      "غير متوفرة",

    "nurse.editProfileDetails":
      "تعديل تفاصيل الملف الشخصي",

    "nurse.updateQualifications":
      "حدّث مؤهلاتك السريرية وبيانات الاتصال والمستندات.",

    "nurse.profileImage":
      "الصورة الشخصية",

    "nurse.replaceCV":
      "استبدال السيرة الذاتية",

    "nurse.uploadPDFImage":
      "اضغط لرفع PDF أو صورة",

    "nurse.specialization":
      "التخصص",

    "nurse.experienceExample":
      "مثال: 5 سنوات، 1-3",

    "nurse.rate":
      "السعر ($ / ساعة)",

    "nurse.locationCity":
      "الموقع / المدينة",

    "nurse.phoneNumber":
      "رقم الهاتف",

    "nurse.saveAllChanges":
      "حفظ جميع التغييرات",

    "nurse.allPatientBookings":
      "جميع حجوزات المرضى",

    "nurse.manageBookings":
      "إدارة وتحديث وحذف طلبات الرعاية الواردة.",

    "nurse.total":
      "الإجمالي",

    "nurse.noBookings":
      "لا توجد حجوزات مخصصة لك حتى الآن.",

    "nurse.request":
      "الطلب",

    "nurse.bookedOn":
      "تم الحجز في",

    "nurse.careType":
      "نوع الرعاية",

    "nurse.for":
      "لـ",

    "nurse.dateDuration":
      "التاريخ والمدة",

    "nurse.patientContact":
      "بيانات اتصال المريض",

    "nurse.noPhone":
      "لا يوجد رقم هاتف",

    "nurse.location":
      "الموقع",

    "nurse.viewMap":
      "عرض الخريطة",

    "nurse.notes":
      "ملاحظات",

    "nurse.pending":
      "قيد الانتظار",

    "nurse.accepted":
      "مقبول",

    "nurse.rejected":
      "مرفوض",

    "nurse.completed":
      "مكتمل",

    "nurse.decline":
      "رفض",

    "nurse.acceptBooking":
      "قبول الحجز",

    "nurse.markCompleted":
      "تحديد كمكتمل",

    "nurse.cvPreview":
      "معاينة السيرة الذاتية",

    "nurse.open":
      "فتح",

    "nurse.confirmDelete":
      "هل أنت متأكد أنك تريد حذف سجل الحجز هذا؟",

    "nurse.failedUpdateStatus":
      "فشل تحديث الحالة.",

    "nurse.failedDelete":
      "فشل حذف الحجز.",

    "nurse.failedUpdateProfile":
      "فشل تحديث تفاصيل الملف الشخصي.",

    "nurse.couldNotLoad":
      "تعذّر تحميل ملفك الشخصي وحجوزاتك.",

    // =======================================================
    // LOGIN
    // =======================================================
    welcomeBack:
      "مرحبًا بعودتك",

    pleaseSignIn:
      "يرجى تسجيل الدخول إلى حسابك.",

    patientLogin:
      "تسجيل دخول المريض",

    nurseLogin:
      "تسجيل دخول الممرض",

    emailAddress:
      "البريد الإلكتروني",

    password:
      "كلمة المرور",

    forgotPassword:
      "هل نسيت كلمة المرور؟",

    rememberMe:
      "تذكرني",

    signingIn:
      "جارٍ تسجيل الدخول...",

    orContinueWith:
      "أو المتابعة باستخدام",

    googleLoginUnavailable:
      "خدمة تسجيل الدخول باستخدام Google غير متاحة",

    dontHaveAccount:
      "ليس لديك حساب؟",

    wantToJoinNetwork:
      "هل تريد الانضمام إلى شبكتنا؟",

    loginError:
      "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى لاحقًا.",

    googleLoginFailed:
      "فشل تسجيل الدخول باستخدام Google",

    medicalStaffAlt:
      "طاقم طبي يتعاون معًا",

    compassionateCareTitle:
      "رعاية متعاطفة، وتواصل احترافي.",

    compassionateCareDescription:
      "نُسهّل التواصل وسير العمل الأساسي لتقديم نتائج أفضل للمرضى.",

    // =======================================================
    // PATIENT REGISTRATION
    // =======================================================
    trustedSecure:
      "موثوق وآمن",

    empoweringHealthcareJourney:
      "نساعدك في رحلتك الصحية.",

    healthcareJourneyDescription:
      "احصل على رعاية تمريضية موثوقة ومتعاطفة مباشرة من منزلك. نحن هنا لدعم صحة عائلتك.",

    findCareFamilyDeserves:
      "اعثر على الرعاية التي تستحقها عائلتك.",

    joinNurseConnectDescription:
      "انضم إلى NurseConnect للتواصل مع ممرضين موثوقين ومتعاطفين في منطقتك.",

    firstName:
      "الاسم الأول",

    lastName:
      "اسم العائلة",

    firstNamePlaceholder:
      "جين",

    lastNamePlaceholder:
      "دو",

    phoneNumber:
      "رقم الهاتف",

    phonePlaceholder:
      "0000-000 (555)",

    creatingAccount:
      "جارٍ إنشاء الحساب...",

    createPatientAccount:
      "إنشاء حساب مريض",

    securePrivate:
      "آمن وخاص.",

    securePrivateDescription:
      "منصة متوافقة مع معايير HIPAA وتستخدم تشفيرًا بمستوى 256 بت لضمان بقاء بياناتك خاصة بالكامل.",

    alreadyHaveAccount:
      "لديك حساب بالفعل؟",

    registrationError:
      "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى لاحقًا.",

    // =======================================================
    // NURSE REGISTRATION
    // =======================================================
    accountCreation:
      "إنشاء الحساب",

    joinTrustedProfessionals:
      "انضم إلى شبكتنا من المتخصصين الموثوقين في مجال الرعاية الصحية.",

    nurseApplicationDescription:
      "يرجى تقديم معلوماتك الشخصية وصورة الملف الشخصي والمؤهلات للتحقق منها. يقوم فريقنا بمراجعة جميع الطلبات خلال 24–48 ساعة.",

    personalInformation:
      "01 / المعلومات الشخصية",

    fullLegalName:
      "الاسم القانوني الكامل",

    fullNamePlaceholder:
      "جين دو",

    professionalProfile:
      "02 / الملف المهني",

    primarySpecialization:
      "التخصص الأساسي",

    selectSpecialization:
      "اختر التخصص...",

    generalHomeCare:
      "الرعاية العامة / المنزلية",

    pediatricCare:
      "رعاية الأطفال",

    geriatricCare:
      "رعاية المسنين",

    icuCriticalCare:
      "العناية المركزة / الرعاية الحرجة",

    postOperativeCare:
      "الرعاية بعد العمليات",

    yearsOfExperience:
      "سنوات الخبرة",

    selectYears:
      "اختر عدد السنوات...",

    lessThanOneYear:
      "أقل من سنة",

    oneToThreeYears:
      "1–3 سنوات",

    threeToFiveYears:
      "3–5 سنوات",

    fiveToTenYears:
      "5–10 سنوات",

    tenPlusYears:
      "10+ سنوات",

    currentLocation:
      "الموقع الحالي / المنطقة",

    selectCareCategories:
      "اختر فئات الرعاية / الخدمات المقدمة",

    selected:
      "محدد",

    homeCare:
      "الرعاية المنزلية",

    postSurgeryCare:
      "الرعاية بعد العمليات",

    woundDressing:
      "تضميد الجروح",

    ivTherapy:
      "العلاج الوريدي والحقن",

    icuSupport:
      "دعم العناية المركزة",

    physicalTherapy:
      "المساعدة في العلاج الطبيعي",

    typeOfCare:
      "نوع الرعاية",

    selectPrimaryCareType:
      "يرجى اختيار نوع الرعاية الأساسي المطلوب. يمكنك مناقشة التفاصيل المحددة لاحقًا.",

    mobilityAssistance:
      "المساعدة على الحركة",

    other:
      "أخرى",

    back:
      "Back",

    continue:
      "متابعة",

    profilePhotoCvUpload:
      "03 / رفع صورة الملف الشخصي والسيرة الذاتية",

    acceptedFormats:
      "الصيغ المقبولة: JPG، PNG، WEBP، PDF (الحد الأقصى 5MB)",

    profilePicture:
      "صورة الملف الشخصي",

    clickToUploadPhoto:
      "اضغط لرفع الصورة",

    curriculumVitae:
      "السيرة الذاتية (CV)",

    clickToUploadCv:
      "اضغط لرفع السيرة الذاتية",

    submitting:
      "جارٍ الإرسال...",

    submitRegistration:
      "إرسال طلب التسجيل",

    logIn:
      "تسجيل الدخول",

    uploadProfilePhoto:
      "يرجى رفع صورة للملف الشخصي.",

    uploadCv:
      "يرجى رفع السيرة الذاتية.",

    selectAtLeastOneCategory:
      "يرجى اختيار فئة رعاية أو خدمة واحدة على الأقل.",

    nurseRegistrationError:
      "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى لاحقًا.",

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
	  // Profile
	
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
    // LICENSE VERIFICATION
    // =======================================================
    "licenseVerification.registrationSubmitted":
      "تم إرسال التسجيل",

    "licenseVerification.onboardingStatus":
      "حالة التسجيل",

    "licenseVerification.trackApplication":
      "تتبّع طلبك وأكمل الخطوات المطلوبة.",

    "licenseVerification.accountCreated":
      "تم إنشاء الحساب",

    "licenseVerification.licenseVerification":
      "التحقق من الترخيص",

    "licenseVerification.backgroundCheck":
      "التحقق من الخلفية",

    "licenseVerification.activation":
      "التفعيل",

    "licenseVerification.activeProcess":
      "العملية الحالية",

    "licenseVerification.inProgress":
      "قيد التنفيذ",

    "licenseVerification.reviewDescription":
      "لقد استلمنا مستنداتك، ويتم حاليًا مراجعة مؤهلاتك المهنية. يساعد هذا التحقق في ضمان استيفاء جميع الممرضات لمعاييرنا المهنية.",

    "licenseVerification.documentsSubmitted":
      "المستندات المقدمة",

    "licenseVerification.nursingLicense":
      "ترخيص التمريض",

    "licenseVerification.curriculumVitae":
      "السيرة الذاتية",

    "licenseVerification.verificationStatus":
      "حالة التحقق",

    "licenseVerification.documentsUnderReview":
      "المستندات قيد المراجعة",

    "licenseVerification.usuallyCompleted":
      "عادةً ما تكتمل خلال 24–48 ساعة.",

    "licenseVerification.secureMessage":
      "تتم مراجعة مستنداتك بشكل آمن من قبل فريق التحقق لدينا. سيتم إعلامك عند اكتمال هذه الخطوة.",

    "licenseVerification.requiredActions":
      "الإجراءات المطلوبة",

    "licenseVerification.applicationSubmitted":
      "تم إرسال الطلب",

    "licenseVerification.noActionRequired":
      "تم إرسال تسجيلك بنجاح. لا يلزم اتخاذ أي إجراء إضافي في هذه المرحلة.",

    "licenseVerification.nextStep":
      "الخطوة التالية",

    // =======================================================
    // BACKGROUND CHECK
    // =======================================================
    "backgroundCheck.registrationSubmitted":
      "تم إرسال التسجيل",

    "backgroundCheck.title":
      "التحقق من الخلفية",

    "backgroundCheck.stepDescription":
      "الخطوة 3 من 4 في عملية التسجيل الخاصة بك.",

    "backgroundCheck.profile":
      "الملف الشخصي",

    "backgroundCheck.license":
      "الترخيص",

    "backgroundCheck.background":
      "التحقق من الخلفية",

    "backgroundCheck.activation":
      "التفعيل",

    "backgroundCheck.currentStatus":
      "الحالة الحالية",

    "backgroundCheck.inProgress":
      "قيد التنفيذ",

    "backgroundCheck.description":
      "لقد بدأ التحقق من خلفيتك. يقوم فريق التحقق لدينا بمراجعة المعلومات المطلوبة قبل أن يتم تفعيل حسابك.",

    "backgroundCheck.requiredActions":
      "الإجراءات المطلوبة",

    "backgroundCheck.verificationInformation":
      "معلومات التحقق",

    "backgroundCheck.informationDescription":
      "يرجى التأكد من أن المعلومات المقدمة أثناء التسجيل دقيقة وكاملة.",

    "backgroundCheck.reviewInformation":
      "مراجعة المعلومات",

    "backgroundCheck.securityMessage":
      "يتم التعامل مع معلوماتك بشكل آمن، وتُستخدم فقط لأغراض التحقق المهني.",

    "backgroundCheck.verificationScope":
      "نطاق التحقق",

    "backgroundCheck.criminalRecords":
      "البحث في السجلات الجنائية",

    "backgroundCheck.sexRegistry":
      "التحقق من سجل الجرائم الجنسية",

    "backgroundCheck.employmentVerification":
      "التحقق من الخبرة الوظيفية",

    "backgroundCheck.educationVerification":
      "التحقق من المؤهلات التعليمية",

    "backgroundCheck.timeline":
      "الجدول الزمني",

    "backgroundCheck.requestSubmitted":
      "تم إرسال الطلب",

    "backgroundCheck.backgroundStarted":
      "بدأ التحقق من الخلفية",

    "backgroundCheck.backgroundReview":
      "مراجعة الخلفية",

    "backgroundCheck.currentlyInProgress":
      "قيد التنفيذ حاليًا",

    "backgroundCheck.approval":
      "الموافقة",

    "backgroundCheck.waitingVerification":
      "بانتظار اكتمال التحقق",

    // =======================================================
    // ACTIVATED
    // =======================================================
    "activated.registrationSubmitted":
      "تم إرسال التسجيل",

    "activated.title":
      "تم تفعيل الحساب",

    "activated.profile":
      "الملف الشخصي",

    "activated.license":
      "الترخيص",

    "activated.background":
      "التحقق من الخلفية",

    "activated.activation":
      "التفعيل",

    "activated.successTitle":
      "تم تفعيل الحساب وأصبح جاهزًا للعمل!",

    "activated.successDescription":
      "مرحبًا بك في فريقنا. تم التحقق من مؤهلاتك السريرية، وأصبح ملفك الشخصي الآن نشطًا على NurseConnect.",

    "activated.firstSteps":
      "خطواتك الأولى",

    "activated.completeProfile":
      "أكمل ملفك الشخصي",

    "activated.completeProfileDescription":
      "أضف خبرتك المهنية وتفضيلاتك حتى يتمكن المرضى من العثور عليك.",

    "activated.setAvailability":
      "حدد أوقات توافرك",

    "activated.setAvailabilityDescription":
      "اختر الأوقات التي تكون فيها متاحًا لاستقبال طلبات التمريض الجديدة.",

    "activated.browseRequests":
      "تصفح طلبات الرعاية",

    "activated.browseRequestsDescription":
      "اطّلع على طلبات المرضى المناسبة وتقدّم لتقديم الرعاية.",

    "activated.nurseConnect":
      "NURSECONNECT",

    "activated.registeredNurse":
      "ممرض/ة مسجل/ة",

    "activated.profileReady":
      "ملفك الشخصي جاهز.",

    "activated.profileReadyDescription":
      "يمكن للمرضى الآن اكتشاف ملفك الشخصي وإرسال طلبات الرعاية إليك.",

    "activated.goToProfile":
      "الانتقال إلى الملف الشخصي",

    "activated.startFindingRequests":
      "ابدأ بالبحث عن طلبات الرعاية",

    // =======================================================
    // PATIENT PROFILE
    // =======================================================
    "patientProfile.loading":
      "جارٍ تحميل ملفك الشخصي والحجوزات...",

    "patientProfile.accessDenied":
      "الوصول مرفوض",

    "patientProfile.loginToContinue":
      "يرجى تسجيل الدخول للمتابعة.",

    "patientProfile.signIn":
      "تسجيل الدخول",

    "patientProfile.memberSince":
      "عضو منذ",

    "patientProfile.noPhone":
      "لم يتم توفير رقم هاتف",

    "patientProfile.bookNewCare":
      "احجز رعاية جديدة",

    "patientProfile.careRequestsStatus":
      "طلبات الرعاية وحالتها",

    "patientProfile.followUp":
      "تابع حجوزاتك وتحقق مما إذا تمت الموافقة على طلبك.",

    "patientProfile.requests":
      "طلبات",

    "patientProfile.noCareRequests":
      "لا توجد طلبات رعاية بعد",

    "patientProfile.noCareRequestsDescription":
      "لم تقم بحجز أي مقدم رعاية صحية بعد. اختر ممرضة مؤهلة لرعاية عائلتك.",

    "patientProfile.findNurse":
      "ابحث عن ممرضة",

    "patientProfile.booking":
      "الحجز",

    "patientProfile.createdOn":
      "تم الإنشاء في",

    "patientProfile.accepted":
      "تم قبول الطلب",

    "patientProfile.pending":
      "قيد المراجعة",

    "patientProfile.rejected":
      "تم رفض الطلب",

    "patientProfile.completed":
      "تم الإنجاز",

    "patientProfile.serviceType":
      "نوع الخدمة",

    "patientProfile.for":
      "لـ",

    "patientProfile.schedule":
      "الموعد",

    "patientProfile.selectedNurse":
      "الممرضة المختارة",

    "patientProfile.generalBooking":
      "حجز عام",

    "patientProfile.careAddress":
      "عنوان الرعاية",

    "patientProfile.specialNotes":
      "ملاحظات خاصة",
	"common.back":
	"رجوع" ,
	"common.continue":
	"متابعة",
	"confirmation.title": "تم إرسال طلب الرعاية!",
"confirmation.description":
  "نحن نبحث لك عن الممرضة الأنسب في منطقتك. ستتلقى تأكيدًا قريبًا.",

"confirmation.preferredNurse": "الممرضة المفضلة",
"confirmation.careFor": "الرعاية لـ",
"confirmation.careType": "نوع الرعاية",
"confirmation.startDate": "تاريخ البدء",
"confirmation.duration": "المدة",
"confirmation.location": "الموقع",

"confirmation.oneHour": "ساعة واحدة",
"confirmation.twoHours": "ساعتان",
"confirmation.fourHours": "4 ساعات",
"confirmation.eightHours": "8 ساعات",
"confirmation.twelveHours": "12 ساعة",
"confirmation.twentyFourHours": "24 ساعة",

"confirmation.dashboard": "عرض لوحة التحكم",
"confirmation.browseNurses": "تصفح الممرضات",
  },
};

// =========================================================
// CONTEXT
// =========================================================

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  dir: "ltr",
  t: (key) => key,
});

// =========================================================
// PROVIDER
// =========================================================

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred_lang");

    const saved: Lang =
      savedLang === "ar" ? "ar" : "en";

    setLang(saved);

    document.documentElement.dir =
      saved === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = saved;
  }, []);

  const toggleLang = () => {
    const next: Lang =
      lang === "en" ? "ar" : "en";

    setLang(next);

    localStorage.setItem(
      "preferred_lang",
      next
    );

    document.documentElement.dir =
      next === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = next;
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        toggleLang,
        dir: lang === "ar" ? "rtl" : "ltr",
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

export const useLanguage = () =>
  useContext(LanguageContext);