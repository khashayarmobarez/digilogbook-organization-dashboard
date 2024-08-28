import React from 'react';

const CoachCourseStudentDetails = ({params}) => {

    const {id, courseId, studentId} = params

    return (
        <div>
            {studentId}
        </div>
    );
};

export default CoachCourseStudentDetails;