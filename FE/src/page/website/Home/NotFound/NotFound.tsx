const NotFound = () => {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex flex-col justify-center items-center h-[60vh]">
                <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-2xl text-gray-500 mb-4">Oops! Page not found.</h2>
                <p className="text-base text-gray-500">
                    The page you are looking for might have been removed, had its name
                    changed, or is temporarily unavailable.
                </p>
            </div>
        </div>
    );
};

export default NotFound;
