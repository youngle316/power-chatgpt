"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSideBarState } from "~/store/sidebarStore";
import SideBarContent from "~/components/sidebar/SideBarIndex";

function SideBar() {
  const { isOpen, setIsOpen } = useSideBarState();

  const variants = {
    open: { x: "0%" },
    closed: { x: "-100%" },
  };

  return (
    <>
      {/* mobile sidebar */}
      {/* isOpen's value is opposite */}
      <div className="lg:hidden">
        {!isOpen && (
          <AnimatePresence>
            <motion.div
              initial={{ x: "-100%" }}
              animate={isOpen ? "closed" : "open"}
              variants={variants}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed left-0 top-0 z-50 flex h-full w-80 shadow-lg"
            >
              <SideBarContent />
            </motion.div>
            {!isOpen && (
              <motion.div
                onClick={setIsOpen}
                className="px-100 fixed left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-transparent"
              />
            )}
          </AnimatePresence>
        )}
      </div>

      {/* desktop sidebar */}
      <AnimatePresence>
        <motion.div
          initial={{ x: "0%" }}
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="left-0 top-0 z-50 hidden h-full w-full shadow-lg lg:fixed lg:flex lg:w-80 lg:flex-col"
        >
          <SideBarContent />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default SideBar;
