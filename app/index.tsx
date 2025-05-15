import React, { useState } from 'react';
import { Image } from 'react-native';
function EmofindUI({ apiOnline }: { apiOnline: boolean }) {
  const [text, setText] = useState('');

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '40px auto',
        padding: 32,
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        background: '#fff',
        textAlign: 'center',
      }}
    >
      {/* Logo */}
      <Image
        source={require('@/assets/images/grey-logo.png')}
        style={{ width: '100%', marginBottom: 8, height: 120 }}
      />
      <h2 style={{ fontWeight: 400, letterSpacing: 2, marginBottom: 24 }}>
        EMOFIND
      </h2>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ingrese su texto aquí para analizar su sentimiento…"
        rows={5}
        style={{
          width: '100%',
          borderRadius: 8,
          border: '1px solid #ddd',
          padding: 12,
          fontSize: 16,
          resize: 'none',
          marginBottom: 24,
        }}
      />

      {/* Botón */}
      <button
        type="button"
        style={{
          width: '100%',
          padding: '12px 0',
          borderRadius: 8,
          border: 'none',
          background: '#888',
          color: '#fff',
          fontSize: 18,
          fontWeight: 500,
          cursor: 'pointer',
          marginBottom: 16,
        }}
        disabled={!text}
      >
        Enviar
      </button>

      {/* Advertencia de API */}
      {!apiOnline && (
        <div style={{ color: '#e74c3c', fontSize: 14, marginTop: 8 }}>
          <span style={{ marginRight: 4 }}>⚠️</span>
          La API no está disponible en este momento.
        </div>
      )}
    </div>
  );
}

export default EmofindUI;
