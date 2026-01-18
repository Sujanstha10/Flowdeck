import { motion } from "framer-motion";

const Tasks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Task Management</h1>

      <div
        style={{
          background: "hsl(var(--bg-card))",
          padding: "2rem",
          borderRadius: "var(--radius)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <p style={{ color: "hsl(var(--text-muted))" }}>
          Task list will be implemented here connecting to backend.
        </p>
      </div>
    </motion.div>
  );
};

export default Tasks;
