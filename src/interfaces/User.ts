export interface UserProps {
    id: string;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    emailAddresses: {
        emailAddress: string;
    }[];
    imageUrl: string;
}
