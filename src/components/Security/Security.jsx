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

  const [
    passwordVisibility,
    setPasswordVisibility,
  ] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [
    twoFactorEnabled,
    setTwoFactorEnabled,
  ] = useState(false);

  const [
    securityAlerts,
    setSecurityAlerts,
  ] = useState(true);

  const [sessions, setSessions] =
    useState(activeSessions);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("success");

  // ========================================
  // MESSAGE
  // ========================================

  const showMessage = (
    text,
    type = "success"
  ) => {
    setMessage(text);
    setMessageType(type);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // ========================================
  // PASSWORD INPUT
  // ========================================

  const handlePasswordChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setPasswordData(
      (current) => ({
        ...current,
        [name]: value,
      })
    );
  };

  const togglePasswordVisibility = (
    fieldName
  ) => {
    setPasswordVisibility(
      (current) => ({
        ...current,

        [fieldName]:
          !current[
            fieldName
          ],
      })
    );
  };

  // ========================================
  // PASSWORD VALIDATION
  // ========================================

  const updatePassword = async (
    event
  ) => {
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
        "error"
      );

      return;
    }

    if (
      newPassword.length < 6
    ) {
      showMessage(
        "New password minimum 6 characters ka hona chahiye.",
        "error"
      );

      return;
    }

    if (
      !/[A-Z]/.test(
        newPassword
      ) ||
      !/[a-z]/.test(
        newPassword
      )
    ) {
      showMessage(
        "Password me uppercase aur lowercase letter hona chahiye.",
        "error"
      );

      return;
    }

    if (
      !/\d/.test(
        newPassword
      )
    ) {
      showMessage(
        "Password me kam se kam ek number hona chahiye.",
        "error"
      );

      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      showMessage(
        "New password aur confirm password match nahi kar rahe.",
        "error"
      );

      return;
    }

    try {
      setLoading(true);

      /*
        Yahan later real password
        update API call add karna.
      */

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            800
          )
      );

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      showMessage(
        "Password successfully updated."
      );
    } catch (error) {
      console.error(error);

      showMessage(
        "Password update nahi hua.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // SESSION ACTIONS
  // ========================================

  const removeSession = (
    sessionId
  ) => {
    setSessions(
      (current) =>
        current.filter(
          (session) =>
            session.id !==
            sessionId
        )
    );

    showMessage(
      "Device session removed."
    );
  };

  const logoutAllDevices = () => {
    setSessions(
      (current) =>
        current.filter(
          (session) =>
            session.current
        )
    );

    showMessage(
      "Other devices se logout ho gaya."
    );
  };

  const logoutCurrentSession = () => {
    localStorage.removeItem(
      "hackon_token"
    );

    localStorage.removeItem(
      "hackon_user"
    );

    router.push("/auth");
    router.refresh();
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen w-full md:pl-[76px]">
        <Header />

        <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
          {/* HERO */}

          <SecurityHero />

          {/* MESSAGE */}

          {message && (
            <div
              className={`
                mt-5
                flex
                items-start
                gap-3
                rounded-[20px]
                border
                px-4
                py-3.5
                text-sm
                font-semibold

                ${
                  messageType ===
                  "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }
              `}
            >
              {messageType ===
              "success" ? (
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                />
              ) : (
                <AlertTriangle
                  size={18}
                  className="mt-0.5 shrink-0"
                />
              )}

              <span className="min-w-0 break-words">
                {message}
              </span>
            </div>
          )}

          {/* SECURITY SUMMARY */}

          <SecurityStats
            twoFactorEnabled={
              twoFactorEnabled
            }
            totalSessions={
              sessions.length
            }
            securityAlerts={
              securityAlerts
            }
          />

          {/* MAIN SECURITY */}

          <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <PasswordSection
              passwordData={
                passwordData
              }
              onChange={
                handlePasswordChange
              }
              passwordVisibility={
                passwordVisibility
              }
              togglePasswordVisibility={
                togglePasswordVisibility
              }
              onSubmit={
                updatePassword
              }
              loading={
                loading
              }
            />

            <SecurityPreferences
              twoFactorEnabled={
                twoFactorEnabled
              }
              setTwoFactorEnabled={
                setTwoFactorEnabled
              }
              securityAlerts={
                securityAlerts
              }
              setSecurityAlerts={
                setSecurityAlerts
              }
              showMessage={
                showMessage
              }
            />
          </div>

          {/* DEVICES + ACTIVITY */}

          <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <ActiveSessions
              sessions={
                sessions
              }
              removeSession={
                removeSession
              }
              logoutAllDevices={
                logoutAllDevices
              }
            />

            <LoginActivity />
          </div>

          {/* LOGOUT */}

          <DangerZone
            onLogout={
              logoutCurrentSession
            }
          />
        </section>
      </div>
    </main>
  );
};

// ========================================
// HERO
// ========================================

const SecurityHero = () => {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-slate-950 px-5 py-7 text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] sm:px-8 sm:py-9 lg:px-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-emerald-600/20 blur-3xl" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-blue-100 sm:text-xs">
          <ShieldCheck
            size={15}
          />

          Account Security
        </div>

        <h1 className="mt-4 text-[32px] font-black tracking-[-0.045em] sm:mt-5 sm:text-4xl lg:text-5xl">
          Security Centre
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
          Manage your password,
          authentication, active devices
          and recent account activity.
        </p>
      </div>
    </section>
  );
};

