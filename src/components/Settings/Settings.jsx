"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Bell,
  Check,
  LogOut,
  Mail,
  Moon,
  Save,
  ShieldCheck,
  Smartphone,
  Sun,
  User,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

// ========================================
// SETTINGS TABS
// Security intentionally removed.
// Dedicated /security page already exists.
// ========================================

const settingsTabs = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: ShieldCheck,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Sun,
  },
  {
    id: "account",
    label: "Account",
    icon: Smartphone,
  },
];

const Settings = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] =
    useState("profile");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("success");

  const [userData, setUserData] =
    useState({
      name: "",
      email: "",
      college: "",
      phone: "",
      role: "user",
    });

  const [
    notifications,
    setNotifications,
  ] = useState({
    emailNotifications: true,
    submissionUpdates: true,
    hackathonReminders: true,
    certificateUpdates: true,
    promotionalEmails: false,
  });

  const [privacy, setPrivacy] =
    useState({
      publicProfile: true,
      showEmail: false,
      showPhone: false,
    });

  const [appearance, setAppearance] =
    useState("light");

  // ========================================
  // LOAD LOCAL USER
  // ========================================

  useEffect(() => {
    const savedUser =
      localStorage.getItem(
        "hackon_user"
      );

    if (!savedUser) {
      return;
    }

    try {
      const user =
        JSON.parse(savedUser);

      setUserData({
        name:
          user.name || "",
        email:
          user.email || "",
        college:
          user.college || "",
        phone:
          user.phone || "",
        role:
          user.role || "user",
      });
    } catch (error) {
      console.error(
        "Invalid user data:",
        error
      );
    }
  }, []);

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
  // PROFILE CHANGE
  // ========================================

  const handleUserChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setUserData(
      (current) => ({
        ...current,
        [name]: value,
      })
    );
  };

  // ========================================
  // SAVE PROFILE
  // ========================================

  const saveProfile = async (
    event
  ) => {
    event.preventDefault();

    if (
      !userData.name.trim()
    ) {
      showMessage(
        "Full name required hai.",
        "error"
      );

      return;
    }

    try {
      setLoading(true);

      const oldUser =
        JSON.parse(
          localStorage.getItem(
            "hackon_user"
          ) || "{}"
        );

      const updatedUser = {
        ...oldUser,
        ...userData,
      };

      localStorage.setItem(
        "hackon_user",
        JSON.stringify(
          updatedUser
        )
      );

      showMessage(
        "Profile successfully saved."
      );
    } catch (error) {
      console.error(error);

      showMessage(
        "Profile save nahi hua.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // SAVE PREFERENCES
  // ========================================

  const savePreferences = (
    name = "Preferences"
  ) => {
    showMessage(
      `${name} successfully saved.`
    );
  };

  // ========================================
  // LOGOUT
  // ========================================

  const logout = () => {
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

          <SettingsHero />

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
              <Check
                size={17}
                className="mt-0.5 shrink-0"
              />

              <span className="min-w-0 break-words">
                {message}
              </span>
            </div>
          )}

          {/* CONTENT */}

          <div className="mt-5 grid min-w-0 gap-5 xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-7">
            <SettingsNavigation
              activeTab={
                activeTab
              }
              setActiveTab={
                setActiveTab
              }
            />

            <div className="min-w-0 w-full">
              {activeTab ===
                "profile" && (
                <ProfileSettings
                  userData={
                    userData
                  }
                  onChange={
                    handleUserChange
                  }
                  onSubmit={
                    saveProfile
                  }
                  loading={
                    loading
                  }
                />
              )}

              {activeTab ===
                "notifications" && (
                <NotificationSettings
                  notifications={
                    notifications
                  }
                  setNotifications={
                    setNotifications
                  }
                  onSave={() =>
                    savePreferences(
                      "Notification preferences"
                    )
                  }
                />
              )}

              {activeTab ===
                "privacy" && (
                <PrivacySettings
                  privacy={
                    privacy
                  }
                  setPrivacy={
                    setPrivacy
                  }
                  onSave={() =>
                    savePreferences(
                      "Privacy settings"
                    )
                  }
                />
              )}

              {activeTab ===
                "appearance" && (
                <AppearanceSettings
                  appearance={
                    appearance
                  }
                  setAppearance={
                    setAppearance
                  }
                  onSave={() =>
                    savePreferences(
                      "Appearance"
                    )
                  }
                />
              )}

              {activeTab ===
                "account" && (
                <AccountSettings
                  onLogout={
                    logout
                  }
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

// ========================================
// HERO
// ========================================

const SettingsHero = () => {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-slate-950 px-5 py-7 text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] sm:px-8 sm:py-9 lg:px-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-blue-100 sm:text-xs">
          <User size={15} />

          Account Preferences
        </div>

        <h1 className="mt-4 text-[32px] font-black tracking-[-0.045em] sm:mt-5 sm:text-4xl lg:text-5xl">
          Settings
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
          Manage your profile,
          notifications, privacy,
          appearance and account
          preferences.
        </p>
      </div>
    </section>
  );
};

// ========================================
// NAVIGATION
// ========================================

const SettingsNavigation = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <aside className="h-fit min-w-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white p-2.5 shadow-[0_7px_25px_rgba(15,23,42,0.045)] sm:p-3 xl:sticky xl:top-24">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:block xl:space-y-1">
        {settingsTabs.map(
          (tab) => {
            const Icon =
              tab.icon;

            const active =
              activeTab ===
              tab.id;

            return (
              <button
                key={
                  tab.id
                }
                type="button"
                onClick={() =>
                  setActiveTab(
                    tab.id
                  )
                }
                className={`
                  flex
                  min-w-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-2
                  py-3
                  text-xs
                  font-bold
                  transition-all
                  active:scale-[0.97]

                  sm:px-3
                  sm:text-sm

                  xl:w-full
                  xl:justify-start
                  xl:gap-3
                  xl:px-4

                  ${
                    active
                      ? "bg-[#1769c2] text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }
                `}
              >
                <Icon
                  size={17}
                  className="shrink-0"
                />

                <span className="min-w-0 truncate">
                  {
                    tab.label
                  }
                </span>
              </button>
            );
          }
        )}
      </div>
    </aside>
  );
};

