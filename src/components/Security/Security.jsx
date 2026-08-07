"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  AlertTriangle,
  BellRing,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Laptop,
  Lock,
  LogOut,
  MapPin,
  MonitorSmartphone,
  Save,
  ShieldCheck,
  Smartphone,
  Trash2,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

const activeSessions = [
  {
    id: 1,
    device: "Windows Laptop",
    browser: "Chrome on Windows",
    location: "Mumbai, Maharashtra",
    lastActive: "Active now",
    current: true,
    icon: Laptop,
  },
  {
    id: 2,
    device: "Android Phone",
    browser: "Chrome Mobile",
    location: "Mumbai, Maharashtra",
    lastActive: "2 hours ago",
    current: false,
    icon: Smartphone,
  },
  {
    id: 3,
    device: "Unknown Device",
    browser: "Microsoft Edge",
    location: "Pune, Maharashtra",
    lastActive: "3 days ago",
    current: false,
    icon: MonitorSmartphone,
  },
];

const loginActivities = [
  {
    id: 1,
    title: "Successful login",
    device: "Chrome on Windows",
    location: "Mumbai, Maharashtra",
    time: "Today, 10:35 PM",
    status: "success",
  },
  {
    id: 2,
    title: "Successful login",
    device: "Chrome Mobile",
    location: "Mumbai, Maharashtra",
    time: "Today, 4:20 PM",
    status: "success",
  },
  {
    id: 3,
    title: "Failed login attempt",
    device: "Unknown browser",
    location: "Delhi, India",
    time: "04 Aug 2026, 11:40 PM",
    status: "failed",
  },
];

const Security = () => {
  const router = useRouter();

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [passwordVisibility, setPasswordVisibility] =
    useState({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });

  const [twoFactorEnabled, setTwoFactorEnabled] =
    useState(false);

  const [securityAlerts, setSecurityAlerts] =
    useState(true);

  const [sessions, setSessions] =
    useState(activeSessions);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("success");

  const showMessage = (
    text,
    type = "success",
  ) => {
    setMessage(text);
    setMessageType(type);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (
    fieldName,
  ) => {
    setPasswordVisibility((current) => ({
      ...current,
      [fieldName]: !current[fieldName],
    }));
  };

  const updatePassword = async (event) => {
    event.preventDefault();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwordData;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      showMessage(
        "Sabhi password fields fill karo.",
        "error",
      );

      return;
    }

    if (newPassword.length < 6) {
      showMessage(
        "New password minimum 6 characters ka hona chahiye.",
        "error",
      );

      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage(
        "New password aur confirm password match nahi kar rahe.",
        "error",
      );

      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 800),
      );

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      showMessage(
        "Password successfully updated.",
      );
    } catch (error) {
      showMessage(
        "Password update nahi hua.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const removeSession = (sessionId) => {
    setSessions((current) =>
      current.filter(
        (session) =>
          session.id !== sessionId,
      ),
    );

    showMessage(
      "Device session removed.",
    );
  };

  const logoutAllDevices = () => {
    setSessions((current) =>
      current.filter(
        (session) => session.current,
      ),
    );

    showMessage(
      "Other devices se logout ho gaya.",
    );
  };

  const logoutCurrentSession = () => {
    localStorage.removeItem("hackon_token");
    localStorage.removeItem("hackon_user");

    router.push("/auth");
    router.refresh();
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen w-full md:pl-19">
        <Header />

        <section className="mx-auto w-full max-w-350 px-3 py-5 min-[380px]:px-4 sm:px-6 sm:py-7 lg:px-8 xl:px-10 xl:py-10">
          <SecurityHero />

          {message && (
            <div
              className={`mt-5 wrap-break-word rounded-2xl border px-4 py-3 text-sm font-semibold ${
                messageType === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <SecurityStats
            twoFactorEnabled={
              twoFactorEnabled
            }
            totalSessions={sessions.length}
          />

          <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <PasswordSection
              passwordData={passwordData}
              onChange={handlePasswordChange}
              passwordVisibility={
                passwordVisibility
              }
              togglePasswordVisibility={
                togglePasswordVisibility
              }
              onSubmit={updatePassword}
              loading={loading}
            />

            <SecurityPreferences
              twoFactorEnabled={
                twoFactorEnabled
              }
              setTwoFactorEnabled={
                setTwoFactorEnabled
              }
              securityAlerts={securityAlerts}
              setSecurityAlerts={
                setSecurityAlerts
              }
            />
          </div>

          <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <ActiveSessions
              sessions={sessions}
              removeSession={removeSession}
              logoutAllDevices={
                logoutAllDevices
              }
            />

            <LoginActivity />
          </div>

          <DangerZone
            onLogout={logoutCurrentSession}
          />
        </section>
      </div>
    </main>
  );
};

const SecurityHero = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-950 px-5 py-7 text-white sm:rounded-3xl sm:px-8 sm:py-9 lg:px-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-emerald-600/20 blur-3xl" />

      <div className="relative">
        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-[11px] font-bold text-blue-100 sm:px-3.5 sm:text-xs">
          <ShieldCheck
            size={15}
            className="shrink-0"
          />

          Account Security
        </span>

        <h1 className="mt-5 wrap-break-word text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">
          Security Centre
        </h1>

        <p className="mt-3 max-w-2xl wrap-break-word text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
          Password, active devices, login activity
          aur security preferences manage karo.
        </p>
      </div>
    </section>
  );
};

const SecurityStats = ({
  twoFactorEnabled,
  totalSessions,
}) => {
  const stats = [
    {
      title: "Account Status",
      value: "Protected",
      description:
        "JWT authentication active",
      icon: ShieldCheck,
      style:
        "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Two-Factor Auth",
      value: twoFactorEnabled
        ? "Enabled"
        : "Disabled",
      description:
        "Additional account protection",
      icon: KeyRound,
      style: twoFactorEnabled
        ? "bg-emerald-50 text-emerald-700"
        : "bg-amber-50 text-amber-700",
    },
    {
      title: "Active Sessions",
      value: totalSessions,
      description:
        "Devices currently logged in",
      icon: Laptop,
      style: "bg-blue-50 text-blue-700",
    },
    {
      title: "Security Alerts",
      value: "03",
      description:
        "Activity in last 30 days",
      icon: BellRing,
      style:
        "bg-violet-50 text-violet-700",
    },
  ];

  return (
    <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.title}
            className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:rounded-3xl"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.style}`}
            >
              <Icon size={20} />
            </div>

            <p className="mt-5 wrap-break-word text-sm font-semibold text-slate-500">
              {stat.title}
            </p>

            <p className="mt-1 wrap-break-word text-2xl font-black text-slate-950 sm:text-3xl">
              {stat.value}
            </p>

            <p className="mt-2 wrap-break-word text-xs leading-5 text-slate-400">
              {stat.description}
            </p>
          </article>
        );
      })}
    </section>
  );
};

