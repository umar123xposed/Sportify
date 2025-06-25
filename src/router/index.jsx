import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./helper";

import Protected from "./Protected";
import AuthLayout from "../Layout/authLayout";
const MainLayout = lazy(() => import("./../Layout/main-layout"));
const UserLayout = lazy(() => import("./../Layout/user-layout"));



import SelectChildScreen from "../pages/select-child-account";
import PlayerDetails1 from "../pages/player-details";
import Header from "../pages/testing";
import AtheleteHome from "../pages/athelete-home";
import ContactForm from "../pages/contact-form";
import PurchaseHistory from "../pages/Purchase-history";
import Profile from "../pages/profile";
import Players from "../pages/parent-child-key copy";
import ProfileCoach from "../pages/profileCoach";
import ParentRequests from "../pages/parent-request";
import About from "../pages/About";
import Faqs from "../pages/faqs";
import PublicLayout from "../Layout/public-layout";
import PlayerDetailssss from "../pages/player-details2";
import ShipmentTrackingDetails from "../pages/shipmentDetatais";
import Privacy from "../pages/Privacy";
import ChangePassword from "../pages/change-password";
import Support from "../pages/Support";
import SelectSport from "../pages/select-sport";
import SelectPackageItems from "../pages/select-package-items";
import CheckoutPayment from "../pages/checkout-payment";
import TeamPage from "../pages/team-page";
import SelectCoachPositionPage from "../pages/select-coach-position";
import Organization from "../pages/organization";
import SelectTeamCategory from "../pages/select-team-category";
import CreateClubPage from "../pages/create-club";
import CoachProfileDetailPage from "../pages/coach-profile-detail"
import SuccessScreen from "../pages/success-screen";
import EditTeam from "../pages/edit-team";
import SelectCategoryRecruit from "../pages/select-category-recruit";
import Public from "./Public";
import NewFolder from "../pages/new-folder";
import FolderItems from "../pages/folder-items";
import CheckoutPaymentRec from "../pages/checkout-paymetn-rec";
import HomeRec from "../pages/HomeRec";
import MyOrganization from "../pages/my-organization";
import FanClub from "../pages/fanclub";
import SinglePost from "../pages/single-post";


const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));
const SignUpSocail = lazy(() => import("../pages/Authentication/SignUpSocial"));
const Signup = lazy(() => import("../pages/Authentication/Signup"));
const Login = lazy(() => import("../pages/Authentication/Login"));
const ForgotPassword = lazy(() => import("../pages/Authentication/forgot-password"));
const ForgotUsername = lazy(() => import("../pages/Authentication/forgot-username"));
const WhoWeAre = lazy(() => import("../pages/who-we-are"));
const FollowRequests = lazy(() => import("../pages/follow-request"));

//coach


const ProfileCreationCoach = lazy(() => import("../pages/profile-creation-coach"));


//recruit
;
const ProfileCreationRecriut = lazy(() =>
  import("../pages/profile-recuriter-creation")
);

//parent
const ProfileCreationParent = lazy(() =>
  import("../pages/profile-creation-parent")
);
;

const Search = lazy(() => import("../pages/Search"));
const Teams = lazy(() => import("../pages/Team"));
const SelectCategory = lazy(() => import("../pages/select-category"));
const BasicProfile = lazy(() => import("../pages/basic-profile"));
const BasicCreateTeam = lazy(() => import("../pages/basic-create-team"));
const BasicHome = lazy(() => import("../pages/basic-home"));
const BasicHomeVisitor = lazy(() => import("../pages/basic-home-visitor"));
const BasicPayment = lazy(() => import("../pages/basic-payment"));
// const AdvanceProfile = lazy(() => import("../pages/advance-profile"));
const AdvancedProfile = lazy(() => import("../pages/advanced-profile"));
const AthleticInformation = lazy(() =>
  import("../pages/advance-athletic-info"))
