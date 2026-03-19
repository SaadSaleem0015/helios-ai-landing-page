import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Loader2, Shield, AlertCircle, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Vapi from "@vapi-ai/web";

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  MAX_CALLS_PER_DAY: 1,
  STORAGE_KEY: "helios_call_demo_rate_limit",
};

interface RateLimitData {
  calls: Array<{ timestamp: number }>;
  lastReset: number;
}

interface FormData {
  name: string;
}

// Hardcoded configuration - should be moved to env variables in production
const HARDCODED_ASSISTANT_ID = "23be1729-32d8-4012-9c4c-4e48078b6bf9";
const HARDCODED_AGENT_ID = "1";
const VAPI_API_KEY = "a754c96f-d575-4aeb-8716-dfd7851041e6";

// Rate limiting utility functions
const getRateLimitData = (): RateLimitData => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_CONFIG.STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // Reset if it's been more than 24 hours
      const now = Date.now();
      const oneDayMs = 24 * 60 * 60 * 1000;
      if (now - data.lastReset > oneDayMs) {
        return { calls: [], lastReset: now };
      }
      return data;
    }
  } catch (error) {
    console.error("Error reading rate limit data:", error);
  }
  return { calls: [], lastReset: Date.now() };
};

const saveRateLimitData = (data: RateLimitData): void => {
  try {
    localStorage.setItem(RATE_LIMIT_CONFIG.STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving rate limit data:", error);
  }
};

const checkRateLimit = (): { allowed: boolean; message?: string; resetTime?: number } => {
  const data = getRateLimitData();
  const now = Date.now();
  const oneHourMs = 60 * 60 * 1000;
  const oneDayMs = 24 * 60 * 60 * 1000;

  // Filter calls within the last hour and day
  const callsLastHour = data.calls.filter(
    (call) => now - call.timestamp < oneHourMs
  );
  const callsLastDay = data.calls.filter(
    (call) => now - call.timestamp < oneDayMs
  );

  // Check hourly limit
//   if (callsLastHour.length >= RATE_LIMIT_CONFIG.MAX_CALLS_PER_HOUR) {
//     const oldestCall = Math.min(...callsLastHour.map((c) => c.timestamp));
//     const resetTime = oldestCall + oneHourMs;
//     return {
//       allowed: false,
//       message: `Rate limit exceeded. You can make ${RATE_LIMIT_CONFIG.MAX_CALLS_PER_HOUR} calls per hour.`,
//       resetTime,
//     };
//   }

  // Check daily limit
  if (callsLastDay.length >= RATE_LIMIT_CONFIG.MAX_CALLS_PER_DAY) {
    const oldestCall = Math.min(...callsLastDay.map((c) => c.timestamp));
    const resetTime = oldestCall + oneDayMs;
    return {
      allowed: false,
      message: `Daily limit exceeded. You can make ${RATE_LIMIT_CONFIG.MAX_CALLS_PER_DAY} calls per day.`,
      resetTime,
    };
  }

  return { allowed: true };
};

const recordCall = (): void => {
  const data = getRateLimitData();
  data.calls.push({ timestamp: Date.now() });
  saveRateLimitData(data);
};

export default function CallDemo() {
  const [callStatus, setCallStatus] = useState<"connecting" | "connected" | "ended">("ended");
  const [callerName, setCallerName] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [rateLimitInfo, setRateLimitInfo] = useState<{ message: string; resetTime?: number } | null>(null);

  const [callButton, setCallButton] = useState<{
    assistantId: string;
    status: "Talk" | "EndCall" | "Connecting";
  }>({
    assistantId: HARDCODED_AGENT_ID,
    status: "Talk",
  });

  // Initialize Vapi
  // Note: Install @vapi/client package: npm install @vapi/client
  // Then uncomment the import and initialization below
  const vapi = useMemo(() => {
    try {
      // Uncomment these lines after installing @vapi/client:
      return new Vapi(VAPI_API_KEY);
      
      // For now, return null - component will show installation message
      console.log("Vapi not initialized - install @vapi/client package");
      return null;
    } catch (error) {
      console.error("Failed to initialize Vapi:", error);
      return null;
    }
  }, []);

  // Check rate limit on mount
  useEffect(() => {
    const check = checkRateLimit();
    if (!check.allowed && check.message) {
      setRateLimitInfo({ message: check.message, resetTime: check.resetTime });
    }
  }, []);

  const formatResetTime = (timestamp?: number): string => {
    if (!timestamp) return "";
    const resetDate = new Date(timestamp);
    const now = Date.now();
    const diffMs = timestamp - now;
    const diffMins = Math.ceil(diffMs / (60 * 1000));
    if (diffMins < 60) {
      return `in ${diffMins} minute${diffMins !== 1 ? "s" : ""}`;
    }
    const diffHours = Math.ceil(diffMins / 60);
    return `in ${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
  };

  const handleTestCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setRateLimitInfo(null);

    if (!nameInput.trim()) {
      setError("Please enter your name");
      return;
    }

    // Check rate limit
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      setError(rateCheck.message || "Rate limit exceeded");
      if (rateCheck.resetTime) {
        setRateLimitInfo({
          message: rateCheck.message || "",
          resetTime: rateCheck.resetTime,
        });
      }
      return;
    }

    if (!vapi) {
      setError("Call service is not available. Please ensure @vapi/client is installed and configured.");
      return;
    }

    const formData: FormData = { name: nameInput.trim() };
    setCallerName(formData.name);
    setCallStatus("connecting");
    recordCall(); // Record the call attempt
    startCall(formData);
  };

  const startCall = (data: FormData) => {
    if (!vapi) return;

    const assistantOverrides = {
      transcriber: {
        provider: "deepgram" as const,
        model: "nova-2",
        language: "en-AU" as const,
      },
      recordingEnabled: false,
      variableValues: {
        first_name: data.name,
        last_name: "",
        email: "",
        mobile_no: "",
        add_date: "",
        custom_field_01: "",
        custom_field_02: "",
      },
    };

    try {
      vapi.start(HARDCODED_ASSISTANT_ID, assistantOverrides);

      setCallButton({
        assistantId: HARDCODED_AGENT_ID,
        status: "Connecting",
      });

      vapi.on("call-start", () => {
        setCallStatus("connected");
        setCallButton({
          assistantId: HARDCODED_AGENT_ID,
          status: "EndCall",
        });
        console.log("Call has started.");
      });

      vapi.on("call-end", () => {
        setCallStatus("ended");
        setCallButton({
          assistantId: HARDCODED_AGENT_ID,
          status: "Talk",
        });
        setCallerName("");
        setNameInput("");
        console.log("Call ended");
      });

      vapi.on("error", (e: any) => {
        console.error("Vapi error:", e);
        setCallStatus("ended");
        setError("Call failed. Please try again.");
        setCallButton({
          assistantId: HARDCODED_AGENT_ID,
          status: "Talk",
        });
      });
    } catch (error) {
      console.error("Failed to start call:", error);
      setCallStatus("ended");
      setError("Failed to start call. Please try again.");
      setCallButton({
        assistantId: HARDCODED_AGENT_ID,
        status: "Talk",
      });
    }
  };

  const endCall = () => {
    if (!vapi) return;
    try {
      vapi.stop();
      setCallStatus("ended");
      setCallButton({
        assistantId: HARDCODED_AGENT_ID,
        status: "Talk",
      });
      setCallerName("");
      setNameInput("");
      console.log("Call has been stopped.");
    } catch (error) {
      console.error("Error ending call:", error);
    }
  };

  const getRemainingCalls = () => {
    const data = getRateLimitData();
    const now = Date.now();
    const oneHourMs = 60 * 60 * 1000;
    const oneDayMs = 24 * 60 * 60 * 1000;

    const callsLastHour = data.calls.filter(
      (call) => now - call.timestamp < oneHourMs
    );
    const callsLastDay = data.calls.filter(
      (call) => now - call.timestamp < oneDayMs
    );

    return {
      hourly: Math.max(0, RATE_LIMIT_CONFIG.MAX_CALLS_PER_DAY - callsLastHour.length),
      daily: Math.max(0, RATE_LIMIT_CONFIG.MAX_CALLS_PER_DAY - callsLastDay.length),
    };
  };

  const remaining = getRemainingCalls();
  const isRateLimited = !checkRateLimit().allowed;

  return (
    <section id="call-demo" className="py-24 bg-gradient-to-b from-white to-[#f5f8fc] relative overflow-hidden scroll-mt-24">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#a4c2dc]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-[#c6d9ea]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#cfddec] shadow-lg shadow-[#e6eef6]/50 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-5 h-5 text-[#8fb3d3]" />
              <span className="text-sm font-semibold bg-gradient-to-r from-[#7fa6c8] to-[#678db0] bg-clip-text text-transparent">
                Live AI Voice Demo
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Experience{" "}
              <span className="bg-gradient-to-r from-[#8fb3d3] to-[#678db0] bg-clip-text text-transparent">
                Human-like AI Voices
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Try our AI voice assistant live. See how natural conversations feel with The Helios AI.
            </p>
          </motion.div>

          {/* Call Demo Card */}
          <motion.div
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-[#cfddec] relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Gradient Border Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#a4c2dc] via-[#8fb3d3] to-[#a4c2dc] rounded-3xl opacity-50 blur-sm"></div>

            <div className="relative z-10">
              {/* Rate Limit Info */}
              <div className="mb-6 p-4 bg-[#f5f8fc] rounded-xl border border-[#e6eef6]">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#7fa6c8] mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Call Limits</p>
                    <p className="text-sm text-gray-600">
                     {remaining.daily} free calls remaining today
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-red-900">{error}</p>
                        {rateLimitInfo && rateLimitInfo.resetTime && (
                          <p className="text-xs text-red-700 mt-1">
                            Resets {formatResetTime(rateLimitInfo.resetTime)}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Call Status Display */}
              <AnimatePresence mode="wait">
                {callStatus === "ended" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <form onSubmit={handleTestCallSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-base font-semibold text-gray-900">
                          Your Name
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          className="h-12 text-base border-[#cfddec] focus:border-[#a4c2dc] focus:ring-[#a4c2dc]/20"
                          disabled={isRateLimited}
                          required
                        />
                        <p className="text-xs text-gray-500">
                          This will be used to personalize your demo call experience.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isRateLimited || !nameInput.trim()}
                        className="w-full h-14 bg-gradient-to-r from-[#8fb3d3] to-[#7fa6c8] hover:from-[#7fa6c8] hover:to-[#678db0] text-white font-bold text-lg rounded-xl shadow-lg shadow-[#8fb3d3]/25 hover:shadow-[#8fb3d3]/40 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Start Demo Call
                      </Button>
                    </form>
                  </motion.div>
                )}

                {callStatus === "connecting" && (
                  <motion.div
                    key="connecting"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#8fb3d3] to-[#7fa6c8] flex items-center justify-center"
                    >
                      <Loader2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Connecting...</h3>
                    <p className="text-gray-600">Please wait while we connect you to the AI assistant.</p>
                  </motion.div>
                )}

                {callStatus === "connected" && (
                  <motion.div
                    key="connected"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
                    >
                      <Phone className="w-12 h-12 text-white" />
                    </motion.div>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <h3 className="text-2xl font-bold text-gray-900">Call Connected</h3>
                    </div>
                    <p className="text-gray-600 mb-8">
                      You're now speaking with <span className="font-semibold text-[#7fa6c8]">{callerName || "the AI assistant"}</span>
                    </p>
                    <Button
                      onClick={endCall}
                      size="lg"
                      className="bg-red-500 hover:bg-red-600 text-white font-bold text-lg px-8 h-14 rounded-xl shadow-lg hover:scale-105 transition-all"
                    >
                      <PhoneOff className="w-5 h-5 mr-2" />
                      End Call
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Security Notice */}
              <div className="mt-8 pt-6 border-t border-[#e6eef6]">
                <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
                  <Shield className="w-3 h-3" />
                  Secure demo call • No personal data stored • Rate limited for fair usage
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

