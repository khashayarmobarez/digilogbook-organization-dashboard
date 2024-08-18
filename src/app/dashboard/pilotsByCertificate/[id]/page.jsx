import React from "react";

// comps
import PageTitle from "@/components/reusable comps/PageTitle";

const PilotsByCertificatePage = ({ params }) => {

    const { id } = params; // This is the dynamic ID from the URL

    return (
        <div className="flex flex-col w-full  items-center min-h-screen py-16 md:py-20">
            <div className="w-[90%] flex flex-col items-center md:w-[70%] lg:w-[65%] gap-y-8">

                <PageTitle title="خلبانان" doesBackButtonExists={true} />

                <h1>Pilots By Certificate</h1>
                <p>Certificate ID: {id}</p>
                {/* Add your content or data fetching logic here */}
            </div>
        </div>
    );
};

export default PilotsByCertificatePage;
