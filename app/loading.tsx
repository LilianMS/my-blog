export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full text-center">
                <div className="loader mb-4"></div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    Carregando...
                </h2>
            </div>
        </div>
    );
}