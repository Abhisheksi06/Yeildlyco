import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <div className="px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-4">CropAI Gov</h1>
        <p className="text-center text-gray-600">AI-Powered Crop Yield Prediction System</p>
        <div className="mt-8 text-center">
          <div className="text-6xl mb-4">🌾</div>
          <p className="text-lg text-green-600">Application Loading...</p>
        </div>
      </div>
    </div>
  );
}