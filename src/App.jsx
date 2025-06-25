import "./App.css";

import Router from "./router/index";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  useMutation,
} from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import toast, { Toaster } from "react-hot-toast"; // For error toasts

//import { requestPermission } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { REFRESH } from "./graphql/mutation";
//import { RefreshTokenOnSubmit } from "./graphql/api-callings";
import { handleAuth, handleLogout } from "./redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";
import { requestPermission } from "./firebase";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'sweetalert2/src/sweetalert2.scss'


function App() {

  console.log("asdfgh")

  //  useEffect(() => {
  //    requestPermission();
  //  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAP_KEY,
    libraries: ["places"], // Use a consistent libraries array
    version: "weekly",
  });


  const navigate = useNavigate();
  const dispatch = useDispatch();
  let errorProcessed = false;


  useEffect(() => {
    requestPermission();
  }, []);

  const refreshToken = useSelector(
    (state) => state?.authSlice?.user?.refresh_token
  );
  const accessToken = useSelector(
    (state) => state?.authSlice?.user?.access_token
  );
  console.log(accessToken, 'WHAT IS THIS');
  // ** Apollo Client Setup

  const uploadLink = createUploadLink({
    uri: import.meta.env.VITE_BASE_URL,
    credentials: "same-origin",
  });

  const removeSlashesAndQuotes = (str) => {
    // Remove backslashes and double quotes
    return str.replace(/["\\]/g, "");
  };

  const authLink = setContext((_, { headers }) => {
    // const token = localStorage.getItem("accessToken") || null;
    const parsedValue = JSON.parse("null");
    console.log("TYPEE", typeof null);

    return accessToken
      ? {
        headers: {
          ...headers,
          authorization: accessToken,
          "ngrok-skip-browser-warning": true,
        },
      }
      : {
        headers: {
          ...headers,
          "ngrok-skip-browser-warning": true,
        },
      };
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (!errorProcessed) {
        errorProcessed = true;

        if (graphQLErrors) {
          // If the first GraphQL error is 401 (Unauthorized)
          if (graphQLErrors[0]?.statusCode === 401) {
            console.log(graphQLErrors, "this is 401");

            const variables = {
              refreshToken: refreshToken,
            };

            // Refresh token mutation

            client
              .mutate({ mutation: REFRESH, variables })
              .then(async ({ data }) => {
                console.log(data, "Token refreshed successfully");

                const payload = {
                  accessToken: data?.refresh?.accessToken,
                  refreshToken: data?.refresh?.refreshToken,
                };

                // If token refresh is successful (status 200)
                if (data?.refresh?.statusCode === 200) {
                  // Dispatch action to handle auth with new tokens
                  await dispatch(handleAuth(payload));
                  // Store the new tokens in localStorage
                  localStorage.setItem(
                    "accessToken",
                    data?.refresh?.accessToken
                  );

                  localStorage.setItem(
                    "refreshToken",
                    data?.refresh?.refreshToken
                  );
                  console.log(operation, "what is opertaion");

                  // Retry the original operation after token is refreshed
                  return forward(operation);
                } else {
                  console.log("Token refresh returned an unexpected status");
                  return;
                }
              })
              .catch((error) => {
                // If refresh token fails with 401
                if (error?.message?.includes("401")) {
                  console.log("401 error during token refresh, logging out...");
                  dispatch(handleLogout());

                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");

                  navigate("/login");
                  return;
                }
                console.error("Error during token refresh:", error);
              });
          } else {
            // Handle other GraphQL errors
            graphQLErrors.forEach(({ message }) => {
              toast.error(`${message}`, { theme: "dark" });
              console.error(`[GraphQL error]: Message: ${message}`);
            });
          }
        } else if (networkError) {
          // Handle network errors
          toast.error(`[Network error]: ${networkError?.message}`, {
            theme: "dark",
          });
          console.error(`[Network error]: ${networkError}`);
        }

        // Reset errorProcessed flag after 500ms
        setTimeout(() => {
          errorProcessed = false;
        }, 500);
      }
    }
  );

  const link = ApolloLink.from([authLink, errorLink, uploadLink]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });


  // name of the application to connect to the server with the default port number of
  return (
    <>
      <div className="light">
        <ApolloProvider client={client}>
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_GOOGLE_CLIENT_SECRET}
          >
            <Router />
          </GoogleOAuthProvider>

          <Toaster
            toastOptions={{
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
                fontSize: "14px",
              },
            }}
            position="top-right"
            reverseOrder={false}
          />
        </ApolloProvider>
      </div>
    </>
  );
}

export default App;
