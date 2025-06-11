import axios from "axios";

const getGoogleUser = async (accessToken: string, expiresIn: number) => {
    try {
        const response = await axios.get(`https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // TODO: add the api call to add the user if not in DB.
        // TODO: handle the token and expiresIn from backend through cookies.

        const userDetails = {
            name: response?.data?.names[0]?.displayName,
            email: response?.data?.emailAddresses[0]?.value,
            photoUrl: response?.data?.photos[0]?.url,
        }

        return userDetails
        
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default getGoogleUser;
