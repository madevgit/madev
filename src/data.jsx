import React, { useContext } from 'react'

//General assets-Icons
import Graduation from './icon/assets/Graduation.png'
import Quality from './icon/assets/Quality.svg'
import Hobbies from './icon/assets/Hobbies.svg'
import Medaille from './icon/assets/medaile.png'
import Devimage from './icon/images/devimage.png'
//Logo assets
import Logo from './icon/logo/logo.svg'
import Profil from './icon/assets/male.svg'
import Mail from './icon/assets/email.png'
import Tel from './icon/assets/phone-call.png'
import Adresse from './icon/assets/address.png'
//Social icons
import Facebook from './icon/social/facebook.svg'
import Behance from './icon/social/behance.svg'
import Dribbble from './icon/social/dribbble.svg'
import Linkedin from './icon/social/linkedin.svg'

//Projects images
import Alvira from './icon/images/Alvira.png'
import CV from './icon/images/monCV.png'
import BRN from './icon/images/BRN.png'
import PORTOFOLIO from './icon/images/Portofolio.png'
import ODAM from './icon/images/odam.png'

//Hobbies icons
import Running from './icon/hobbies/running.png'
import Music from './icon/hobbies/music.svg'
import Game from './icon/hobbies/game.png'

//Quality icons
import creative from './icon/quality/creative.png'
import disciplinate from './icon/quality/disciplinate.svg'
import empathic from './icon/quality/empathic.png'

const DeveloperContext = React.createContext()

export function useDevContext() {
    return useContext(DeveloperContext)
}

export default function Developer({ children }) {
    return (
        <DeveloperContext.Provider value={{
            Logo: Logo,
            Profil: Profil,
            ProfilImage: Devimage,
            FirstName: 'Moukadim',
            LastName: 'Alassani',
            Email: {
                Logo: Mail,
                Text: 'moukadimalassani@gmail.com'
            },
            Tel: {
                Logo: Tel,
                Text: '+22963383804',
            },
            Adresse: {
                Logo: Adresse,
                Text: 'Bénin, Cotonou, Fidjrossè Rue Fiyegon'
            },
            Qualification: ['Développeur Web', ' - ', 'Designer'],
            About: [
                {
                    Title: 'Diplomes',
                    Logo: Graduation,
                    List: [
                        {
                            Name: ['Licence', 'informatique'],
                            Icon: Medaille
                        },
                        {
                            Name: ['Bac', 'Scientifique'],
                            Icon: Medaille
                        },
                        {
                            Name: ['BEPC', 'Modern-Court'],
                            Icon: Medaille
                        }
                    ]
                }, {
                    Title: 'Loisirs',
                    Logo: Hobbies,
                    List: [
                        {
                            Name: ['Musique'],
                            Icon: Music
                        },
                        {
                            Name: ['Sport'],
                            Icon: Running
                        },
                        {
                            Name: ['Jeux Vidéo'],
                            Icon: Game
                        }
                    ]
                }, {
                    Title: 'Atouts',
                    Logo: Quality,
                    List: [
                        {
                            Name: ['Créatif'],
                            Icon: creative
                        },
                        {
                            Name: ['Empathique'],
                            Icon: empathic
                        },
                        {
                            Name: ['Discipliné'],
                            Icon: disciplinate
                        }
                    ]
                }],
            SocialMedias: [
                {
                    Name: 'Facebook',
                    Icon: Facebook,
                    Link: 'https://web.facebook.com/madevfb'
                },
                {
                    Name: 'LinkedIn',
                    Icon: Linkedin,
                    Link: 'https://linkedin.com/in/moukadim-alassani-96957220b/'
                },
                {
                    Name: 'Dribbble',
                    Icon: Dribbble,
                    Link: 'https://dribbble.com/MADev/about'
                },
                {
                    Name: 'Behance',
                    Icon: Behance,
                    Link: 'https://www.behance.net/moukadimal820c'
                }
            ],
            Skills: [
                { Title: 'HTML', Tools: ['HTML'], Level: '80' },
                { Title: 'CSS', Tools: ['Tailwindcss', 'Bootstrap'], Level: '75' },
                { Title: 'JS', Tools: ['ReactJS', 'NodeJs'], Level: '65' },
                { Title: 'SGBDR', Tools: ['MySQL'], Level: '60' },
                { Title: 'PHP', Tools: ['Laravel'], Level: '65' },
                { Title: 'NoSQL', Tools: ['MongoDB'], Level: '50' },
                { Title: 'UI & UX', Tools: ['Inkskape', 'Lunacy', 'AdobeXD'], Level: '65' },
                { Title: 'CMS', Tools: ['Wordpress'], Level: '35' }
            ],
            Projects: [
                {
                    Name: 'BRN',
                    Description: 'Projects en cours',
                    Link: 'https://www.behance.net/gallery/118108963/BRN',
                    Techs: ['Inkscape'],
                    Image: BRN,
                    Type: 0
                },
                {
                    Name: 'PORTOFOLIO',
                    Description: 'Projects en cours',
                    Link: 'https://madev.vercel.app',
                    Techs: ['ReactJS', 'Tailwincss', 'NodeJS'],
                    Image: PORTOFOLIO,
                    Type: 0
                },
                {
                    Name: 'ALVIRA',
                    Description: "Alvira est une plateforme d'échange de cryptomonnaie rapide,sécurisé",
                    Link: 'https://alvira.vercel.app',
                    Techs: ['Tailwindcss', 'HTML', 'Vanilla JS'],
                    Image: Alvira,
                    Type: 1
                },
                // {
                //     Name: 'ODAM',
                //     Description: 'Projects en cours',
                //     Link: '',
                //     Techs: ['Lunacy'],
                //     Image: ODAM,
                //     Type: 0
                // },
                // {
                //     Name: 'CV',
                //     Description: 'Projects en cours',
                //     Link: '',
                //     Techs: ['AdobeXD'],
                //     Image: CV,
                //     Type: 1
                // }
            ]
        }}>
            {children}
        </DeveloperContext.Provider>
    )
}
