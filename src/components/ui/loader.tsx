export const Loader = () => {
    return (
        <>
            <div className="absolute loading-backdrop inset-0 bg-black/75 w-screen h-screen" />
            <div className="loader">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </>
    )
}