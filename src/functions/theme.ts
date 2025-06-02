export const applyTheme = (darkMode: boolean) => {
    document.documentElement.style.setProperty(
        "--background",
        darkMode ? "#191919" : "#cccccc"
    );
    document.documentElement.style.setProperty(
        "--foreground",
        darkMode ? "#cccccc" : "#191919"
    );
};
