import { motion } from "motion/react";

export default function LogoPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center py-12"
      style={{ background: "#FFD700" }}
    >
      <motion.img
        src="/assets/generated/hula-dancer-white-on-yellow.dim_800x600.png"
        alt="Hula dancer silhouette with Hawaii"
        className="w-full max-w-[700px] px-6"
        data-ocid="logo.panel"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </main>
  );
}
