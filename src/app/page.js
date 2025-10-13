import Link from "next/link";
import Header from "./component/layout/Header";
import Hero from "./component/layout/Hero";
import HomeMenu from "./component/layout/HomeMenu";
import SectionHeaders from "./component/layout/SectionHeaders";
 
export default function Home() {
  return (
    <>

      {/* //TODO We're going to start by creating the header */}
      <Hero />
      <HomeMenu />
      <section className="text-center mt-7" id="about">
        {/* //TODO We're going to create the about section */}
        <SectionHeaders subHeader={'Our Story'} mainHeader={'About us'}></SectionHeaders>
        <div className="text-gray-700 text-sm mb-3 text-center mx-14 flex flex-col gap-4">
          <p>Lorem fwo iet oie uwiu ogeq r iu goqeurogi q regoi qregqne r i g u h qe rihqrk j fodjfo  ijroiqur e oiuqeworiuq ew fqow ieufoquewf oqi urfo iu qefoiu  eqriuforeufoeqriu e foqeurofure   f iewurofiue roifuqer fer feoiru foeurfeur fue rf urefuaösdfakjsdlkfja skfj aldsjfa lsdjf as</p>
          <p>Lorem fw q regoi qregqne r i g u h qe rihqrk j fodjfo  ijroiqur e oiuqeworiuq ew fqow ieufoquewf oqi urfo iu qefoiu  eqriuforeufoeqriu e foqeurofure   f iewurofiue roifuqer fer feoiru foeurfeur fue rf urefuaösdfakjsdlkfja skfj aldsjfa lsdjf as</p>
          <p>Lorem ew fqow ieufoquewf oqi urfo iu qefoiu  eqriuforeufoeqriu e foqeurofure   f iewurofiue roifuqer fer feoiru foeurfeur fue rf urefuaösdfakjsdlkfja skfj aldsjfa lsdjf as</p>
        </div>
      </section>

      <section className="text-center mt-10" id="contact">
      <SectionHeaders subHeader={'Give it a try'} mainHeader={'Contact us'}></SectionHeaders>
        <h3 className="text-2xl text-gray-500 italic underline underline-offset-8">
          <Link className="cursor-pointer" href="/">+212 6492-839</Link>
        </h3>
      </section>
    
     </>
  );
}
