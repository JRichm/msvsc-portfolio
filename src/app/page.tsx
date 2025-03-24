"use client"

import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn, faGithub} from '@fortawesome/free-brands-svg-icons'
import { faUser, faPhone, faBriefcase, faStar, faCode, faBars} from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";


const sections = ["Welcome", "about_me", "my_projects", "work_experience", "contact"];


const iconMap: Record<string, IconDefinition | undefined> = {
  "Welcome": faStar,
  "work_experience": faBriefcase,
  "my_projects": faCode,
  "about_me": faUser,
  "contact": faPhone
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
      <p className="font-sans not-italic">{name}</p>
    </div>
  );
}

function SubmitContact(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const honeypotValue = formData.get("honeypot");

  if (honeypotValue) {
    console.log("bot detected, form ignored.")
    return;
  }

  console.log("Form Submitted")  
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

  const text =
    "a software developer who is focused on writing clean code and efficient solutions. I love solving problems in creative ways and thinking outside of the box to find the answer to the puzzle";

  return (
    <div className="flex flex-row">
      <div className="bg-[#333333] h-screen w-20 fixed left-0 flex flex-col p-5 gap-5">
        {/* <FontAwesomeIcon icon={faBars} color="#5f5f5f" className="sidebar-icon"/> */}
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
      <p className='right-0 bottom-0 fixed vertical'>this is my email</p>
      <div className="bg-[#1e1e1e] min-h-screen flex-1 ml-20 mb-20 place-items-center">
        <div className="w-full bg-[#252526] flex flex-row fixed z-10 drop-shadow-md">
          {sections.map((section) => (
            <HeaderTab key={section} name={section} isActive={activeSection === section} />
          ))}
        </div>
        <div id="Welcome" className="mt-[44vh] mb-[44vh] translate-y-[-44%] w-[80vw]">
          <h6>Hi, my name is</h6>
          <h1>James Richmond</h1>
          {text
            .split(" ")
            .reduce((lines: string[], word) => {
              if (!lines.length || lines[lines.length - 1].length + word.length > 111) {
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
        <div id="about_me" className="flex flex-col w-[80vw]">
          <h3 className="text-left">About Me</h3>
          <div className={`cell-div ${activeCell === "about_me" ? "active-cell" : ""}`} onClick={() => handleCellClick("about_me")}>
            <div className="border-l-[1px] border-[#3f3f3f] px-3">
              <p className='mb-4'>I’m a software developer who thrives on blending creativity with technology to deliver real-world solutions. Whether I’m designing interactive experiences or solving complex problems, I bring a curious mindset and a commitment to innovation to every project. My work is driven by a balance of technical expertise and creative insight, ensuring that I not only meet but exceed project goals.</p>
              <p className='mb-4'>Outside of work, I immerse myself in procedural generation, music composition, and strategy games—activities that sharpen my problem-solving skills and fuel my creative ideas. I’m always exploring new ways to innovate, constantly brainstorming and experimenting to stay ahead of the curve.</p>
            </div>
          </div>
        </div>
        <div id="my_projects" className="flex flex-col w-[80vw]">
          <h3 className="text-left">Projects</h3>
          <div className={`cell-div ${activeCell === "my_projects" ? "active-cell" : ""}`} onClick={() => handleCellClick("my_projects")}>
            <div className="border-l-[1px] border-[#3f3f3f] px-3">
              <div className="work-div">
                <h4>RecieptReader</h4>
              </div>
              <div className="work-div">
                <h4>BirdSim</h4>
                <div className='px-6 flex flex-row gap-6'>
                    <img className="project-img" src="/birdsim.png" />
                    <div>
                      <p className="comment">// <a href="https://github.com/JRichm/betSim" target="_blank">github</a></p>
                      <p className='pl-6 w-[80%]'>- An interactive simulation of flocking behavior, inspired by natural bird movements. Explores algorithms for realistic group dynamics, offering insights into emergent behaviors and crowd modeling.</p>
                    </div>
                </div>
              </div>
              <div className="work-div">
                <h4>GardenGame</h4>
                <div className='px-6 flex flex-row gap-6'>
                    <img className="project-img" src="/gardengame.png" />
                    <div>
                      <p className="comment">// <a href="https://github.com/JRichm/GardenGame" target="_blank">github</a> | <a href="youtube.com" target="_blank">demo video</a></p>
                      <p className='pl-6 w-[80%]'>- A casual strategy game where players cultivate and manage a virtual garden. Focuses on planning, resource management, and creative design elements, encouraging players to experiment with different plant varieties and layouts.</p>
                    </div>
                </div>
              </div>
              <div className="work-div">
                <h4>MidiFret</h4>
                <div className='px-6 flex flex-row gap-6'>
                    <img className="project-img" src="/midifret.png" />
                    <div>
                      <p className="comment">// <a href="https://github.com/JRichm/midifret" target="_blank">github</a> | <a href="youtube.com" target="_blank">demo video</a></p>
                      <p className='pl-6 w-[80%]'>- A web-based MIDI controller emulating a guitar fretboard. Designed for musicians and hobbyists to experiment with chord progressions, melodies, and sound design without needing a physical instrument.</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="work_experience" className="flex flex-col w-[80vw]">
          <h3 className="text-left">Work Experience</h3>
          <div className={`cell-div ${activeCell === "work_experience" ? "active-cell" : ""}`} onClick={() => handleCellClick("work_experience")}>
            <div className="border-l-[1px] border-[#3f3f3f] px-3">
              <div className="work-div">
                <p className="comment">// Rocky Mountain Reserve</p>
                <h4>Junior Software Developer <a href='https://github.com/jamesrmr' target='_blank' className='text-[#4f4f4f] italic'>_github_</a></h4>
                <p className='pl-6'> - Developed an in-house application to streamline file processing and client data management.</p>
                <p className='pl-6'> - Built a webhook-enabled API that automates task creation in ClickUp.</p>
                <p className='pl-6'> - Created Optimus, a file validation system that standardizes client files.</p>
                <p className='pl-6'> - Developed Rulebook, an interactive tool for custom Pandas-based filters.</p>
                <p className='pl-6'> - Built Sifter, a data extraction tool for querying a 1.4M-row participant database.</p>
              </div>
              <div className="work-div">
                <p className="comment">// IKEA</p>
                <h4>Active Sales</h4>
                <p className='pl-6'> - Improved inventory accuracy by optimizing high-demand product locations.</p>
                <p className='pl-6'> - Trained coworkers on software, scanners, and customer interaction.</p>
                <p className='pl-6'> - Increased warehouse efficiency, improving Door-to-Floor from 55% to 75%.</p>
                <p className='pl-6'> - Managed dock logistics, coordinating 3–5 truckloads daily across six docks.</p>
              </div>
              <div className="work-div">
                <p className="comment">// Planet Fitness</p>
                <h4>Assistant Manager</h4>
                <p className='pl-6'> - Led a team of 15, overseeing hiring, training, and daily operations.</p>
                <p className='pl-6'> - Conducted equipment audits to ensure safety and customer satisfaction.</p>
                <p className='pl-6'> - Resolved billing and membership issues, improving retention.</p>
                <p className='pl-6'> - Increased membership sign-ups through guided facility tours.</p>
              </div>
            </div>
          </div>
        </div>
        <div id="contact" className="flex flex-row w-[80vw] mt-12">
          <div className='w-full flex flex-row'>
            <h3 className="text-left">Message</h3>
            <div className="w-full border-l-[1px] border-[#5f5f5f] px-6 mx-6 pt-4 flex flex-row gap-24">
              <form onSubmit={SubmitContact} className='flex flex-col w-full'>
                <input type="text" name="honeypot" className="hidden" style={{ display: "none" }} aria-hidden="true"></input>
                <label>email</label>
                <input type="text" className='text-input'></input>
                <label>name</label>
                <input type="text" className='text-input'></input>
                <label>message</label>
                <textarea className='text-input resize-none h-48 max-w-full!'></textarea>
                <button type="submit" className='btn-send-contact'>Send Message</button>
              </form>
            </div>
          </div>
          <div className='w-[60%] flex flex-row'>
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
