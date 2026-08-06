import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

axios.defaults.withCredentials = true;

export const formatApiErrorDetail = (detail) => {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail
      .map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e)))
      .filter(Boolean)
      .join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
};

export const apiRegister = (email, password, name) =>
  axios.post(`${API}/auth/register`, { email, password, name });
export const apiLogin = (email, password) => axios.post(`${API}/auth/login`, { email, password });
export const apiLogout = () => axios.post(`${API}/auth/logout`);
export const apiMe = () => axios.get(`${API}/auth/me`);

export const uploadReport = (file, patientContext, onProgress) => {
  const form = new FormData();
  form.append("file", file);
  form.append("patient_context", patientContext || "");
  return axios.post(`${API}/analyses`, form, {
    onUploadProgress: (e) => {
      if (onProgress && e.total) onProgress(Math.round((e.loaded * 100) / e.total));
    },
  });
};

export const fetchAnalysis = (id) => axios.get(`${API}/analyses/${id}`);
export const fetchAnalyses = (limit = 12) =>
  axios.get(`${API}/analyses`, { params: { limit } });
export const fetchMessages = (id) => axios.get(`${API}/analyses/${id}/messages`);

export const downloadSummaryPdf = async (id, filename) => {
  const res = await axios.get(`${API}/analyses/${id}/summary.pdf`, { responseType: "blob" });
  const url = URL.createObjectURL(res.data);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const streamChat = async (id, message, onDelta) => {
  const res = await fetch(`${API}/analyses/${id}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message }),
  });
  if (!res.ok || !res.body) throw new Error("Chat request failed");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop() || "";
    for (const part of parts) {
      const line = part.trim();
      if (!line.startsWith("data:")) continue;
      const payload = JSON.parse(line.slice(5).trim());
      if (payload.type === "delta") onDelta(payload.content);
      if (payload.type === "error") throw new Error(payload.content);
    }
  }
};
