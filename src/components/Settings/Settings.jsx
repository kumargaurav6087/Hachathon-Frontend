"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Bell,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Mail,
  Moon,
  Save,
  ShieldCheck,
  Smartphone,
  Sun,
  User,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

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
    id: "security",
    label: "Security",
    icon: Lock,
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

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    college: "",
    phone: "",
    role: "user",
  });

  const [notifications, setNotifications] =
    useState({
      emailNotifications: true,
      submissionUpdates: true,
      hackathonReminders: true,
      certificateUpdates: true,
      promotionalEmails: false,
    });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showEmail: false,
    showPhone: false,
  });

  const [appearance, setAppearance] =
    useState("light");

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

  useEffect(() => {
    const savedUser =
      localStorage.getItem("hackon_user");

    if (!savedUser) {
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      setUserData({
        name: user.name || "",
        email: user.email || "",
        college: user.college || "",
        phone: user.phone || "",
        role: user.role || "user",
      });
    } catch (error) {
      console.error("Invalid user data:", error);
    }
  }, []);

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

  const handleUserChange = (event) => {
    const { name, value } = event.target;

    setUserData((current) => ({
      ...current,
      [name]: value,
    }));
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

  const saveProfile = async (event) => {
    event.preventDefault();

    if (!userData.name.trim()) {
      showMessage(
        "Full name required hai.",
        "error",
      );

      return;
    }

    try {
      setLoading(true);

      const oldUser = JSON.parse(
        localStorage.getItem("hackon_user") ||
          "{}",
      );

      const updatedUser = {
        ...oldUser,
        ...userData,
      };

      localStorage.setItem(
        "hackon_user",
        JSON.stringify(updatedUser),
      );

      showMessage(
        "Profile successfully saved.",
      );
    } catch (error) {
      console.error(error);

      showMessage(
        "Profile save nahi hua.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = () => {
    showMessage(
      "Preferences successfully saved.",
    );
  };

  const updatePassword = (event) => {
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
        "New password aur confirm password match nahi ho rahe.",
        "error",
      );

      return;
    }

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    showMessage(
      "Password update request submitted.",
    );
  };

  const logout = () => {
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
          <SettingsHero />

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

          <div className="mt-5 grid min-w-0 gap-5 xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-7">
            <SettingsNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <div className="min-w-0 w-full">
              {activeTab === "profile" && (
                <ProfileSettings
                  userData={userData}
                  onChange={handleUserChange}
                  onSubmit={saveProfile}
                  loading={loading}
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
                  onSave={savePreferences}
                />
              )}

              {activeTab === "privacy" && (
                <PrivacySettings
                  privacy={privacy}
                  setPrivacy={setPrivacy}
                  onSave={savePreferences}
                />
              )}

              {activeTab ===
                "appearance" && (
                <AppearanceSettings
                  appearance={appearance}
                  setAppearance={setAppearance}
                  onSave={savePreferences}
                />
              )}

              {activeTab === "security" && (
                <SecuritySettings
                  passwordData={passwordData}
                  onChange={
                    handlePasswordChange
                  }
                  passwordVisibility={
                    passwordVisibility
                  }
                  togglePasswordVisibility={
                    togglePasswordVisibility
                  }
                  onSubmit={updatePassword}
                />
              )}

              {activeTab === "account" && (
                <AccountSettings
                  onLogout={logout}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

const SettingsHero = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-950 px-5 py-7 text-white sm:rounded-3xl sm:px-8 sm:py-9 lg:px-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative">
        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-[11px] font-bold text-blue-100 sm:px-3.5 sm:text-xs">
          <User
            size={15}
            className="shrink-0"
          />

          <span className="truncate">
            Account Preferences
          </span>
        </span>

        <h1 className="mt-5 wrap-break-word text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">
          Settings
        </h1>

        <p className="mt-3 max-w-2xl wrap-break-word text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
          Profile, notifications, privacy,
          appearance aur account security manage
          karo.
        </p>
      </div>
    </section>
  );
};

const SettingsNavigation = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <aside className="h-fit min-w-0 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm sm:rounded-3xl sm:p-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:block xl:space-y-1">
        {settingsTabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={`flex min-w-0 items-center justify-center gap-2 rounded-xl px-2 py-3 text-xs font-bold transition min-[380px]:px-3 sm:text-sm xl:w-full xl:justify-start xl:gap-3 xl:px-4 ${
                activeTab === tab.id
                  ? "bg-blue-50 text-[#1769c2]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <Icon
                size={17}
                className="shrink-0"
              />

              <span className="min-w-0 truncate">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

const ProfileSettings = ({
  userData,
  onChange,
  onSubmit,
  loading,
}) => {
  return (
    <SettingsCard
      title="Profile Information"
      description="Apni personal aur academic details update karo."
    >
      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >
        <div className="grid min-w-0 gap-5 md:grid-cols-2">
          <InputField
            label="Full Name"
            name="name"
            value={userData.name}
            onChange={onChange}
            placeholder="Enter full name"
            icon={<User size={18} />}
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={userData.email}
            onChange={onChange}
            placeholder="you@example.com"
            icon={<Mail size={18} />}
            disabled
          />

          <InputField
            label="College Name"
            name="college"
            value={userData.college}
            onChange={onChange}
            placeholder="Enter college name"
            icon={<User size={18} />}
          />

          <InputField
            label="Phone Number"
            name="phone"
            value={userData.phone}
            onChange={onChange}
            placeholder="9876543210"
            icon={
              <Smartphone size={18} />
            }
          />
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Current Role
          </p>

          <p className="mt-2 wrap-break-word text-sm font-black capitalize text-slate-900">
            {userData.role}
          </p>
        </div>

        <SaveButton
          loading={loading}
          text="Save Profile"
        />
      </form>
    </SettingsCard>
  );
};

const NotificationSettings = ({
  notifications,
  setNotifications,
  onSave,
}) => {
  const items = [
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description:
        "Important platform updates email par receive karo.",
    },
    {
      key: "submissionUpdates",
      title: "Submission Updates",
      description:
        "Project status change hone par notification mile.",
    },
    {
      key: "hackathonReminders",
      title: "Hackathon Reminders",
      description:
        "Deadline aur event reminders receive karo.",
    },
    {
      key: "certificateUpdates",
      title: "Certificate Updates",
      description:
        "Certificate ready hone par notification mile.",
    },
    {
      key: "promotionalEmails",
      title: "Promotional Emails",
      description:
        "Featured opportunities aur offers receive karo.",
    },
  ];

  return (
    <SettingsCard
      title="Notification Preferences"
      description="Select karo kaunsi notifications receive karni hain."
    >
      <div className="divide-y divide-slate-100">
        {items.map((item) => (
          <ToggleRow
            key={item.key}
            title={item.title}
            description={
              item.description
            }
            enabled={
              notifications[item.key]
            }
            onChange={() =>
              setNotifications(
                (current) => ({
                  ...current,
                  [item.key]:
                    !current[item.key],
                }),
              )
            }
          />
        ))}
      </div>

      <ActionButton
        onClick={onSave}
        text="Save Notifications"
      />
    </SettingsCard>
  );
};

const PrivacySettings = ({
  privacy,
  setPrivacy,
  onSave,
}) => {
  const items = [
    {
      key: "publicProfile",
      title: "Public Profile",
      description:
        "Other participants ko profile view karne do.",
    },
    {
      key: "showEmail",
      title: "Show Email",
      description:
        "Public profile par email display karo.",
    },
    {
      key: "showPhone",
      title: "Show Phone Number",
      description:
        "Team members ko phone number display karo.",
    },
  ];

  return (
    <SettingsCard
      title="Privacy Controls"
      description="Control karo profile information kaise share hogi."
    >
      <div className="divide-y divide-slate-100">
        {items.map((item) => (
          <ToggleRow
            key={item.key}
            title={item.title}
            description={
              item.description
            }
            enabled={privacy[item.key]}
            onChange={() =>
              setPrivacy((current) => ({
                ...current,
                [item.key]:
                  !current[item.key],
              }))
            }
          />
        ))}
      </div>

      <ActionButton
        onClick={onSave}
        text="Save Privacy"
      />
    </SettingsCard>
  );
};

const AppearanceSettings = ({
  appearance,
  setAppearance,
  onSave,
}) => {
  const options = [
    {
      value: "light",
      label: "Light",
      description: "Clean light interface",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      description: "Dark interface",
      icon: Moon,
    },
    {
      value: "system",
      label: "System",
      description:
        "Device appearance follow kare",
      icon: Smartphone,
    },
  ];

  return (
    <SettingsCard
      title="Appearance"
      description="Apna preferred interface theme select karo."
    >
      <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const Icon = option.icon;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setAppearance(option.value)
              }
              className={`min-w-0 rounded-2xl border p-4 text-left transition sm:p-5 ${
                appearance === option.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <Icon
                size={24}
                className={
                  appearance === option.value
                    ? "text-blue-700"
                    : "text-slate-500"
                }
              />

              <p className="mt-4 wrap-break-word text-sm font-black">
                {option.label}
              </p>

              <p className="mt-1 wrap-break-word text-xs leading-5 text-slate-500">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>

      <ActionButton
        onClick={onSave}
        text="Save Appearance"
      />
    </SettingsCard>
  );
};

const SecuritySettings = ({
  passwordData,
  onChange,
  passwordVisibility,
  togglePasswordVisibility,
  onSubmit,
}) => {
  return (
    <SettingsCard
      title="Password & Security"
      description="Password update karke account secure rakho."
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
          label="Confirm Password"
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

        <SaveButton
          loading={false}
          text="Update Password"
        />
      </form>
    </SettingsCard>
  );
};

const AccountSettings = ({
  onLogout,
}) => {
  return (
    <SettingsCard
      title="Account Controls"
      description="Current session aur account access manage karo."
    >
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h3 className="wrap-break-word text-sm font-black text-red-900">
              Logout from HackOn
            </h3>

            <p className="mt-2 wrap-break-word text-sm leading-6 text-red-700">
              Current session end ho jayega aur
              dobara login karna hoga.
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
      </div>
    </SettingsCard>
  );
};

const SettingsCard = ({
  title,
  description,
  children,
}) => {
  return (
    <section className="min-w-0 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm min-[380px]:p-5 sm:rounded-3xl sm:p-7">
      <div className="border-b border-slate-100 pb-5">
        <h2 className="wrap-break-word text-lg font-black sm:text-xl">
          {title}
        </h2>

        <p className="mt-2 wrap-break-word text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      <div className="min-w-0 pt-6">
        {children}
      </div>
    </section>
  );
};

const InputField = ({
  label,
  icon,
  disabled = false,
  ...props
}) => {
  return (
    <div className="min-w-0">
      <label className="mb-2 block wrap-break-word text-sm font-bold text-slate-700">
        {label}
      </label>

      <div className="relative min-w-0">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>

        <input
          {...props}
          disabled={disabled}
          className="h-12 w-full min-w-0 rounded-xl border border-slate-200 bg-white pl-11 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-100 sm:h-13 sm:rounded-2xl sm:pl-12 sm:pr-4"
        />
      </div>
    </div>
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
          className="h-12 w-full min-w-0 rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50 sm:h-13 sm:rounded-2xl sm:pl-12 sm:pr-12"
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

const ToggleRow = ({
  title,
  description,
  enabled,
  onChange,
}) => {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 py-5 sm:gap-5">
      <div className="min-w-0 flex-1">
        <p className="wrap-break-word text-sm font-black">
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

const SaveButton = ({
  loading,
  text,
}) => {
  return (
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

      {loading ? "Saving..." : text}
    </button>
  );
};

const ActionButton = ({
  onClick,
  text,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-blue-700 sm:w-auto sm:px-6"
    >
      <Save size={17} />
      {text}
    </button>
  );
};

export default Settings;