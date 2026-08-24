import React from 'react';
import { CheckCircle, ShieldCheck, Clock, Wallet, Star, MapPin, Phone, MessageCircle, ArrowRight, Check } from 'lucide-react';

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center">
    <div className="font-bold text-xl text-blue-900">JHB Curtain Cleaning</div>
    <div className="hidden md:flex gap-6 text-slate-600 font-medium">
      <a href="#services" className="hover:text-blue-700">Services</a>
      <a href="#process" className="hover:text-blue-700">How it Works</a>
      <a href="#areas" className="hover:text-blue-700">Service Areas</a>
    </div>
    <a href="#contact" className="bg-blue-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-800 transition">Book Assessment</a>
  </nav>
);

const Hero = () => (
  <section className="relative bg-slate-50 py-16 px-4 text-center overflow-hidden">
    <div className="max-w-4xl mx-auto relative z-10">
      <span className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-bold mb-6 inline-block">10% OFF YOUR FIRST CLEAN</span>
      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
        Professional Curtain Cleaning <span className="text-blue-700">Without Removing Your Curtains</span>
      </h1>
      <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
        On-site dry cleaning by certified technicians. No shrinkage. No removal. No disruption. Serving Johannesburg, Pretoria & Midrand.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        <a href="#contact" className="bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-800 transition flex items-center justify-center gap-2">
          Book Free Assessment <ArrowRight size={20} />
        </a>
        <a href="https://wa.me/27750119200" className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2">
          <MessageCircle size={20} /> WhatsApp Us
        </a>
      </div>
      <div className="flex flex-wrap justify-center gap-8 text-slate-500 font-medium text-sm">
        <div className="flex items-center gap-2"><Star className="text-yellow-500 fill-yellow-500" size={16} /> 4.9★ Google Rating</div>
        <div className="flex items-center gap-2"><CheckCircle className="text-blue-600" size={16} /> 5,000+ Clients</div>
        <div className="flex items-center gap-2"><ShieldCheck className="text-blue-600" size={16} /> No-Shrinkage Guarantee</div>
        <div className="flex items-center gap-2"><Clock className="text-blue-600" size={16} /> 15+ Years Experience</div>
      </div>
    </div>
  </section>
);

