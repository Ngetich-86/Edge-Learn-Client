import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from 'sonner';
import { APIDomain } from "../../../utils/ApiDomain";

const EmailSender = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);

    try {
      const res = await axios.post(`${APIDomain}/send-email`, formData);
      setResponse(res.data); 
      toast.success('Email sent successfully');
    } catch (error) {
      setResponse("Failed to send email. Please try again.");
    //   console.error(error);
    toast.error('Email sent failed !!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
        <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Send an Email</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Recipient Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter recipient email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter subject"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your message"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-bold rounded-md ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Email"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default EmailSender;