// ========================================
// PROFILE
// ========================================

const ProfileSettings = ({
  userData,
  onChange,
  onSubmit,
  loading,
}) => {
  return (
    <SettingsCard
      title="Profile Information"
      description="Update your personal and academic details."
    >
      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >
        <div className="grid min-w-0 gap-5 md:grid-cols-2">
          <InputField
            label="Full Name"
            name="name"
            value={
              userData.name
            }
            onChange={
              onChange
            }
            placeholder="Enter full name"
            icon={
              <User
                size={18}
              />
            }
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={
              userData.email
            }
            onChange={
              onChange
            }
            placeholder="you@example.com"
            icon={
              <Mail
                size={18}
              />
            }
            disabled
          />

          <InputField
            label="College Name"
            name="college"
            value={
              userData.college
            }
            onChange={
              onChange
            }
            placeholder="Enter college name"
            icon={
              <User
                size={18}
              />
            }
          />

          <InputField
            label="Phone Number"
            name="phone"
            value={
              userData.phone
            }
            onChange={
              onChange
            }
            placeholder="9876543210"
            icon={
              <Smartphone
                size={18}
              />
            }
          />
        </div>

        <div className="rounded-[18px] border border-slate-100 bg-slate-50/80 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">
            Current Role
          </p>

          <p className="mt-2 break-words text-sm font-black capitalize text-slate-900">
            {
              userData.role
            }
          </p>
        </div>

        <SaveButton
          loading={
            loading
          }
          text="Save Profile"
        />
      </form>
    </SettingsCard>
  );
};

// ========================================
// NOTIFICATIONS
// ========================================

