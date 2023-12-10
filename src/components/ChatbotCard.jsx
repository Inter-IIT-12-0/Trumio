"use client"
import Triangle from "../../public/Images/Triangle.svg"
import Send_Icon from "../../public/Images/Send_Icon.svg"
import React, { useState, useEffect } from "react";
import { generate, stop } from "../pages/api/GPT/conversation";
import aiToolUserPrompt from "../pages/api/GPT/ai-tool-user-prompt";
import recommendProject from "../pages/api/recommendation/projectRecommend";
import recommend from "../pages/api/recommendation/recommend";
import axios from "axios";
import Yellow_Star from "../../public/Images/Yellow_Star.svg"
import Link from "next/link";
import { useSession } from "next-auth/react";

export const ChatbotCard = ({ isOpen }) => {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState("")
  const [toggler, setToggler] = useState(true);
  const [mode, setMode] = useState("General");
  const [result, setResult] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [user, setUser] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [projectFilter, setProjectFilter] = useState('');
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [userChat, setUserChat] = useState("")
  const [projectChat, setProjectChat] = useState("")
  const [gotResponse, setGotResponse] = useState(false)
  const {data:session} = useSession()

  useEffect(() => { //! The chat bot is loaded with ll the persons through an apicall
    if (session) {
      axios.get('/api/allusers/')
      .then(res => { // Log the response to the console

        setUser(res.data);

      })
      .catch(err => toast.error(err.response.data.error)
      );

    axios.get('/api/allprojects/')
      .then(res => {
        setProjects(res.data);
      });
    }

  }, [session]);
  const submitHandler = (e) => {
    e.preventDefault()
    if (mode === 'General')
      handleGenerate();
    if (mode === 'User')
      handleGenerate2();
    if (mode === 'Project')
      handleGenerate3();
  }

  const handleGenerate = async () => { //! Responsible uses the LLM model for responding to the general queries and can handle conversations
    if (messages.length == 0) {
      aiToolUserPrompt(
        "General ChatBot for company Trumio named as TruBot",
        "Assistant",
        "",
        messages, setMessages
      );
    }
    aiToolUserPrompt(
      "General ChatBot",
      "Assistant",
      chat,
      messages, setMessages
    );
    setChat("");
    await generate(messages, result, setResult, setMessages);
  };
  const handleGenerate2 = async () => { //! This uses the flask API which is based on Recommendation engine, returns users satisfying the query
    setUserChat(chat);
    setChat("");
    setFiltered([])
    setGotResponse(false)
    const obj = await recommend(chat);
    setGotResponse(true)
    if (obj) {
      setFiltered(user.filter(person => person.domain.some(domainElement => obj.includes(domainElement))));

    }
  }

  const handleGenerate3 = async () => { //! This uses the flask API which is based on Recommendation engine, returns the projects satisfying the query
    setProjectChat(chat);
    setChat("");
    setFilteredProjects([])
    setGotResponse(false)
    const obj = await recommendProject(chat);
    setGotResponse(true)
    if (obj) {
      setFilteredProjects(projects.filter(project => project.domain.some(domainElement => obj.includes(domainElement))));

    }
  }

  return (
    <div className={`${isOpen ? 'w-[350px] h-96 opacity-100' : 'w-0 h-0 opacity-0'} bg-sky-100 rounded-3xl flex flex-col items-center absolute bottom-20 -right-9 -z-10 transition-all duration-1000`}>
      <div className="flex w-full justify-around py-3 bg-sky-600 rounded-t-3xl">
        <button className={`px-3 py-1 rounded-lg ${mode === 'General' ? 'bg-zinc-400 text-white' : 'bg-white text-sky-600'} `} onClick={() => setMode("General")}> General </button>
        <button className={`px-3 py-1  rounded-lg ${mode === 'User' ? 'bg-zinc-400 text-white' : 'bg-white text-sky-600'}`} onClick={() => setMode("User")}> User </button>
        <button className={`px-3 py-1 rounded-lg ${mode === 'Project' ? 'bg-zinc-400 text-white' : 'bg-white text-sky-600'}`} onClick={() => setMode("Project")}> Project </button>
      </div>
      <div className='w-full h-full bg-sky-100 relative rounded-2xl'>
        {mode == "General" &&
          <div className='h-[270px] overflow-scroll overflow-y-auto overflow-x-hidden mx-3 rounded-xl px-2'>
            {messages &&
              messages.slice(2).map((msgJson, index) => (
                <div className={`w-full flex ${msgJson.role === 'user' ? 'justify-end' : 'justify-start'}`} key={index}>
                  <div className={`px-3 py-1 my-5 rounded-lg ${msgJson.role === 'user' ? 'bg-sky-500 text-indigo-50' : 'border-sky-500 border-2 text-sky-600'}`}>
                    {msgJson.content}
                  </div>
                </div>
              ))
            }
          </div>
        }
        {
          mode == "User" && <div className='h-[270px] overflow-scroll overflow-y-auto overflow-x-hidden mx-3 rounded-xl px-2'>
            {userChat && <div className="flex justify-end">
              <div className="px-3 py-1 my-5 rounded-lg bg-sky-500 text-indigo-50">
                {userChat} </div>
            </div>}
            {
              gotResponse && userChat && filtered.length === 0 && <div className="px-3 py-1 w-40 my-5 rounded-lg border-sky-500 border-2 text-sky-600">
                No User found
              </div>
            }
            {filtered && filtered.sort((a, b) => b.rating - a.rating).slice(0, 5).map((user, index) => (
              <div
                key={index}
                className="flex px-2 py-1 border-sky-500 border my-2 rounded-lg"
              >
                <div className="flex flex-col w-7/12">
                  <div className="flex">
                    <img src={user.avatarUrl} className="rounded-full h-12 w-12"></img>
                  </div>
                  <div className="text-base text-sky-800 font-semibold flex w-full">
                    <div className="w-full"> {user.name} ({user.rating} ) </div>
                  </div>
                </div>
                <div className="text-sky-500 mt-10 flex items-center">
                  <Link href={`/profile/${user._id}`} target="_blank">
                    View profile
                  </Link>
                </div>
              </div>
            ))}

          </div>
        }


        {
          mode == "Project" && <div className='h-[270px] overflow-scroll overflow-y-auto overflow-x-hidden mx-3 rounded-xl px-2'>
            {projectChat && <div className="flex justify-end">
              <div className="px-3 py-1 my-5 rounded-lg bg-sky-500 text-indigo-50">
                {projectChat} </div>
            </div>}
            {
              gotResponse && projectChat && filteredProjects.length === 0 && <div className="px-3 py-1 w-40 my-5 rounded-lg border-sky-500 border-2 text-sky-600">
                No Project found
              </div>
            }
            {filteredProjects && filteredProjects.sort((a, b) => b.assignedBy.rating - a.assignedBy.rating).slice(0, 5).map((project, index) => (
              <div
                key={index}
                className="flex px-2 py-1 border-sky-500 border my-2 rounded-lg"
              >
                <div className="flex flex-col w-7/12">
                  <div className="text-base text-sky-800 font-semibold flex w-full">
                    <div className="w-full"> {project.title} </div>
                  </div>
                  <div> {project.domain[0]} </div>
                </div>
                <div className="text-sky-500 flex items-center">
                  {
                    ['In review', 'Open'].includes(project.status) &&
                    <Link href={`/createBid/${project._id}`} target="_blank">
                    Create Bid
                  </Link>
                  }
                </div>
              </div>
            ))}

          </div>
        }
        <form className='absolute bottom-0 right-0 w-full flex items-center' onSubmit={submitHandler}>
          <input type="text" placeholder='Enter your message...' className='outline-none placeholder-sky-700 bg-sky-100 w-full px-2 py-2 pb-4 border-t border-zinc-300' value={chat} onChange={e => setChat(e.target.value)} />
          <button className='px-4 py-2 pb-4 cursor-pointer bg-sky-100 border-t border-zinc-300' type='submit' > <Send_Icon /> </button>
        </form>
      </div>
      <Triangle className="absolute right-4 -bottom-[50px] " />
    </div>
  );
}