// ========================================
// STATS
// ========================================

const SecurityStats = ({
  twoFactorEnabled,
  totalSessions,
  securityAlerts,
}) => {
  const stats = [
    {
      title:
        "Account Status",
      value:
        "Protected",
      icon:
        ShieldCheck,
      style:
        "bg-emerald-50 text-emerald-700",
    },
    {
      title:
        "Two-Factor Auth",
      value:
        twoFactorEnabled
          ? "Enabled"
          : "Disabled",
      icon:
        KeyRound,
      style:
        twoFactorEnabled
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700",
    },
    {
      title:
        "Active Sessions",
      value:
        totalSessions,
      icon:
        Laptop,
      style:
        "bg-blue-50 text-blue-700",
    },
    {
      title:
        "Security Alerts",
      value:
        securityAlerts
          ? "On"
          : "Off",
      icon:
        BellRing,
      style:
        securityAlerts
          ? "bg-violet-50 text-violet-700"
          : "bg-slate-100 text-slate-600",
    },
  ];

  return (
    <section className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {stats.map(
        (stat) => {
          const Icon =
            stat.icon;

          return (
            <article
              key={
                stat.title
              }
              className="min-w-0 rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_7px_25px_rgba(15,23,42,0.045)] transition-all active:scale-[0.98] sm:p-5 xl:hover:-translate-y-1 xl:hover:shadow-lg"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${stat.style}`}
              >
                <Icon
                  size={19}
                />
              </div>

              <p className="mt-4 text-[11px] font-bold leading-5 text-slate-500 sm:text-sm">
                {
                  stat.title
                }
              </p>

              <p className="mt-1 truncate text-lg font-black text-slate-950 sm:text-2xl">
                {
                  stat.value
                }
              </p>
            </article>
          );
        }
      )}
    </section>
  );
};

// ========================================
// PASSWORD SECTION
// ========================================

const PasswordSection = ({
  passwordData,
  onChange,
  passwordVisibility,
  togglePasswordVisibility,
  onSubmit,
  loading,
}) => {
  const newPassword =
    passwordData.newPassword;

  const rules = [
    {
      text:
        "Minimum 6 characters",
      passed:
        newPassword.length >=
        6,
    },
    {
      text:
        "Uppercase and lowercase letters",
      passed:
        /[A-Z]/.test(
          newPassword
        ) &&
        /[a-z]/.test(
          newPassword
        ),
    },
    {
      text:
        "At least one number",
      passed:
        /\d/.test(
          newPassword
        ),
    },
  ];

  return (
    <SecurityCard
      title="Change Password"
      description="Use a strong and unique password for your HackOn account."
      icon={Lock}
    >
      <form
        onSubmit={
          onSubmit
        }
        className="space-y-5"
      >
        <PasswordField
          label="Current Password"
          name="currentPassword"
          value={
            passwordData.currentPassword
          }
          onChange={
            onChange
          }
          visible={
            passwordVisibility.currentPassword
          }
          onToggle={() =>
            togglePasswordVisibility(
              "currentPassword"
            )
          }
        />

        <PasswordField
          label="New Password"
          name="newPassword"
          value={
            passwordData.newPassword
          }
          onChange={
            onChange
          }
          visible={
            passwordVisibility.newPassword
          }
          onToggle={() =>
            togglePasswordVisibility(
              "newPassword"
            )
          }
        />

        <PasswordField
          label="Confirm New Password"
          name="confirmPassword"
          value={
            passwordData.confirmPassword
          }
          onChange={
            onChange
          }
          visible={
            passwordVisibility.confirmPassword
          }
          onToggle={() =>
            togglePasswordVisibility(
              "confirmPassword"
            )
          }
        />

        <div className="rounded-[18px] border border-slate-100 bg-slate-50/80 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">
            Password requirements
          </p>

          <div className="mt-3 space-y-2.5">
            {rules.map(
              (rule) => (
                <Requirement
                  key={
                    rule.text
                  }
                  text={
                    rule.text
                  }
                  passed={
                    rule.passed
                  }
                />
              )
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={
            loading
          }
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition-all active:scale-[0.97] hover:bg-[#1769c2] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Save
              size={17}
            />
          )}

          {loading
            ? "Updating..."
            : "Update Password"}
        </button>
      </form>
    </SecurityCard>
  );
};

// ========================================
// SECURITY PREFERENCES
// ========================================

const SecurityPreferences = ({
  twoFactorEnabled,
  setTwoFactorEnabled,
  securityAlerts,
  setSecurityAlerts,
  showMessage,
}) => {
  const handleTwoFactor = () => {
    const next =
      !twoFactorEnabled;

    setTwoFactorEnabled(
      next
    );

    showMessage(
      next
        ? "Two-factor authentication enabled."
        : "Two-factor authentication disabled."
    );
  };

  const handleAlerts = () => {
    const next =
      !securityAlerts;

    setSecurityAlerts(
      next
    );

    showMessage(
      next
        ? "Security alerts enabled."
        : "Security alerts disabled."
    );
  };

  return (
    <SecurityCard
      title="Security Preferences"
      description="Manage additional protection for your account."
      icon={ShieldCheck}
    >
      <div className="divide-y divide-slate-100">
        <ToggleRow
          title="Two-Factor Authentication"
          description="Require additional verification when signing in."
          enabled={
            twoFactorEnabled
          }
          onChange={
            handleTwoFactor
          }
        />

        <ToggleRow
          title="Security Alerts"
          description="Receive alerts for suspicious login and device activity."
          enabled={
            securityAlerts
          }
          onChange={
            handleAlerts
          }
        />
      </div>

      {!twoFactorEnabled && (
        <div className="mt-6 rounded-[18px] border border-amber-100 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <KeyRound
              size={19}
              className="mt-0.5 shrink-0 text-amber-700"
            />

            <div>
              <p className="text-sm font-black text-amber-900">
                Improve account protection
              </p>

              <p className="mt-1 text-xs leading-5 text-amber-700">
                Enable two-factor
                authentication for an
                additional login
                verification layer.
              </p>
            </div>
          </div>
        </div>
      )}
    </SecurityCard>
  );
};

// ========================================
// ACTIVE SESSIONS
// ========================================

const ActiveSessions = ({
  sessions,
  removeSession,
  logoutAllDevices,
}) => {
  const otherSessions =
    sessions.filter(
      (session) =>
        !session.current
    );

  return (
    <SecurityCard
      title="Active Sessions"
      description="Review and manage devices currently signed in."
      icon={Laptop}
    >
      <div className="space-y-3">
        {sessions.map(
          (session) => {
            const Icon =
              session.icon;

            return (
              <article
                key={
                  session.id
                }
                className="min-w-0 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4"
              >
                <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#1769c2] shadow-sm">
                      <Icon
                        size={20}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="break-words text-sm font-black text-slate-900">
                          {
                            session.device
                          }
                        </p>

                        {session.current && (
                          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.07em] text-emerald-700">
                            Current
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {
                          session.browser
                        }
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-400 sm:text-xs">
                        <span className="flex items-center gap-1.5">
                          <MapPin
                            size={13}
                          />

                          {
                            session.location
                          }
                        </span>

                        <span>
                          {
                            session.lastActive
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  {!session.current && (
                    <button
                      type="button"
                      onClick={() =>
                        removeSession(
                          session.id
                        )
                      }
                      className="flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-xs font-bold text-red-600 transition-all active:scale-[0.97] hover:bg-red-50 sm:w-auto"
                    >
                      <Trash2
                        size={15}
                      />

                      Remove
                    </button>
                  )}
                </div>
              </article>
            );
          }
        )}
      </div>

      {otherSessions.length >
        0 && (
        <button
          type="button"
          onClick={
            logoutAllDevices
          }
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition-all active:scale-[0.97] hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:w-auto"
        >
          <LogOut
            size={17}
          />

          Logout Other Devices
        </button>
      )}
    </SecurityCard>
  );
};

// ========================================
// LOGIN ACTIVITY
// ========================================

const LoginActivity = () => {
  return (
    <SecurityCard
      title="Login Activity"
      description="Review recent sign-in attempts on your account."
      icon={MonitorSmartphone}
    >
      <div className="space-y-3">
        {loginActivities.map(
          (activity) => {
            const successful =
              activity.status ===
              "success";

            return (
              <article
                key={
                  activity.id
                }
                className="min-w-0 rounded-[18px] border border-slate-200 p-4"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      successful
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {successful ? (
                      <CheckCircle2
                        size={18}
                      />
                    ) : (
                      <AlertTriangle
                        size={18}
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="break-words text-sm font-black text-slate-900">
                      {
                        activity.title
                      }
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {
                        activity.device
                      }
                    </p>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-400 sm:text-xs">
                      <span className="flex items-center gap-1.5">
                        <MapPin
                          size={13}
                        />

                        {
                          activity.location
                        }
                      </span>

                      <span>
                        {
                          activity.time
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          }
        )}
      </div>
    </SecurityCard>
  );
};

// ========================================
// LOGOUT
// ========================================

const DangerZone = ({
  onLogout,
}) => {
  return (
    <section className="mt-6 min-w-0 overflow-hidden rounded-[24px] border border-red-200 bg-white p-4 shadow-[0_7px_25px_rgba(15,23,42,0.045)] sm:p-6">
      <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle
              size={19}
            />

            <h2 className="text-lg font-black">
              Current Session
            </h2>
          </div>

          <p className="mt-2 break-words text-sm leading-6 text-slate-500">
            Sign out from this device.
            You will need to log in
            again to access your account.
          </p>
        </div>

        <button
          type="button"
          onClick={
            onLogout
          }
          className="flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-bold text-white transition-all active:scale-[0.97] hover:bg-red-700 sm:w-auto"
        >
          <LogOut
            size={17}
          />

          Logout
        </button>
      </div>
    </section>
  );
};

// ========================================
// CARD
// ========================================

const SecurityCard = ({
  title,
  description,
  icon: Icon,
  children,
}) => {
  return (
    <section className="min-w-0 w-full overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_8px_28px_rgba(15,23,42,0.045)] sm:p-6 lg:p-7">
      <div className="flex min-w-0 items-start gap-3 border-b border-slate-100 pb-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1769c2]">
          <Icon
            size={20}
          />
        </div>

        <div className="min-w-0">
          <h2 className="break-words text-lg font-black tracking-[-0.02em] text-slate-950 sm:text-xl">
            {title}
          </h2>

          <p className="mt-1 break-words text-sm leading-6 text-slate-500">
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

// ========================================
// PASSWORD FIELD
// ========================================

const PasswordField = ({
  label,
  visible,
  onToggle,
  ...props
}) => {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-bold text-slate-700">
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
            visible
              ? "text"
              : "password"
          }
          placeholder="Enter password"
          autoComplete={
            props.name ===
            "currentPassword"
              ? "current-password"
              : "new-password"
          }
          className="h-12 w-full min-w-0 rounded-2xl border border-slate-200 bg-white pl-11 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1769c2] focus:ring-4 focus:ring-blue-50"
        />

        <button
          type="button"
          onClick={
            onToggle
          }
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition active:scale-90 hover:bg-slate-100 hover:text-slate-700"
          aria-label={
            visible
              ? "Hide password"
              : "Show password"
          }
        >
          {visible ? (
            <EyeOff
              size={18}
            />
          ) : (
            <Eye
              size={18}
            />
          )}
        </button>
      </div>
    </div>
  );
};

// ========================================
// PASSWORD REQUIREMENT
// ========================================

const Requirement = ({
  text,
  passed,
}) => {
  return (
    <div
      className={`flex items-center gap-2 text-xs ${
        passed
          ? "font-semibold text-emerald-700"
          : "text-slate-500"
      }`}
    >
      <CheckCircle2
        size={15}
        className={`shrink-0 ${
          passed
            ? "text-emerald-600"
            : "text-slate-300"
        }`}
      />

      <span className="break-words">
        {text}
      </span>
    </div>
  );
};

// ========================================
// TOGGLE
// ========================================

const ToggleRow = ({
  title,
  description,
  enabled,
  onChange,
}) => {
  return (
    <div className="flex min-w-0 items-center justify-between gap-4 py-5">
      <div className="min-w-0 flex-1">
        <p className="break-words text-sm font-black text-slate-900">
          {title}
        </p>

        <p className="mt-1 break-words text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={
          onChange
        }
        className={`relative h-7 w-12 shrink-0 rounded-full transition-all active:scale-90 ${
          enabled
            ? "bg-[#1769c2]"
            : "bg-slate-300"
        }`}
        aria-label={
          title
        }
        aria-pressed={
          enabled
        }
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