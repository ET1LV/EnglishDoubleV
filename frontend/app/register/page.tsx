"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { saveCookie } from "@/lib/Session";

const languageLevels = [
  { label: "A1: Beginner", value: "A1" },
  { label: "A2: Elementary", value: "A2" },
  { label: "B1: Intermediate", value: "B1" },
  { label: "B2: Upper-Intermediate", value: "B2" },
  { label: "C1: Advanced", value: "C1" },
  { label: "C2: Proficient", value: "C2" },
];

const englishTopics = [
  "General",
  "Art",
  "Society",
  "Physics",
  "History",
  "Business",
  "Technology",
  "Geography",
  "Biology",
  "Psychology",
  "Politics",
];

type FormData = {
  name: string;
  level: string;
  topic: string;
  confirmed?: boolean;
};

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    level: "",
    topic: "",
    confirmed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveCookie(formData);
    const res = await fetch("/api/cookie", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (res.ok) router.push("/me");
  };

  return (
    <main className="flex flex-col gap-[30px] w-full h-full my-auto items-center justify-center">
      <section className="border border-gray-300 rounded-lg px-8 py-12 w-full max-w-md flex flex-col justify-between items-center gap-8 mb-20 bg-gray-100 shadow-[-3px_-3px_15px_-3px_rgba(255,255,255,0.9),3px_3px_15px_rgba(0,0,0,0.9)]">
        <h1 className="text-3xl font-bold font-serif">Englist.io</h1>
        <div className="w-[117%] h-[2px] bg-gray-300 mb-2" />
        <form
          className="flex flex-col gap-8 justify-between"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2 font-sans font-semibold"
              placeholder="Input your username"
              aria-label="Search"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
              required
            />
            <select
              aria-label="Select your level"
              name="level"
              id="level"
              className="border border-gray-300 rounded w-full px-3 py-2 font-sans"
              onChange={handleChange}
              value={formData.level}
              defaultValue={""}
              required
            >
              {languageLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            <select
              aria-label="Select your level"
              name="topic"
              id="topic"
              className="border border-gray-300 rounded px-3 py-2 font-sans"
              onChange={handleChange}
              value={formData.topic}
              defaultValue={""}
              required
            >
              {englishTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 ml-1">
            <input
              type="checkbox"
              id="confirm"
              className="w-5 h-5 rounded-md accent-green-600"
              name="confirm"
              value={formData.confirmed ? "on" : "off"}
              checked={formData.confirmed}
              onChange={(e) =>
                setFormData({ ...formData, confirmed: e.target.checked })
              }
              required
            />
            <label htmlFor="confirm" className="text-md">
              Confirm to agree our{" "}
              <a href="#" className="underline text-blue-600">
                Terms and Liences
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-black transition-colors"
          >
            Let's go!
          </button>
        </form>
      </section>
      <footer className="absolute bottom-0 py-10 flex gap-[24px] items-center justify-center text-white">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Rayn02Vu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://img.icons8.com/ffffff/material-outlined/35/github.png"
            alt="github"
            width={35}
            height={35}
          />
          Ryan Tran
        </a>
      </footer>
    </main>
  );
}
