import axios from "axios";

const getUser = async (accessToken: string) => {
    try {
        const response = await axios.get(`https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

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

export default getUser;
