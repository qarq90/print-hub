import { useState } from "react";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { truncateText } from "@/functions/utility";

interface UserFilterProps {
    users: string[];
    selectedUser: string;
    onUserChange: (user: string) => void;
}

export const UserFilter = ({ users, selectedUser, onUserChange }: UserFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);

    const handleUserSelect = (user: string) => {
        onUserChange(user);
        console.log("Selected user:", user);
        closeDropdown()
    };

    const uniqueUsers = Array.from(new Set(users)).sort();

    return (
        <div className="relative inline-block text-left">
            <Button
                className="inline-flex justify-between items-center w-full rounded-md shadow-sm px-4 py-2 bg-accent text-black text-sm font-medium"
                onClick={toggleDropdown}
            >
                <Text size="sm" className="text-black">
                    {selectedUser === "all" ? "All Users" : selectedUser}
                </Text>
                <svg
                    className={`h-5 w-5 transition-transform ${isOpen ? "transform rotate-180" : ""
                        }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </Button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 min-w-52 overflow-y-fo overflow-x-hidden rounded-md shadow-lg bg-foreground ring-1 ring-black ring-opacity-5 focus:outline-none z-50 max-h-60 overflow-y-auto">
                    <div className="">
                        <span
                            className={`block bg-accent w-full cursor-pointer text-left px-4 py-2 text-sm ${selectedUser === "all"
                                ? ""
                                : "hover:bg-light"
                                }`}
                            onClick={() => handleUserSelect("all")}
                        >
                            <Text size="sm" className="text-dark">All Users</Text>
                        </span>

                        {uniqueUsers.map((user) => (
                            <span
                                key={user}
                                className={`block bg-accent rounded-none cursor-pointer w-full text-left px-4 py-2 text-sm ${selectedUser === user
                                    ? ""
                                    : "hover:bg-light"
                                    }`}
                                onClick={() => handleUserSelect(user)}
                            >
                                <Text size="sm" className="text-dark">{truncateText(user, 18)}</Text>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};