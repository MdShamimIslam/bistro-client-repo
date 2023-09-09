import React from "react";
import SectionTitle from "../../../Components/SectionTitle";
import featured from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="my-16 featured-item py-12 bg-fixed">
      <SectionTitle
        heading={"Featured item"}
        subHeading={"Check it out"}
      ></SectionTitle>
      <div className=" mt-10 flex flex-col lg:flex-row justify-center items-center px-24 lg:px-32 py-8 bg-slate-500 bg-opacity-60 text-white">
        <img className="lg:w-[500px]" src={featured} alt="" />
        <div className="md:ml-10 mt-6 text-black ">
          <h2 className="font-semibold">March 20, 2023</h2>
          <h3 className="uppercase font-semibold">Where can I get some</h3>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            aliquam officiis modi id? Nostrum provident dolor sint adipisci
            officiis perferendis ut, iusto aliquam vitae ducimus! Expedita et
            fuga quos aperiam id omnis ipsa cumque sint consectetur natus
            placeat ratione quod enim rem excepturi exercitationem temporibus
            tempora eos, vitae amet vero?
          </p>
          <button className="btn text-black btn-outline mt-10 border-0 border-b-4">
            View full menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
