import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

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

export const streamChat = async (id, message, onDelta) => {
  const res = await fetch(`${API}/analyses/${id}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
