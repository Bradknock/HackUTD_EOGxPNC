// components/Header.jsx
"use client";
import React, {  useState, useEffect } from "react";
import Link from "next/link";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
// import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos, visible]);

    return (
        <header
            className={`px-3 fixed top-0 left-0 right-0 z-10 transition-transform duration-300 ease-in-out ${visible
                    ? "translate-y-0 dark:xl:bg-primary  xl:bg-opacity-20 xl:bg-gradient-to-b xl:from-red-950 xl:to-transparent "
                    : "-translate-y-full xl:bg-transparent"
                }`}
        >
            <div className="py-4 text-white">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/">
                        <h1 className="flex flex-row text-4xl font-semibold gap-0">
                            <div id="firstname">HydraWatch</div>
                            <span className="text-[#ff0000]">.</span>
                        </h1>
                    </Link>

                    <div className="hidden xl:flex items-center gap-8">
                        {/* <ThemeSwitch className="w-40" /> */}

                        <Nav />

                        <Link href="/contact">
                            <button className="transition-all duration-300 p-3 rounded-full text-lg border-white border-2 hover:border-transparent font-light text-white bg-transparent hover:scale-110 hover:bg-[#000000] hover:text-white active:bg-[#ff0000] focus:outline-none focus:text-white active:text-black focus:ring focus:ring-[#ffffff]">
                                FAQs
                            </button>
                        </Link>
                    </div>
                    <div className="xl:hidden flex flex-row gap-5 justify-center items-center">
                        {/* <ThemeSwitch className="w-40" /> */}
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
