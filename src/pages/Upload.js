import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnalysisResult({
        diagnosis: 'Suspicious cells detected',
        confidence: '87%',
        recommendations: 'Please consult with an oncologist for further evaluation'
      });
    } catch (error) {
      console.error('Error analyzing report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Upload Medical Report</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Upload Your Report</h2>
          <p className="text-gray-600 mb-6">
            Upload your medical reports (blood tests, biopsy images, etc.) for AI-powered analysis.
            Supported formats: JPG, PNG, PDF.
          </p>

          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${isDragActive ? 'border-secondary bg-blue-50' : 'border-gray-300'}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-2">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {isDragActive ? (
                <p className="text-secondary font-medium">Drop the file here</p>
              ) : (
                <p className="text-gray-600">Drag & drop your file here, or click to select</p>
              )}
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Selected File:</h3>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{files[0].name}</span>
                </div>
                <button 
                  onClick={() => setFiles([])}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={files.length === 0 || isLoading}
            className={`mt-6 w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${files.length === 0 || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-blue-600'}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : 'Analyze with AI'}
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
          
          {analysisResult ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-gray-800">Diagnosis:</h3>
                <p className="text-lg font-semibold text-primary mt-1">{analysisResult.diagnosis}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-gray-800">Confidence Level:</h3>
                <p className="text-lg font-semibold text-primary mt-1">{analysisResult.confidence}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-gray-800">Recommendations:</h3>
                <p className="text-primary mt-1">{analysisResult.recommendations}</p>
              </div>
              <button className="mt-4 w-full py-3 px-4 bg-accent hover:bg-red-600 text-white font-medium rounded-md">
                Book Consultation with Specialist
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No analysis results yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload and analyze a medical report to see results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}