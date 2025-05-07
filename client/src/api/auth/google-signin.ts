import {
  googleClientId,
  googleRedirectUri,
  googleSignInState,
} from "@/lib/env";

const googleSignIn = () => {
  try {
    const params = new URLSearchParams();
    params.append("client_id", googleClientId);
    params.append("redirect_uri", googleRedirectUri);
    params.append("response_type", "token");
    params.append(
      "scope",
      [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ].join(" ")
    );
    params.append("state", googleSignInState);

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  } catch (error) {
    console.error(error);
  }
};

export default googleSignIn;
