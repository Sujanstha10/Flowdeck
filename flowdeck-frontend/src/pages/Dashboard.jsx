import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  CheckCircle2,
  Clock,
  Zap,
  Loader2,
  Calendar,
} from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import styles from "./Dashboard.module.css";

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    className={styles.statCard}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <div
      className={styles.iconWrapper}
      style={{ backgroundColor: `hsl(${color} / 0.1)`, color: `hsl(${color})` }}
    >
      <Icon size={24} />
    </div>
    <div>
      <h3 className={styles.statValue}>{value}</h3>
      <p className={styles.statLabel}>{label}</p>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        if (res.data.status) {
          setUsers(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
        // If unauthorized, logout (handled by interceptor/logic eventually, but good to be explicit)
        if (err.response?.status === 401) {
          logout();
        }
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [logout]);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.header}
      >
        <h1>
          Welcome back,{" "}
          <span className="text-gradient">
            {user?.name || user?.email?.split("@")[0] || "User"}
          </span>
        </h1>
        <p>Here's what's happening in your workspace today.</p>
      </motion.div>

      <div className={styles.grid}>
        <StatCard
          icon={Users}
          label="Team Members"
          value={loadingUsers ? "-" : users.length}
          color="263 70% 50%"
          delay={0.1}
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed Tasks"
          value="0"
          color="142 71% 45%"
          delay={0.2}
        />
        <StatCard
          icon={Clock}
          label="Hours Spent"
          value="0"
          color="30 80% 55%"
          delay={0.3}
        />
        <StatCard
          icon={Zap}
          label="Efficiency"
          value="100%"
          color="180 100% 40%"
          delay={0.4}
        />
      </div>

      <motion.div
        className={styles.section}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2>Team Members</h2>

        {loadingUsers ? (
          <div className={styles.loadingState}>
            <Loader2 className={styles.spinner} size={32} />
            <p>Loading team members...</p>
          </div>
        ) : (
          <div className={styles.userList}>
            {users.length > 0 ? (
              users.map((u, index) => (
                <motion.div
                  key={u.id}
                  className={styles.userRow}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className={styles.userAvatar}>
                    {u.name ? getInitials(u.name) : "?"}
                  </div>
                  <div className={styles.userInfo}>
                    <h4>{u.name || "Unnamed User"}</h4>
                    <p>{u.email}</p>
                  </div>
                  <span className={styles.joinDate}>
                    Joined {formatDate(u.createdAt)}
                  </span>
                </motion.div>
              ))
            ) : (
              <div className={styles.loadingState}>
                <p>No users found.</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
