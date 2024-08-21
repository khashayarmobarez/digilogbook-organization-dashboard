import React from 'react';

const GuestCourseDetails = ({params}) => {

    const { id, courseId } = params;

    return (
        <div>
            {courseId}
        </div>
    );
};

export default GuestCourseDetails;