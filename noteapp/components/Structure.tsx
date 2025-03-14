import { Faq } from "@/components/Faq";
import { Cards } from "../components/Cards";
import { Hero } from "../components/Hero";
import React from 'react';
import Slider from "./Slider";

export function Structure(){
    return(
            <div>
                <Hero />
                <Cards />
                <p className="text-3xl w-[50%] text-center mx-auto my-[20px] sm:my-[70px]">FAQ</p>
                <Faq />
                <Slider />
            </div>
    )
}