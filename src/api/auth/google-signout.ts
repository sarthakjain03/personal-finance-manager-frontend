import axios from "axios";

const googleSignOut = async (accessToken: string) => {
    try {
        await axios.post(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {}, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        
    } catch (error) {
        console.error(error);
        throw new Error("Error occurred while signing out from Google");
    }
}

export default googleSignOut;