const Services = () => {
  const services = [
    { title: "Curtain & Blind Cleaning", desc: "On-site dry cleaning for every curtain and blind type. We clean where they hang.", points: ["All fabric types", "Hardware inspection", "100% No-shrinkage guarantee"] },
    { title: "Mattress Cleaning", desc: "Hot-water extraction that eliminates 99.9% of dust mites and bacteria.", points: ["99.9% allergen removal", "Hot-water extraction", "5-step sanitisation"] },
    { title: "Upholstery & Carpets", desc: "Deep-cleaning for sofas and carpets using fabric-specific chemicals.", points: ["Dry & wet options", "Master Guarding available", "Professional deep-clean"] },
    { title: "Master Guarding", desc: "A 12-month certified stain protection barrier against water and oil.", points: ["12-month protection", "Hydrophobic shield", "Professional application"] },
    { title: "Fire Retardant Treatment", desc: "SANS-compliant treatment for hotels, theaters, and corporate environments.", points: ["SANS compliant", "Compliance certificates", "Insurance benefits"] },
    { title: "Specialist Rug Care", desc: "Expert care for hand-woven rugs with dye stability testing.", points: ["Dye stability testing", "On-site or collection", "6-step specialist process"] },
  ];
  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Professional Services</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">Professional on-site fabric care — from curtains to carpets, we clean where you are.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((s, i) => (
          <div key={i} className="p-8 border border-slate-200 rounded-2xl hover:shadow-xl transition hover:border-blue-300 group">
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700">{s.title}</h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">{s.desc}</p>
            <ul className="space-y-2">
              {s.points.map((p, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                  <Check size={14} className="text-blue-600" /> {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { step: "01", title: "Free Assessment", desc: "A certified technician visits to inspect fabric and provide a no-obligation quote." },
    { step: "02", title: "Pre-Treatment", desc: "We identify spot-treat stains and test for colourfastness with specific agents." },
    { step: "03", title: "Deep Clean", desc: "On-site dry-cleaning extraction removes dust and allergens without water." },
    { step: "04", title: "Protect & Finish", desc: "Optional Master Guarding protection creates a 12-month stain barrier." },
  ];
  return (
    <section id="process" className="py-20 px-4 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How On-Site Cleaning Works</h2>
        <p className="text-slate-400">Four simple steps to perfectly clean curtains — without taking them down.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((s, i) => (
          <div key={i} className="relative p-6 text-center border border-slate-700 rounded-xl bg-slate-800">
            <div className="text-4xl font-black text-blue-500 mb-4 opacity-50">{s.step}</div>
            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Comparison = () => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Dry Cleaning vs Conventional Wet Cleaning</h2>
        <p className="text-slate-600">See why thousands choose our on-site specialized method.</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-900 font-bold border-b">
            <tr>
              <th className="p-4">Feature</th>
              <th className="p-4 text-blue-700">On-Site Dry Cleaning</th>
              <th className="p-4 text-slate-500">Conventional Wet Cleaning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              ["Removed from tracks?", "No — cleaned in place", "Yes — must be taken down"],
              ["Risk of shrinkage", "Zero — solvent-based", "High — water causes shrinkage"],
              ["Drying time", "None — instant", "24–72 hours minimum"],
              ["Disruption", "Minimal — 2-4 hours", "Days — curtains removed"],
              ["Hardware check", "Yes — full check", "No — separate service"],
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition">
                <td className="p-4 font-medium text-slate-700">{row[0]}</td>
                <td className="p-4 text-blue-700 font-semibold">{row[1]}</td>
                <td className="p-4 text-slate-500">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const Sectors = () => {
  const sectors = [
    { title: "Hotels & Hospitality", desc: "After-hours service, fire compliance, and volume curtain care." },
    { title: "Corporate Offices", desc: "Quarterly maintenance, air quality reports, minimal disruption." },
    { title: "Healthcare", desc: "Clinical-grade sanitisation and infection-control protocols." },
    { title: "Schools & Education", desc: "Holiday scheduling, allergen audits, child-safe products." },
    { title: "Theatres & Venues", desc: "Fire certificate compliance, acoustic restoration, stage care." },
    { title: "Residential", desc: "No-shrinkage guarantee, hardware repair, expert home care." },
  ];
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Sectors We Serve</h2>
        <p className="text-slate-600">Tailored protocols and certified results for every industry.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {sectors.map((s, i) => (
          <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
            <p className="text-slate-600 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const AreaSection = () => {
  const areas = [
    { name: "Northern Suburbs", city: "Johannesburg", suburbs: "Sandton, Randburg, Fourways, Bryanston, Hyde Park, Morningside, Lone Hill, Sunninghill, Midstream", focus: "Removal of fine Highveld dust." },
    { name: "O.R. Tambo Corridor", city: "Johannesburg", suburbs: "Edenvale, Bedfordview, Boksburg, Germiston, Kempton Park, Modderfontein, Isando", focus: "After-hours hotel cleaning and industrial dust." },
    { name: "Southern Suburbs", city: "Johannesburg", suburbs: "Alberton, Meyersdal, Glenvista, Mulbarton, Bassonia, Kibler Park, Brackendowns", focus: "Deep-cleaning dense velvet and chenille fabrics." },
    { name: "West Rand", city: "Johannesburg", suburbs: "Roodepoort, Florida, Northcliff, Weltevreden Park, Constantia Kloof, Honeydew, Strubensvallei", focus: "Extraction of residual mineral mining dust." },
    { name: "Central JHB", city: "Johannesburg", suburbs: "Rosebank, Parktown, Melville, Greenside, Parkhurst, Auckland Park, Braamfontein, Houghton", focus: "Antique fabric care and restoration." },
    { name: "Pretoria & Midrand", city: "Pretoria", suburbs: "Midrand, Centurion, Pretoria East, Menlyn, Waterkloof, Hatfield, Lynnwood, Irene", focus: "Pollen stain removal and diplomatic residence care." },
  ];
  return (
    <section id="areas" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Areas We Serve</h2>
        <p className="text-slate-600">On-site curtain cleaning across Johannesburg, Pretoria & Midrand.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {areas.map((a, i) => (
          <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
              <MapPin size={16} /> {a.name}
            </div>
            <p className="text-slate-900 font-semibold mb-2 text-sm">{a.city}</p>
            <p className="text-slate-600 text-xs mb-4 italic">{a.focus}</p>
            <div className="text-slate-500 text-xs leading-relaxed">
              <span className="font-bold block mb-1">Suburbs:</span> {a.suburbs}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Authority = () => (
  <section className="py-20 px-4 bg-blue-900 text-white">
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <div className="w-48 h-48 rounded-full bg-slate-300 overflow-hidden flex-shrink-0 border-4 border-white/20">
        <div className="w-full h-full bg-slate-400 flex items-center justify-center text-slate-600 font-bold italic">Photo</div>
      </div>
      <div >
        <h3 className="text-2xl font-bold mb-1">Stephen Dunlop</h3>
        <p className="text-blue-300 mb-4 font-medium">Managing Director & Fabric Expert</p>
        <p className="text-blue-100 leading-relaxed mb-6">
          "I built this company because I was tired of seeing beautiful curtains destroyed by conventional cleaning. 
          With over 15 years of expertise, I personally oversee every project to ensure zero shrinkage and 100% satisfaction."
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm font-bold">
          <div className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-400" /> Zero Shrinkage</div>
          <div className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-400" /> Tested Before Clean</div>
          <div className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-400" /> 100% Satisfaction</div>
          <div className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-400" /> Free Assessment</div>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-20 px-4 bg-slate-50">
    <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Get Your Free Assessment</h2>
        <p className="text-slate-600">Book a no-obligation assessment with a certified technician.</p>
      </div>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div >
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
          </div>
          <div >
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
            <input type="tel" placeholder="+27 ..." className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
          </div>
        </div>
        <div >
          <label className="block text-sm font-semibold text-slate-700 mb-2">Property Sector</label>
          <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none">
            <option>Residential</option>
            <option>Hotels & Hospitality</option>
            <option>Corporate Offices</option>
            <option>Healthcare</option>
            <option>Schools & Education</option>
            <option>Theatres & Venues</option>
          </select>
        </div>
        <div >
          <label className="block text-sm font-semibold text-slate-700 mb-2">Message (Optional)</label>
          <textarea rows={4} placeholder="Tell us about your curtains..." className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none"></textarea>
        </div>
        <button className="w-full bg-blue-700 text-white py-4 rounded-lg text-lg font-bold hover:bg-blue-800 transition shadow-lg">
          Request Free Assessment
        </button>
      </form>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 px-4 text-center border-t border-slate-800">
    <div className="max-w-6xl mx-auto">
      <div className="font-bold text-2xl text-white mb-4">JHB Curtain Cleaning</div>
      <p className="mb-8 text-sm">© 2024 Professional On-Site Fabric Care Johannesburg. All Rights Reserved.</p>
      <div className="flex justify-center gap-6 text-sm font-medium">
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Terms of Service</a>
        <a href="#" className="hover:text-white">Contact Us</a>
      </div>
    </div>
  </footer>
);

export default function Page() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Comparison />
      <Sectors />
      <AreaSection />
      <Authority />
      <Contact />
      <Footer />
    </div>
  );
}