const AdvancePerformance = lazy(() =>
  import("../pages/advance-performance")
);
const AdvanceAcademic = lazy(() => import("../pages/advance-academic-info"));
const AdvanceRecruit = lazy(() => import("../pages/advance-recruit"));
const AdvanceHomeDetails = lazy(() => import("../pages/advance-home-details"));
const Merchandise = lazy(() => import("../pages/Merchandise"));
const Product = lazy(() => import("../pages/product"));
const Purchase = lazy(() => import("../pages/purchase"));
const TeamDetails = lazy(() => import("../pages/team-details"));
const createTeam = lazy(() => import("../pages/create-team"));
const ParentChildKey = lazy(() => import("../pages/parent-child-key"));
const ParentChildKeyInvite = lazy(() => import("../pages/parent-child-invite"));
const CoachTeamCreation = lazy(() => import("../pages/coach-team-creation"));
const CareerHighlights = lazy(() => import("../pages/career-highlights"));
const PlayerSportDetails = lazy(() => import("../pages/player-sport-details"));
const JoinOrganization = lazy(() => import("../pages/join-organization"));

const PrePlayerDetailsCoach = lazy(() =>
  import("../pages/pre-player-details-coach")
);

const PlayerDetailsCoach = lazy(() =>
  import("../pages/pre-player-details-coach copy")
);

;

