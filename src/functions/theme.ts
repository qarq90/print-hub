export const applyTheme = (darkMode: boolean) => {
    document.documentElement.style.setProperty(
        "--background",
        darkMode ? "#191919" : "#fff",
    );
    document.documentElement.style.setProperty(
        "--foreground",
        darkMode ? "#fff" : "#191919",
    );
    document.documentElement.style.setProperty(
        "--stone",
        darkMode ? "#202020" : "#dddddd",
    );
};
