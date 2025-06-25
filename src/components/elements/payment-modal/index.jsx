import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { handleClearProfile, setPaymentMethodId } from "../../../redux/profileSlice";
import { useMutation } from "@apollo/client";
import { Create_Child, Create_Sport, COACH_PURCHASE, RECRUITER_PURCHASE, COMPELETE_PROFILE, UPGRADE_SPORT_PROFILE } from "../../../graphql/mutation";
import toast from "react-hot-toast";
import Loader from "react-spinner-loader"


const PaymentModal = ({ location }) => {
    const purchaseId = useSelector((state) => state.profileSlice.purchaseId);
    const paymentMethodId = useSelector((state) => state.profileSlice.paymentMethodId);
    const organizationType = useSelector((state) => state.profileSlice.organizationType);
    const clubName = useSelector((state) => state.profileSlice?.clubName);
    const Citys = useSelector((state) => state.profileSlice?.Citys)
    const Countrys = useSelector((state) => state.profileSlice?.Countrys)
    const PhoneNumbers = useSelector((state) => state.profileSlice?.PhoneNumbers)
    const price = useSelector((state) => state.profileSlice?.Price)
    const packagename = useSelector((state) => state.profileSlice?.PackageName)
    const userRole = useSelector((state) => state.authSlice?.role)
    const draft = useSelector((state) => state?.profileSlice?.profile);
    const user = useSelector((state) => state?.authSlice);

    const upgradeData = useSelector(state => state?.profileSlice)
    console.log(upgradeData)


    console.log(location)

    const [createCoachPurchase, { loading, error, data }] = useMutation(COACH_PURCHASE);
    const [createRecruiterPurchase, { loading1, error1, data1 }] = useMutation(RECRUITER_PURCHASE);



    const [isProcessing, setIsProcessing] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [loader, setLoader] = useState(false)

    const [Upgrade_Profile] = useMutation(UPGRADE_SPORT_PROFILE)

    const [Child_Create] = useMutation(Create_Child)
    const [Athlete_Create] = useMutation(COMPELETE_PROFILE)
    const [Sport_Create] = useMutation(Create_Sport)

    const [searchParams] = useSearchParams()

    const navigate = useNavigate()

    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch();

    useEffect(() => {
        setLoader(false)
    }, [])

    const handlePayNowClick = async (event) => {
        event.preventDefault();
        console.log("asdfgh")
        setIsProcessing(false)

        if (!stripe || !elements) {
            setErrorMessage("Stripe.js has not loaded yet.")
            setIsProcessing(false)

            return;
        }

        // Create payment method using card details
        const cardElement = elements.getElement(CardNumberElement);
        console.log(cardElement, "cardElementcardElement")

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });


        if (error) {

            setErrorMessage(error.message);
            setIsProcessing(false);
            setTimeout(() => {
                setErrorMessage()
            }, 3000)
            return;
        }

        if (paymentMethod.id) {



            dispatch(setPaymentMethodId(paymentMethod.id));
            if (userRole === "Coach" || userRole === "Head") {
                setLoader(true)
                await createCoachPurchase({
                    variables: {
                        input: {
                            OrganizationDetailsInput: {
                                city: Citys,
                                country: Countrys,
                                name: clubName,
                                phone: PhoneNumbers,
                                type: organizationType,
                            },

                            package_id: purchaseId,
                            payment_method_id: paymentMethod.id,

                        }
                    }
                })
                    .then(response => {
                        console.log("Purchase successful:", response);
                        setLoader(false)
                        onClose();
                    })
                    .catch(error => {
                        console.error("Purchase failed:", error);
                        setLoader(false)
                    });
            }

            if (userRole === "Recruiter") {
                await createRecruiterPurchase({
                    variables: {
                        input: {

                            package_id: purchaseId,
                            payment_method_id: paymentMethod.id,

                        }
                    }
                })
                    .then(response => {
                        console.log("Purchase successful:", response);
                        onClose();
                    })
                    .catch(error => {
                        console.error("Purchase failed:", error);
                    });
            }



            console.log("role: ", draft?.basicProfile?.profile_type)
            if (userRole === "Parent") {
                if (searchParams.get("name")) {
                    upgradeSportProfile(paymentMethod.id)
                }
                else {
                    if (draft?.basicProfile?.profile_type === "Basic") {
                        if (searchParams.get("id")) {
                            createBasicSport(paymentMethod.id)
                        }
                        else {
                            createChild(paymentMethod.id)
                        }

                    }
                    if (draft?.basicProfile?.profile_type === "Advanced") {
                        if (searchParams.get("id")) {
                            createAdvanceSport(paymentMethod.id)
                        }
                        else {
                            createChildAdvance(paymentMethod.id)
                        }

                    }
                }




            }
            else if (userRole === "Coach" || userRole === "Head" || userRole === "Assistant") {
                navigate(`/coach/payment-success?type=${searchParams.get("type")}`)
            }
            else if (userRole === "Athlete") {
                if (searchParams.get("name")) {
                    upgradeSportProfile(paymentMethod.id)
                }
                else {
                    if (draft?.basicProfile?.profile_type === "Basic") {
                        if (searchParams.get("id")) {
                            createBasicSport(paymentMethod.id)
                        }
                        else {
                            createAthlete(paymentMethod.id)
                        }

                    }
                    if (draft?.basicProfile?.profile_type === "Advanced") {
                        if (searchParams.get("id")) {
                            createAdvanceSport(paymentMethod.id)
                        }
                        else {
                            createAthleteAdvance(paymentMethod.id)
                        }

                    }
                }
            }
            else if (userRole === "Recruiter") {
                navigate(`/recruiter/payment-success?type=${searchParams.get("type")}`)
            }


        }
        console.log(paymentMethod, error)
    }

    const upgradeSportProfile = async (id) => {
        setLoader(true)


        console.log(draft?.basicProfile?.dob)

        const new_data = {
            "input": {
                "package_id": draft?.type?.id,
                "payment_method_id": id,
                "id": parseInt(searchParams.get("sport_id")),
                "advanced": {
                    "academic_info": {
                        "address": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.address,
                        "cgpa": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.gpa,
                        "highschool": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.highschool,
                        "transcript": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.transcriptFile,
                        "year": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.year,
                    },
                    "bio": draft?.basicProfile?.bio,
                    "career_stats": {
                        "awards": draft?.basicProfile?.profile_detail?.advanced?.career_stats?.awards,
                        "highlights": (draft?.basicProfile?.profile_detail?.advanced?.career_stats?.valuable_player),
                    },
                    "dob": (draft?.basicProfile?.dob).toISOString().split('T')[0],
                    "email": draft?.basicProfile?.email || user?.user?.data?.email,
                    "height": {
                        "feet": draft?.basicProfile?.profile_detail?.advanced?.height?.feet,
                        "inches": draft?.basicProfile?.profile_detail?.advanced?.height?.inches,
                    },
                    "phone": draft?.basicProfile?.phone,
                    "recruiting_preferences": {
                        "college_committed": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.college_committed?.value === "yes" ? true : false,
                        "coach_email": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.coach_email,
                        "coach_phone": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.coach_contact,
                        "coach_trainer": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.coach_trainer,
                        "direct_phone": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.direct_contact,
                        "endorsement": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.endorsements,
                        "preferred_college": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.interested_in,
                        "scholarship_offers": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.scholarship_offers,
                        "scouting_report": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.reports_endorsements,
                    },
                    "social": draft?.basicProfile?.social?.map(item => {
                        if (item?.link) {
                            return {
                                type: item.type,
                                link: item.link
                            };
                        }
                        return null; // or just skip if needed
                    }).filter(Boolean), // removes any nulls,
                    "sports_info": {
                        "dominant_hand": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.side,
                        "experience": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.experience,
                        "jersey_no": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.jersey_no,
                        "positions": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.positions,
                        // "sport_name": draft?.sport?.label,
                        "sport_picture": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.image1,
                        "team_name": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.team_name,
                        "upcomming_events": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.tournament
                    },
                    "weight": draft?.basicProfile?.profile_detail?.advanced?.weight
                }
            }
        }



        console.log(draft?.basicProfile, new_data)

        try {

            const { data } = await Upgrade_Profile({
                variables: new_data
            })

            if (data) {
                toast.success(data?.upgradeSportsProfile?.message)
                dispatch(handleClearProfile())
                if ((userRole === "Parent")) {
                    navigate(`/parent/payment-success`)
                }
                if ((userRole === "Athlete")) {
                    navigate(`/athlete/payment-success`)
                }

                setLoader(false)
            }

        } catch (e) {
            console.log(e)
            setLoader(false)
        }
    }

    const createChildAdvance = async (id) => {
        setLoader(true)


        console.log(draft?.basicProfile?.dob)
        const new_data = {
            "input": {
                "email": draft?.basicProfile?.email || user?.user?.data?.email,
                "full_name": draft?.basicProfile?.full_name,
                "nick_name": draft?.basicProfile?.nick_name,
                "package_id": draft?.type?.id,
                "payment_method_id": id,
                "picture": draft?.basicProfile?.pictureFile,
                "profile_type": draft?.basicProfile?.profile_type,
                "sport_id": searchParams.get("name") ? upgradeData?.upgradeSport?.sport?.id : draft?.sport.value,
                "user_name": draft?.basicProfile?.user_name || user?.user?.data?.user_name,
                "profile_detail": {
                    "advanced": {
                        "academic_info": {
                            "address": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.address,
                            "cgpa": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.gpa,
                            "highschool": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.highschool,
                            "transcript": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.transcriptFile,
                            "year": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.year,
                        },
                        "bio": draft?.basicProfile?.bio,
                        "career_stats": {
                            "awards": draft?.basicProfile?.profile_detail?.advanced?.career_stats?.awards,
                            "highlights": (draft?.basicProfile?.profile_detail?.advanced?.career_stats?.valuable_player),
                        },
                        "dob": (draft?.basicProfile?.dob).toISOString().split('T')[0],
                        "email": draft?.basicProfile?.email || user?.user?.data?.email,
                        "gender": draft?.basicProfile?.gender,
                        "height": {
                            "feet": draft?.basicProfile?.profile_detail?.advanced?.height?.feet,
                            "inches": draft?.basicProfile?.profile_detail?.advanced?.height?.inches,
                        },
                        "phone": draft?.basicProfile?.phone,
                        "recruiting_preferences": {
                            "college_committed": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.college_committed?.value === "yes" ? true : false,
                            "coach_email": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.coach_email,
                            "coach_phone": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.coach_contact,
                            "coach_trainer": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.coach_trainer,
                            "direct_phone": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.direct_contact,
                            "endorsement": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.endorsements,
                            "preferred_college": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.interested_in,
                            "scholarship_offers": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.scholarship_offers,
                            "scouting_report": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.reports_endorsements,
                        },
                        "social": draft?.basicProfile?.social?.map(item => {
                            if (item?.link) {
                                return {
                                    type: item.type,
                                    link: item.link
                                };
                            }
                            return null; // or just skip if needed
                        }).filter(Boolean), // removes any nulls,
                        "sports_info": {
                            "dominant_hand": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.side,
                            "experience": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.experience,
                            "jersey_no": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.jersey_no,
                            "positions": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.positions,
                            // "sport_name": draft?.sport?.label,
                            "sport_picture": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.image1,
                            "team_name": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.team_name,
                            "upcomming_events": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.tournament
                        },
                        "weight": draft?.basicProfile?.profile_detail?.advanced?.weight
                    }
                }
            }
        }



        console.log(draft?.basicProfile, new_data)

        try {

            const { data } = await Child_Create({
                variables: new_data
            })

            if (data) {
                toast.success(data?.createChildAccount?.message)
                dispatch(handleClearProfile())
                if ((userRole === "Parent")) {
                    navigate(`/parent/payment-success`)
                }
                if ((userRole === "Athlete")) {
                    navigate(`/athlete/payment-success`)
                }

                setLoader(false)
            }

        } catch (e) {
            console.log(e)
            setLoader(false)
        }
    }

    const createAthleteAdvance = async (id) => {
        setLoader(true)

        const new_data = {
            "input": {
                "role": "Athlete",
                "Athlete": {
                    "full_name": draft?.basicProfile?.full_name,
                    "nick_name": draft?.basicProfile?.nick_name,
                    "package_id": draft?.type?.id,
                    "payment_method_id": id,
                    "picture": draft?.basicProfile?.pictureFile,
                    "profile_type": draft?.basicProfile?.profile_type,
                    "sport_id": searchParams.get("name") ? upgradeData?.upgradeSport?.sport?.id : draft?.sport.value,
                    "profile_detail": {
                        "advanced": {
                            "academic_info": {
                                "address": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.address,
                                "cgpa": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.gpa,
                                "highschool": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.highschool,
                                "transcript": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.transcriptFile,
                                "year": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.year,
                            },
                            "bio": draft?.basicProfile?.bio,
                            "career_stats": {
                                "awards": draft?.basicProfile?.profile_detail?.advanced?.career_stats?.awards,
                                "highlights": (draft?.basicProfile?.profile_detail?.advanced?.career_stats?.valuable_player),
                            },
                            "dob": (draft?.basicProfile?.dob).toISOString().split('T')[0],
                            "email": user?.user?.data?.email,
                            "gender": draft?.basicProfile?.gender,
                            "height": {
                                "feet": draft?.basicProfile?.profile_detail?.advanced?.height?.feet,
                                "inches": draft?.basicProfile?.profile_detail?.advanced?.height?.inches,
                            },
                            "phone": draft?.basicProfile?.phone,
                            "recruiting_preferences": {
                                "coach_phone": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.coach_contact,
                                "coach_trainer": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.coach_trainer,
                                "direct_phone": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.direct_contact,
                                "endorsement": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.endorsements,
                                "preferred_college": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.interested_in,
                                "scholarship_offers": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.scholarship_offers,
                                "scouting_report": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.reports_endorsements,
                            },
                            "social": draft?.basicProfile?.social?.map(item => {
                                if (item?.link) {
                                    return {
                                        type: item.type,
                                        link: item.link
                                    };
                                }
                                return null; // or just skip if needed
                            }).filter(Boolean), // removes any nulls,
                            "sports_info": {
                                "dominant_hand": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.side,
                                "experience": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.experience,
                                "jersey_no": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.jersey_no,
                                "positions": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.positions,
                                // "sport_name": draft?.sport?.label,
                                "sport_picture": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.image1,
                                "team_name": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.team_name,
                                "upcomming_events": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.tournament
                            },
                            "weight": draft?.basicProfile?.profile_detail?.advanced?.weight
                        }
                    }
                }
            }
        }






        console.log(draft?.basicProfile?.profile_detail?.advanced?.sports_info)

        try {

            const { data } = await Athlete_Create({
                variables: new_data
            })

            if (data) {
                toast.success(data?.completeProfile?.message)
                dispatch(handleClearProfile())
                if ((userRole === "Parent")) {
                    navigate(`/parent/payment-success`)
                }
                if ((userRole === "Athlete")) {
                    navigate(`/athlete/payment-success`)
                }

                setLoader(false)
            }

        } catch (e) {
            console.log(e)
            setLoader(false)
        }
    }

    const createAdvanceSport = async (id) => {
        setLoader(true)



        const new_data = {
            "input": {
                "user_id": parseInt(searchParams.get("id")),
                "sport_id": searchParams.get("name") ? upgradeData?.upgradeSport?.sport?.id : draft?.sport?.value,
                "profile_type": draft?.basicProfile?.profile_type,
                "payment_method_id": id,
                "package_id": draft?.type?.id,
                "profile_detail": {
                    "advanced": {
                        "academic_info": {
                            "address": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.address,
                            "cgpa": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.gpa,
                            "highschool": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.highschool,
                            "transcript": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.transcriptFile,
                            "year": draft?.basicProfile?.profile_detail?.advanced?.academic_info?.year,
                        },
                        "bio": draft?.basicProfile?.bio,
                        "career_stats": {
                            "awards": draft?.basicProfile?.profile_detail?.advanced?.career_stats?.awards,
                            "highlights": (draft?.basicProfile?.profile_detail?.advanced?.career_stats?.valuable_player),
                        },
                        "dob": (draft?.basicProfile?.dob).toISOString().split('T')[0],
                        "email": draft?.basicProfile?.email,
                        "gender": draft?.basicProfile?.gender,
                        "height": {
                            "feet": draft?.basicProfile?.profile_detail?.advanced?.height?.feet,
                            "inches": draft?.basicProfile?.profile_detail?.advanced?.height?.inches,
                        },
                        "phone": draft?.basicProfile?.phone,
                        "recruiting_preferences": {
                            "coach_phone": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.coach_contact,
                            "coach_trainer": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.coach_trainer,
                            "direct_phone": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.direct_contact,
                            "endorsement": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.endorsements,
                            "preferred_college": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.interested_in,
                            "scholarship_offers": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.scholarship_offers,
                            "scouting_report": draft?.basicProfile?.profile_detail?.advanced?.reqruit_info?.recruiting_preferences?.reports_endorsements,
                        },
                        "social": draft?.basicProfile?.social?.map(item => {
                            if (item?.link) {
                                return {
                                    type: item.type,
                                    link: item.link
                                };
                            }
                            return null; // or just skip if needed
                        }).filter(Boolean), // removes any nulls,
                        "sports_info": {
                            "dominant_hand": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.side,
                            "experience": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.experience,
                            "jersey_no": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.jersey_no,
                            "positions": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.positions,

                            "sport_picture": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.image1,
                            "team_name": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.team_name,
                            "upcomming_events": draft?.basicProfile?.profile_detail?.advanced?.sports_info?.tournament
                        },
                        "weight": draft?.basicProfile?.profile_detail?.advanced?.weight
                    }
                }
            }
        }



        console.log(draft?.basicProfile?.profile_detail?.advanced?.sports_info)

        try {

            const { data } = await Sport_Create({
                variables: new_data
            })

            if (data) {
                toast.success(data?.addSportProfile?.message)
                dispatch(handleClearProfile())
                const id = searchParams.get("id");
                if ((userRole === "Parent")) {
                    navigate(`/parent/payment-success?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}`)
                }
                if ((userRole === "Athlete")) {
                    navigate(`/athlete/payment-success?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}`)
                }

                setLoader(false)
            }

        } catch (e) {
            console.log(e)
            setLoader(false)
        }
    }

    const createChild = async (id) => {
        setLoader(true)



        const new_data = {
            "input": {
                "full_name": draft?.basicProfile?.data?.full_name,
                "nick_name": draft?.basicProfile?.data?.nick,
                "package_id": draft?.type?.id,
                "payment_method_id": id,
                "picture": draft?.basicProfile?.data?.image,
                "profile_detail": {
                    "basic": {
                        "dominant_hand": draft?.basicProfile?.data?.side,
                        "gender": draft?.basicProfile?.data?.gender,
                        "jersey_no": parseInt(draft?.basicProfile?.data?.jersey_number),
                        "positions": draft?.basicProfile?.data?.position,
                        "team_name": draft?.basicProfile?.data?.team_name,
                        "sport_picture": draft?.basicProfile?.data?.image1,
                    }
                },
                "profile_type": draft?.basicProfile?.profile_type,
                "sport_id": searchParams.get("name") ? upgradeData?.upgradeSport?.sport?.id : draft?.sport.value,
                "user_name": draft?.basicProfile?.data?.username,
                "email": draft?.basicProfile?.data?.email,
            }
        }

        console.log(new_data, draft)

        try {

            const { data } = await Child_Create({
                variables: new_data
            })

            if (data) {
                toast.success(data?.createChildAccount?.message)
                dispatch(handleClearProfile())
                if ((userRole === "Parent")) {
                    navigate(`/parent/payment-success`)
                }
                if ((userRole === "Athlete")) {
                    navigate(`/athlete/payment-success`)
                }
                setLoader(false)
            }

        } catch (e) {
            console.log(e)
            setLoader(false)
        }
    }

    const createAthlete = async (id) => {
        setLoader(true)

        const new_data = {
            "input": {
                "Athlete": {
                    "full_name": draft?.basicProfile?.data?.full_name,
                    "nick_name": draft?.basicProfile?.data?.nick,
                    "package_id": draft?.type?.id,
                    "payment_method_id": id,
                    "picture": draft?.basicProfile?.data?.image,
                    "profile_type": draft?.basicProfile?.profile_type,
                    "sport_id": searchParams.get("name") ? upgradeData?.upgradeSport?.sport?.id : draft?.sport.value,
                    "profile_detail": {
                        "basic": {
                            "dominant_hand": draft?.basicProfile?.data?.side,
                            "gender": draft?.basicProfile?.data?.gender,
                            "jersey_no": parseInt(draft?.basicProfile?.data?.jersey_number),
                            "positions": draft?.basicProfile?.data?.position,
                            "team_name": draft?.basicProfile?.data?.team_name,
                            "sport_picture": draft?.basicProfile?.data?.image1,
                        }
                    }
                },
                "role": "Athlete"
            }
        }




        console.log(new_data, draft)

        try {

            const { data } = await Athlete_Create({
                variables: new_data
            })

            if (data) {
                toast.success(data?.completeProfile?.message)
                dispatch(handleClearProfile())
                if ((userRole === "Parent")) {
                    navigate(`/parent/payment-success`)
                }
                if ((userRole === "Athlete")) {
                    navigate(`/athlete/payment-success`)
                }
                setLoader(false)
            }

        } catch (e) {
            console.log(e)
            setLoader(false)
        }
    }

    const createBasicSport = async (id) => {
        setLoader(true)
        const new_data = {
            "input": {
                "package_id": draft?.type?.id,
                "payment_method_id": id,
                "user_id": parseInt(searchParams.get("id")),
                "sport_id": searchParams.get("name") ? upgradeData?.upgradeSport?.sport?.id : draft?.sport.value,
                "profile_type": draft?.basicProfile?.profile_type,
                "profile_detail": {
                    "basic": {
                        "dominant_hand": draft?.basicProfile?.data?.side,
                        "gender": draft?.basicProfile?.data?.gender,
                        "jersey_no": parseInt(draft?.basicProfile?.data?.jersey_number),
                        "positions": draft?.basicProfile?.data?.position,
                        "team_name": draft?.basicProfile?.data?.team_name,
                        "sport_picture": draft?.basicProfile?.data?.image1,
                    }
                }
            }
        }

        console.log(new_data)

        try {

            const { data } = await Sport_Create({
                variables: new_data
            })

            if (data) {
                toast.success(data?.addSportProfile?.message)
                dispatch(handleClearProfile())
                const id = searchParams.get("id");
                if ((userRole === "Parent")) {
                    navigate(`/parent/payment-success?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}`)
                }
                if ((userRole === "Athlete")) {
                    navigate(`/athlete/payment-success?type=${searchParams.get("type")}${id ? `&id=${id}` : ""}`)
                }

                setLoader(false)
            }

        } catch (e) {
            console.log(e)
            setLoader(false)
        }
    }

    return (
        <form onSubmit={handlePayNowClick}>
            <Row className="py-5">
                {/* Left Column - Payment Form wrapped in Elements */}
                <Col md={8}>
                    <div className="solidcard summary mb-3">
                        <h3 className="mb-3">Card Details</h3>

                        <div className="mb-2">
                            <label>Card Number *</label>
                        </div>
                        <div className="d-flex align-items-center inputfields summary" style={{ height: "50px" }}>
                            <CardNumberElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#fff',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                                className="transparent-input-field w-100"
                            />
                        </div>

                        <Row className="mb-2">
                            <Col md={6}>
                                <div className="mb-2">
                                    <label>Expiry *</label>
                                </div>
                                <div className="d-flex align-items-center inputfields summary py-0 my-0" style={{ height: "50px" }}>
                                    <CardExpiryElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: '16px',
                                                    color: '#fff',
                                                    '::placeholder': {
                                                        color: '#aab7c4',
                                                    },
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                            },
                                        }}
                                        className="transparent-input-field w-100"
                                    />
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="mb-2">
                                    <label>CVV *</label>
                                </div>
                                <div className="d-flex align-items-center inputfields summary" style={{ height: "50px" }}>
                                    <CardCvcElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: '16px',
                                                    color: '#fff',
                                                    '::placeholder': {
                                                        color: '#aab7c4',
                                                    },
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                            },
                                        }}
                                        className="transparent-input-field w-100"
                                    />
                                </div>
                            </Col>
                        </Row>
                        {/* The Purchase button is in the parent component */}
                    </div>
                    {
                        errorMessage && <small className="text-danger text-sm" style={{ fontSize: "14px" }}>{errorMessage}</small>
                    }
                </Col>
                <Col md={4} className="order-summary-col mb-3">
                    <div className="order-summary-card">

                        {/* Order Summary Details */}
                        {
                            (userRole === "Parent" || userRole === "Athlete") ? (
                                <div className="order-summary-details">
                                    <h1>Order Summary</h1>
                                    <div className="summary-line d-flex justify-content-between">
                                        <span>{location?.type?.name}</span> {/* Use calculated number of items */}
                                        {
                                            searchParams.get("name") ? (

                                                <span>${upgradeData?.upgradePrice}</span>
                                            ) : (
                                                <span>${location?.price}</span>
                                            )
                                        }

                                    </div>

                                    <hr className="summary-separator" /> {/* Example separator */}

                                    <div className="summary-line total-line d-flex justify-content-between">
                                        <span>Total</span>
                                        {
                                            searchParams.get("name") ? (

                                                <span>${upgradeData?.upgradePrice}</span>
                                            ) : (
                                                <span>${location?.price}</span>
                                            )
                                        }

                                    </div>
                                </div>
                            ) : (
                                <div className="order-summary-details">
                                    <h1>Order Summary</h1>
                                    <div className="summary-line d-flex justify-content-between">
                                        <span>{packagename}</span> {/* Use calculated number of items */}
                                        {
                                            searchParams.get("name") ? (

                                                <span>${upgradeData?.upgradePrice}</span>
                                            ) : (
                                                <span>${price}</span>
                                            )
                                        }

                                    </div>

                                    <hr className="summary-separator" /> {/* Example separator */}

                                    <div className="summary-line total-line d-flex justify-content-between">
                                        <span>Total</span>
                                        {
                                            searchParams.get("name") ? (

                                                <span>${upgradeData?.upgradePrice}</span>
                                            ) : (
                                                <span>${price}</span>
                                            )
                                        }

                                    </div>
                                </div>
                            )
                        }


                        {/* Pay Now Button - Calls the handler that triggers payment logic */}
                        {/* <button className="primary-btn py-2 my-2 w-100" disabled={loader} style={{ opacity: loader ? "0.6" : "1" }} >
                            Pay Now
                        </button> */}
                        <button className="w-100 primary-btn px-2 py-3 my-3 d-flex gap-3" disabled={loader} style={{ opacity: loader && "0.6" }}>
                            Pay Now
                            {
                                loader &&
                                (<Loader show={true}
                                    spinnerSize="16px"
                                    radius="10"

                                    color="red"
                                />)
                            }
                        </button>
                    </div>
                </Col>
            </Row>
        </form>
    );
}

export default PaymentModal;