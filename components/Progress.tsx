import { motion } from "framer-motion";

export default function Progress({ percentage, timeStart, timeEnd }: { percentage: number, timeStart: string, timeEnd: string }) {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-sm">{timeStart}</span>
      <div className="flex-1 mt-2.5 h-1.5 border border-slate-700 overflow-hidden rounded">
        <motion.div
          initial={false}
          transition={{ ease: "easeOut", duration: 2 }}
          animate={{ x: `${percentage - 100}%` }}
          className="w-full h-1.5 bg-white transform -translate-x-full"
        />
      </div>
      <span className="ml-2 text-sm">{timeEnd}</span>
    </div>
  );
};