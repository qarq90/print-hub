export const FullLoader = () => {
    return (
        <>
            <div className="fixed loading-backdrop inset-0 bg-black/75 w-screen h-full" />
            <div className="loader">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </>
    )
}

export const HalfLoader = () => {
    return (
        <>
            <div className="loader">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </>
    )
}