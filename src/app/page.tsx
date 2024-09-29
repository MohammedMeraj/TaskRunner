"use client"
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState<string>("")
  const [desc, setDesc] = useState<string>("")
  const [mainTask, setMaintask] = useState<{ title: string, desc: string }[]>([])

  const stHandle = (e: React.FormEvent) => {
    if (title.length > 0 && desc.length > 0) {
      e.preventDefault()
      setMaintask([...mainTask, { title, desc }]);
      setTitle("");
      setDesc("");
    } else {
      alert("Fields cannot be empty");
    }
  }

  const deleteHandler = (i: number) => {
    const allTask = [...mainTask];
    allTask.splice(i, 1);
    setMaintask(allTask);
  }

  let renderTask: JSX.Element | JSX.Element[] = (
    <div className="w-full text-center text-xl text-gray-900 mt-16">
      You are all Caught Up !!!
    </div>
  );

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <div key={i} className="w-full bg-gray-50 rounded-md p-5 flex flex-row justify-between items-center mt-3">
          <div className="w-[80%] flex sm:flex-row flex-col justify-between items-center border-r pr-6">
            <div className="sm:mb-0 mb-3">{t.title}</div>
            <div>{t.desc}</div>
          </div>
          <div onClick={() => deleteHandler(i)} className="px-4 py-2 cursor-pointer bg-red-400 text-white rounded-md">
            Delete
          </div>
        </div>
      );
    });
  }

  return (
    <div className="mt-10 sm:mx-24 mx-4">
      <div className="text-4xl text-gray-800 font-bold">Task Runner</div>
      <form onSubmit={stHandle} className="w-full h-fit mt-6 flex flex-col justify-center items-center mb-12">
        <input
          className="w-[90%] sm:w-[600px] min-[200px] mb-2 outline-none p-2 pl-5 border border-black rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter Task"
        />
        <input
          className="w-[90%] sm:w-[600px] min-[200px] h-16 mb-8 outline-none p-5 pl-5 border border-black rounded-md"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          type="text"
          placeholder="Enter task description"
        />
        <button className="p-3 bg-gray-900 text-white rounded-md">Add task</button>
      </form>
      <hr />
      {renderTask}
    </div>
  );
}
