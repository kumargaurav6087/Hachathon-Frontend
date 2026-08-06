"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  loginUser,
  registerUser,
} from "@/lib/authApi";

const Auth = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] =
    useState("login");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("error");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loginData, setLoginData] =
    useState({
      email: "",
      password: "",
    });

  const [registerData, setRegisterData] =
    useState({
      name: "",
      email: "",
      password: "",
      college: "",
      phone: "",
    });

  const showMessage = (
    text,
    type = "error",
  ) => {
    setMessage(text);
    setMessageType(type);
  };

  const handleLoginChange = (event) => {
    const { name, value } =
      event.target;

    setLoginData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleRegisterChange = (
    event,
  ) => {
    const { name, value } =
      event.target;

    setRegisterData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      if (
        !loginData.email ||
        !loginData.password
      ) {
        showMessage(
          "Email aur password enter karo.",
        );
        return;
      }

      const response =
        await loginUser(loginData);

      localStorage.setItem(
        "hackon_token",
        response.token,
      );

      localStorage.setItem(
        "hackon_user",
        JSON.stringify(response.user),
      );

      showMessage(
        response.message ||
          "Login successful.",
        "success",
      );

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      showMessage(
        error.message || "Login failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    event,
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const {
        name,
        email,
        password,
        phone,
      } = registerData;

      if (!name || !email || !password) {
        showMessage(
          "Name, email aur password required hai.",
        );
        return;
      }

      if (password.length < 6) {
        showMessage(
          "Password minimum 6 characters ka hona chahiye.",
        );
        return;
      }

      if (
        phone &&
        phone.length !== 10
      ) {
        showMessage(
          "Phone number 10 digits ka hona chahiye.",
        );
        return;
      }

      const response =
        await registerUser(registerData);

      localStorage.setItem(
        "hackon_token",
        response.token,
      );

      localStorage.setItem(
        "hackon_user",
        JSON.stringify(response.user),
      );

      showMessage(
        response.message ||
          "Registration successful.",
        "success",
      );

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      showMessage(
        error.message ||
          "Registration failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    setMessage("");
    setShowPassword(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-48px)] max-w-7xl overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 lg:grid-cols-[1.05fr_0.95fr]">
        <AuthLeftPanel />

        <div className="flex items-center justify-center px-5 py-8 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">
            <MobileLogo />

            <div>
              <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                Hackathon workspace
              </span>

              <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                {activeTab === "login"
                  ? "Welcome back"
                  : "Create your account"}
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {activeTab === "login"
                  ? "Login karke hackathons, teams aur submissions manage karo."
                  : "Account create karke hackathons me participate karo."}
              </p>
            </div>

            <AuthTabs
              activeTab={activeTab}
              changeTab={changeTab}
            />

            {message && (
              <div
                className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-semibold ${
                  messageType === "success"
                    ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                    : "border-red-100 bg-red-50 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            {activeTab === "login" ? (
              <LoginForm
                loginData={loginData}
                handleLoginChange={
                  handleLoginChange
                }
                handleLogin={handleLogin}
                loading={loading}
                showPassword={showPassword}
                setShowPassword={
                  setShowPassword
                }
              />
            ) : (
              <RegisterForm
                registerData={registerData}
                handleRegisterChange={
                  handleRegisterChange
                }
                handleRegister={
                  handleRegister
                }
                loading={loading}
                showPassword={showPassword}
                setShowPassword={
                  setShowPassword
                }
              />
            )}

            <p className="mt-7 text-center text-xs leading-5 text-slate-400">
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="font-bold text-slate-700 hover:text-blue-700"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-bold text-slate-700 hover:text-blue-700"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

const LoginForm = ({
  loginData,
  handleLoginChange,
  handleLogin,
  loading,
  showPassword,
  setShowPassword,
}) => {
  return (
    <form
      onSubmit={handleLogin}
      className="mt-7 space-y-5"
    >
      <FormInput
        label="Email address"
        type="email"
        name="email"
        value={loginData.email}
        onChange={handleLoginChange}
        placeholder="you@example.com"
        icon={<MailIcon />}
      />

      <PasswordInput
        label="Password"
        name="password"
        value={loginData.password}
        onChange={handleLoginChange}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <div className="flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <input
            type="checkbox"
            className="h-4 w-4 accent-blue-700"
          />
          Remember me
        </label>

        <button
          type="button"
          className="text-xs font-bold text-blue-700 hover:text-blue-800"
        >
          Forgot password?
        </button>
      </div>

      <SubmitButton
        loading={loading}
        text="Login to account"
        loadingText="Logging in..."
      />
    </form>
  );
};

const RegisterForm = ({
  registerData,
  handleRegisterChange,
  handleRegister,
  loading,
  showPassword,
  setShowPassword,
}) => {
  return (
    <form
      onSubmit={handleRegister}
      className="mt-7 space-y-5"
    >
      <FormInput
        label="Full name"
        type="text"
        name="name"
        value={registerData.name}
        onChange={handleRegisterChange}
        placeholder="Enter your full name"
        icon={<UserIcon />}
      />

      <FormInput
        label="Email address"
        type="email"
        name="email"
        value={registerData.email}
        onChange={handleRegisterChange}
        placeholder="you@example.com"
        icon={<MailIcon />}
      />

      <FormInput
        label="College name"
        type="text"
        name="college"
        value={registerData.college}
        onChange={handleRegisterChange}
        placeholder="Enter your college"
        icon={<CollegeIcon />}
      />

      <PhoneInput
        value={registerData.phone}
        onChange={handleRegisterChange}
      />

      <PasswordInput
        label="Create password"
        name="password"
        value={registerData.password}
        onChange={handleRegisterChange}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <label className="flex items-start gap-3 text-xs leading-5 text-slate-500">
        <input
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 accent-blue-700"
        />

        I agree to the terms, privacy policy and community
        guidelines.
      </label>

      <SubmitButton
        loading={loading}
        text="Create account"
        loadingText="Creating account..."
      />
    </form>
  );
};

const AuthTabs = ({
  activeTab,
  changeTab,
}) => {
  return (
    <div className="mt-7 grid grid-cols-2 rounded-2xl bg-slate-100 p-1.5">
      <button
        type="button"
        onClick={() => changeTab("login")}
        className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
          activeTab === "login"
            ? "bg-white text-slate-950 shadow-sm"
            : "text-slate-500"
        }`}
      >
        Login
      </button>

      <button
        type="button"
        onClick={() =>
          changeTab("register")
        }
        className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
          activeTab === "register"
            ? "bg-white text-slate-950 shadow-sm"
            : "text-slate-500"
        }`}
      >
        Register
      </button>
    </div>
  );
};

const FormInput = ({
  label,
  icon,
  ...inputProps
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>

        <input
          {...inputProps}
          className="h-13 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
        />
      </div>
    </div>
  );
};

const PhoneInput = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        Phone number
      </label>

      <div className="flex">
        <div className="flex h-13 items-center rounded-l-2xl border border-r-0 border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700">
          +91
        </div>

        <input
          type="tel"
          name="phone"
          value={value}
          onChange={(event) => {
            const numbersOnly =
              event.target.value
                .replace(/\D/g, "")
                .slice(0, 10);

            onChange({
              target: {
                name: "phone",
                value: numbersOnly,
              },
            });
          }}
          placeholder="9876543210"
          className="h-13 min-w-0 flex-1 rounded-r-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
        />
      </div>
    </div>
  );
};

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <LockIcon />
        </span>

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          name={name}
          value={value}
          onChange={onChange}
          placeholder="Minimum 6 characters"
          className="h-13 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-50"
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(
              (current) => !current,
            )
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
          aria-label="Show or hide password"
        >
          {showPassword ? (
            <EyeOffIcon />
          ) : (
            <EyeIcon />
          )}
        </button>
      </div>
    </div>
  );
};

