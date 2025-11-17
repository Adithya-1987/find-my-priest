import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-serif font-bold text-sm">ॐ</span>
              </div>
              <span className="font-serif font-bold text-lg text-foreground">Find My Priest</span>
            </div>
            <p className="text-sm text-muted-foreground">Connecting you with verified spiritual services.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Browse Priests</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* For Priests */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Priests</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/priest/register" className="text-muted-foreground hover:text-primary transition-colors">Register</Link></li>
              <li><Link href="/priest/login" className="text-muted-foreground hover:text-primary transition-colors">Login</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} className="text-primary" />
                support@findmypriest.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone size={16} className="text-primary" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} className="text-primary" />
                New Delhi, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 Find My Priest. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
