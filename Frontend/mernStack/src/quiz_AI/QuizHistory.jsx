/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuizStore } from "../AuthStore/quizStore";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, X } from "lucide-react";

const QuizReview = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { getQuizHistory, previousAttempt, isLoading } = useQuizStore();

  const answer = previousAttempt?.answers || [];
  const [currentIndex, setcurrentIndex] = useState(0);
  const [showExplanation, setshowExplanation] = useState(false);

  useEffect(() => {
    getQuizHistory(quizId);
  }, [quizId]);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!previousAttempt || answer.length === 0) {
    return <div className="text-white">No quiz data found</div>;
  }

  const current = answer[currentIndex];

  const showNext = () => {
    setshowExplanation(false);
    if (currentIndex === answer.length - 1) {
      navigate("/");
      return;
    }
    setcurrentIndex((prev) => prev + 1);
  };
const showPrevious = () => {
    setshowExplanation(false);
    if (currentIndex === 0) {
      return;
    }
    setcurrentIndex((prev) => prev - 1);
  };
  const showAnswer = () => {
    setshowExplanation((prev) => !prev);
  };

  return (
    <div className="grid lg:grid-cols-[0.2fr_2fr_0.2fr] gap-10 items-center justify-center">

      {/* Previous Button */}
        <div
  onClick={() => {
    if (currentIndex === 0) return;
    setshowExplanation(false);
    showPrevious();
  }}
  className={`
    hidden lg:flex
    h-20 w-20 border-2 p-2 border-violet-700 rounded-full
    items-center justify-center
    ${currentIndex === 0
      ? "opacity-40 cursor-not-allowed"
      : "hover:bg-violet-500/20 cursor-pointer"}
  `}
>
  <ArrowLeft className="w-14 h-14 text-purple-500" />
</div>

          {/* Main Function/Div */}
        <div
      className="
        h-152 w-full max-w-xl
        bg-linear-to-br from-purple-950 via-violet-900 to-purple-900
        rounded-2xl shadow-xl text-white
        flex flex-col overflow-hidden
      "
    >

      <div className="px-6 pt-6 flex justify-between items-center text-sm text-purple-200">
            <div
  onClick={() => {
    if (currentIndex === 0) return;
    setshowExplanation(false);
    showPrevious();
  }}
  className={` relative right-3
    lg:hidden flex
    h-10 w-10 border-2 p-2 border-violet-700 rounded-full
    items-center justify-center
    ${currentIndex === 0
      ? "opacity-40 cursor-not-allowed"
      : "hover:bg-violet-500/20 cursor-pointer"}
  `}
>
  <ArrowLeft className="w-6 h-6 text-purple-500" />
</div>
        <p className="lg:text-xl text-[16px] font-semibold tracking-wider relative right-3 lg:right-0">
          Question {currentIndex + 1}/{answer.length}
        </p>
        <p className="lg:text-xl text-[16px] font-semibold tracking-wider text-gray-400">
          Total Correct :{" "}
          <span className="font-bold text-green-600">
            {previousAttempt.correctAnswers}
          </span>
        </p>
      </div>

 
      <div className="px-6 py-6 flex-1 overflow-y-auto flex flex-col gap-6">
        {/* Question */}
        <div>
          <h2 className="flex gap-2 lg:text-[20px] text-[16px] font-medium tracking-normal">
            
            {current.question}
          </h2>
        </div>

        {/* Options (UNCHANGED LOGIC & STYLES) */}
        <div className="flex flex-col gap-3">
          {current.options.map((opt, i) => {
            const isSelected = opt === current.selectedOption;
            const isCorrectOption = opt === current.correctOption;

            let style = "border-gray-400";
            let pStyle = "text-white";

            if (isSelected && current.isCorrect) {
              style = "border-green-500 bg-green-500/20 text-green-400";
              pStyle = "text-green-400";
            }
            if (isSelected && !current.isCorrect) {
              style = "border-red-500 bg-red-500/20 text-red-400";
              pStyle = "text-red-400";
            }
            if (isCorrectOption) {
              style = "border-green-500 bg-green-500/20 text-green-400";
              pStyle = "text-green-400";
            }

            return (
              <div className="flex flex-col gap-1" key={i}>
                <div
                  className={`p-4 border rounded-xl flex items-center justify-between w-full ${style}`}
                >
                  <span>
                    {String.fromCharCode(65 + i)}. {opt}
                  </span>
                </div>

                {isSelected && (
                  <p className={`${pStyle} flex gap-1`}>
                    You Selected {current.isCorrect ? <Check /> : <X />}
                  </p>
                )}

                {isCorrectOption && !isSelected && (
                  <p className={`${pStyle} flex gap-1`}>
                    Correct Answer <Check />
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        <div className="w-fit flex flex-col gap-5">
          <button
            onClick={showAnswer}
            className="flex cursor-pointer gap-2"
          >
            Show Answer {showExplanation ? <ArrowUp /> : <ArrowDown />}
          </button>

          {showExplanation && (
            <p className="p-3 border border-gray-400 rounded-xl">
              {current.explanation}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={()=>{
            setshowExplanation(false);
          showNext();
        }}
        className="
          mt-auto w-full p-5
          bg-linear-to-r from-violet-600 to-purple-700
          rounded-b-2xl font-semibold cursor-pointer
          hover:opacity-50
        "
      >
        {currentIndex === answer.length - 1 ? "Finish" : "Next Question"}
      </button>
    </div>
            {/* Next Button */}
    <div
  onClick={() => {
    if (currentIndex === answer.length - 1) return;
    setshowExplanation(false);
    showNext();
  }}
  className={`
    hidden lg:flex
    h-20 w-20 border-2 p-2 border-violet-700 rounded-full
    items-center justify-center
    ${currentIndex === answer.length - 1
      ? "opacity-40 cursor-not-allowed"
      : "hover:bg-violet-500/20 cursor-pointer"}
  `}
>
  <ArrowRight className="w-14 h-14 text-purple-500" />
</div>
    </div>
  );
};

export default QuizReview;