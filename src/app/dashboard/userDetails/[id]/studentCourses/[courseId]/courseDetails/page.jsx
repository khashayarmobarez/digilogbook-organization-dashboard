import React from 'react';

const studentCourseDetails = ({params}) => {

    const { id, courseId } = params;

    return (
        <div>
            {courseId}
        </div>
    );
};

export default studentCourseDetails;