"use client";
import type { NextPage } from "next";
import Gallery from "../components/gallery"



const Home: NextPage = () => {
  return(
    <div className="text-center pt-20 justify-center font-bold leading-tight text-black text-9xl bg-lime-50">
      Feeling Itchy?
    <div className="flow flow-grow pt-40">
      <Gallery></Gallery>
    </div>
    </div>

  );
};

export default Home


