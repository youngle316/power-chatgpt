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
              className="fixed flex w-80 top-0 left-0 shadow-lg h-full z-50"
            >
              <SideBarContent />
            </motion.div>
            {!isOpen && (
              <motion.div
                onClick={setIsOpen}
                className="bg-transparent px-100 z-40 fixed h-full w-full flex items-center justify-center top-0 left-0"
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
          className="hidden top-0 left-0 shadow-lg h-full w-full lg:flex lg:flex-col lg:fixed lg:w-80"
        >
          <SideBarContent />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default SideBar;
