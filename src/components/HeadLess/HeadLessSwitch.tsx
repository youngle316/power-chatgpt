import { Switch } from "@headlessui/react";

type HeadLessSwitchProps = {
  enabled: boolean;
  setEnabled: (enable: boolean) => void;
  title?: string;
};

const HeadLessSwitch = ({
  enabled,
  setEnabled,
  title = "",
}: HeadLessSwitchProps) => {
  return (
    <div className="flex items-center gap-4">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? "bg-blue-600" : "bg-neutral-300 dark:bg-neutral-700"
        }
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
      >
        <span className="sr-only">Use Switch</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <div className="text-xs">{title}</div>
    </div>
  );
};

export default HeadLessSwitch;
