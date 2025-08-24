import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, TrendingUp, Shield, Star, CheckCircle } from "lucide-react"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-slate-900">VentureNest</h1>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">
                                How It Works
                            </a>
                            <a href="#for-founders" className="text-slate-600 hover:text-slate-900 transition-colors">
                                For Founders
                            </a>
                            <a href="#for-investors" className="text-slate-600 hover:text-slate-900 transition-colors">
                                For Investors
                            </a>
                            <Button variant="outline" size="sm">
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                        opacity: 0.3,
                    }}
                ></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                            Connecting Founders with Investors <span className="text-purple-600">🚀</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                            VentureNest helps founders secure funding and connects investors with the next billion-dollar startups.
                            Join thousands of successful partnerships built on our platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
                                Join as Founder
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="secondary"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg"
                            >
                                Join as Investor
                                <TrendingUp className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-purple-600 mb-2">$2.5B+</div>
                            <div className="text-slate-600">Total Funding Raised</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
                            <div className="text-slate-600">Active Startups</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-600 mb-2">5K+</div>
                            <div className="text-slate-600">Verified Investors</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Three simple steps to connect founders with the right investors
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center p-8 hover:shadow-lg transition-shadow bg-white border-slate-200">
                            <CardContent className="pt-6">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Users className="h-8 w-8 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-slate-900">Create Your Profile</h3>
                                <p className="text-slate-600">
                                    Founders showcase their startups, investors highlight their investment criteria and portfolio.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="text-center p-8 hover:shadow-lg transition-shadow bg-white border-slate-200">
                            <CardContent className="pt-6">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Shield className="h-8 w-8 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-slate-900">Get Verified</h3>
                                <p className="text-slate-600">
                                    Our verification process ensures quality connections between legitimate founders and investors.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="text-center p-8 hover:shadow-lg transition-shadow bg-white border-slate-200">
                            <CardContent className="pt-6">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <TrendingUp className="h-8 w-8 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-slate-900">Start Connecting</h3>
                                <p className="text-slate-600">
                                    Use our smart matching algorithm to find the perfect investment opportunities or funding partners.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Success Stories</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Real partnerships that transformed startups into industry leaders
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="p-8 bg-white border-slate-200">
                            <CardContent className="pt-6">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-slate-600 mb-6 italic">
                                    "VentureNest connected us with the perfect investor who understood our vision. We raised $5M Series A
                                    and scaled from 10 to 100 employees in 18 months."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-purple-600 font-semibold">SH</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900">Sarah Chen</div>
                                        <div className="text-sm text-slate-600">CEO, TechFlow</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="p-8 bg-white border-slate-200">
                            <CardContent className="pt-6">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-slate-600 mb-6 italic">
                                    "As an investor, VentureNest's quality filter is unmatched. I've made 3 successful investments through
                                    the platform, with 2 already showing 10x returns."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-purple-600 font-semibold">MR</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900">Michael Rodriguez</div>
                                        <div className="text-sm text-slate-600">Partner, Growth Ventures</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Why Choose VentureNest?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="flex items-start space-x-4">
                            <CheckCircle className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-2 text-slate-900">Verified Network</h3>
                                <p className="text-slate-600">All users go through our rigorous verification process</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <CheckCircle className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-2 text-slate-900">Smart Matching</h3>
                                <p className="text-slate-600">AI-powered algorithm finds the best investment fits</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <CheckCircle className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-2 text-slate-900">Secure Platform</h3>
                                <p className="text-slate-600">Bank-level security for all your sensitive information</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <CheckCircle className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-2 text-slate-900">Expert Support</h3>
                                <p className="text-slate-600">Dedicated team to guide you through the process</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <CheckCircle className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-2 text-slate-900">Global Reach</h3>
                                <p className="text-slate-600">Connect with investors and startups worldwide</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <CheckCircle className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-2 text-slate-900">Success Tracking</h3>
                                <p className="text-slate-600">Monitor your portfolio and investment performance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-purple-600 to-indigo-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Transform Your Startup Journey?</h2>
                    <p className="text-xl text-white/90 mb-8">
                        Join thousands of founders and investors who have found success on VentureNest
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg"
                        >
                            Get Started as Founder
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg bg-transparent"
                        >
                            Explore as Investor
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-slate-900">VentureNest</h3>
                            <p className="text-slate-600">Connecting the world's most promising startups with visionary investors.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-slate-900">For Founders</h4>
                            <ul className="space-y-2 text-slate-600">
                                <li>
                                    <a href="#" className="hover:text-slate-900 transition-colors">
                                        Raise Funding
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-slate-900 transition-colors">
                                        Success Stories
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-slate-900 transition-colors">
                                        Resources
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-slate-900">For Investors</h4>
                            <ul className="space-y-2 text-slate-600">
                                <li>
                                    <a href="#" className="hover:text-slate-900 transition-colors">
                                        Find Startups
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-slate-900 transition-colors">
                                        Portfolio
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-slate-900 transition-colors">
                                        Analytics
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-slate-900">Company</h4>
                            <ul className="space-y-2 text-slate-600">
                                <li>
                                    <a href="#" className="hover:text-slate-900 transition-colors">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-slate-900 transition-colors">
                                        Privacy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-slate-900 transition-colors">
                                        Terms
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-slate-900 transition-colors">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-200 mt-8 pt-8 text-center text-slate-600">
                        <p>&copy; 2024 VentureNest. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
