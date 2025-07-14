
import React from 'https://esm.sh/react@19.1.0';

const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center my-8">
            <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
