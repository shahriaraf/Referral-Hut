import React from 'react';

const SectionTitle = ({title}) => {
    return (
        <div className='mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center'>
                    <h1 className='primary_text_color text-2xl  font-semibold uppercase'>  {title} </h1>
        </div>
    );
};

export default SectionTitle;