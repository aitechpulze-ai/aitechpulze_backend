export const COMPANY = {
  name: 'AITechPulze',
  tagline: 'AI Powered Software Development',
  description: 'AITechPulze is an AI-powered software development company building enterprise products, custom software, AI solutions, and empowering student innovation across India.',
  phone: '+91 95857 76088',
  tel: 'tel:+919585776088',
  whatsapp: 'https://wa.me/919585776088?text=Hi%20AITechPulze%2C%20I%20need%20a%20project%20quote',
  email: 'info@aitechpulze.com',
  mailto: 'mailto:info@aitechpulze.com?subject=Project%20Request',
  instagram: 'https://www.instagram.com/aitechpulze?igsh=eHVxZTVpdTd0MmFs&utm_source=qr',
  linkedin: 'https://www.linkedin.com/in/niranjan-prakash-338773290/',
  msme: 'UDYAM-TN-28-0216110',
  udyam: 'https://udyamregistration.gov.in',
  location: 'Tamil Nadu, India',
  hours: 'Monday to Saturday, 9:00 AM – 7:00 PM IST',
  founded: '2023',
  url: 'https://www.aitechpulze.com',
  ogImage: 'https://www.aitechpulze.com/og-image.png',
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Academic Hub', href: '/academic-hub' },
  { label: 'Internships', href: '/internships' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];



export const PRODUCTS = [
  {
    name: 'PKROUTEX',
    tagline: 'Enterprise Logistics Platform',
    category: 'Logistics & Fleet Management',
    description: 'Full-scale logistics platform for shipment tracking, fleet management, driver operations, and route optimization. Built for enterprise-grade reliability and real-time visibility.',
    demo: 'https://pkroutex.com/',
    image: '/images/pkroutex.png',
    features: ['Real-time Shipment Tracking', 'Fleet Management', 'Driver Operations', 'Route Optimization', 'Analytics Dashboard', 'Multi-branch Support'],
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Google Maps API'],
    color: 'from-blue-600 to-cyan-500',
  },
  {
    name: 'iPrintZone',
    tagline: 'Online Printing Platform',
    category: 'Printing Services & Order Management',
    description: 'Online printing platform with custom design tools, instant quote calculator, order management, and delivery tracking. Streamlines the entire print-to-delivery workflow.',
    demo: 'https://iprintzone.com/',
    image: '/images/iprintzone.jpg',
    features: ['Custom Design Tools', 'Instant Quote Calculator', 'Order Management', 'Delivery Tracking', 'Bulk Order Support', 'Payment Gateway'],
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Cloudinary'],
    color: 'from-violet-600 to-purple-500',
  },
  {
    name: 'Adhvaya Jewellery',
    tagline: 'E-Commerce Jewellery Platform',
    category: 'E-Commerce & Retail',
    description: 'Premium jewellery e-commerce platform with product showcase, secure checkout, and order management. Designed for luxury retail with a seamless shopping experience.',
    demo: 'https://adhvayajewellery.com/',
    image: '/images/adhvaya.png',
    features: ['Product Showcase', 'Secure Checkout', 'Order Management', 'Wishlist & Cart', 'Admin Dashboard', 'Mobile Optimized'],
    tech: ['React', 'Node.js', 'MongoDB', 'Razorpay', 'AWS S3'],
    color: 'from-amber-500 to-orange-500',
  },
];

export const ACADEMIC_PROJECTS = [
  {
    title: 'ASL Sign Recognition',
    category: 'AI / Computer Vision',
    description: 'Real-time American Sign Language recognition using deep learning and computer vision to bridge communication gaps.',
    demo: 'https://asl-sign-recognization.netlify.app',
    image: '/images/asl.png',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'React'],
  },
  {
    title: 'AI Stress Detection',
    category: 'AI / Healthcare',
    description: 'AI-powered stress detection system analyzing physiological and behavioral signals to provide mental health insights.',
    demo: 'https://aistressdetection.netlify.app',
    image: '/images/aistressdetaction.png',
    tech: ['Python', 'Scikit-learn', 'React', 'Flask'],
  },
  {
    title: 'Leaf Disease Classifier',
    category: 'AI / Agriculture',
    description: 'Deep learning model to classify plant leaf diseases from images, helping farmers detect crop issues early.',
    demo: 'https://leaf-disease-classifier.netlify.app',
    image: '/images/Leaf%20Disease%20Classifier.png',
    tech: ['Python', 'CNN', 'TensorFlow', 'React'],
  },
  {
    title: 'HCMC Health Centre',
    category: 'Healthcare Web App',
    description: 'Comprehensive health centre management system with patient records, appointments, and doctor scheduling.',
    demo: 'https://hcmc-health-centre.netlify.app',
    image: '/images/HCMC%20Health%20Centre.png',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    title: 'Eco System Platform',
    category: 'Environment / Web App',
    description: 'Environmental monitoring and awareness platform tracking ecosystem health metrics and sustainability data.',
    demo: 'https://eco-system-1.onrender.com/',
    image: '/images/ecosystem.jpg',
    tech: ['React', 'Node.js', 'Chart.js', 'MongoDB'],
  },
  {
    title: 'Student Placement Portal',
    category: 'EdTech / Web App',
    description: 'End-to-end student placement portal connecting students with recruiters, managing applications and interviews.',
    demo: 'https://student-placement-portal.netlify.app',
    image: '/images/Student%20Placement%20Portal.png',
    tech: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
  },
];

