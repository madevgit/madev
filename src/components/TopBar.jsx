import React, { useState, useEffect } from 'react'
import OdamLogo from '../images/Odam/odam2.svg'
import sendIcon from '../images/icon/send.svg'

export default function Navbar() {

    const [Background, setBackground] = useState(false)
    const [Contact, setContact] = useState(false)
    const [Nom, setNom] = useState('')
    const [Email, setEmail] = useState('')
    const [Objet, setObjet] = useState('')
    const [Message, setMessage] = useState('')

    function toggleContactForm(e) {
        e.target.classList.contains('contactToggler') && setContact(prev => !prev)
    }

    const root = document.querySelector('#root')

    const [NosServices, NosRealisations, Apropos] = [document.querySelector('#NosServices'), document.querySelector('#NosRealisations'), document.querySelector('#Apropos')]

    useEffect(() => {
        function handleScrolll() {
            root.scrollTop > 200 ? setBackground(true) : setBackground(false)
        }

        root.addEventListener('scroll', handleScrolll)
        return () => {
            root.removeEventListener('scroll', handleScrolll)
        }

    }, [Background, root])

    return (
        <div className={`overflow-hidden pb-2 transform z-40 left-0 min-w-full max-w-full fixed transition duration-1000 bg-odamBlack  ${Contact ? '-translate-y-0 bg-opacity-80' : '-translate-y-screen bg-opacity-0'}`}>
            <div onClick={toggleContactForm} className="contactToggler h-screen grid items-center">
                <div className="w-11/12 grid grid-cols-3 bg-odamWhite max-w-screen-sm shadow-xl rounded-md md:rounded-xl mx-auto">
                    <div className="p-2 grid items-center relative">
                        <div className="text-center h-full">
                            <p className="rounded-md py-1 px-2">
                                <img src={OdamLogo} className="h-8" alt="" />
                            </p>
                            <div className="absolute bottom-14">
                                <span className="font-KronaOne mr-1 text-xs">E-mail:</span><span className="font-Imprima inline-block text-xs sm:text-sm">contact@odam.com</span> <br />
                                <span className="font-KronaOne mr-1 text-xs">Tel:</span><span className="font-Imprima inline-block text-xs sm:text-sm">+229 63 38 38 04</span> <br />
                                <span className="font-KronaOne mr-1 text-xs">Adresse:</span><span className="font-Imprima inline-block text-xs sm:text-sm">Fidjrossè rue Fiyégon, Cotonou Bénin</span> <br />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 col-span-2">
                        <form onSubmit={(e) => { e.preventDefault(); console.log({ Nom, Email, Objet, Message }) }} action="">
                            <input onChange={(e) => setNom(e.target.value)} className="contactInput" placeholder="Nom" type="text" name="nom" value={Nom} id="name" />
                            <input onChange={(e) => setEmail(e.target.value)} className="contactInput" placeholder="Email" type="email" name="email" value={Email} id="" />
                            <input onChange={(e) => setObjet(e.target.value)} className="contactInput" placeholder="Objet" type="text" name="objet" value={Objet} id="" />
                            <textarea onChange={(e) => setMessage(e.target.value)} className="contactInput" placeholder="Message" name="message" value={Message} id="" cols="30" rows="5"></textarea>
                            <button className="px-2 py-1 float-right transform -translate-x-1/4 rounded-full bg-odamBlack" type="submit">
                                <img src={sendIcon} className="responsiveImg" alt="" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{ clipPath: 'url(#bgClipper)' }} className="absolute hidden bg-odamBlack h-14">
                <svg width="0" height="0">
                    <defs>
                        <clipPath id="bgClipper" clipPathUnits="objectBoundingBox">
                            <path d="M 0 0
                                     L 1 0
                                     L 1 1
                                     C 1 1 .5 .7 0 1 0,0Z " />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            {/* <header className={`transition-all min-w-full ${Contact && 'hidden'} duration-200 ${Background ? 'shadow-m bg-blue-900' : ''}`}>
                <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                    <img src={OdamLogo} alt="" className="block h-14 w-36 md:h-20 transform lg:w-44 p-2" />)
                    <nav className={`${Background ? 'lg:flex' : ''} hidden justify-between imprimaText text-odamBlack`} >
                        <a onClick={(e) => { e.preventDefault(); root.scrollTo({ top: NosServices.offsetTop - 100, behavior: "smooth" }) }} className="navBarLink" href="#nolink">Nos services <span className="h-0.5 rounded-full transform scale-0 group-hover:scale-100 group-focus:scale-100 duration-500 origin-center w-12/12 bg-odamPurple block mx-auto"></span></a>
                        <a onClick={(e) => { e.preventDefault(); root.scrollTo({ top: NosRealisations.offsetTop - 100, behavior: "smooth" }) }} className="navBarLink" href="#nolink">Nos réalisations <span className="h-0.5 rounded-full transform scale-0 group-hover:scale-100 group-focus:scale-100 duration-500 origin-center w-12/12 bg-odamPurple block mx-auto"></span></a>
                        <a onClick={(e) => { e.preventDefault(); root.scrollTo({ top: Apropos.offsetTop - 100, behavior: "smooth" }) }} className="navBarLink" href="#nolink"> A propos <span className="h-0.5 rounded-full transform scale-0 group-hover:scale-100 group-focus:scale-100 duration-500 origin-center w-12/12 bg-odamPurple block mx-auto"></span></a>
                    </nav>
                    <div className="flex w-6/12 justify-between lg:justify-end items-center sm:w-4/12 lg:w-2/12">
                        <button onClick={toggleContactForm} className={`contactToggler px-2 h-7 lg:h-9 rounded-xl font-ComfortaaBold text-odamGray focus:outline-none shadow-sm focus:scale-90 transform bg-odamPink translate-x-1/2 lg:-translate-x-1/2 lg:text-2xl block`}>Contact</button>
                        <button onClick={Toggler} className="block justify-self-end relative focus:outline-none h-12 w-12 lg:hidden">
                            <span className={`menuTogglerBars ${isOpen ? "hidden" : "inline-block"} ${' bg-odamBlack'}`}></span>
                            <span className={`menuTogglerBars ${isOpen ? 'bg-odamPurple' : `${' bg-odamBlack'}`} -translate-y-0.5 mx-0.5 ${isOpen && '-rotate-45'}`}></span>
                            <span className={`menuTogglerBars ${isOpen ? 'bg-odamPurple' : `${' bg-odamBlack'}`} -translate-y-1 ${isOpen && "-translate-x-1 rotate-45"}`}></span>
                        </button>
                    </div>
                </div>
            </header> */}

        </div>
    )
}