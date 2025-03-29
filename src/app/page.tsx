"use client"
import Image from 'next/image'

import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn, faGithub} from '@fortawesome/free-brands-svg-icons'
import { faUser, faPhone, faBriefcase, faStar, faCode } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

import { projects, tech_images } from '../../data.json'

interface TechImages {
  [key: string]: string;
}

const techImages: TechImages = tech_images

const sections = ["Welcome", "aboutMe", "myProjects", "workExperience", "contact"];


const iconMap: Record<string, IconDefinition | undefined> = {
  "Welcome": faStar,
  "workExperience": faBriefcase,
  "myProjects": faCode,
  "aboutMe": faUser,
  "contact": faPhone
}


function Project({ name }: {name: string}) {
  const project = (projects as Record<string, any>)[name];

  if (!project) {
    return <div>{name} project not found</div>
  }

  return (
    <div className='work-div'>
      <h4>{project.name}</h4>
      <div className='px-6 py-4 flex lg:flex-row flex-col place-items-center gap-6'>
        <div className='project-img-container'>
          <Image src={project.picture} alt={project.picture_alt} width={800} height={600} />
        </div>
        <div className='flex flex-col gap-8 w-full justify-between'>
          <div>
            <p className='comment'>&#47;&#47; <a href={project.github} target='_blank'>github</a></p>
            <p>{project.description}</p>
          </div>
          <div className='flex flex-col w-full'>
            {/* <p className='comment'>&#47;&#47; Technologies used</p> */}
            <div className='flex flex-row gap-4 h-8 border-b-[#3e3e3e] w-fit mb-8'>
              {project.technologies.map((tech: string) => (
                <div className='tech-icon-container h-[100%]' key={tech}>
                  <Image src={techImages[tech]} alt={tech} width={200} height={200} className='h-[100%] w-fit object-scale-down' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function HeaderTab({ name, isActive }: { name: string; isActive: boolean }) {
  const handleClick = () => {
    if (name === "Welcome") {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const sectionElement = document.getElementById(name);
    if (sectionElement) {
      const yOffset = -50;
      const y = sectionElement.getBoundingClientRect().top + window.scrollY + yOffset;
  
      window.scrollTo({ top: y, behavior: "instant" });
    }
  }


  return (
    <div onClick={handleClick} className={`flex flex-row gap-2 align-center p-2 px-3 w-48 hover:bg-[#323232] hover:cursor-pointer border-r-[#252526] border-r-[1px] ${isActive ? "bg-[#1e1e1e] text-white" : "bg-[#2d2d2d] text-[#9f9f9f]"}`}>
      {iconMap[name] && (
        <FontAwesomeIcon icon={iconMap[name]} className="w-4 h-4 p-0 place-self-center" />
      )}
      <p className="font-roboto!">{name}</p>
    </div>
  );
}


export default function Home() {
  const [ activeSection, setActiveSection ] = useState<string>("Welcome")
  const [ activeCell, setActiveCell ] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { threshold: 0.6 }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    })

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  const handleCellClick = (section: string) => {
    setActiveCell(section);
  }

  const text = "a software developer who loves writing clean, efficient code and solving problems in creative ways. I believe that any problem can be solved with the right approach and a bit of thinking outside-the-box.";

  
  function Projects() {
    return (
      <div id="myProjects" className='flex flex-col w-[80vw]'>
        <h3 className='text-left'>Projects</h3>
        <div className={`cell-div { ${activeCell === "myProjects" ? "active-cell" : ""}}`} onClick={() => handleCellClick("myProjects")}>
          <div className='border-l-[1px] border-[#3f3f3f] px-3'>
            {Object.keys(projects).map((key) => (
              <Project key={key} name={key} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-row">
      
      {/* Side Panel */}
      <div className="bg-[#333333] hidden h-[100%] w-20 fixed left-0 lg:flex flex-col p-5 gap-5">
        <a href="https://www.linkedin.com/in/jrichm444/" target="_blank">
            <FontAwesomeIcon icon={faLinkedinIn} color="#5f5f5f" className="sidebar-icon"/>
        </a>
        <a href="https://github.com/JRichm/" target="_blank">
            <FontAwesomeIcon icon={faGithub} color="#5f5f5f" className="sidebar-icon"/>
        </a>
        <a href="https://github.com/JamesRMR/" target="_blank">
            <FontAwesomeIcon icon={faGithub} color="#5f5f5f" className="sidebar-icon"/>
        </a>
      </div>

      {/* Main Section */}
      <div className="bg-[#1e1e1e] min-h-[100%] flex-1 lg:ml-20 mb-20 place-items-center">

        {/* Header Tabs */}
        <div className="w-full bg-[#252526] hidden lg:flex flex-row fixed z-10 drop-shadow-md">
          {sections.map((section) => (
            <HeaderTab key={section} name={section} isActive={activeSection === section} />
          ))}
        </div>

        {/* Hero Section */}
        <div id="Welcome" className="mt-[44vh] mb-[44vh] translate-y-[-44%] w-[80vw]">
          <h6>Hi, my name is</h6>
          <h1>James Richmond</h1>
          {text
            .split(" ")
            .reduce((lines: string[], word) => {
              if (!lines.length || lines[lines.length - 1].length + word.length > 108) {
                lines.push(`// ${word}`);
              } else {
                lines[lines.length - 1] += ` ${word}`;
              }
              return lines;
            }, [])
            .map((line, index) => (
              <p key={index} className="comment">{line}</p>
            ))}
        </div>

        {/* About Me */}
        <div id="aboutMe" className="flex flex-col w-[80vw]">
          <h3 className="text-left">About Me</h3>
          <div className={`cell-div ${activeCell === "aboutMe" ? "active-cell" : ""}`} onClick={() => handleCellClick("aboutMe")}>
            <div className="border-l-[1px] border-[#3f3f3f] px-3">
              <p className='mb-4'>I’m a software developer who enjoys blending creativity with technology to build real-world solutions. Whether I’m designing interactive experiences or tackling tough problems, I always bring a curious mindset and a drive to innovate. I like finding smart, efficient ways to solve challenges while keeping things clean and maintainable.</p>
              <p className='mb-4'>Outside of work, I spend a lot of time messing around with procedural generation, making music, and playing strategy games. These hobbies help me think in new ways and keep my problem-solving skills sharp. I’m always experimenting, learning, and looking for new ways to push my ideas further.</p>
            </div>
          </div>
        </div>

        {/* Projects */}
        <Projects />

        {/* Work Experience */}
        <div id="workExperience" className="flex flex-col w-[80vw]">
          <h3 className="text-left">Work Experience</h3>
          <div className={`cell-div ${activeCell === "workExperience" ? "active-cell" : ""}`} onClick={() => handleCellClick("workExperience")}>
            <div className="border-l-[1px] border-[#3f3f3f] px-3">
              <div className="work-div">
                <p className="comment">&#47;&#47; Rocky Mountain Reserve</p>
                <h4>Junior Software Developer <a href='https://github.com/jamesrmr' target='_blank' className='text-[#4f4f4f] italic'>_github_</a></h4>
                <p className='pl-6'> - Developed an in-house application to streamline file processing and client data management.</p>
                <p className='pl-6'> - Built a webhook-enabled API that automates task creation in ClickUp.</p>
                <p className='pl-6'> - Created Optimus, a file validation system that standardizes client files.</p>
                <p className='pl-6'> - Developed Rulebook, an interactive tool for custom Pandas-based filters.</p>
                <p className='pl-6'> - Built Sifter, a data extraction tool for querying a 1.4M-row participant database.</p>
              </div>
              <div className="work-div">
                <p className="comment">&#47;&#47; IKEA</p>
                <h4>Active Sales</h4>
                <p className='pl-6'> - Improved inventory accuracy by optimizing high-demand product locations.</p>
                <p className='pl-6'> - Trained coworkers on software, scanners, and customer interaction.</p>
                <p className='pl-6'> - Increased warehouse efficiency, improving Door-to-Floor from 55% to 75%.</p>
                <p className='pl-6'> - Managed dock logistics, coordinating 3–5 truckloads daily across six docks.</p>
              </div>
              <div className="work-div">
                <p className="comment">&#47;&#47; Planet Fitness</p>
                <h4>Assistant Manager</h4>
                <p className='pl-6'> - Led a team of 15, overseeing hiring, training, and daily operations.</p>
                <p className='pl-6'> - Conducted equipment audits to ensure safety and customer satisfaction.</p>
                <p className='pl-6'> - Resolved billing and membership issues, improving retention.</p>
                <p className='pl-6'> - Increased membership sign-ups through guided facility tours.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div id="contact" className="flex lg:flex-row flex-col w-[80vw] mt-12">

          {/* Message Me */}
          <div className='w-full flex lg:flex-row flex-col'>
            <h3 className="text-left">Message</h3>
            <div className="w-full border-l-[1px] border-[#5f5f5f] px-6 mx-6 pt-4 flex flex-row gap-24">
              <form action="https://formspree.io/f/mdkedgnz" method="POST" className='flex flex-col w-full'>
                <input type="text" name="honeypot" className="hidden" style={{ display: "none" }} aria-hidden="true"></input>
                <label>email</label>
                <input type="email" name="email" className='text-input'></input>
                <label>name</label>
                <input type="text" name="name" className='text-input'></input>
                <label>message</label>
                <textarea name="message" className='text-input resize-none h-48 max-w-full!'></textarea>
                <button type="submit" className='btn-send-contact'>Send Message</button>
              </form>
            </div>
          </div>

          {/* Contact Details */}
          <div className='w-[60%] flex lg:flex-row flex-col lg:mt-0 mt-20'>
            <h3 className="text-left">Contact</h3>
            <div className="w-full border-l-[1px] border-[#5f5f5f] px-6 mx-6 pt-4 flex flex-row gap-24">
              <div>
                <p className="flex flex-row gap-2 text-[#5f5f5f]">
                  email: <span className="text-[#e7e7e7]">jamcamcode@gmail.com</span>
                </p>
                <p className="flex flex-row gap-2 text-[#5f5f5f]">
                  phone: <span className="text-[#e7e7e7]">(xxx) xxx-xxxx</span>
                </p>
                <p className="flex flex-row gap-2 text-[#5f5f5f]">
                  linkedin: 
                  <a href="https://www.linkedin.com/in/jamcamcode/" target="_blank" className="text-[#e7e7e7]">
                    jamcamcode
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
