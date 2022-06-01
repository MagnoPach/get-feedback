import { ChatTeardropDots } from "phosphor-react";
import { Popover } from "@headlessui/react";
import { CloseButton } from "../CloseButton";

import cloudImageUrl from "../../assets/images/cloud.svg";
import lightImageUrl from "../../assets/images/light.svg";
import wormImageUrl from "../../assets/images/worm.svg";
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedBackTypes = {
  BUG: {
    title: "Problema",
    imagem: {
      source: wormImageUrl,
      alt: "Imagem de um inseto",
    },
  },
  IDEIA: {
    title: "Ideia",
    imagem: {
      source: lightImageUrl,
      alt: "Imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    imagem: {
      source: cloudImageUrl,
      alt: "Imagem de um balão de pensamento",
    },
  },
};

export type FeedbackType = keyof typeof feedBackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }
  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}
      <footer>
        Visite meu
        <a
          href="https://github.com/MagnoPach"
          className="underline underline-offset-2"
        >
          Github
        </a>
      </footer>
    </div>
  );
}
