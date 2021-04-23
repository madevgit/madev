import { useState, useEffect } from 'react'
import { useDevContext } from './data.jsx'
const axios = require('axios')
function App() {
  const Dev = useDevContext()
  const [Current, setCurrent] = useState(0)
  const [Contact, setContact] = useState(false)
  const [Nom, setNom] = useState('')
  const [Email, setEmail] = useState('')
  const [Objet, setObjet] = useState('')
  const [Message, setMessage] = useState('')
  const [SendingStatus, setSendingStatus] = useState(undefined)

  function ToRight() {
    if (Current < Dev.Projects.length - 1) setCurrent(prev => ++prev)
    else setCurrent(0)
  }
  function ToLeft() {
    if (0 < Current) setCurrent(prev => --prev)
    else setCurrent(Dev.Projects.length - 1)
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSendingStatus(1)
    axios.post('http://localhost:3001/contact', { nom: Nom, email: Email, objet: Objet, message: Message })
      .then(response => {
        if (response.data.status) {
          setSendingStatus(2)
          setNom('')
          setEmail('')
          setObjet('')
          setMessage('')
        } else {
          setSendingStatus(3)
        }
      }).catch(err => console.log(err))
  }
  useEffect(() => {
    const Slider = document.querySelector('#ProjectSlider')
    Slider.scroll({ left: Slider.clientWidth * Current, behavior: 'smooth' })
    if (SendingStatus === 2) {
      document.querySelectorAll('.jauge').forEach(jauge => {
        jauge.style.background = "green"
        jauge.animate([
          { transform: 'scale(1)' },
        ], {
          duration: 2000,
          delay: 100,
          fill: 'forwards',
          easing: 'ease'
        })
      })
    }
    if (SendingStatus === 3) {
      document.querySelectorAll('.jauge').forEach(jauge => {
        jauge.style.background = "red"
        jauge.animate([
          { transform: 'scale(1)' },
        ], {
          duration: 2000,
          delay: 100,
          fill: 'forwards',
          easing: 'ease'
        })
      })
    }
    if (SendingStatus === 1) {
      document.querySelectorAll('.jauge').forEach((jauge, index) => {
        jauge.style.background = "gray"
        jauge.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(0)' },
          { transform: 'scale(1)' }
        ], {
          duration: 2000,
          delay: index * 100,
          iterations: Infinity,
          fill: 'forwards',
          easing: 'ease'
        })
      })
    }
  }, [Current, SendingStatus, Objet, Message, Email, Nom])
  return (
    <>
      <svg width="0" height="0" className="block fixed">
        <defs>
          <clipPath id="clipper" clipPathUnits="objectBoundingBox">
            <path d="M 0,1 
                  L 0,0
                  C .35 .1 .65 .1 1,0
                  L 1,1Z" />
          </clipPath>
        </defs>
      </svg>
      <svg width="0" height="0" className="block fixed">
        <defs>
          <clipPath id="clippers" clipPathUnits="objectBoundingBox">
            <path d="M0,0
                    L 1,0
                    L 1,.5
                    C .8 .7 .5 .8 .2 .65
                    L 0 .5
                    0,0Z " />
          </clipPath>
        </defs>
      </svg>
      <main onScroll={(e) => {
        e.target.scrollTop > 50 ? e.target.firstElementChild.classList.add('-translate-y-1/2') : e.target.firstElementChild.classList.remove('-translate-y-1/2')
      }} className="overflow-y-scroll overflow-x-hidden h-screen mx-auto relative">
        <div className={`transition-transform transform duration-700 fixed left-0 w-full z-50 ${Contact ? '-translate-y-1/2 lg:-translate-y-0' : ''}`}>
          < div className="w-full overflow-hidden text-xs lg:text-base bg-gradient-to-bl from-gray-100 to-gray-400 font-Righteous" >
            <div className="max-w-screen-lg h-16 py-2 px-1 sm:p-2 mx-auto flex justify-between flex-col sm:flex-row sm:items-center transition-height duration-700">
              <div className="flex justify-between sm:w-6/12">
                <p className="text-center"> <img src={Dev.Email.Logo} alt="Mail:" className="h-5 w-5 inline-block rounded-full" /> <a href={`mailto:${Dev.Email.Text}`}> {Dev.Email.Text} </a> </p>
                <p className="text-center"> <img src={Dev.Tel.Logo} alt="Tel:" className="h-5 w-5 inline-block rounded-full" /> <a href={`tel:${Dev.Tel.Text}`}>+229 63 38 38 04</a>  </p>
              </div>
              <p className="text-center"> <img src={Dev.Adresse.Logo} alt="Adresse:" className="h-5 w-5 inline-block rounded-full" /> {Dev.Adresse.Text} </p>
            </div>
          </div>
          <header className={`bgBlur1 transition-contact duration-700 bg-opacity-20 bg-white lg:rounded-b-lg`}>
            <div className="px-2 h-20 flex w-full justify-between items-center max-w-screen-lg mx-auto">
              <div className="block shadowg-glass ring-2  bg-gradient-to-bl from-gray-100  to-gray-400 h-14 w-14 rounded-full"><img src={Dev.Logo} alt={Dev.FirstName} className="h-full w-full" /></div>
              <nav className="w-10/12 sm:w-7/12 flex justify-between items-center">
                <div className="ml-4 lg:ml-auto w-full">
                  {Dev.SocialMedias.map((social, index) => <a key={index} href={social.Link}><img src={social.Icon} alt={social.Name} className="h-7 lg:h-9 inline-block mx-1.5 bg-gradient-to-bl from-gray-100 to-gray-400 ring-opacity-30 ring-2 p-2 ring-black ring-offset-black shadow-3xl rounded-full" /></a>)}
                </div>
                <button onClick={() => setContact(prev => !prev)} className={`font-Righteous ${Contact ? 'font-black text-xl h-12 w-12' : ''} bg-gradient-to-bl from-gray-100 to-gray-400 bgBlur1 text-sm shadowg-glass ring-2 p-2 rounded-full ring-offset-black`}> {Contact ? 'X' : 'Contact'} </button>
              </nav>
            </div>
          </header>
        </div>
        <section className="relative flex flex-col mt-40 mb-10 min-h-screen h-auto lg:col-span-11 max-w-screen-lg mx-auto">
          <div style={{ clipPath: 'url(#clippers)' }} className="absolute w-full z-0 top-2 lg:top-0 mx-auto hidden lg:block h-2/7 xl:h-1/3 lg:bgBlur1 lg:bg-white lg:bg-opacity-20 rounded-lg">
          </div>
          <article className="grid grid-cols-3 lg:h-1/6 w-{ transform: 'scale(1)' }{ transform: 'scale(1)' } text-center items-center text-opacity-80 text-lg sm:text-xl lg:text-3xl lg:my-0 my-10 px-2 font-Righteous">
            <div className="">
              {`${Dev.FirstName} ${Dev.LastName}`}
            </div>
            <div>
              <img src={Dev.Profil} alt="images" className="block mx-auto lg:w-4/12 w-6/12 bg-gradient-to-bl from-gray-100  to-gray-400  ring-opacity-30 ring-2 rounded-full mt-1.5 xl:mt-4 ring-black ring-offset-black" />
            </div>
            <div>
              {Dev.Qualification}
            </div>
          </article>
          <article className="flex clipArt lg:h-5/6 flex-col lg:flex-row justify-center lg:justify-between">
            <section className="lg:w-2/7 lg:bgBlur1 lg:bg-white lg:bg-opacity-20 rounded-lg pt-10 px-2 my- lg:my-auto">
              <h1 className="text-5xl lg:text-2xl mx-auto w-full text-center text-opacity-80 font-black block font-Righteous">
                Compétences
              </h1>
              <div className="grid sm:grid-cols-4 sm:grid-rows-2 lg:grid-cols-2 lg:grid-rows-4 grid-cols-2 grid-rows-4 gap-x-2 gap-y-7 my-5 justify-center items-center">
                {Dev.Skills.map((skill, index) => (<div key={index} className="flex hover:scale-90 transition-transform duration-500 transform flex-col bg-black bg-opacity-10 p-2 rounded-3xl ring-2 ring-white ring-opacity-10 bgBlur3 shadow-inner">
                  <svg height="60" width="60" className="mx-auto counter" percent={skill.Level} >
                    <circle
                      style={{ filter: 'url(#cShadow)' }}
                      className="bgBlur1"
                      cx="30"
                      cy="30"
                      r="30"
                      fill="rgba(17,24,39,.1)"
                    />
                    <circle
                      cx="30"
                      cy="30"
                      r="26"
                      fill="rgba(255,255,255,.1)"
                      stroke='rgba(0,0,0,.8)'
                      strokeWidth="6"
                      strokeDasharray="163"
                      strokeDashoffset="163"
                      strokeLinecap="round"
                    />
                    <filter id="cShadow" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="100" />
                      <feComponentTransfer>
                        <feFuncA type="linear" slope=".5" />
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <text textAnchor="middle" x="30" y="35" textRendering="5" className="text-xs font-Righteous" fill="rgba(0,0,0,.3)">{skill.Title}</text>
                    {/* <text id="percent" className="fixed font-Viga text-xs" x="19" y="45" fill="rgba(0,0,0,.8)">{skill.Level}%</text> */}
                  </svg>
                  <div className="flex items-center justify-center font-Iceland">
                    {skill.Tools.map((tool, index) => (<p key={index} className="lg:text-xs text-xs md:text-base md:my-1 lg:my-auto mx-0.5 font-black text-opacity-60 text-black">{tool}</p>))}
                  </div>
                </div>))}
              </div>
            </section>
            <section className="lg:w-2/7 lg:bgBlur1 lg:bg-white lg:bg-opacity-20 rounded-lg pt-10 my-4 lg:my-auto">
              <h1 className="text-5xl lg:text-2xl mx-auto w-full text-center text-opacity-80 font-black block font-Righteous">
                Moi
              </h1>
              <div className="flex flex-col md:flex-row lg:flex-col min-w-full min-h-full">
                {Dev.About.map((item, index) => (<div key={index} className="mb-10 text-center pt-2 mx-auto w-full ">
                  <img src={item.Logo} className="h-16 w-16 lg:h-10 lg:w-10 my-10 lg:my-auto inline-block " alt={item.title} /> <h1 className="font-black ml-2 uppercase mb-4 inline-block text-3xl sm:text-2xl lg:text-xl font-Bruno">{item.Title} </h1>
                  <div className="grid grid-flow-col gap-2 w-10/12 mx-auto">
                    {item.List.map((element, index) => <div key={index} className="font-thin leading-none"><img src={element.Icon} className="h-12 w-12 bg-black bg-opacity-10 rounded-3xl p-2 bgBlur3 ring-2 ring-white ring-opacity-10 shadow-inner mx-auto block" alt={element.Name} />
                      {element.Name.map((word, index) => <span key={index} className="block font-Iceland"> {word} </span>)}
                    </div>)}
                  </div>
                </div>))}
              </div>
            </section>
            <section className=" lg:w-2/7 lg:bgBlur1 lg:bg-white lg:bg-opacity-20 rounded-lg pt-10 my-4 lg:my-auto">
              <h1 className="text-5xl lg:text-2xl mx-auto w-full text-center text-opacity-80 font-black block font-Righteous">
                Réalisations
              </h1>
              <div className={`max-w-full w-full`}>
                <div className="w-11/12 lg:w-full grid items-center mx-auto relative">
                  <button onClick={ToLeft} id="ToggleLeft" className="absolute -mt-20 font-black text-2xl font-Righteous bgBlur1 bg-white bg-opacity-10 rounded-full h-10 w-10">
                    {'<'}
                  </button>
                  <button onClick={ToRight} id="ToggleRight" className="absolute -mt-20 font-black text-2xl font-Righteous bgBlur1 bg-white bg-opacity-10 rounded-full h-10 w-10 right-0">
                    {'>'}
                  </button>
                  <div id="ProjectSlider" className="flex justify-between text-center w-full max-w-full overflow-hidden items-center">
                    {Dev.Projects.map((project, index) => (<div key={index} className="min-w-full max-w-full">
                      <span className="text-4xl py-7 inline-block  font-Bruno">{project.Name} </span>
                      <img src={project.Image} alt="top" className="max-h-full max-w-full w-11/12 h-72 sm:h-80 md:h-100 lg:h-56 rounded-lg block mx-auto" />
                      <div className="py-6 text-3xl lg:text-lg font-extralight font-Iceland">
                        <p>Conçu avec</p>
                        <div className="flex text-xs my-2 md:text-sm justify-between w-8/12 lg:w-10/12 mx-auto text-center">
                          {project.Techs.map((tech, index) => <div key={index} > <p className="h-4 w-4 mx-auto bg-gradient-to-bl from-gray-100  to-gray-400 shadow-xl ring-2 ring-opacity-60 ring-offset-pink-500 rounded-full "></p> <p>{tech}</p> </div>)}
                        </div> <a href={project.Link} rel="noreferrer" target="_blank" className="text-xl p-2 bg-gradient-to-bl from-gray-100  to-gray-400 shadow-xl ring-2 ring-opacity-60 ring-offset-pink-500 rounded-full font-black font-Bruno">Go</a>
                      </div>
                    </div>))}
                  </div>
                </div>
              </div>
            </section>
          </article>
        </section>
        <div className="w-full md:mt-20 mb-10 lg:flex justify-between pb-8">
          <div className="lg:w-5/12 mb-20 bgBlur1 p-4 mx-auto w-11/12 font-Righteous font-light tracking-wide rounded-xl bg-white shadow-xl max-w-screen-sm">
            Je suis ouvert à toute proposition d'emploi dans le cadre de mes compétences(travail fixe ou télé-travail).
            < div className="w-full flex flex-col transition-height duration-700 overflow-hidden justify-between h-24 text-xs p-2 font-Viga" >
              <div className="flex justify-between">
                <p className="text-center"> <img src={Dev.Email.Logo} alt="Mail:" className="h-5 w-5 mx-auto block rounded-full" /> <a href={`mailto:${Dev.Email.Text}`}> {Dev.Email.Text} </a> </p>
                <p className="text-center"> <img src={Dev.Tel.Logo} alt="Tel:" className="h-5 w-5 mx-auto block rounded-full" /> <a href={`tel:${Dev.Tel.Text}`}> +229 63 38 38 04 </a>  </p>
              </div>
              <p className="text-center"> <img src={Dev.Adresse.Logo} alt="Adresse:" className="h-5 w-5 inline-block rounded-full" />{Dev.Adresse.Text} </p>
            </div>
            <div className="flex my-2 justify-center">
              {Dev.SocialMedias.map((social, index) => <a key={index} href={social.Link}><img src={social.Icon} alt={social.Name} className="h-7 lg:h-9 inline-block mx-1.5 bg-gradient-to-bl from-gray-100 to-gray-400 ring-opacity-30 ring-2 p-2 ring-black ring-offset-black shadow-3xl rounded-full" /></a>)}
            </div>
          </div>
          <div className="lg:w-5/12 mb-20 bgBlur1 flex justify-center p-4 mx-auto w-11/12 font-Righteous tracking-wide rounded-xl bg-white shadow-xl max-w-screen-sm relative" >
            <div className="absolute bg-white border-black border-opacity-10 border-dashed -top-1/4 p-1 h-32 w-32 sm:h-36 sm:w-36 rounded-full overflow-hidden shadow-inner ">
              <img className="h-full w-full object-cover object-top" src={Dev.ProfilImage} alt="" />
            </div>
            <div className="tracking-wide text-sm font-thin leading-6 text-justify mt-20 font-Righteous">
              "Fasciné et passionné par le code, J'aime réléver des défis et resoudre des problèmes. J'apprend sans cesse de nouvelles compétences dans l'initiative d'apporter des solutions aux problèmes quotidiens.
            </div>
          </div>
        </div>
        <div id="Contact" className={`fixed left-0 flex items-center justify-center transition-height duration-700 ${Contact ? 'h-screen bg-opacity-90' : 'h-0 bg-opacity-0'}  flex bottom-0 bg-gray-400 w-full overflow-x-hidden`}>
          <div className="bg-white shadow-lg rounded-lg max-w-screen-sm md:flex p-4 w-11/12 mt-28">
            < div className="w-full md:w-4/12 flex flex-col transition-height duration-700 overflow-hidden justify-between h-24 md:h-full text-xs p-2 font-Viga" >
              <div className={`md:block shadowg-glass ring-2 mx-auto hidden bg-gradient-to-bl from-gray-100 to-gray-400 h-32 w-32 mb-8 rounded-full`}><img src={Dev.Logo} alt={Dev.FirstName} className="h-full w-full" /></div>
              <div className="flex justify-between md:flex-col">
                <p className="text-center"> <img src={Dev.Email.Logo} alt="Mail:" className="h-5 w-5 mx-auto block rounded-full" /> <a href={`mailto:${Dev.Email.Text}`}> {Dev.Email.Text} </a> </p>
                <p className="text-center"> <img src={Dev.Tel.Logo} alt="Tel:" className="h-5 w-5 mx-auto block rounded-full" /> <a href={`tel:${Dev.Tel.Text}`}> +229 63 38 38 04 </a>  </p>
              </div>
              <p className="text-center"> <img src={Dev.Adresse.Logo} alt="Adresse:" className="h-5 w-5 inline-block rounded-full" />{Dev.Adresse.Text} </p>
            </div>
            <form className="mt-4 md:-mt-0 md:w-8/12" onSubmit={handleSubmit} action="">
              <input onChange={(e) => setNom(e.target.value)} className="bg-gray-200 block mb-1 w-full rounded-sm h-10 px-2" placeholder="Nom" required={true} type="text" name="nom" value={Nom} id="name" />
              <input onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 block mb-1 w-full rounded-sm h-10 px-2" placeholder="Email" required={true} type="email" name="email" value={Email} id="" />
              <input onChange={(e) => setObjet(e.target.value)} className="bg-gray-200 block mb-1 w-full rounded-sm h-10 px-2" placeholder="Objet" required={true} type="text" name="objet" value={Objet} id="" />
              <textarea onChange={(e) => setMessage(e.target.value)} className="bg-gray-200 block mb-1 w-full rounded-sm px-2" placeholder="Message" required={true} name="message" value={Message} id="" cols="30" rows="5"></textarea>
              <div className="flex w-full">
                <div className="w-9/12">
                  <div>
                    <p className={`h-4 w-4 jauge bg-white rounded-full inline-block mx-1 mt-2"`}></p>
                    <p className={`h-4 w-4 jauge bg-white rounded-full inline-block mx-1 mt-2"`}></p>
                    <p className={`h-4 w-4 jauge bg-white rounded-full inline-block mx-1 mt-2"`}></p>
                  </div>
                  <p className="font-Iceland text-sm">
                    {SendingStatus === 1 ? 'Envoi...' : SendingStatus === 2 ? 'Envoyé! Merci et à bientôt.' : SendingStatus === 3 ? 'Oups! Veuillez réessayer svp.' : ''}
                  </p>
                </div>
                <button className="px-2 py-1 rounded-full bg-gradient-to-bl from-gray-100 font-Iceland text-lg  to-gray-400" type="submit">
                  Envoyer
              </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
export default App;
