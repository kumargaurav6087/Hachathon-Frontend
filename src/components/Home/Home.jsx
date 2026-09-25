import Sidebar from "./Sidebar";
import Header from "./Header";
import Hero from "./Hero";
import Categories from "./Categories";
import FeaturedOpportunities from "./FeaturedOpportunities";
import TrustedCompanies from "./TrustedCompanies";
import TrendingOpportunities from "./TrendingOpportunities";
import PlatformStats from "./PlatformStats";

const Home = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-950">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="min-h-screen w-full md:pl-19">
        <Header />

        {/* Homepage content */}
        <div
          className="
            mx-auto
            w-full
            max-w-[1440px]

            px-4
            pb-12

            sm:px-6
            sm:pb-16

            lg:px-8

            xl:px-10
          "
        >
          {/* Hero */}
          <Hero />

          {/* Main homepage sections */}
          <div
            className="
              space-y-14
              sm:space-y-16
              lg:space-y-20
            "
          >
            <Categories />

            <FeaturedOpportunities />

            <TrustedCompanies />

            <TrendingOpportunities />

            <PlatformStats />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;