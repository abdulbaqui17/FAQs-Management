import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const App = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const { quill, quillRef } = useQuill();
  const [selectedLang, setSelectedLang] = useState("en");

  

  useEffect(() => {
    fetchFAQs(selectedLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFAQs = async (lang = "en") => {
    try {
      setLoading(true);
      setSelectedLang(lang);
      const { data } = await axios.get(`http://localhost:3000/api/faqs/?lang=${lang}`);
      setFaqs(data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFAQ = async () => {
    if (!question || !quill) return;
    try {
      setLoading(true);
      const newFAQ = { question, answer: quill.root.innerHTML };
      await axios.post("http://localhost:3000/api/faqs", newFAQ);
      fetchFAQs(selectedLang);
      setQuestion("");
      quill.root.innerHTML = "";
    } catch (error) {
      console.error("Error creating FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <motion.h2 
        className="text-2xl font-bold text-center transform hover:scale-105 transition duration-300"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Manage FAQs
      </motion.h2>

      {/* Language Selector using a <select> dropdown */}
      <div className="w-full flex justify-end">
        <select
          value={selectedLang}
          onChange={(e) => fetchFAQs(e.target.value)}
          className="border border-gray-400 rounded px-3 py-2 bg-white text-black focus:outline-none focus:ring focus:border-black"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
        </select>
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Card */}
        <div className="p-6 shadow-lg bg-white rounded-lg transform hover:scale-105 transition duration-300 border border-gray-100">
          {/* CardContent */}
          <div className="space-y-4">
            {/* Input for Question */}
            <input
              type="text"
              placeholder="Enter question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-gray-200  rounded-md px-3 py-3 focus:outline-none focus:ring focus:border-gray bg-white text-black disabled:opacity-50 transition duration-200"
            />
            {/* Quill Editor */}
            <div ref={quillRef} className="h-40 border border-gray-400 rounded-md p-2 bg-white text-black" />
            {/* Add FAQ Button */}
            <button
              onClick={handleCreateFAQ}
              disabled={loading}
              className="w-full border border-gray-400 bg-gray-900 hover:bg-gray-900 text-white font-bold py-2 px-3 my-3 rounded-lg disabled:opacity-50 transition duration-200"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Add FAQ"}
            </button>
          </div>
        </div>
      </motion.div>

      {loading && <p className="text-center text-gray-700">Loading FAQs...</p>}

      {/* FAQ List */}
      <motion.ul 
        className="space-y-4 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {faqs.map((faq, index) => (
          <motion.li 
            key={index} 
            className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 border border-gray-300"
            whileHover={{ scale: 1.05 }}
          >
            <strong>{faq.question}</strong>
            <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default App;