const PasswordSection = ({
  passwordData,
  onChange,
  passwordVisibility,
  togglePasswordVisibility,
  onSubmit,
  loading,
}) => {
  return (
    <SecurityCard
      title="Change Password"
      description="Strong aur unique password use karke account secure rakho."
      icon={Lock}
    >
      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >
        <PasswordField
          label="Current Password"
          name="currentPassword"
          value={
            passwordData.currentPassword
          }
          onChange={onChange}
          visible={
            passwordVisibility.currentPassword
          }
          onToggle={() =>
            togglePasswordVisibility(
              "currentPassword",
            )
          }
        />

        <PasswordField
          label="New Password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={onChange}
          visible={
            passwordVisibility.newPassword
          }
          onToggle={() =>
            togglePasswordVisibility(
              "newPassword",
            )
          }
        />

        <PasswordField
          label="Confirm New Password"
          name="confirmPassword"
          value={
            passwordData.confirmPassword
          }
          onChange={onChange}
          visible={
            passwordVisibility.confirmPassword
          }
          onToggle={() =>
            togglePasswordVisibility(
              "confirmPassword",
            )
          }
        />

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-wider text-slate-400">
            Password requirements
          </p>

          <div className="mt-3 space-y-2">
            <Requirement text="Minimum 6 characters" />
            <Requirement text="Uppercase and lowercase letters" />
            <Requirement text="At least one number" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Save size={17} />
          )}

          {loading
            ? "Updating..."
            : "Update Password"}
        </button>
      </form>
    </SecurityCard>
  );
};

const SecurityPreferences = ({
  twoFactorEnabled,
  setTwoFactorEnabled,
  securityAlerts,
  setSecurityAlerts,
}) => {
  return (
    <SecurityCard
      title="Security Preferences"
      description="Additional security options configure karo."
      icon={ShieldCheck}
    >
      <div className="divide-y divide-slate-100">
        <ToggleRow
          title="Two-Factor Authentication"
          description="Login ke time additional verification enable karo."
          enabled={twoFactorEnabled}
          onChange={() =>
            setTwoFactorEnabled(
              (current) => !current,
            )
          }
        />

        <ToggleRow
          title="Security Alerts"
          description="Suspicious login aur device activity ke alerts receive karo."
          enabled={securityAlerts}
          onChange={() =>
            setSecurityAlerts(
              (current) => !current,
            )
          }
        />
      </div>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-blue-700"
          />

          <div className="min-w-0">
            <p className="wrap-break-word text-sm font-black text-blue-900">
              Security recommendation
            </p>

            <p className="mt-1 wrap-break-word text-xs leading-5 text-blue-700">
              Two-factor authentication enable
              karna account protection improve
              karta hai.
            </p>
          </div>
        </div>
      </div>
    </SecurityCard>
  );
};

