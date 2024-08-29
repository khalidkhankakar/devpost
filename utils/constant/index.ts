import { HomeIcon, Package2Icon } from 'lucide-react'

export const navLinks = [
    {
        name:'Home',
        link:'/',
        icon:'/icons/home.svg'
    },
    {
        name:'Create a Post',
        link:'/create-post',
        icon:'/icons/artical.svg'
    },
    {
        name:'Tags',
        link:'/tags',
        icon:'/icons/tags.svg'
    },
    {
        name:'Saved',
        link:'/saved',
        icon:'/icons/save.svg'
    },
    {
        name:'Profile',
        link:'/profile',
        icon:'/icons/profile.svg'

    },
    {
        name:'LogIn',
        link:'/log-in',
        icon:'/icons/login.svg'

    },
    {
        name:'SignUp',
        link:'/sign-up',
        icon:'/icons/signup.svg'
    },
]


export const MAX_FILE_SIZE = 1024 * 1024 * 4;
export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];


export const convertFileToUrl = (file:File) => URL.createObjectURL(file);

export function formatMongoDBDate(mongoDBDateString: string): string {
    // Create a Date object from the MongoDB date string
    const date = new Date(mongoDBDateString);
  
    // Define options for toLocaleDateString to get the desired format
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    // Convert the date to the desired string format
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    return formattedDate;
  }
  
 