const SubmitButton = ({
  loading,
  text,
  loadingText,
}) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading && (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}

      {loading ? loadingText : text}
    </button>
  );
};

const AuthLeftPanel = () => {
  return (
    <aside className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-violet-600/25 blur-3xl" />

      <Link
        href="/"
        className="relative inline-flex items-center gap-3"
      >
        <Logo />

        <div>
          <p className="text-xl font-black">
            HackOn
          </p>
          <p className="text-xs text-slate-400">
            Build. Innovate. Impact.
          </p>
        </div>
      </Link>

      <div className="relative max-w-lg">
        <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-blue-100">
          One platform. Endless possibilities.
        </span>

        <h2 className="mt-6 text-5xl font-black leading-[1.05] tracking-[-0.055em]">
          Turn your ideas into real products.
        </h2>

        <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
          Discover hackathons, create teams,
          submit projects and earn verified
          certificates.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-3">
          <BrandStat
            value="50+"
            label="Hackathons"
          />
          <BrandStat
            value="10K+"
            label="Participants"
          />
          <BrandStat
            value="2K+"
            label="Projects"
          />
        </div>
      </div>

      <p className="relative text-sm text-slate-400">
        Built for student innovators.
      </p>
    </aside>
  );
};

const BrandStat = ({ value, label }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
      <p className="text-xl font-black">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {label}
      </p>
    </div>
  );
};

const MobileLogo = () => {
  return (
    <Link
      href="/"
      className="mb-8 inline-flex items-center gap-3 lg:hidden"
    >
      <Logo />

      <span className="text-xl font-black text-slate-950">
        HackOn
      </span>
    </Link>
  );
};

const Logo = () => {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-950 shadow-sm">
      H
    </div>
  );
};

const MailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
    />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

const CollegeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m3 10 9-5 9 5-9 5-9-5Z" />
    <path d="M7 12v5c3 2 7 2 10 0v-5" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect
      x="4"
      y="10"
      width="16"
      height="11"
      rx="2"
    />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m3 3 18 18" />
    <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
    <path d="M9.9 4.2A10.7 10.7 0 0 1 12 4c6.5 0 10 8 10 8a16 16 0 0 1-2.1 3.2" />
    <path d="M6.6 6.6C3.5 8.5 2 12 2 12s3.5 8 10 8a9.8 9.8 0 0 0 4.1-.9" />
  </svg>
);

export default Auth;