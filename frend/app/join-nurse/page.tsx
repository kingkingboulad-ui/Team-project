"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Upload,
  UserRound,
  X,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function JoinNursePage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    specialization: "",
    experience: "",
    location: "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  // -----------------------------
  // Text inputs
  // -----------------------------

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // Profile photo
  // -----------------------------

  const handleProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Profile photo must be less than 5MB.");
      return;
    }

    setProfileImage(file);

    const previewUrl = URL.createObjectURL(file);
    setProfilePreview(previewUrl);
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setProfilePreview(null);
  };

  // -----------------------------
  // Nursing license
  // -----------------------------

  const handleLicenseFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("License file must be less than 5MB.");
      return;
    }

    setLicenseFile(file);
  };

  // -----------------------------
  // CV
  // -----------------------------

  const handleCvFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("CV must be less than 5MB.");
      return;
    }

    setCvFile(file);
  };

  // -----------------------------
  // Submit - FRONTEND ONLY
  // -----------------------------

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.specialization ||
      !formData.experience ||
      !formData.location
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!profileImage) {
      alert("Please upload your profile photo.");
      return;
    }

    if (!licenseFile) {
      alert("Please upload your nursing license.");
      return;
    }

    if (!cvFile) {
      alert("Please upload your CV.");
      return;
    }

    // Frontend only for now.
    // The backend developer will connect these fields later.
    console.log("Nurse registration data:", {
      ...formData,
      profileImage,
      licenseFile,
      cvFile,
    });

    router.push("/join-nurse/license-verification");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ================= HEADER ================= */}

      <section className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#006D77] text-white">
              <ShieldCheck size={26} />
            </div>

            <div>
              <p className="text-sm font-medium text-[#006D77]">
                Join our nursing network
              </p>

              <h1 className="text-3xl font-bold text-slate-900">
                Become a Nurse
              </h1>
            </div>
          </div>

          <p className="max-w-2xl text-slate-600">
            Create your professional profile and submit your documents to join
            our trusted network of nurses.
          </p>

          {/* Progress */}

          <div className="mt-8 flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#006D77] text-sm font-semibold text-white">
              1
            </div>

            <div className="h-1 flex-1 rounded-full bg-slate-200">
              <div className="h-1 w-1/3 rounded-full bg-[#006D77]" />
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-500">
              2
            </div>

            <div className="h-1 flex-1 rounded-full bg-slate-200" />

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-500">
              3
            </div>
          </div>
        </div>
      </section>

      {/* ================= FORM ================= */}

      <section className="mx-auto max-w-5xl px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ================= PERSONAL INFO ================= */}

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Tell us a little about yourself.
              </p>
            </div>

            {/* PROFILE PHOTO */}

            <div className="mb-8">
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Profile Photo *
              </label>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {/* IMAGE PREVIEW */}

                <div className="relative">
                  <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50">
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="Profile preview"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <UserRound
                        size={40}
                        className="text-slate-300"
                      />
                    )}
                  </div>

                  {profilePreview && (
                    <button
                      type="button"
                      onClick={removeProfileImage}
                      className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* UPLOAD BUTTON */}

                <div>
                  <label
                    htmlFor="profileImage"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#006D77] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00535B]"
                  >
                    <Upload size={17} />

                    {profileImage
                      ? "Change Photo"
                      : "Upload Photo"}
                  </label>

                  <input
                    id="profileImage"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleProfileImage}
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    JPG, PNG or WEBP • Maximum 5MB
                  </p>

                  {profileImage && (
                    <p className="mt-1 max-w-xs truncate text-xs font-medium text-[#006D77]">
                      {profileImage.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* INPUTS */}

            <div className="grid gap-5 md:grid-cols-2">

              {/* FULL NAME */}

              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full Name *
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#006D77] focus:ring-2 focus:ring-[#006D77]/10"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email Address *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#006D77] focus:ring-2 focus:ring-[#006D77]/10"
                />
              </div>

              {/* PHONE */}

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Phone Number *
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+961 XX XXX XXX"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#006D77] focus:ring-2 focus:ring-[#006D77]/10"
                />
              </div>

              {/* PASSWORD */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password *
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-[#006D77] focus:ring-2 focus:ring-[#006D77]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ================= PROFESSIONAL INFO ================= */}

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Professional Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add your nursing experience and professional details.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* SPECIALIZATION */}

              <div>
                <label
                  htmlFor="specialization"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Specialization *
                </label>

                <select
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#006D77] focus:ring-2 focus:ring-[#006D77]/10"
                >
                  <option value="">
                    Select specialization
                  </option>

                  <option value="Elderly Care">
                    Elderly Care
                  </option>

                  <option value="Post-Surgery">
                    Post-Surgery
                  </option>

                  <option value="Medication Support">
                    Medication Support
                  </option>

                  <option value="Daily Assistance">
                    Daily Assistance
                  </option>

                  <option value="Disability Support">
                    Disability Support
                  </option>

                  <option value="Palliative Care">
                    Palliative Care
                  </option>

                  <option value="Companionship">
                    Companionship
                  </option>
                </select>
              </div>

              {/* EXPERIENCE */}

              <div>
                <label
                  htmlFor="experience"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Years of Experience *
                </label>

                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#006D77] focus:ring-2 focus:ring-[#006D77]/10"
                >
                  <option value="">
                    Select experience
                  </option>

                  <option value="Less than 1 year">
                    Less than 1 year
                  </option>

                  <option value="1-2 years">
                    1-2 years
                  </option>

                  <option value="3-5 years">
                    3-5 years
                  </option>

                  <option value="5-10 years">
                    5-10 years
                  </option>

                  <option value="10+ years">
                    10+ years
                  </option>
                </select>
              </div>

              {/* LOCATION */}

              <div className="md:col-span-2">
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Location *
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Beirut, Lebanon"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#006D77] focus:ring-2 focus:ring-[#006D77]/10"
                />
              </div>
            </div>
          </div>

          {/* ================= DOCUMENTS ================= */}

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Professional Documents
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Upload your nursing license and CV for verification.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              {/* LICENSE */}

              <div className="rounded-xl border border-dashed border-slate-300 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#006D77]/10 text-[#006D77]">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Nursing License
                    </h3>

                    <p className="text-xs text-slate-500">
                      Required
                    </p>
                  </div>
                </div>

                <label
                  htmlFor="licenseFile"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-slate-50 px-4 py-8 text-center transition hover:bg-slate-100"
                >
                  <Upload
                    size={28}
                    className="mb-2 text-slate-400"
                  />

                  <span className="text-sm font-medium text-slate-700">
                    Click to upload license
                  </span>

                  <span className="mt-1 text-xs text-slate-400">
                    PDF, JPG or PNG • Max 5MB
                  </span>
                </label>

                <input
                  id="licenseFile"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleLicenseFile}
                />

                {licenseFile && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    <FileText size={17} />

                    <span className="truncate">
                      {licenseFile.name}
                    </span>
                  </div>
                )}
              </div>

              {/* CV */}

              <div className="rounded-xl border border-dashed border-slate-300 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#006D77]/10 text-[#006D77]">
                    <FileText size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      CV / Resume
                    </h3>

                    <p className="text-xs text-slate-500">
                      Required
                    </p>
                  </div>
                </div>

                <label
                  htmlFor="cvFile"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-slate-50 px-4 py-8 text-center transition hover:bg-slate-100"
                >
                  <Upload
                    size={28}
                    className="mb-2 text-slate-400"
                  />

                  <span className="text-sm font-medium text-slate-700">
                    Click to upload CV
                  </span>

                  <span className="mt-1 text-xs text-slate-400">
                    PDF, DOC or DOCX • Max 5MB
                  </span>
                </label>

                <input
                  id="cvFile"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleCvFile}
                />

                {cvFile && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    <FileText size={17} />

                    <span className="truncate">
                      {cvFile.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= SECURITY ================= */}

          <div className="flex gap-4 rounded-xl border border-[#006D77]/20 bg-[#006D77]/5 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#006D77] text-white">
              <LockKeyhole size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Your information is secure
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Your personal information and documents will be securely
                handled and used only for verification and professional
                profile creation.
              </p>
            </div>
          </div>

          {/* ================= BUTTONS ================= */}

          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#006D77] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#00535B]"
            >
              Submit & Continue
              <ShieldCheck size={18} />
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </main>
  );
}