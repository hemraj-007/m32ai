import { useState } from 'react';
import Layout from '../components/Layout';
import API from '../api/api';
//import * as pdfjsLib from 'pdfjs-dist';
import jsPDF from 'jspdf';
import { toast } from 'react-hot-toast';


   
// Set workerSrc to official PDF.js CDN version
//pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';


const Dashboard = () => {
  const [type, setType] = useState('rubric'); // rubric | feedback | assignment
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;

    setLoading(true);
    setResponse('');
    setError('');

    const finalPrompt = `Generate a ${type} for: ${prompt}`;

    try {
      const token = localStorage.getItem('token');
      const res = await API.post(
        '/generate',
        { prompt: finalPrompt, type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResponse(res.data.response);
      toast.success('Content generated successfully! 🚀');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to generate';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (format: 'txt' | 'pdf') => {
    const fileName = `${type}_result`;

    if (format === 'txt') {
      const blob = new Blob([response], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.txt`;
      link.click();
    }

    if (format === 'pdf') {
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(response, 180); // wrap text
      doc.setFontSize(12);
      doc.text(`AI Generated ${type.toUpperCase()} Result:\n`, 10, 10);
      doc.text(lines, 10, 20);
      doc.save(`${fileName}.pdf`);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const ext = file.name.split('.').pop()?.toLowerCase();
  
    if (ext === 'txt') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileText = event.target?.result as string;
        setPrompt(fileText);
      };
      reader.readAsText(file);
    } else if (ext === 'pdf') {
      const reader = new FileReader();
      reader.onload = async function () {
        const typedarray = new Uint8Array(this.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
  
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n';
        }
  
        // 🔥 ADD THIS CHECK BEFORE setting prompt:
        if (!fullText.trim()) {
          toast.error('❌ No text found in PDF. Please upload a text-based PDF.');
          return;
        }
  
        setPrompt(fullText.trim());
      };
      reader.readAsArrayBuffer(file);
    }
  };  


  return (
    <Layout>
      <div className="bg-gray-800 rounded-xl shadow-md p-8 space-y-8">
        {/* <h2 className="text-2xl font-semibold text-gray-800">AI Content Generator 🧠</h2> */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gray-200">M32 AI Assistant ✏️</h1>
          <p className="text-sm text-gray-500">Generate rubrics, assignments, or feedback in seconds</p>
        </div>

        {/* Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="rubric">Rubric</option>
            <option value="feedback">Feedback</option>
            <option value="assignment">Assignment</option>
          </select>
        </div>

        {/* Prompt Textarea */}
        <div className="relative flex items-center w-full mt-4">
          {/* Upload Icon (Left) */}
          <label
            htmlFor="file-upload"
            className="absolute left-3 cursor-pointer text-gray-500 hover:text-blue-600"
            title="Upload .txt file"
          >
            📎
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".txt,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Input Field (with left padding for icon) */}
          <input
            type="text"
            placeholder={`Enter ${type} topic or upload file...`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full py-3 pl-10 pr-28 text-sm border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />

          {/* Generate Button (Right) */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="absolute right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 text-sm rounded-full shadow-md hover:opacity-90 transition"
          >
            {loading ? '...' : 'Generate'}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}

        {response && (
          <div className="bg-gray-700 p-4 rounded mt-4 whitespace-pre-line border border-gray-600">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-100 capitalize">{type} Result:</h3>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDownload('txt')}
                  className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium border border-blue-400 text-blue-300 rounded-full hover:bg-blue-900 transition"
                >
                  📄 .txt
                </button>

                <button
                  onClick={() => handleDownload('pdf')}
                  className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
                >
                  📝 .pdf
                </button>
              </div>
            </div>

            <p className="text-gray-100">{response}</p>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Dashboard;
