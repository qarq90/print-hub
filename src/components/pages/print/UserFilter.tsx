import { useState } from "react";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

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
                    className={`-mr-1 ml-2 h-5 w-5 transition-transform ${isOpen ? "transform rotate-180" : ""
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
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-accent ring-1 ring-black ring-opacity-5 focus:outline-none z-50 max-h-60 overflow-y-auto">
                    <div className="py-1">
                        <Button
                            className={`block w-full text-left px-4 py-2 text-sm ${selectedUser === "all"
                                ? "bg-accent/70"
                                : "hover:bg-accent/50"
                                }`}
                            onClick={() => handleUserSelect("all")}
                        >
                            <Text size="sm" className="text-black">All Users</Text>
                        </Button>

                        {uniqueUsers.map((user) => (
                            <Button
                                key={user}
                                className={`block w-full text-left px-4 py-2 text-sm ${selectedUser === user
                                    ? "bg-accent/70"
                                    : "hover:bg-accent/50"
                                    }`}
                                onClick={() => handleUserSelect(user)}
                            >
                                <Text size="sm" className="text-black">{user}</Text>
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};