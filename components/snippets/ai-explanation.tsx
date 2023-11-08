"use client";

import React from "react";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useChat } from "ai/react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconOpenAI } from "../ui/icons";

export default function AIExplanation({
  snippets,
  session,
}: {
  snippets: any;
  session: any;
}) {
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    data,
  } = useChat();

  React.useEffect(() => {
    const initialMessage = {
      id: "initial_message",
      role: "user",
      content:
        "Act as a professional software engineer. The following is a code snippet, do your best to assist the user with any questions. The code snippet: " +
        snippets?.code,
    };
    //   @ts-ignore
    setMessages([initialMessage, ...messages]);
  }, [snippets]);

  // set the snippets
  return (
    <div className="mt-4">
      <h1 className="text-lg font-normal mb-1">AI Explanation &darr;</h1>
      <form className="flex items-center gap-x-2" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter your question"
          value={input}
          onChange={handleInputChange}
        />

        <Button size="icon" type="submit" disabled={isLoading}>
          <PaperPlaneIcon className="h-4 w-4" />
        </Button>
      </form>

      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.id === "initial_message" ? null : (
                <>
                  {m.role === "user" ? (
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarImage
                          className="h-6 w-6 mt-2 rounded-full"
                          src={session?.user?.image}
                          alt="user"
                        />
                      </Avatar>
                      <span className="font-bold">You</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <IconOpenAI className="h-6 w-6" />
                      <span className="ml-4 font-bold">GPT4</span>
                    </div>
                  )}

                  <div className="mb-4 mt-1 ml-10">{m.content}</div>
                </>
              )}
            </div>
          ))
        : null}
    </div>
  );
}
