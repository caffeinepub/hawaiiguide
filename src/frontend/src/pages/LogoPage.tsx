import { motion } from "motion/react";

export default function LogoPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: "oklch(0.09 0.03 230)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <img
          src="/assets/generated/keep-hawaii-alive-logo-yellow.dim_600x600.png"
          alt="Keep Hawaii Alive — Pray for Oahu"
          className="w-full max-w-[500px] px-6"
          data-ocid="logo.card"
        />
      </motion.div>
    </main>
  );
}