const Router = () => {
  return (
    <>
      <Routes>
        {/*Authentication Routes*/}
        <Route element={<Public />}>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth" element={<AuthLayout />}>
            {/* <Route path="social" element={<SignUpSocail />} /> */}
            <Route path="sign-up" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="forgot-username" element={<ForgotUsername />} />
          </Route>
        </Route>

        {/*Profile Creation Routes*/}
        <Route element={<Protected />}>
          <Route element={<UserLayout />}>
            <Route path="who-we-are" element={<WhoWeAre />} />
          </Route>

          <Route element={<MainLayout />}>

            <Route path="/coach">
              <Route path="create-profile" element={<ProfileCreationCoach />} />
            </Route>
            <Route path="/recruiter">
              <Route
                path="create-profile"
                element={<ProfileCreationRecriut />}
              />
              <Route path="players" element={<Players />} />
            </Route>

            <Route path="/parent">
              <Route
                path="create-profile"
                element={<ProfileCreationParent />}
              />
              <Route path="select-child" element={<SelectChildScreen />} />
              <Route path="select-type" element={<SelectCategory />} />
              <Route path="checkout-payment" element={<CheckoutPayment />} />
              <Route path="payment-success" element={<SuccessScreen />} />
              <Route path="select-sport" element={<SelectSport />} />
              <Route path="basic-profile" element={<BasicProfile />} />
              <Route path="advanced-profile" element={<AdvancedProfile />} />
              <Route path="sport-details" element={<AthleticInformation />} />
              <Route path="career-highlights" element={<CareerHighlights />} />
              <Route
                path="academic-information"
                element={<AdvanceAcademic />}
              />
              <Route path="recruiting-info" element={<AdvanceRecruit />} />
            </Route>

            <Route path="/athlete">
              <Route
                path="create-profile"
                element={<ProfileCreationParent />}
              />
              <Route path="select-child" element={<SelectChildScreen />} />
              <Route path="select-type" element={<SelectCategory />} />
              <Route path="checkout-payment" element={<CheckoutPayment />} />
              <Route path="payment-success" element={<SuccessScreen />} />
              <Route path="select-sport" element={<SelectSport />} />
              <Route path="basic-profile" element={<BasicProfile />} />
              <Route path="advanced-profile" element={<AdvancedProfile />} />
              <Route path="sport-details" element={<AthleticInformation />} />
              <Route path="career-highlights" element={<CareerHighlights />} />
              <Route
                path="academic-information"
                element={<AdvanceAcademic />}
              />
              <Route path="recruiting-info" element={<AdvanceRecruit />} />
            </Route>




          </Route>
        </Route>

        {/*Profile Creation Routes for Coach*/}
        <Route element={<Protected />}>
          <Route element={<UserLayout />}>
            <Route path="/coach">
              <Route
                path="select-coach-position"
                element={<SelectCoachPositionPage />}
              />
              <Route path="join-organization" element={<JoinOrganization />} />
              <Route
                path="/coach/select-organization"
                element={<Organization />}
              />
              <Route
                path="organization-category"
                element={<SelectTeamCategory />}
              />
              <Route path="checkout-payment" element={<CheckoutPayment />} />
              <Route path="payment-success" element={<SuccessScreen />} />
              <Route path="create-club-coach" element={<CreateClubPage />} />
              <Route
                path="create-coach-profile"
                element={<CoachProfileDetailPage />}
              />
              <Route path="create-team-coach" element={<CoachTeamCreation />} />
            </Route>
          </Route>
        </Route>

        {/*Protected Routes*/}

        <Route element={<Protected />}>
          <Route element={<MainLayout />}>
            <Route path="/player" element={<BasicHomeVisitor />} />
            <Route path="/player-details" element={<PlayerDetails1 />} />
            <Route path="/fanclub" element={<FanClub />} />
            <Route path="/fanclub/post" element={<SinglePost />} />
            {/*Parent Routes*/}
            <Route path="/parent">
              <Route index element={<BasicHome />} />

              <Route path="players" element={<ParentChildKey />} />
              <Route path="profile" element={<Profile />} />
              <Route path="follow" element={<FollowRequests />} />

              {/* <Route index element={<BasicHome />} /> */}
              <Route path="basic-profile" element={<BasicProfile />} />
              <Route path="sports-details" element={<BasicCreateTeam />} />
              <Route path="player-details" element={<PlayerDetails1 />} />
              <Route path="child-invites" element={<ParentChildKeyInvite />} />
              <Route path="merchandise" element={<Merchandise />} />
              <Route path="fanclub" element={<FanClub />} />
              <Route path="requests" element={<ParentRequests />} />
            </Route>

            {/*Athlete Routes*/}
            <Route path="/athlete">
              <Route index element={<BasicHome />} />

              <Route path="players" element={<ParentChildKey />} />
              <Route path="profile" element={<Profile />} />
              {/* <Route index element={<BasicHome />} /> */}
              <Route path="basic-profile" element={<BasicProfile />} />
              <Route path="sports-details" element={<BasicCreateTeam />} />
              <Route path="player-details" element={<PlayerDetails1 />} />
              <Route path="child-invites" element={<ParentChildKeyInvite />} />
              <Route path="merchandise" element={<Merchandise />} />
              <Route path="follow" element={<FollowRequests />} />
              <Route path="fanclub" element={<FanClub />} />
            </Route>

            <Route path="/coach">
              <Route index element={<Home />} />
              <Route path="player" element={<BasicHome />} />


              <Route path="requests" element={<ParentRequests />} />

              <Route path="players" element={<Players />} />
              <Route path="player-details" element={<PlayerDetails1 />} />
              <Route path="team-details" element={<TeamDetails />} />
              <Route path="profile" element={<ProfileCoach />} />

              <Route path="my-organization" element={<MyOrganization />} />
              <Route path="fanclub" element={<FanClub />} />
              <Route path="requests" element={<ParentRequests />} />
            </Route>

            <Route path="recruiter">
              <Route index element={<HomeRec />} />
              <Route path="player" element={<BasicHome />} />
              <Route path="player-details" element={<PlayerDetails1 />} />
              <Route
                path="select-category-recruit"
                element={<SelectCategoryRecruit />}
              />
              <Route path="checkout-payment" element={<CheckoutPaymentRec />} />

              <Route path="payment-success" element={<SuccessScreen />} />
              <Route path="new-folder" element={<NewFolder />} />
              <Route path="folder-items/:id" element={<FolderItems />} />
              <Route path="fanclub" element={<FanClub />} />
              <Route path="requests" element={<ParentRequests />} />
            </Route>

            <Route path="about-us" element={<About />} />

            <Route path="faqs" element={<Faqs />} />

            <Route
              path="/shipment-details"
              element={<ShipmentTrackingDetails />}
            />

            <Route path="change-password" element={<ChangePassword />} />
            <Route path="privacy-policy" element={<Privacy />} />
            <Route path="support" element={<Support />} />

            {
              /*
               parent flow
            */
              <Route path="select-child" element={<SelectChildScreen />} />
            }

            {
              /*
               athelete basic profile flow
            */

              <Route path="basic">
                <Route index element={<BasicHome />} />
                <Route path="basic-profile" element={<BasicProfile />} />
                <Route path="sports-details" element={<BasicCreateTeam />} />
              </Route>
            }

            {
              <Route path="advance">
                <Route path="advanced-profile" element={<AdvancedProfile />} />
                <Route
                  path="athletic-information"
                  element={<AthleticInformation />}
                />
                <Route
                  path="performance-metrics"
                  element={<AdvancePerformance />}
                />
                <Route
                  path="academic-information"
                  element={<AdvanceAcademic />}
                />
                <Route
                  path="recruiting-information"
                  element={<AdvanceRecruit />}
                />
              </Route>
            }

            <Route path="/athlete">
              <Route index element={<AtheleteHome />} />
              <Route path="requests" element={<ParentRequests />} />
            </Route>
            <Route path="/search" element={<Search />} />
            <Route path="/player-details" element={<PlayerDetails1 />} />
            <Route path="payment" element={<BasicPayment />} />
            {/* <Route path="/select-sport" element={<SelectSport />} /> */}
            <Route
              path="advance-home-details"
              element={<AdvanceHomeDetails />}
            />
            {/* <Route path="select-type" element={<SelectCategory />} /> */}
            <Route path="merchandise" element={<Merchandise />} />
            <Route path="select-items" element={<SelectPackageItems />} />
            <Route path="product-details" element={<Product />} />
            {/* <Route path="product-details" element={<Product />} /> */}
            <Route path="checkout" element={<Purchase />} />
            {/* <Route path="checkout-payment" element={<CheckoutPayment />} /> */}
            {/* <Route path="payment-success" element={<SuccessScreen />} /> */}

            <Route
              path="/coach/profile-details"
              element={<PrePlayerDetailsCoach />}
            />
            <Route
              path="/coach/profile-details"
              element={<PlayerDetailsCoach />}
            />
            <Route
              path="create-profile-coach"
              element={<ProfileCreationCoach />}
            />

            <Route
              path="select-coach-position"
              element={<SelectCoachPositionPage />}
            />
            <Route
              path="create-coach-profile"
              element={<CoachProfileDetailPage />}
            />
            <Route path="create-club-coach" element={<CreateClubPage />} />
            <Route path="create-team-coach" element={<CoachTeamCreation />} />
            <Route path="contact-form" element={<ContactForm />} />
            <Route path="purchase-history" element={<PurchaseHistory />} />
            <Route path="advance-profile" element={<AdvancedProfile />} />
            <Route path="create-team-page" element={<createTeam />} />

            {/* <Route path="team-details/:id" element={<TeamDetails />} /> */}
            <Route path="team-page" element={<TeamPage />} />
            <Route
              path="organization-category"
              element={<SelectTeamCategory />}
            />

            <Route
              path="select-category-recruit"
              element={<SelectCategoryRecruit />}
            />
            <Route
              path="parent-child-invite"
              element={<ParentChildKeyInvite />}
            />
          </Route>
        </Route>

        
        <Route path="edit-team" element={<EditTeam />} />

        {/* <Route path="select-child" element={<SelectChildScreen />} /> */}

        <Route path="/athlete-details" element={<PublicLayout />}>
        
          <Route index element={<PlayerDetailssss />} />
        </Route>
        {/* <Route path="/socail" element={<SignUpSocail />} />
        <Route path="/sign-up" element={<Signup />} />
         */}
        {/* <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="about" element={<About />}>
            <Route path="team" element={<About />} />
            <Route path="history" element={<About />}>
              <Route path="1947" element={<About />} />
            </Route>
          </Route>
        </Route>
       */}
        {
          // protected routes after login
        }
        <Route path="*" element={<NotFound />} />
        <Route element={<PublicLayout />}>
        <Route path="about" element={<About />} />
          <Route
            path="/player-sport-details"
            element={<PlayerSportDetails />}
          />
          <Route path="/team-details" element={<TeamDetails />} />
        </Route>


      </Routes>
    </>
  );
};

export default Router;