const NotificationSettings = ({
  notifications,
  setNotifications,
  onSave,
}) => {
  const items = [
    {
      key:
        "emailNotifications",
      title:
        "Email Notifications",
      description:
        "Receive important platform updates by email.",
    },
    {
      key:
        "submissionUpdates",
      title:
        "Submission Updates",
      description:
        "Get notified when your project submission status changes.",
    },
    {
      key:
        "hackathonReminders",
      title:
        "Hackathon Reminders",
      description:
        "Receive reminders for upcoming events and deadlines.",
    },
    {
      key:
        "certificateUpdates",
      title:
        "Certificate Updates",
      description:
        "Get notified when a new certificate becomes available.",
    },
    {
      key:
        "promotionalEmails",
      title:
        "Promotional Emails",
      description:
        "Receive featured opportunities and platform announcements.",
    },
  ];

  return (
    <SettingsCard
      title="Notification Preferences"
      description="Choose which notifications you want to receive."
    >
      <div className="divide-y divide-slate-100">
        {items.map(
          (item) => (
            <ToggleRow
              key={
                item.key
              }
              title={
                item.title
              }
              description={
                item.description
              }
              enabled={
                notifications[
                  item.key
                ]
              }
              onChange={() =>
                setNotifications(
                  (
                    current
                  ) => ({
                    ...current,

                    [item.key]:
                      !current[
                        item.key
                      ],
                  })
                )
              }
            />
          )
        )}
      </div>

      <ActionButton
        onClick={
          onSave
        }
        text="Save Notifications"
      />
    </SettingsCard>
  );
};

// ========================================
// PRIVACY
// ========================================

const PrivacySettings = ({
  privacy,
  setPrivacy,
  onSave,
}) => {
  const items = [
    {
      key:
        "publicProfile",
      title:
        "Public Profile",
      description:
        "Allow other participants to view your profile.",
    },
    {
      key:
        "showEmail",
      title:
        "Show Email",
      description:
        "Display your email address on your public profile.",
    },
    {
      key:
        "showPhone",
      title:
        "Show Phone Number",
      description:
        "Allow team members to view your phone number.",
    },
  ];

  return (
    <SettingsCard
      title="Privacy Controls"
      description="Control how your profile information is shared."
    >
      <div className="divide-y divide-slate-100">
        {items.map(
          (item) => (
            <ToggleRow
              key={
                item.key
              }
              title={
                item.title
              }
              description={
                item.description
              }
              enabled={
                privacy[
                  item.key
                ]
              }
              onChange={() =>
                setPrivacy(
                  (
                    current
                  ) => ({
                    ...current,

                    [item.key]:
                      !current[
                        item.key
                      ],
                  })
                )
              }
            />
          )
        )}
      </div>

      <ActionButton
        onClick={
          onSave
        }
        text="Save Privacy"
      />
    </SettingsCard>
  );
};

// ========================================
// APPEARANCE
// ========================================

