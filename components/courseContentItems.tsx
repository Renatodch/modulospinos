"use client";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { AiFillYoutube } from "react-icons/ai";

interface Props {
  interactive?: boolean;
  progress?: number | null;
}

const CourseContentItems = ({ interactive, progress }: Props) => {
  const _progress = progress || 0;
  const [selectedIndex, setSelectedIndex] = useState<number | null | undefined>(
    _progress
  );

  const styleClasses = `text-justify p-4 items-center gap-8 w-full flex ${
    interactive && "hover:cursor-pointer hover:bg-blue-200"
  }`;

  const items = [
    {
      text: "Qué es una fracción",
    },
    {
      text: "Introducción a fracciones",
    },
    {
      text: "Suma y resta de fracciones con denominadores comunes",
    },
    {
      text: "Suma y resta de fracciones con denominadores diferentes",
    },
    {
      text: "Tarea final del curso",
    },
  ];

  return (
    <Flex direction="column" gap="4">
      <div className="w-full flex-col border-4 border-gray-300 rounded-md ">
        <div className="border-b-4 border-gray-300 bg-gray-200 p-4">
          <p className="font-bold text-lg">Introducción a fracciones</p>
        </div>
        <ul className="w-full flex flex-col items-start justify-center overflow-hidden">
          {items.map((i, index) => (
            <li
              key={index}
              className={`${styleClasses} ${
                selectedIndex === index && interactive && "bg-blue-100"
              } ${index > _progress + 1 && interactive && "text-gray-400"}`}
              style={{
                pointerEvents: index > _progress + 1 ? "none" : "all",
              }}
            >
              {interactive ? (
                <Link
                  className="flex gap-4"
                  href={{ pathname: `/curso/clases`, query: { item: index } }}
                  onClick={() => setSelectedIndex(index)}
                >
                  <AiFillYoutube size="24" />
                  {i.text}
                </Link>
              ) : (
                <>
                  <AiFillYoutube size="24" />
                  {i.text}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Flex>
  );
};

export default CourseContentItems;