import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";

interface FormSelectProps {
  label: string;
  name: string;
  list: string[];
  defaultValue?: string;
  size?: string;
  submenu?: React.ReactNode;
  onClick?: () => void;
}

function FormSelect({ label, submenu, onClick }: FormSelectProps) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  useEffect(() => {
    console.log(`FormSelect rendered: ${label}`);
  }, [label]);

  const handleClick = () => {
    setIsSubmenuOpen((prev) => !prev);
    if (onClick) onClick();
  };

  return (
    <div className="form-control relative">
      <motion.button
        type="button"
        className="btn btn-secondary mt-2 flex items-center"
        onClick={handleClick}
      >
        <span className="flex-1">{label}</span>
        <motion.div
          className="ml-2"
          animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <MdKeyboardArrowDown />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isSubmenuOpen && submenu && (
          <motion.div
            className="absolute left-0 mt-2 w-full p-4 bg-white border rounded shadow"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {submenu}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FormSelect;
