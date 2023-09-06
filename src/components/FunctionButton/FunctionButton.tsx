import ModelSetting from "~/components/FunctionButton/ModelSetting";
import StopGenerate from "~/components/FunctionButton/StopGenerate";
import Prompts from "~/components/FunctionButton/Prompts";
import ReGenerate from "~/components/FunctionButton/ReGenerate";
import Share from "~/components/FunctionButton/Share";

function FunctionButton() {
  return (
    <>
      <div className="my-4 flex w-full flex-wrap items-center justify-center gap-2 px-4 text-center">
        <ModelSetting />
        <StopGenerate />
        <Prompts />
        <ReGenerate />
        <Share />
      </div>
    </>
  );
}

export default FunctionButton;
