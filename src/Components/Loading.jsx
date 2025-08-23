

import React from 'react';
import { ScaleLoader } from 'react-spinners'

const Loading = () => {
    return (
       <div
            className={` fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900 bg-opacity-90`}
          >
            <ScaleLoader size={100} color='purple' />

            <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200 animate-pulse">      Loading, please wait...
       </p>
          </div>
    );
};

export default Loading;




