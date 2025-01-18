import { motion } from "framer-motion";

export default function Progress({ percentage }: { percentage: number }) {
  return (
    <div className="w-full mt-2.5 h-1.5 border border-gray-300 overflow-hidden rounded">
      <motion.div
        initial={false}
        transition={{ ease: "easeOut", duration: 2 }}
        animate={{ x: `${percentage - 100}%` }}
        className="w-full h-1.5 bg-white transform -translate-x-full"
      />
    </div>
  );
};