export const SERVICES = [
  { icon: '🤖', title: 'AI & Machine Learning', desc: 'Custom AI models, NLP, computer vision, predictive analytics, and intelligent automation tailored to your business.' },
  { icon: '🌐', title: 'Enterprise Web Development', desc: 'Scalable, high-performance web applications built with modern stacks — React, Node.js, and cloud-native architecture.' },
  { icon: '📱', title: 'Mobile App Development', desc: 'Cross-platform iOS and Android apps with seamless UX, real-time features, and robust backend integration.' },
  { icon: '⚙️', title: 'Custom Software & SaaS', desc: 'Bespoke software solutions and SaaS platforms designed to automate workflows and scale with your business.' },
  { icon: '🏢', title: 'ERP & CRM Systems', desc: 'End-to-end ERP and CRM implementations that unify operations, sales, and customer management in one platform.' },
  { icon: '🎨', title: 'UI/UX Design', desc: 'Premium design systems, wireframes, prototypes, and pixel-perfect interfaces that convert visitors into customers.' },
  { icon: '☁️', title: 'Cloud & DevOps', desc: 'AWS, GCP, and Azure deployments with CI/CD pipelines, Docker, Kubernetes, and 99.9% uptime SLAs.' },
  { icon: '🔍', title: 'SEO & Digital Growth', desc: 'Technical SEO, performance optimization, Core Web Vitals, and growth strategies to dominate search rankings.' },
  { icon: '🎓', title: 'Academic Projects', desc: 'IEEE-standard final year projects in AI/ML, web, IoT, and data science with full documentation and support.' },
];

