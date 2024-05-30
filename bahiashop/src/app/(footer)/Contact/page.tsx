"use client"

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';

const ContactUsPage: React.FC = () => {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...formErrors };

    // Validación de campos
    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, ingrese su nombre.';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, ingrese su correo electrónico.';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido.';
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Por favor, ingrese su mensaje.';
      valid = false;
    }

    if (valid) {
      // Aquí podrías agregar la lógica para enviar el mensaje, como una solicitud a una API, etc.
      // Por simplicidad, simplemente estableceremos el estado de formSubmitted en true.
      setFormSubmitted(true);
      setTimeout(() => {
        router.push('/');
      }, 5000);
    } else {
      setFormErrors(newErrors);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Título principal */}
      <Typography variant="h1" className="text-3xl font-bold text-center mb-8">Contáctanos</Typography>

      {/* Mostrar formulario o mensaje de agradecimiento según el estado */}
      {!formSubmitted ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {/* Formulario de contacto */}
            <Typography variant="h2" className="text-2xl font-bold mb-4">Envíanos un mensaje</Typography>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <label htmlFor="name" className="text-lg">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`border rounded-md p-2 ${formErrors.name && 'border-red-500'}`}
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && <Typography variant="caption" className="text-red-500">{formErrors.name}</Typography>}

              <label htmlFor="email" className="text-lg">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`border rounded-md p-2 ${formErrors.email && 'border-red-500'}`}
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && <Typography variant="caption" className="text-red-500">{formErrors.email}</Typography>}

              <label htmlFor="message" className="text-lg">Mensaje:</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`border rounded-md p-2 ${formErrors.message && 'border-red-500'}`}
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {formErrors.message && <Typography variant="caption" className="text-red-500">{formErrors.message}</Typography>}

              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Enviar Mensaje
              </button>
            </form>
          </div>

          <div>
            {/* Información de contacto */}
            <Typography variant="h2" className="text-2xl font-bold mb-4">Información de Contacto</Typography>
            <Typography className="text-lg mb-4">
              Para cualquier consulta o asistencia, no dude en contactarnos. Estamos aquí para ayudarlo.
            </Typography>
            <Typography className="text-lg mb-2">Teléfono: +54 11 1234 5678</Typography>
            <Typography className="text-lg mb-2">Correo Electrónico: info@bahia-shop.com</Typography>
            <Typography className="text-lg">Dirección: Av. Principal 1234, Bahía Blanca, Argentina</Typography>
          </div>
        </div>
      ) : (
        <div className="text-green-500 text-center">
          <Typography variant="h2" className="text-2xl font-bold mb-4">Gracias por contactarse con nosotros</Typography>
          <Typography>Estaremos respondiendo a la brevedad.</Typography>
        </div>
      )}
    </div>
  );
}

export default ContactUsPage;
