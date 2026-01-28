import { useState } from "react";
import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";
import { Mail, Phone, MapPin, Send, Star, User, MessageSquare } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    reason: "",
    name: "",
    phone: "",
    email: "",
    comment: "",
    rating: 0
  });

  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    alert("Mensaje enviado con éxito. Gracias por contactarnos.");
    // Reset form
    setFormData({
        reason: "",
        name: "",
        phone: "",
        email: "",
        comment: "",
        rating: 0
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50">
      <PublicNavbar />

      <main className="flex-grow flex flex-col lg:flex-row w-full">
        
        {/* Decorative Image Section (Left) */}
        <div className="relative lg:w-5/12 hidden lg:block min-h-[600px]">
            <img 
                src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Contact Support" 
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#003366]/80 mix-blend-multiply"></div>
            <div className="absolute bottom-0 left-0 p-12 text-white">
                <blockquote className="border-l-4 border-[#FF6600] pl-4 mb-4">
                     <p className="text-xl font-medium italic">"Estamos aquí para escucharte."</p>
                </blockquote>
                <h2 className="text-3xl font-bold">Atención al Cliente</h2>
                <p className="text-blue-200 mt-2">Resolvemos tus dudas y valoramos tu opinión.</p>
            </div>
        </div>

        {/* Form Section (Right) */}
        <div className="flex-1 flex flex-col justify-center p-6 md:p-12 overflow-y-auto">
            <div className="max-w-2xl w-full mx-auto animate-fadeIn">
                
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <MessageSquare className="text-[#FF6600]" size={32} /> Contáctanos
                    </h1>
                    <p className="text-gray-600">Completa el formulario y nos pondremos en contacto contigo a la brevedad.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Motivo */}
                        <div className="md:col-span-2">
                            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Motivo de contacto</label>
                            <select 
                                id="reason" 
                                name="reason" 
                                required 
                                value={formData.reason}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-[#003366] outline-none transition bg-white"
                            >
                                <option value="" disabled>Selecciona una opción</option>
                                <option value="comentario">Comentario</option>
                                <option value="reclamo">Reclamo</option>
                                <option value="felicitacion">Felicitación</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>
                        
                        {/* Nombre */}
                         <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre y Apellido</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    required 
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="pl-10 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-[#003366] outline-none transition" 
                                    placeholder="Ej: Juan Pérez" 
                                />
                            </div>
                        </div>

                         {/* Telefono */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                             <div class="relative">
                                <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    required 
                                    pattern="[0-9+ ]{8,15}" 
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="pl-10 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-[#003366] outline-none transition" 
                                    placeholder="+56 9..." 
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="md:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    required 
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-10 w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-[#003366] outline-none transition" 
                                    placeholder="correo@ejemplo.com" 
                                />
                            </div>
                        </div>

                         {/* Comentario */}
                         <div className="md:col-span-2">
                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comentario</label>
                            <textarea 
                                id="comment" 
                                name="comment" 
                                rows={4} 
                                required 
                                value={formData.comment}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-[#003366] outline-none transition" 
                                placeholder="Escribe tu mensaje aquí..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Calificación */}
                    <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-100">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Califica nuestro servicio</label>
                        <div className="flex items-center justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button 
                                    key={star}
                                    type="button" 
                                    onClick={() => setFormData(prev => ({...prev, rating: star}))}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="focus:outline-none transition-colors transform hover:scale-110"
                                >
                                    <Star 
                                        size={32} 
                                        className={`${(hoverRating || formData.rating) >= star ? "fill-[#FF6600] text-[#FF6600]" : "text-gray-300"}`} 
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Botón Enviar */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full bg-[#FF6600] hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition text-base flex items-center justify-center gap-2"
                        >
                            <Send size={20} /> Enviar Mensaje
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default ContactPage;
