export const getFormatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};

export const truncateText = (text: string) => {
    return text.length > 18 ? `${text.substring(0, 18)}...` : text;
};