const ActiveSessions = ({
  sessions,
  removeSession,
  logoutAllDevices,
}) => {
  return (
    <SecurityCard
      title="Active Sessions"
      description="Currently logged-in devices ko manage karo."
      icon={Laptop}
    >
      <div className="space-y-3">
        {sessions.map((session) => {
          const Icon = session.icon;

          return (
            <article
              key={session.id}
              className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                    <Icon size={20} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="wrap-break-word text-sm font-black text-slate-900">
                        {session.device}
                      </p>

                      {session.current && (
                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-700">
                          Current
                        </span>
                      )}
                    </div>

                    <p className="mt-1 wrap-break-word text-xs text-slate-500">
                      {session.browser}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        {session.location}
                      </span>

                      <span>
                        {session.lastActive}
                      </span>
                    </div>
                  </div>
                </div>

                {!session.current && (
                  <button
                    type="button"
                    onClick={() =>
                      removeSession(
                        session.id,
                      )
                    }
                    className="flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-xs font-bold text-red-600 transition hover:bg-red-50 sm:w-auto"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <button
        type="button"
        onClick={logoutAllDevices}
        className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:w-auto"
      >
        <LogOut size={17} />
        Logout Other Devices
      </button>
    </SecurityCard>
  );
};

const LoginActivity = () => {
  return (
    <SecurityCard
      title="Login Activity"
      description="Recent account login activity review karo."
      icon={MonitorSmartphone}
    >
      <div className="space-y-3">
        {loginActivities.map((activity) => (
          <article
            key={activity.id}
            className="min-w-0 rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  activity.status === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {activity.status ===
                "success" ? (
                  <CheckCircle2 size={19} />
                ) : (
                  <AlertTriangle size={19} />
                )}
              </div>

              <div className="min-w-0">
                <p className="wrap-break-word text-sm font-black text-slate-900">
                  {activity.title}
                </p>

                <p className="mt-1 wrap-break-word text-xs text-slate-500">
                  {activity.device}
                </p>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {activity.location}
                  </span>

                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SecurityCard>
  );
};

const DangerZone = ({ onLogout }) => {
  return (
    <section className="mt-6 min-w-0 overflow-hidden rounded-2xl border border-red-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
      <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle size={19} />

            <h2 className="text-lg font-black">
              Danger Zone
            </h2>
          </div>

          <p className="mt-2 wrap-break-word text-sm leading-6 text-slate-500">
            Current session logout karne ke baad
            dobara login karna padega.
          </p>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-bold text-white transition hover:bg-red-700 sm:w-auto"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </section>
  );
};

const SecurityCard = ({
  title,
  description,
  icon: Icon,
  children,
}) => {
  return (
    <section className="min-w-0 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm min-[380px]:p-5 sm:rounded-3xl sm:p-7">
      <div className="flex min-w-0 items-start gap-3 border-b border-slate-100 pb-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <Icon size={20} />
        </div>

        <div className="min-w-0">
          <h2 className="wrap-break-word text-lg font-black sm:text-xl">
            {title}
          </h2>

          <p className="mt-1 wrap-break-word text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="min-w-0 pt-6">
        {children}
      </div>
    </section>
  );
};

const PasswordField = ({
  label,
  visible,
  onToggle,
  ...props
}) => {
  return (
    <div className="min-w-0">
      <label className="mb-2 block wrap-break-word text-sm font-bold text-slate-700">
        {label}
      </label>

      <div className="relative min-w-0">
        <Lock
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          {...props}
          type={
            visible ? "text" : "password"
          }
          placeholder="Enter password"
          className="h-12 w-full min-w-0 rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 sm:h-13 sm:rounded-2xl sm:pl-12 sm:pr-12"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-slate-400 transition hover:text-slate-700 sm:right-4"
          aria-label="Show or hide password"
        >
          {visible ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  );
};

const Requirement = ({ text }) => {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <CheckCircle2
        size={15}
        className="shrink-0 text-emerald-600"
      />

      <span className="wrap-break-word">
        {text}
      </span>
    </div>
  );
};

const ToggleRow = ({
  title,
  description,
  enabled,
  onChange,
}) => {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 py-5 sm:gap-5">
      <div className="min-w-0 flex-1">
        <p className="wrap-break-word text-sm font-black text-slate-900">
          {title}
        </p>

        <p className="mt-1 wrap-break-word text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled
            ? "bg-[#1769c2]"
            : "bg-slate-300"
        }`}
        aria-label={title}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            enabled
              ? "translate-x-6"
              : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default Security;