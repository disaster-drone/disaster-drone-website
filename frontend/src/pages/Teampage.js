import React from 'react'
import TeamCard from '../components/TeamCard'

const Teampage = () => {

  let people0 = [
    {
      name: 'Mario Villatoro',
      title: 'Full Stack Website Developer',
      stack: 'Javascript, ReactJS, TailwindCSS, MongoDB, Google Cloud Platform, NodeJS',
      image: 'https://cdn.discordapp.com/attachments/913999827816308776/1094451331252637736/male_profile.png'
    },
    {
      name: 'Carlos Sanchez',
      title: 'Full Stack Website Developer',
      stack: 'Javascript, ReactJS, MongoDB, Google Cloud Platform, NodeJS',
      image: 'https://cdn.discordapp.com/attachments/913999827816308776/1094451331252637736/male_profile.png'
    },
    {
      name: 'Faith Gutierrez',
      title: 'Full Stack Virtual Reality Developer',
      stack: 'Unreal Engine, Reality Capture, Bash Scripting, Drone Engineer, Drone Pilot, Scrum Master',
      image: 'https://cdn.discordapp.com/attachments/913999827816308776/1094451580360724560/female_profile.png'
    },
    {
      name: 'Dawsen Richins',
      title: 'Project Owner',
      stack: '',
      image: 'https://cdn.discordapp.com/attachments/913999827816308776/1094451331252637736/male_profile.png'
    }
]

let people1 = [
  {
    name: 'Asim Regmi',
    title: 'Backend Automation Developer',
    stack: 'Python, Google Cloud Platform, Drone Engineer',
    image: 'https://cdn.discordapp.com/attachments/913999827816308776/1094451331252637736/male_profile.png'
  },
  {
    name: 'Danielle Pham',
    title: 'Backend Automation Developer',
    stack: 'Python, Google Cloud Storage, Drone Engineer, Bash Scripting',
    image: 'https://cdn.discordapp.com/attachments/913999827816308776/1094451580360724560/female_profile.png'
  },
  {
    name: 'Pratik Dhakal',
    title: 'Backend Software Delveloper',
    stack: 'Unreal Engine, Drone Engineer',
    image: 'https://cdn.discordapp.com/attachments/913999827816308776/1094451331252637736/male_profile.png'
  },
  {
    name: 'Amy Simone',
    title: 'Project Owner',
    stack: '',
    image: 'https://cdn.discordapp.com/attachments/913999827816308776/1094451580360724560/female_profile.png'
  }
]

  return (
    <div className='flex w-screen h-screen bg-[#d62311] justify-center my-0 py-0 font-[Inter]'>
      <div className="flex md:flex-col md:justify-normal mx-auto bg-[#D62311] flex-wrap justify-center">
        <div className='flex md:flex-row max-w-[1512px] pt-4 flex-col bg-[#D62311] w-full items-center'>
        {people0.map((person) => (
            <TeamCard name={person.name} title={person.title} stack={person.stack} imagePath={person.image}></TeamCard>
          ))}
        </div>
        <div className='flex md:flex-row max-w-[1512px] pt-4 flex-col bg-[#D62311] w-full items-center'>
        {people1.map((person) => (
            <TeamCard name={person.name} title={person.title} stack={person.stack} imagePath={person.image}></TeamCard>
          ))}
        </div>
      </div>                  
    </div>
  )
}

export default Teampage
