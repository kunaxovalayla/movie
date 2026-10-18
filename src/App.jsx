import { PopularMovies } from "./mainpage/popularmovies/PopularMovies";
import "./App.css";
import { Header } from "./header/header";
import { Hero } from "./mainpage/Hero/Hero";
import {RomanticMovies} from "./mainpage/RomanticMovies/RomanticMovies";
import { VideoBg } from "./mainpage/VideoBg/VideoBg";
import { Action } from "./mainpage/Action/Action";
import { Funniest } from "./mainpage/Funniest/Funniest";
import { Vikings } from "./mainpage/Vikings/Vikings";
import { PopularSeries } from "./mainpage/popularSeries/PopularSeries";

export const App = () => {
  return (
    <>
      <Header />
      <Hero/>
      <PopularMovies />
      <RomanticMovies/>
      <VideoBg/>
      <Action/>
      <Funniest/>
      <Vikings/>
      <PopularSeries/>
      
     
    </>
  );
}