const AppearanceSettings = ({
  appearance,
  setAppearance,
  onSave,
}) => {
  const options = [
    {
      value: "light",
      label: "Light",
      description:
        "Clean light interface",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      description:
        "Comfortable dark interface",
      icon: Moon,
    },
    {
      value: "system",
      label: "System",
      description:
        "Follow your device appearance",
      icon: Smartphone,
    },
  ];

  return (
    <SettingsCard
      title="Appearance"
      description="Select your preferred interface theme."
    >
      <div className="grid min-w-0 gap-3 sm:grid-cols-3 sm:gap-4">
        {options.map(
          (option) => {
            const Icon =
              option.icon;

            const active =
              appearance ===
              option.value;

            return (
              <button
                key={
                  option.value
                }
                type="button"
                onClick={() =>
                  setAppearance(
                    option.value
                  )
                }
                className={`
                  relative
                  min-w-0
                  rounded-[20px]
                  border
                  p-4
                  text-left
                  transition-all
                  active:scale-[0.97]
                  sm:p-5

                  ${
                    active
                      ? "border-[#1769c2] bg-blue-50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                  }
                `}
              >
                {active && (
                  <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#1769c2] text-white">
                    <Check
                      size={13}
                    />
                  </span>
                )}

                <div
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl

                    ${
                      active
                        ? "bg-white text-[#1769c2]"
                        : "bg-slate-100 text-slate-500"
                    }
                  `}
                >
                  <Icon
                    size={20}
                  />
                </div>

                <p className="mt-4 break-words text-sm font-black text-slate-900">
                  {
                    option.label
                  }
                </p>

                <p className="mt-1 break-words text-xs leading-5 text-slate-500">
                  {
                    option.description
                  }
                </p>
              </button>
            );
          }
        )}
      </div>

      <ActionButton
        onClick={
          onSave
        }
        text="Save Appearance"
      />
    </SettingsCard>
  );
};

// ========================================
// ACCOUNT
// ========================================

const AccountSettings = ({
  onLogout,
}) => {
  return (
    <SettingsCard
      title="Account Controls"
      description="Manage your current HackOn session."
    >
      <div className="rounded-[20px] border border-red-200 bg-red-50 p-4 sm:p-5">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h3 className="break-words text-sm font-black text-red-900">
              Logout from HackOn
            </h3>

            <p className="mt-2 break-words text-sm leading-6 text-red-700">
              Your current session
              will end and you will
              need to sign in again.
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
      </div>
    </SettingsCard>
  );
};

// ========================================
// SETTINGS CARD
// ========================================

const SettingsCard = ({
  title,
  description,
  children,
}) => {
  return (
    <section className="min-w-0 w-full overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_8px_28px_rgba(15,23,42,0.045)] sm:p-6 lg:p-7">
      <div className="border-b border-slate-100 pb-5">
        <h2 className="break-words text-lg font-black tracking-[-0.02em] text-slate-950 sm:text-xl">
          {title}
        </h2>

        <p className="mt-2 break-words text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      <div className="min-w-0 pt-6">
        {children}
      </div>
    </section>
  );
};

// ========================================
// INPUT FIELD
// ========================================

const InputField = ({
  label,
  icon,
  disabled = false,
  ...props
}) => {
  return (
    <div className="min-w-0">
      <label className="mb-2 block break-words text-sm font-bold text-slate-700">
        {label}
      </label>

      <div className="relative min-w-0">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>

        <input
          {...props}
          disabled={
            disabled
          }
          className="
            h-12
            w-full
            min-w-0
            rounded-2xl
            border
            border-slate-200
            bg-white
            pl-11
            pr-3
            text-sm
            font-medium
            text-slate-900
            outline-none
            transition
            placeholder:font-normal
            placeholder:text-slate-400

            hover:border-slate-300

            focus:border-[#1769c2]
            focus:ring-4
            focus:ring-blue-50

            disabled:cursor-not-allowed
            disabled:bg-slate-100
            disabled:text-slate-500

            sm:pl-12
            sm:pr-4
          "
        />
      </div>
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
    <div className="flex min-w-0 items-center justify-between gap-4 py-5 sm:gap-5">
      <div className="min-w-0 flex-1">
        <p className="break-words text-sm font-black text-slate-900">
          {title}
        </p>

        <p className="mt-1 max-w-xl break-words text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={
          onChange
        }
        className={`
          relative
          h-7
          w-12
          shrink-0
          rounded-full
          transition-all
          active:scale-90

          ${
            enabled
              ? "bg-[#1769c2]"
              : "bg-slate-300"
          }
        `}
        aria-label={
          title
        }
        aria-pressed={
          enabled
        }
      >
        <span
          className={`
            absolute
            top-1
            h-5
            w-5
            rounded-full
            bg-white
            shadow
            transition-transform

            ${
              enabled
                ? "translate-x-6"
                : "translate-x-1"
            }
          `}
        />
      </button>
    </div>
  );
};

// ========================================
// SAVE BUTTON
// ========================================

const SaveButton = ({
  loading,
  text,
}) => {
  return (
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
        ? "Saving..."
        : text}
    </button>
  );
};

// ========================================
// ACTION BUTTON
// ========================================

const ActionButton = ({
  onClick,
  text,
}) => {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition-all active:scale-[0.97] hover:bg-[#1769c2] sm:w-auto sm:px-6"
    >
      <Save
        size={17}
      />

      {text}
    </button>
  );
};

export default Settings;