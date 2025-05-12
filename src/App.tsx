"use client"

import { useEffect, useRef, useState } from "react"
import {
  Gamepad2,
  Code,
  Monitor,
  Share2,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Globe,
  Cpu,
  Layers,
  Users,
  BarChart3,
  Zap,
  Star,
  Clock,
  Shield,
} from "lucide-react"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [scrolled, setScrolled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sliderInterval = useRef<NodeJS.Timeout | null>(null)
  const [isIntersecting, setIsIntersecting] = useState<{ [key: string]: boolean }>({})

  // Hero Slider data
  const heroSlides = [
    {
      title: "Unity Game Development",
      description:
        "We create immersive and engaging games using Unity, from concept to deployment across multiple platforms including mobile, PC, and VR/AR.",
      image: "/1.png",
      icon: <Gamepad2 className="h-16 w-16 text-purple-500" />,
      color: "from-purple-900 to-indigo-800",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      textColor: "text-purple-400",
    },
    {
      title: "Website & Software Development",
      description:
        "Our team builds responsive websites and custom software solutions tailored to your specific business needs, from web applications to enterprise systems.",
      image: "2.png",
      icon: <Code className="h-16 w-16 text-teal-500" />,
      color: "from-teal-900 to-emerald-800",
      buttonColor: "bg-teal-600 hover:bg-teal-700",
      textColor: "text-teal-400",
    },
    {
      title: "Social Media Marketing",
      description:
        "Strategic social media campaigns and digital marketing solutions to boost your brand presence, engage with your audience, and drive conversions.",
      image: "3.png",
      icon: <Share2 className="h-16 w-16 text-green-500" />,
      color: "from-green-900 to-emerald-800",
      buttonColor: "bg-green-600 hover:bg-green-700",
      textColor: "text-green-400",
    },
  ]

  // Initialize intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsIntersecting((prev) => ({
          ...prev,
          [entry.target.id]: entry.isIntersecting,
        }))
      })
    }, observerOptions)

    document.querySelectorAll("[data-animate]").forEach((element) => {
      if (element.id) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Canvas animation for hero section
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }[] = []

    // Adjust particle color based on current slide
    const getParticleColor = () => {
      switch (currentSlide) {
        case 0:
          return `rgba(124, 58, 237, ${Math.random() * 0.5 + 0.1})` // Purple for Game Dev
        case 1:
          return `rgba(20, 184, 166, ${Math.random() * 0.5 + 0.1})` // Teal for Web Dev
        case 2:
          return `rgba(16, 185, 129, ${Math.random() * 0.5 + 0.1})` // Green for Marketing
        default:
          return `rgba(124, 58, 237, ${Math.random() * 0.5 + 0.1})`
      }
    }

    const createParticles = () => {
      particles.length = 0
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: getParticleColor(),
        })
      }
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        p.x += p.speedX
        p.y += p.speedY

        if (p.x > canvas.width) p.x = 0
        if (p.x < 0) p.x = canvas.width
        if (p.y > canvas.height) p.y = 0
        if (p.y < 0) p.y = canvas.height
      }

      requestAnimationFrame(animateParticles)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles()
    }

    createParticles()
    animateParticles()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [currentSlide])

  // Slider auto-rotation
  useEffect(() => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current)
    }

    sliderInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
    }, 6000)

    return () => {
      if (sliderInterval.current) {
        clearInterval(sliderInterval.current)
      }
    }
  }, [currentSlide, heroSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
  }

  // Services data
  const services = [
    {
      icon: <Gamepad2 className="h-8 w-8 text-white" />,
      title: "Unity Game Development",
      description:
        "We create immersive and engaging games using Unity, from concept to deployment across multiple platforms.",
      color: "from-violet-600 to-purple-600",
      features: ["3D & 2D Game Development", "Cross-platform Deployment", "VR/AR Experiences", "Game Optimization"],
    },
    {
      icon: <Monitor className="h-8 w-8 text-white" />,
      title: "Website Services",
      description:
        "Custom website development with modern technologies, responsive design, and seamless user experiences.",
      color: "from-blue-600 to-cyan-600",
      features: ["Responsive Web Design", "E-commerce Solutions", "CMS Integration", "Performance Optimization"],
    },
    {
      icon: <Code className="h-8 w-8 text-white" />,
      title: "Software Development",
      description:
        "Tailored software solutions to meet your business needs, from desktop applications to enterprise systems.",
      color: "from-emerald-600 to-green-600",
      features: ["Custom Software Solutions", "API Development", "Database Design", "Legacy System Migration"],
    },
    {
      icon: <Share2 className="h-8 w-8 text-white" />,
      title: "Social Media Marketing",
      description: "Strategic social media campaigns to boost your brand presence, engagement, and conversion rates.",
      color: "from-orange-600 to-red-600",
      features: ["Social Media Strategy", "Content Creation", "Campaign Management", "Analytics & Reporting"],
    },
  ]

  // Process steps
  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "We start by understanding your business goals, target audience, and project requirements.",
      icon: <Globe className="h-8 w-8 text-blue-500" />,
    },
    {
      number: "02",
      title: "Planning",
      description: "Our team creates a detailed roadmap with timelines, milestones, and resource allocation.",
      icon: <Layers className="h-8 w-8 text-indigo-500" />,
    },
    {
      number: "03",
      title: "Development",
      description: "We build your solution using agile methodologies with regular updates and iterations.",
      icon: <Code className="h-8 w-8 text-purple-500" />,
    },
    {
      number: "04",
      title: "Testing",
      description: "Rigorous quality assurance ensures your product meets the highest standards.",
      icon: <Shield className="h-8 w-8 text-green-500" />,
    },
    {
      number: "05",
      title: "Deployment",
      description: "We launch your product and provide training and documentation for smooth operation.",
      icon: <Zap className="h-8 w-8 text-orange-500" />,
    },
    {
      number: "06",
      title: "Support",
      description: "Our relationship continues with ongoing maintenance and support services.",
      icon: <Users className="h-8 w-8 text-red-500" />,
    },
  ]

  // Projects data
  const categories = ["All"]
  const projects = [
    
    {
      title: "E-Commerce Platform",
      category: "Websites",
      image: "5.png",
      description: "A fully responsive e-commerce website with integrated payment systems and inventory management.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      title: "Store Management System",
      category: "Software",
      image: "4.jpg",
      description: "Custom Web based software solution for tracking inventory, sales, and generating reports.",
      technologies: ["React", "SQL Server", "Typescript", "Node.js"],
    },
    
    {
      title: "3D Shooting Game",
      category: "Games",
      image: "https://placehold.co/600x400/333/white?text=Space+Explorer",
      video:"1.mp4",
      description: "A 3D shooting game with realistic environment and weapons with custom characters and having mission with custom realistic enemies.",
      technologies: ["Unity", "C#", "Shader Programming", "Procedural Generation"],
    },
    
  ]

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  // Stats data
  const stats = [
    { value: "50+", label: "Projects Completed", icon: <Star className="h-6 w-6 text-yellow-500" /> },
    { value: "20+", label: "Happy Clients", icon: <Users className="h-6 w-6 text-blue-500" /> },
    { value: "5+", label: "Years Experience", icon: <Clock className="h-6 w-6 text-green-500" /> },
    { value: "10+", label: "Team Members", icon: <Users className="h-6 w-6 text-purple-500" /> },
  ]

  // Features data
  const features = [
    {
      title: "Expert Development Team",
      description: "Our team consists of senior developers with specialized expertise across multiple technologies.",
      icon: <Cpu className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Agile Methodology",
      description: "We follow agile practices to ensure flexibility, transparency, and continuous delivery.",
      icon: <Zap className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Quality Assurance",
      description: "Rigorous testing protocols ensure your product meets the highest quality standards.",
      icon: <Shield className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Ongoing Support",
      description: "We provide continuous support and maintenance to keep your product running smoothly.",
      icon: <Users className="h-6 w-6 text-orange-500" />,
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      quote:
        "Working with Crucial Software transformed our business. Their game development expertise helped us create an immersive experience that our users love.",
      author: "Sarah ",
      position: "CEO, Corporate.",
      image: "https://placehold.co/100x100/333/white?text=SJ",
    },
    {
      quote:
        "The website they built for us not only looks stunning but has significantly improved our conversion rates and user engagement metrics.",
      author: "Waqas Hassan",
      position: "Marketing Director, TechSolutions",
      image: "https://placehold.co/100x100/333/white?text=MC",
    },
    {
      quote:
        "Their software development team delivered a complex inventory management system that streamlined our operations and reduced costs by 30%.",
      author: "Jessica Williams",
      position: "Operations Manager, Retail Group",
      image: "https://placehold.co/100x100/333/white?text=JW",
    },
  ]

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-purple-600" />,
      title: "Email Us",
      details: "uasad4372@gmail.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: <Phone className="h-6 w-6 text-purple-600" />,
      title: "Call Us",
      details: "+92 3092315924",
      description: "Mon-Sunday from 12am to 12pm",
    },
    {
      icon: <MapPin className="h-6 w-6 text-purple-600" />,
      title: "Visit Us",
      details: "Gulshan",
      description: "Karachi,Pakistan",
    },
  ]

  // Technology tabs
  const techTabs = [
    {
      name: "Game Development",
      technologies: ["Unity", "Unreal Engine", "C#", "C++", "3D Modeling", "Animation", "VR/AR"],
      icon: <Gamepad2 className="h-6 w-6" />,
    },
    {
      name: "Web Development",
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "GraphQL", "MongoDB"],
      icon: <Globe className="h-6 w-6" />,
    },
    {
      name: "Software Development",
      technologies: [".NET", "Java", "Python", "SQL"],
      icon: <Cpu className="h-6 w-6" />,
    },
    {
      name: "Digital Marketing",
      technologies: ["Social Media", "SEO", "Content Strategy", "Email Marketing", "Analytics"],
      icon: <BarChart3 className="h-6 w-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-gray-900/80 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center space-x-2">
              <Gamepad2 className="h-8 w-8 text-purple-500" />
              <span className="font-bold text-xl">Crucial Software</span>
            </a>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-300 hover:text-purple-500 transition-colors">
                Services
              </a>
              <a href="#projects" className="text-gray-300 hover:text-purple-500 transition-colors">
                Projects
              </a>
              <a href="#about" className="text-gray-300 hover:text-purple-500 transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-300 hover:text-purple-500 transition-colors">
                Contact
              </a>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors">
                Get Started
              </button>
            </nav>

            <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button className="text-white p-2" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          <a
            href="#services"
            className="text-2xl font-medium hover:text-purple-500 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </a>
          <a
            href="#projects"
            className="text-2xl font-medium hover:text-purple-500 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </a>
          <a
            href="#about"
            className="text-2xl font-medium hover:text-purple-500 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#contact"
            className="text-2xl font-medium hover:text-purple-500 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md text-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </button>
        </nav>
      </div>

      <main>
        {/* Hero Section with Slider */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />
          <div
            className={`absolute inset-0 bg-gradient-to-b ${heroSlides[currentSlide].color} opacity-70 transition-colors duration-1000 -z-10`}
          />

          <div className="container mx-auto px-4 pt-20 relative z-10">
            <div className="slider-container relative">
              {/* Slider content */}
              <div className="overflow-hidden">
                <div
                  className="transition-transform duration-1000 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)`, display: "flex" }}
                >
                  {heroSlides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div
                          className="text-center md:text-left"
                          data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                        >
                          <div
                            className={`inline-flex items-center justify-center p-3 rounded-full bg-white/10 mb-6 ${
                              slide.textColor
                            }`}
                          >
                            {slide.icon}
                          </div>
                          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                            Bringing Your Digital Vision To Life
                          </h1>
                          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${slide.textColor}`}>{slide.title}</h2>
                          <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">{slide.description}</p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a href="#projects">
  <button className={`${slide.buttonColor} text-white px-6 py-3 rounded-md font-medium transition-colors`}>
    Explore Our Work
  </button>
</a>
                           <a href="#contact">
                            <button className="border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors">
                              Contact Us
                            </button>
                            </a>
                          </div>
                        </div>

                        <div
                          className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-1000"
                          data-aos="fade-up"
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent z-10" />
                          <img
                            src={slide.image || "https://placehold.co/600x400/333/white"}
                            alt={slide.title}
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider controls */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Slider indicators */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index ? "w-10 bg-white" : `bg-white/50 hover:bg-white/80`
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Redesigned */}
        <section id="services" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/333/white')] bg-cover bg-center opacity-10"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16" id="services-header" data-animate>
              <div
                className={`transform transition-all duration-1000 ${isIntersecting["services-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <span className="inline-block px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm font-medium mb-4">
                  OUR EXPERTISE
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
                  Comprehensive Digital Solutions
                </h2>
                <p className="text-gray-300 max-w-3xl mx-auto text-lg">
                  We deliver end-to-end digital services tailored to your unique business needs, from game development
                  to enterprise software solutions.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  id={`service-card-${index}`}
                  data-animate
                  className={`relative group overflow-hidden rounded-xl transition-all duration-700 ${
                    isIntersecting[`service-card-${index}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90 transition-opacity duration-500 group-hover:opacity-100`}
                  ></div>

                  <div className="relative p-8 h-full flex flex-col">
                    <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm w-fit mb-6">{service.icon}</div>

                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-white/80 mb-6">{service.description}</p>

                    <div className="mt-auto">
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-white/70">
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section - New */}
        <section className="py-24 bg-gray-950 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

          <div className="container mx-auto px-4">
            <div className="text-center mb-16" id="process-header" data-animate>
              <div
                className={`transform transition-all duration-1000 ${isIntersecting["process-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <span className="inline-block px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm font-medium mb-4">
                  OUR PROCESS
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-400">
                  How We Bring Your Vision to Life
                </h2>
                <p className="text-gray-300 max-w-3xl mx-auto text-lg">
                  Our proven development methodology ensures transparent communication, consistent quality, and on-time
                  delivery for every project.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hidden lg:block"></div>

              {processSteps.map((step, index) => (
                <div
                  key={index}
                  id={`process-step-${index}`}
                  data-animate
                  className={`relative transition-all duration-700 ${
                    isIntersecting[`process-step-${index}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative z-10 bg-gray-900 rounded-xl border border-gray-800 p-8 h-full hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10">
                    <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold">
                      {step.number}
                    </div>

                    <div className="pt-6">
                      <div className="mb-4 text-gray-400">{step.icon}</div>
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack - New */}
        <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/333/white')] bg-cover bg-fixed opacity-5"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16" id="tech-header" data-animate>
              <div
                className={`transform transition-all duration-1000 ${isIntersecting["tech-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <span className="inline-block px-3 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-sm font-medium mb-4">
                  TECHNOLOGY STACK
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400">
                  Cutting-Edge Technologies
                </h2>
                <p className="text-gray-300 max-w-3xl mx-auto text-lg">
                  We leverage the latest technologies and frameworks to build scalable, high-performance digital
                  solutions.
                </p>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
              <div className="flex flex-wrap border-b border-gray-700/50">
                {techTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === index
                        ? "bg-gray-700/50 text-white border-b-2 border-purple-500"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/30"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {tab.icon}
                      <span>{tab.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-3">
                  {techTabs[activeTab].technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-700/50 rounded-full text-sm font-medium border border-gray-600 hover:border-purple-500 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section - Redesigned */}
        <section id="projects" className="py-24 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/333/white')] bg-cover bg-center opacity-5"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16" id="projects-header" data-animate>
              <div
                className={`transform transition-all duration-1000 ${isIntersecting["projects-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <span className="inline-block px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-sm font-medium mb-4">
                  OUR PORTFOLIO
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-500 to-blue-400">
                  Featured Projects
                </h2>
                <p className="text-gray-300 max-w-3xl mx-auto text-lg">
                  Explore our diverse portfolio of successful projects that showcase our expertise and commitment to
                  excellence.
                </p>
              </div>
            </div>

            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-gray-800/50 backdrop-blur-sm rounded-full p-1.5 border border-gray-700/50">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                      activeCategory === category
                        ? "bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  id={`project-card-${index}`}
                  data-animate
                  className={`group relative overflow-hidden rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 transition-all duration-700 hover:shadow-xl hover:shadow-teal-900/20 hover:border-gray-600 ${
                    isIntersecting[`project-card-${index}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-64 overflow-hidden group">
  {project.video ? (
  <video
  controls
  playsInline
  muted
  loop
  autoPlay
  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
>
  <source src={project.video} type="video/mp4" />
  Your browser does not support the video tag.
</video>

) : (
  <img
    src={project.image || "https://placehold.co/600x400/333/white"}
    alt={project.title}
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />
)}

                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-90"></div>

                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-teal-600/90 backdrop-blur-sm rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-6 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-700/50 rounded text-xs font-medium text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    
                  </div>
                </div>
              ))}
            </div>

            
          
          </div>
        </section>

        {/* Testimonials Section - New */}
        <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/333/white')] bg-cover bg-fixed opacity-5"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-30"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16" id="testimonials-header" data-animate>
              <div
                className={`transform transition-all duration-1000 ${isIntersecting["testimonials-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <span className="inline-block px-3 py-1 bg-orange-900/50 text-orange-300 rounded-full text-sm font-medium mb-4">
                  TESTIMONIALS
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-pink-400">
                  What Our Clients Say
                </h2>
                <p className="text-gray-300 max-w-3xl mx-auto text-lg">
                  Don't just take our word for it. Hear from our satisfied clients about their experience working with
                  us.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  id={`testimonial-${index}`}
                  data-animate
                  className={`bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 transition-all duration-700 hover:shadow-xl hover:shadow-orange-900/10 hover:border-gray-600 ${
                    isIntersecting[`testimonial-${index}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="inline-block h-5 w-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>

                    <blockquote className="text-gray-300 italic mb-6 flex-grow">"{testimonial.quote}"</blockquote>

                    <div className="flex items-center mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        
                      </div>
                      <div>
                        <div className="font-bold">{testimonial.author}</div>
                        <div className="text-sm text-gray-400">{testimonial.position}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - Redesigned */}
        <section id="about" className="py-24 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/333/white')] bg-cover bg-center opacity-5"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div id="about-content" data-animate>
                <div
                  className={`transform transition-all duration-1000 ${isIntersecting["about-content"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  <span className="inline-block px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm font-medium mb-4">
                    ABOUT US
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-400">
                    Passionate Experts in Digital Innovation
                  </h2>
                  <p className="text-gray-300 mb-6 text-lg">
                    We are a passionate team of developers, designers, and marketers dedicated to creating exceptional
                    digital experiences. With expertise in Unity game development, website services, software solutions,
                    and social media marketing, we help businesses transform their digital presence.
                  </p>
                  <p className="text-gray-300 mb-8 text-lg">
                    Our mission is to deliver innovative and high-quality digital products that exceed our clients'
                    expectations and help them achieve their business goals.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 mb-10">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
                      >
                        <div className="mb-4 text-purple-500">{feature.icon}</div>
                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    ))}
                  </div>

                  
                </div>
              </div>

              <div id="about-stats" data-animate>
                <div
                  className={`relative transform transition-all duration-1000 ${isIntersecting["about-stats"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  

                  <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-6">
                    <div className="bg-gray-800/80 backdrop-blur-md shadow-xl rounded-xl border border-gray-700/50 p-6 grid grid-cols-2 gap-6">
                      {stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-gray-700/50">{stat.icon}</div>
                          <div>
                            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - New */}
        <section className="py-24 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/333/white')] bg-cover bg-fixed mix-blend-overlay opacity-10"></div>
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-900 to-transparent"></div>
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-gray-900 to-transparent"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center" id="cta-content" data-animate>
              <div
                className={`transform transition-all duration-1000 ${isIntersecting["cta-content"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Ready to Transform Your Digital Presence?
                </h2>
                <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                  Let's collaborate to bring your vision to life with our expertise in game development, web services,
                  software solutions, and digital marketing.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 rounded-full font-medium transition-colors shadow-lg shadow-purple-900/30">
                    Start Your Project
                  </button>
                  <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-colors">
                    Schedule a Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Redesigned */}
        <section id="contact" className="py-24 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/333/white')] bg-cover bg-center opacity-5"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16" id="contact-header" data-animate>
              <div
                className={`transform transition-all duration-1000 ${isIntersecting["contact-header"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <span className="inline-block px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm font-medium mb-4">
                  GET IN TOUCH
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-400">
                  Contact Us
                </h2>
                <p className="text-gray-300 max-w-3xl mx-auto text-lg">
                  Have a project in mind or want to learn more about our services? We'd love to hear from you!
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  id={`contact-info-${index}`}
                  data-animate
                  className={`bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-900/10 ${
                    isIntersecting[`contact-info-${index}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="p-4 rounded-full bg-blue-500/10 mb-6 inline-flex">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="font-medium mb-2 text-white">{item.details}</p>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto" id="contact-form" data-animate>
              <div
                className={`bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-xl transform transition-all duration-1000 ${
                  isIntersecting["contact-form"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2 bg-gradient-to-br from-blue-900 to-indigo-900 p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://placehold.co/600x400/333/white')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-6">Let's discuss your project</h3>
                      <p className="text-white/80 mb-8">
                        Fill out the form and our team will get back to you within 24 hours.
                      </p>

                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <Mail className="h-6 w-6 text-blue-300 mt-1" />
                          <div>
                            <h4 className="font-medium text-white">Email Us</h4>
                            <p className="text-sm text-white/70">uasad4372@gmail.com</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <Phone className="h-6 w-6 text-blue-300 mt-1" />
                          <div>
                            <h4 className="font-medium text-white">Call Us</h4>
                            <p className="text-sm text-white/70">+92 3092315924</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <MapPin className="h-6 w-6 text-blue-300 mt-1" />
                          <div>
                            <h4 className="font-medium text-white">Visit Us</h4>
                            <p className="text-sm text-white/70">
                              Gulshan
                              <br />
                              Karachi,Pakistan
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-3 p-8">
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-gray-300">
                            Your Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            required
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-gray-300">
                            Your Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                          Subject
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          placeholder="How can we help you?"
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-300">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your project..."
                          rows={5}
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Redesigned */}
      <footer className="bg-gray-950 pt-20 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/333/white')] bg-cover bg-fixed opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            <div>
              <a href="#" className="flex items-center space-x-2 mb-6">
                <Gamepad2 className="h-8 w-8 text-purple-500" />
                <span className="font-bold text-xl">Crucial Software</span>
              </a>
              <p className="text-gray-400 mb-6">
                Creating innovative digital experiences through game development, web services, software solutions, and
                social media marketing.
              </p>
              
              
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Services</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                    Unity Game Development
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                    Website Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                    Software Development
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                    Social Media Marketing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Company</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-purple-500 transition-colors flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Newsletter</h3>
              <p className="text-gray-400 mb-6">Subscribe to our newsletter to receive updates and news.</p>
              <div className="flex gap-2">
                <input
                  placeholder="Your email"
                  type="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Crucial Software. All rights reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-gray-500 hover:text-purple-500 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-gray-500 hover:text-purple-500 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-gray-500 hover:text-purple-500 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
