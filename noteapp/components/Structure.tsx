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
                <Faq />
                <Slider />
            </div>
    )
}