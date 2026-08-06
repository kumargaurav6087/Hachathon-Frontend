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
    <main className="min-h-screen bg-white text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-[76px]">
        <Header />

        <div className="mx-auto w-full max-w-[1240px] px-5 pb-20 sm:px-7 lg:px-10">
          <Hero />
          <Categories />
          <FeaturedOpportunities />
          <TrustedCompanies />
          <TrendingOpportunities />
          <PlatformStats />
        </div>
      </div>
    </main>
  );
};

export default Home;