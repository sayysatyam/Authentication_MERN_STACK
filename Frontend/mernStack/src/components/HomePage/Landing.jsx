import Background from "./Background";
import DashboardPreview from "./DashboardPreview";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbarr from "./Navbarr";



const LandingPage = () => {
    return (
        <div className="min-h-screen relative text-white selection:bg-purple-500 selection:text-white">
            {/* <Background /> */}
            <Navbarr />

            <main className="relative z-10 transition-all duration-500 ease-in-out">
                {/* Hero Section */}
                <div className="relative">
                    <Hero  />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-gray-950/50 pointer-events-none" />
                </div>

               
                <div id="ai-quiz" className="relative">
                    
                </div>

                <DashboardPreview />
             <Footer/>
            </main>
               
        </div>
    );
};

export default LandingPage;