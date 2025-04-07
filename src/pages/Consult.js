import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Consult() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const navigate = useNavigate();

  // Sample list of available doctors
  const doctors = [
    { id: 1, name: 'Dr. Smith', specialty: 'Oncologist', rating: 4.8, available: true },
    { id: 2, name: 'Dr. Johnson', specialty: 'Radiologist', rating: 4.7, available: true },
    { id: 3, name: 'Dr. Williams', specialty: 'Pathologist', rating: 4.9, available: false },
  ];

  const startCall = async () => {
    if (!selectedDoctor) return;
    
    setIsLoading(true);
    try {
      // Simulate call setup
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, we'd initialize WebRTC here
      setIsCallActive(true);
      setChatMessages([{
        sender: 'system',
        text: `Connected with ${selectedDoctor.name}`,
        time: new Date().toLocaleTimeString()
      }]);
    } catch (error) {
      console.error('Error starting call:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const endCall = () => {
    setIsCallActive(false);
    setSelectedDoctor(null);
    setChatMessages([{
      sender: 'system',
      text: 'Call ended',
      time: new Date().toLocaleTimeString()
    }]);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    
    setChatMessages([...chatMessages, {
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString()
    }]);
    setMessage('');
    
    // Simulate doctor reply
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        sender: 'doctor',
        text: 'Thank you for that information. Let me review your reports.',
        time: new Date().toLocaleTimeString()
      }]);
    }, 1000);
  };

  // Simulate getting video stream (would be real in production)
  useEffect(() => {
    if (isCallActive) {
      // This would be replaced with actual WebRTC stream in production
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = new MediaStream();
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = new MediaStream();
      }
    }
  }, [isCallActive]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Telemedicine Consultation</h1>
      
      {!isCallActive ? (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Available Specialists</h2>
            <div className="space-y-4">
              {doctors.map(doctor => (
                <div 
                  key={doctor.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedDoctor?.id === doctor.id ? 'border-secondary bg-blue-50' : 'border-gray-200 hover:border-secondary'} ${!doctor.available && 'opacity-60'}`}
                  onClick={() => doctor.available && setSelectedDoctor(doctor)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-gray-500">{doctor.specialty}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">{doctor.rating}</span>
                      </div>
                    </div>
                    {!doctor.available && (
                      <span className="ml-auto text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        Unavailable
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Consultation Details</h2>
            {selectedDoctor ? (
              <div>
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{selectedDoctor.name}</h3>
                    <p className="text-sm text-gray-500">{selectedDoctor.specialty}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-secondary focus:border-secondary">
                      <option>General Consultation</option>
                      <option>Report Review</option>
                      <option>Second Opinion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-secondary focus:border-secondary">
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>45 minutes</option>
                      <option>60 minutes</option>
                    </select>
                  </div>
                  <button
                    onClick={startCall}
                    disabled={isLoading}
                    className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-blue-600'}`}
                  >
                    {isLoading ? 'Connecting...' : 'Start Video Consultation'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No doctor selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a doctor to start your consultation.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-primary text-white flex justify-between items-center">
            <h2 className="text-xl font-semibold">Consultation with {selectedDoctor.name}</h2>
            <button 
              onClick={endCall}
              className="flex items-center text-white hover:text-red-200"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              End Call
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            <div className="md:col-span-2 bg-gray-900 p-4">
              <div className="relative pb-[56.25%]"> {/* 16:9 aspect ratio */}
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="absolute h-full w-full object-cover rounded-lg"
                />
                <div className="absolute bottom-4 right-4 w-1/4">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="h-full w-full object-cover rounded-lg border-2 border-white"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 flex flex-col h-[500px]">
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'me' ? 'bg-secondary text-white' : msg.sender === 'doctor' ? 'bg-white border border-gray-200' : 'bg-gray-200 text-gray-800'}`}>
                      <p>{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1 text-right">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
                <button
                  onClick={sendMessage}
                  className="bg-secondary hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}