export const TEAM = [
  { name: 'Niranjan P', role: 'Founder & CEO', dept: 'Leadership', joined: '2023', skills: ['React', 'Node.js', 'AI/ML', 'Strategy'], github: 'https://github.com/Niranjanprakash', linkedin: 'https://www.linkedin.com/in/niranjan-prakash-338773290', avatar: '/team/niranjan.jpg' },
  { name: 'Vijaykumar', role: 'CTO', dept: 'Technology', joined: '2023', skills: ['System Architecture', 'Cloud', 'DevOps', 'Python'], github: 'https://github.com/vijaykumar', linkedin: 'https://www.linkedin.com/in/vijayakumar-s-460100290/', avatar: '/team/Vijay.png' },
  { name: 'Ranjeet', role: 'AI & ML Engineer', dept: 'AI Research', joined: '2023', skills: ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'], github: 'https://github.com/ranjeet-ml', linkedin: 'https://www.linkedin.com/in/ranjeet-c3102/', avatar: '/team/Ranjeet.jpeg' },
  { name: 'Nehashree', role: 'AI & ML Development Intern', dept: 'AI Research', joined: '2024', skills: ['Python', 'TensorFlow', 'NLP', 'Data Science'], github: 'https://github.com/nehashree', linkedin: 'https://www.linkedin.com/in/nehashree-r-aa2770290/', email: 'nehashree0303@gmail.com', avatar: '/team/Neha.png' },
  { name: 'Varun', role: 'BI & Analytics Engineer', dept: 'Data', joined: '2023', skills: ['Power BI', 'SQL', 'Python', 'Data Modeling'], github: 'https://github.com/varun-bi', linkedin: 'http://linkedin.com/in/varun-s-958633290/', avatar: '/team/Varun.jpeg' },
  { name: 'Sheik Irfan Bashaa', role: 'Senior Full Stack Developer', dept: 'Engineering', joined: '2023', skills: ['React', 'Node.js', 'MongoDB', 'AWS'], github: 'https://github.com/sheikirfan', linkedin: 'https://www.linkedin.com/in/sheik-irfan-bashaa-s-a-121591290/', email: 'sheikirfanbashaa@gmail.com', avatar: '/team/Sheik.png' },
  { name: 'Sanjael', role: 'Full Stack Web Developer', dept: 'Engineering', joined: '2024', skills: ['React', 'Express', 'PostgreSQL', 'Docker'], github: 'https://github.com/sanjael', linkedin: 'https://www.linkedin.com/in/sanjael-raja-ba0589290/', avatar: '/team/Sanjeal.png' },
  { name: 'Nishalini', role: 'Frontend Development Intern', dept: 'Engineering', joined: '2024', skills: ['React', 'Tailwind CSS', 'JavaScript', 'Figma'], github: 'https://github.com/nishalini', linkedin: 'https://www.linkedin.com/in/nishalini-balaji-8a6671294/', email: 'bnisha@gmail.com', avatar: '/team/Nisha.png' },
  { name: 'Rakesh', role: 'Data Scientist', dept: 'Data', joined: '2024', skills: ['Python', 'Scikit-learn', 'Pandas', 'ML Ops'], github: 'https://github.com/rakesh-ds', linkedin: 'https://www.linkedin.com/in/rakesh-ramadurai-ba781031b/', avatar: '/team/Rakesh.png' },
  { name: 'Ramani', role: 'Frontend Development Intern', dept: 'Engineering', joined: '2024', skills: ['React', 'Tailwind CSS', 'JavaScript', 'Figma'], github: 'https://github.com/ramani-intern', linkedin: 'https://www.linkedin.com/in/ramani2105/', avatar: '/team/Ramani.jpeg' },
  { name: 'Rajesh', role: 'Backend Development Intern', dept: 'Engineering', joined: '2024', skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'], github: 'https://github.com/rajesh-intern', linkedin: 'https://www.linkedin.com/in/rajesh-y-723771290/', avatar: '/team/rajesh.png' },
  { name: 'Sanjay Ram', role: 'UI/UX & Web Design Intern', dept: 'Design', joined: '2024', skills: ['Figma', 'Adobe XD', 'Prototyping', 'CSS'], github: 'https://github.com/sanjayram-design', linkedin: 'https://www.linkedin.com/in/sanjay-ram-m-ds/', avatar: '/team/Sanjay.jpeg' },
  { name: 'Susmiha bavyaa', role: 'Frontend Development Intern', dept: 'Engineering', joined: '2024', skills: ['React', 'HTML/CSS', 'JavaScript', 'Tailwind CSS'], github: 'https://github.com/susmihabavyaa', linkedin: 'https://www.linkedin.com/in/susmiha-bavya-694410290/', email: 'susmihabavya20@gmail.com', avatar: '/team/susmiha.jpeg' },
];

export const CAREERS = [
  { title: 'React Developer', type: 'Intern', dept: 'Frontend', desc: 'Build modern, responsive UIs using React, Tailwind CSS, and Framer Motion for live products.' },
  { title: 'Python / AI Developer', type: 'Intern', dept: 'AI/ML', desc: 'Develop AI/ML models, APIs, and intelligent automation pipelines using Python and TensorFlow.' },
  { title: 'UI/UX Design Intern', type: 'Intern', dept: 'Design', desc: 'Design premium interfaces, wireframes, and prototypes using Figma for real client projects.' },
  { title: 'Full Stack Developer', type: 'Full-time', dept: 'Engineering', desc: 'Own end-to-end feature development across React, Node.js, and cloud infrastructure.' },
  { title: 'AI/ML Engineer', type: 'Full-time', dept: 'AI Research', desc: 'Research and deploy production-grade AI models, NLP systems, and computer vision solutions.' },
];

export const BLOG_POSTS = [
  {
    title: 'How Much Does a Website Cost in India?',
    slug: 'website-cost-india',
    date: 'January 15, 2025',
    category: 'Business',
    readTime: '5 min read',
    excerpt: 'A complete breakdown of website development costs in India — from landing pages to enterprise platforms. Know what to expect before you invest.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Best AI Projects for Final Year Students',
    slug: 'best-ai-projects-final-year',
    date: 'February 3, 2025',
    category: 'Academic',
    readTime: '7 min read',
    excerpt: 'Top AI and ML project ideas for final year engineering students — with real implementation tips, datasets, and deployment strategies.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Startup Website Checklist',
    slug: 'startup-website-checklist',
    date: 'March 10, 2025',
    category: 'Startup',
    readTime: '6 min read',
    excerpt: 'Everything your startup website needs in 2025 — from SEO and performance to trust signals and conversion-optimized CTAs.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
  },
];

export const TECHNOLOGIES = [
  { category: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'Express.js', 'FastAPI', 'Django', 'GraphQL'] },
  { category: 'AI & Data', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI API', 'LangChain', 'Pandas'] },
  { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase', 'Supabase'] },
  { category: 'Cloud & DevOps', items: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx'] },
  { category: 'Mobile', items: ['React Native', 'Flutter', 'Expo', 'Firebase', 'Push Notifications', 'App Store Deploy'] },
];

export const INDUSTRIES = [
  { icon: '🚚', name: 'Logistics & Supply Chain', desc: 'Fleet management, route optimization, and real-time tracking platforms.' },
  { icon: '🏥', name: 'Healthcare', desc: 'Patient management, telemedicine, and health analytics solutions.' },
  { icon: '🛒', name: 'E-Commerce & Retail', desc: 'Custom storefronts, inventory management, and payment integrations.' },
  { icon: '🎓', name: 'Education & EdTech', desc: 'LMS platforms, student portals, and AI-powered learning tools.' },
  { icon: '🏦', name: 'Finance & FinTech', desc: 'Secure payment systems, dashboards, and financial analytics.' },
  { icon: '🏭', name: 'Manufacturing & ERP', desc: 'Production tracking, ERP systems, and supply chain automation.' },
  { icon: '🖨️', name: 'Printing & Media', desc: 'Online print ordering, design tools, and order management platforms.' },
  { icon: '💎', name: 'Luxury & Jewellery', desc: 'Premium e-commerce with rich product showcases and secure checkout.' },
];

export const SOLUTIONS = [
  { icon: '🧠', title: 'GenAI Platform', desc: 'Custom generative AI solutions — chatbots, content generation, document intelligence, and AI copilots for your business.' },
  { icon: '🔄', title: 'Business Automation', desc: 'End-to-end workflow automation eliminating manual tasks, reducing errors, and accelerating operations.' },
  { icon: '📊', title: 'Data & Analytics', desc: 'Business intelligence dashboards, predictive analytics, and data pipelines that turn raw data into decisions.' },
  { icon: '🛡️', title: 'Enterprise Security', desc: 'Secure authentication, role-based access, data encryption, and compliance-ready architectures.' },
  { icon: '🌐', title: 'Digital Transformation', desc: 'End-to-end digital transformation — from legacy modernization to cloud-native rebuilds.' },
  { icon: '📡', title: 'API & Integration', desc: 'Third-party API integrations, microservices architecture, and seamless system connectivity.' },
];

export const METRICS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '3', label: 'Live Products' },
  { value: '2023', label: 'Founded' },
];

export const PROCESS_STEPS = [
  { step: '01', title: 'Discovery & Planning', desc: 'We understand your goals, define scope, and create a detailed project roadmap.' },
  { step: '02', title: 'Design & Prototype', desc: 'UI/UX wireframes and interactive prototypes reviewed and approved by you.' },
  { step: '03', title: 'Development & AI Integration', desc: 'Agile development with weekly demos, AI integration, and quality assurance.' },
  { step: '04', title: 'Testing & Deployment', desc: 'Rigorous testing, performance optimization, and cloud deployment.' },
  { step: '05', title: 'Support & Growth', desc: 'Post-launch support, monitoring, updates, and continuous improvement.' },
];

export const PRICING_PLANS = [
  {
    name: 'Starter',
    price: '₹9,999',
    period: 'one-time',
    desc: 'Perfect for landing pages and small business websites.',
    features: ['5-page responsive website', 'Mobile optimized', 'Basic SEO setup', 'Contact form', '1 month support', 'Free hosting guidance'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '₹29,999',
    period: 'one-time',
    desc: 'Ideal for startups and growing businesses.',
    features: ['Up to 15 pages', 'Custom UI/UX design', 'CMS integration', 'Advanced SEO', 'Payment gateway', '3 months support', 'Performance optimization'],
    cta: 'Most Popular',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'project-based',
    desc: 'For complex platforms, SaaS, ERP, and AI solutions.',
    features: ['Unlimited pages & features', 'AI/ML integration', 'Custom backend & APIs', 'Cloud deployment', 'ERP/CRM systems', 'Dedicated support', 'SLA guarantee'],
    cta: 'Get a Quote',
    highlight: false,
  },
];
