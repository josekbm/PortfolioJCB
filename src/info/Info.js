import self from "../img/self.png"
import mock1 from "../img/mock1.png"
import mock2 from "../img/mock2.png"
import mock3 from "../img/mock3.png"
import mock4 from "../img/mock4.png"
import mock5 from "../img/mock5.png"


export let colors = ["rgb(0,255,164)", "rgb(166,104,255)"];
/*
I highly recommend using a gradient generator like https://gradientgenerator.paytonpierce.dev/ to generate a pair of colors that you like.
These colors will be used to style your name on the homepage, the background of your picture, and some other accents throughout
the site.
 */


/*
So let's get started! Some of the info below is pretty self-explanatory, like 'firstName' and 'bio'. I'll try to explain anything
that might not be obvious right off the bat :) I recommend looking at the template example live using "npm start" to get an idea
of what each of the values mean.
 */

export const info = {
    firstName: "Jose Carlos",
    lastName: "Blanco",
    initials: "JCB", // the example uses first and last, but feel free to use three or more if you like.
    position: "a Full Stack Developer",
    selfPortrait: self, // don't change this unless you want to name your self-portrait in the "img" folder something else!
    gradient: `-webkit-linear-gradient(135deg, ${colors})`, // don't change this either
    baseColor: colors[0],
    miniBio: [ // these are just some "tidbits" about yourself. You can look at mine https://paytonjewell.github.io/#/ for an example if you'd like
        {
            emoji: '🍫',
            text: 'fueled by chocolate'
        },
        {
            emoji: '🌎',
            text: 'based in Seville'
        },
        {
            emoji: "💼",
            text: "FullStack developer"
        },
        {
            emoji: "📧",
            text: "jcblanco.dev@gmail.com"
        }
    ],
    socials: [
        {
            link: "https://www.canva.com/design/DAFgGMyDJpY/rx-KisZaPsUUPgmkWdhLdA/view?utm_content=DAFgGMyDJpY&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink",
            icon: "fa fa-id-card",
            label: 'curriculum'
        },
        {
            link: "https://github.com/josekbm",
            icon: "fa fa-github",
            label: 'github'
        },
        {
            link: "https://www.linkedin.com/in/jose-carlos-blanco-mira-59ab5980",
            icon: "fa fa-linkedin",
            label: 'linkedin'
        },
        
// Feel free to remove any of these that you don't have. I'll write an FAQ on how to add new ones later, let me know if you have a request for an icon!
// Just change the links so that they lead to your social profiles.

    ],
    bio: "Hello! I'm Jose Carlos. I'm a FullStack developer. I studied web development at Ilerna, I enjoy playing RPG videogames, walks on the countryside and I believe artificial intelligence will inevitably rule us all one day. You should hire me!",
    skills:
        {
            proficientWith: ['javascript', 'react', 'redux', 'github', 'typescript', 'html5', 'css3', 'figma', 'MongoDB'],
            exposedTo: ['nodejs', 'php', 'sql']
        }
    ,
    hobbies: [
        {
            label: 'reading',
            emoji: '📖'
        },
        {
            label: 'video games',
            emoji: '🎮'
        },
        {
            label: 'movies',
            emoji: '🎥'
        },
        {
            label: 'cooking',
            emoji: '🌶'
        }
// Same as above, change the emojis to match / relate to your hobbies or interests.
// You can also remove the emojis if you'd like, I just think they look cute :P
    ],
    portfolio: [ // This is where your portfolio projects will be detailed
        {
            title: "OXYGENShop",
            live: "https://josekbm.github.io/OXYGENShop/", //this should be a link to the live version of your project, think github pages, netlify, heroku, etc. Or your own domain, if you have it.
            source: "https://github.com/josekbm/OXYGENShop", // this should be a link to the **repository** of the project, where the code is hosted.
            image: mock1
        },
        {
            title: "Photo Dash",
            live: "https://josekbm.github.io/proyecto-fotos/",
            source: "https://github.com/josekbm/proyecto-fotos",
            image: mock2
        },
        {
            title: "Hotel Miranda",
            live: "https://josekbm.github.io/Hotel-Miranda-HTML/",
            source: "https://github.com/josekbm/Hotel-Miranda-HTML",
            image: mock3
        },
        {
            title: "Miranda's Dashboard",
            live: "https://josekbm.github.io/dashboard-miranda/",
            source: "https://github.com/josekbm/dashboard-miranda",
            image: mock4
        },
        {
            title: "Miranda's Backend",
            source: "https://github.com/josekbm/Miranda-Backend",
            image: mock5
        }
    ]
}