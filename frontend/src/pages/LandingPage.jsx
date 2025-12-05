import React from "react";
import Navbar2 from "@/components/LandingPgComps/navbar";
import Header2 from "@/components/LandingPgComps/Header";
import AboutSection2 from "@/components/LandingPgComps/About";
import CoursesSection2 from "@/components/LandingPgComps/Courses";
import ReviewsSection2 from "@/components/LandingPgComps/Reviews";
import Footer2 from "@/components/LandingPgComps/Footer";



function LandingPage() {
    return (
        <div>

            <Navbar2/>
            <Header2/>
            <AboutSection2/>
            <CoursesSection2/>
            <ReviewsSection2/>
            <Footer2/>


        </div>
    );
}

export default LandingPage;