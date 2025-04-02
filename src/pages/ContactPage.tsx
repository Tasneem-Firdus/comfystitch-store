
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin,
  MessageSquare,
  Clock 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  useEffect(() => {
    // Animation for the contact sections
    gsap.from('.contact-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    });
    
    gsap.from('.contact-form', {
      opacity: 0,
      x: -30,
      duration: 0.8,
      delay: 0.3,
      ease: 'power2.out'
    });
    
    gsap.from('.contact-info', {
      opacity: 0,
      x: 30,
      duration: 0.8,
      delay: 0.3,
      ease: 'power2.out'
    });
    
    gsap.from('.contact-map', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.6,
      ease: 'power2.out'
    });
  }, []);
  
  return (
    <div className="py-12">
      <div className="page-container">
        {/* Header */}
        <div className="contact-header text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground">
            We'd love to hear from you! Whether you have a question about our products, 
            shipping, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="contact-form bg-card rounded-lg p-8 border border-border shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="contact-info space-y-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-medium">Email Us</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:hello@comfystitch.com" className="hover:text-primary">
                    hello@comfystitch.com
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  We'll respond as soon as possible
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-medium">Call Us</h3>
                <p className="text-muted-foreground">
                  <a href="tel:+1234567890" className="hover:text-primary">
                    +1 (234) 567-890
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Mon-Fri from 9am to 6pm EST
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-medium">Visit Us</h3>
                <p className="text-muted-foreground">
                  123 Fashion Street<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-medium">Business Hours</h3>
                <div className="text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="font-medium">Customer Support</h3>
                <p className="text-muted-foreground">
                  For faster support, check our{' '}
                  <a href="#" className="text-primary hover:underline">
                    Help Center
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="contact-map rounded-lg overflow-hidden h-96 border border-border shadow-sm">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25987368715491!3d40.697149422137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1679252364405!5m2!1sen!2sca" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            title="ComfyStitch Store Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
