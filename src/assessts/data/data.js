import companies from "../images/homepage/08.png";
import talenthired1 from "../images/homepage/11.jpg";
import talenthired2 from "../images/homepage/12.jpg";
import talenthired3 from "../images/homepage/13.jpg";
import talenthired4 from "../images/homepage/14.jpg";
import talenthired5 from "../images/homepage/15.jpg";
import talenthired6 from "../images/homepage/16.jpg";
import postimage1 from "../images/dashboard/Post_01.jpg";
import postimage2 from "../images/dashboard/Post_02.jpg";
import postimage3 from "../images/dashboard/Post_03.jpg";
import logo from "../images/background/company_logo.png";
import url from "./url";
import student1 from "@/assessts/images/homepage/student1.jpg";
import student2 from "@/assessts/images/homepage/student2.jpg";
import student3 from "@/assessts/images/homepage/student3.jpg";
import student4 from "@/assessts/images/homepage/student4.jpg";
import student5 from "@/assessts/images/homepage/student5.jpg";
import student7 from "@/assessts/images/homepage/16.jpg";
import student6 from "@/assessts/images/homepage/12.jpg";
import student8 from "@/assessts/images/homepage/15.jpg";
import student9 from "@/assessts/images/homepage/student11.jpg";
import student10 from "@/assessts/images/homepage/student10.jpg";
import intern1 from "@/assessts/images/profile/Profile-Pic01.png";
import intern2 from "@/assessts/images/profile/Profile-Pic02.png";
import intern3 from "@/assessts/images/profile/Profile-Pic03.png";
import intern4 from "@/assessts/images/profile/Profile-Pic04.png";
import intern5 from "@/assessts/images/profile/Profile-Pic05.png";
import realTime from "@/assessts/images/dashboard/progress_tracking.png";
import quality from "@/assessts/images/dashboard/quality.png";
import opportunities from "@/assessts/images/dashboard/opportunities.png";
import ai from "@/assessts/images/student/ai.jpg";
import cloudcomputing from "@/assessts/images/student/cloudcomputing.jpg";
import machinelearning from "@/assessts/images/student/machinelearning.jpg";
import datanalytics from "@/assessts/images/student/dataanalytics.jpg";
import cybersecurity from "@/assessts/images/student/cybersecurity.jpg";
const s3url = url.s3url;
let data = {
  courses: [
    {
      Courses: "AI/ML Expert",
      duration: "4 Weeks",
    },
    {
      Courses: "Data Scientist",
      duration: "8 Weeks",
    },
    {
      Courses: "Game Designer",
      duration: "12 Weeks",
    },
    {
      Courses: "Software Engineer",
      duration: "14 Weeks",
    },
    {
      Courses: "Unity Developer",
      duration: "18 Weeks",
    },
  ],
  studentcentral: [
    {
      img: `${s3url}/homepage/06.png`,
      // img: student1.src,
    },
    {
      img: `${s3url}/homepage/07.png`,
      // img: student2.src,
    },
  ],
  currentlydeploying: [
    {
      img: `${s3url}/homepage/06.png`,
      // img: student1.src,
    },
    {
      img: `${s3url}/homepage/07.png`,
      // img: student2.src,
    },
    {
      img: `${s3url}/homepage/08.png`,
      // img: student3.src,
    },
  ],
  jobtype: [
    {
      name: "developer",
      value: "developer",
    },
    {
      name: "Software Testing",
      value: "software testing",
    },
    {
      name: "Graphic Designer",
      value: "Graphic Designer",
    },
    {
      name: "Content Writer",
      value: "Content writer",
    },
    {
      name: "Accounts",
      value: "Accounts",
    },
    {
      name: "Client servicing",
      value: "client servicing",
    },
    {
      name: "SEO",
      value: "seo",
    },
  ],
  studentsskills: [
    {
      name: "Interests & Skill Set",
    },
    {
      name: "Companies suggested for you",
    },
    {
      name: "Internships suggested for you",
    },
    {
      name: "Recommended courses",
    },
    {
      name: "Internship Updates",
    },
  ],
  interest: [
    {
      name: "Teachers Assistant",
    },
    {
      name: "Toddler Care",
    },
    {
      name: "Summer Staff Internships",
    },
    {
      name: "Camp Services",
    },
    {
      name: "Health Services",
    },
    {
      name: "Media Team",
    },
    {
      name: "Cabin Leader",
    },
    {
      name: "Cake Decorator",
    },
  ],
  studentchart: {
    labels: [
      "Critical thinking skills",
      "Communication skills",
      "Problem-solving skills",
      "Management skills",
      "Interpersonal skills",
      "Transferable Skills",
    ],
    data: [10, 12, 14, 16, 18, 20],
    backgroundColor: [
      "#f79663",
      "#fdc878",
      "#15d7d7",
      "#00ACb3",
      "#f14c88",
      "#d84675",
    ],
    borderColor: ["green", "red", "blue"],
  },

  studentSkill: {
    label: [
      "HTML",
      "CSS",
      "JAVASCRIPT",
      "ES6",
      "TAILWIND/BOOTSTRAP",
      "DOM MANIPULATION",
      "REACT JS",
      "REDUX JS",
    ],
    data: [15, 12, 8, 20, 10, 16, 18, 20, 14, 13],
    backgroundColor: [
      "#f79663",
      "#fdc878",
      "#15d7d7",
      "#00ACb3",
      "#f14c88",
      "#d84675",
    ],
    borderColor: ["green", "red", "blue"],
  },
  companyskills: [
    {
      skills: "Interests & Skill Set",
      designation: "20 minutes ago",
    },
    {
      skills: "Interests & Skill Set",
      designation: "20 minutes ago",
    },
    {
      skills: "Interests & Skill Set",
      designation: "20 minutes ago",
    },
    {
      skills: "Interests & Skill Set",
      designation: "20 minutes ago",
    },
    {
      skills: "Interests & Skill Set",
      designation: "20 minutes ago",
    },
  ],
  companiessuggested: [
    {
      img: `${s3url}/homepage/07.png`,
      skills: "Company",
      designation: "Graphics",
      jobs: "100 Jobs",
      button: "visit",
    },
    {
      img: `${s3url}/homepage/08.png`,
      skills: "Company",
      designation: "Graphics",
      jobs: "100 Jobs",
      button: "visit",
    },
    {
      img: `${s3url}/homepage/08.png`,
      skills: "Company",
      designation: "Graphics",
      jobs: "100 Jobs",
      button: "visit",
    },
    {
      img: `${s3url}/homepage/08.png`,
      skills: "Company",
      designation: "Graphics",
      jobs: "100 Jobs",
      button: "visit",
    },
  ],
  interestedcompanies: [
    {
      img: `${s3url}/homepage/08.png`,
      skills: "Toddler Care ",
      designation: "Toddler Care",
      jobs: "2 Weeks",
    },
    {
      img: `${s3url}/homepage/08.png`,
      skills: "Toddler Care ",
      designation: "Toddler Care",
      jobs: "2 Weeks",
    },
    {
      img: `${s3url}/homepage/08.png`,
      skills: "Toddler Care ",
      designation: "Toddler Care",
      jobs: "2 Weeks",
    },
    {
      img: `${s3url}/homepage/08.png`,
      skills: "Toddler Care ",
      designation: "Toddler Care",
      jobs: "2 Weeks",
    },
  ],
  topscorer: [
    {
      img: `${s3url}/homepage/06.png`,
      name: "Emma",
      score: "16847",
    },
    {
      img: `${s3url}/homepage/06.png`,
      name: "Emma",
      score: "16847",
    },
    {
      img: `${s3url}/homepage/06.png`,
      name: "Emma",
      score: "16847",
    },
    {
      img: `${s3url}/homepage/06.png`,
      name: "Emma",
      score: "16847",
    },
    {
      img: `${s3url}/homepage/06.png`,
      name: "Emma",
      score: "16847",
    },
    {
      img: `${s3url}/homepage/06.png`,
      name: "Emma",
      score: "16847",
    },
    {
      img: `${s3url}/homepage/06.png`,
      name: "Emma",
      score: "16847",
    },
    {
      img: `${s3url}/homepage/06.png`,
      name: "Emma",
      score: "16847",
    },
  ],
  experience: [
    {
      name: "No experience",
      value: "No experience",
    },
    {
      name: "1-6 months",
      value: "1-6 months",
    },

    {
      name: "7-12 months",
      value: "7-12 months",
    },
    {
      name: "More than 1 year",
      value: "More than 1 year",
    },
  ],
  location: [
    { name: "Alabama", value: "Albama" },
    { name: "Alaska", vale: "AlaskaF" },
    { name: "Arizona", value: "Arizona" },
    { name: "Arkansas", value: "Arkansas" },
    { name: "California", value: "California" },
    { name: "Colorado", value: "Colorado" },
    { name: "Connecticut", value: "Connecticut" },
    { name: "Delaware", value: "Delaware" },
    { name: "Florida", value: "Florida" },
    { name: "Georgia", value: "Georgia" },
    { name: "Hawaii", value: "Hawaii" },
    { name: "Idaho", value: "Idaho" },
    { name: "Illinois", value: "Illinois" },
    { name: "Indiana", value: "Indiana" },
    { name: "Iowa", value: "Iowa" },
    { name: "Kansas", value: "Kansas" },
    { name: "Kentucky", value: "Kentucky" },
    { name: "Louisiana", value: "Louisiana" },
    { name: "Maine", value: "Maine" },
    { name: "Maryland", value: "Maryland" },
    { name: "Massachusetts", value: "Massachusetts" },
    { name: "Michigan", value: "Michigan" },
    { name: "Minnesota", value: "Minnesota" },
    { name: "Mississippi", value: "Mississippi" },
    { name: "Missouri", value: "Missouri" },
    { name: "Montana", value: "Montana" },
    { name: "Nebraska", value: "Nebraska" },
    { name: "Nevada", value: "Nevada" },
    { name: "New Hampshire", value: "New Hampshire" },
    { name: "New Jersey", value: "New Jersey" },
    { name: "New Mexico", value: "New Mexico" },
    { name: "New York", value: "New York" },
    { name: "North Carolina", value: "North Carolina" },
    { name: "North Dakota", value: "North Dakota" },
    { name: "Ohio", value: "Ohio" },
    { name: "Oklahoma", value: "Oklahoma" },
    { name: "Oregon", value: "Oregon" },
    { name: "Pennsylvania", value: "Pennsylvania" },
    { name: "Rhode Island", value: "Rhode Island" },
    { name: "South Carolina", value: "South Carolina" },
    { name: "South Dakota", value: "South Dakota" },
    { name: "Tennessee", value: "Tennessee" },
    { name: "Texas", value: "Texas" },
    { name: "Utah", value: "Utah" },
    { name: "Vermont", value: "Vermont" },
    { name: "Virginia", value: "Virginia" },
    { name: "Washington", value: "Washington" },
    { name: "West Virginia", value: "West Virginia" },
    { name: "Wisconsin", value: "Wisconsin" },
    { name: "Wyoming", value: "Wyoming" },
  ],
  studentdata: [
    {
      img: `${s3url}/homepage/11.jpg`,
      name: "Esther howard",
      desc: "Best Talent Hired",
    },
    {
      img: `${s3url}/homepage/12.jpg`,
      name: "Esther howard",
      desc: "Best Talent Hired",
    },
    {
      img: `${s3url}/homepage/13.jpg`,
      name: "Esther howard",
      desc: "Best Talent Hired",
    },
    {
      img: `${s3url}/homepage/14.jpg`,
      name: "Esther howard",
      desc: "Best Talent Hired",
    },
    {
      img: `${s3url}/homepage/15.jpg`,
      name: "Esther howard",
      desc: "Best Talent Hired",
    },
    {
      img: `${s3url}/homepage/16.jpg`,
      name: "Esther howard",
      desc: "Best Talent Hired",
    },
  ],
  studentpost: [
    {
      img_student: `${s3url}/homepage/07.png`,
      student_name: "Kunal Sharma",
      student_designation: "Developer",
      post_time: "10 min",
      post_description:
        "What makes VROAR truly special is the benefit it provides to both the students and the internship provider companies. For the students, this platform provides valuable opportunities to gain knowledge, skills, and experience.",
      post_image: `${s3url}/dashboard/Post_01.jpg`,
      post_caption: "USE Vroar Ai/ml Driven Platform to find the right talent ",
      site_name: "Vroar.ai",
    },
    {
      img_student: `${s3url}/homepage/07.png`,
      student_name: "Kunal Sharma",
      student_designation: "Developer",
      post_time: "10 min",
      post_description:
        "What makes VROAR truly special is the benefit it provides to both the students and the internship provider companies. For the students, this platform provides valuable opportunities to gain knowledge, skills, and experience.",
      post_image: `${s3url}/dashboard/Post_02.jpg`,
      post_caption: "USE Vroar Ai/ml Driven Platform to find the right talent ",
      site_name: "Vroar.ai",
    },
    {
      img_student: `${s3url}/homepage/07.png`,
      student_name: "Kunal Sharma",
      student_designation: "Developer",
      post_time: "10 min",
      post_description:
        "What makes VROAR truly special is the benefit it provides to both the students and the internship provider companies. For the students, this platform provides valuable opportunities to gain knowledge, skills, and experience.",
      post_image: `${s3url}/dashboard/Post_03.jpg`,
      post_caption: "USE Vroar Ai/ml Driven Platform to find the right talent ",
      site_name: "Vroar.ai",
    },
  ],
  work: [
    {
      value: "remote",
      name: "Remote",
    },
    {
      value: "Office",
      name: "Office",
    },
  ],
  companyttype: [
    {
      name: "Public company ",
      value: "Public company ",
    },
    {
      name: "Self-employed ",
      value: "Self-employed ",
    },
    {
      name: "Government agency",
      value: "Government agency",
    },
    {
      name: "Nonprofit",
      value: "Nonprofit",
    },
    {
      name: "Sole proprietorship",
      value: "Sole proprietorship",
    },
    {
      name: "Privately held",
      value: "Privately held",
    },
    {
      name: "Partnership",
      value: "Partnership",
    },
  ],
  teamsize: [
    {
      name: "0-5 Employees",
      value: "0-5",
    },
    {
      name: "5-25 Employees",
      value: "5-25",
    },
    {
      name: "25-50 Employees",
      value: "25-50",
    },
    {
      name: "50-100 Employees",
      value: "50-100",
    },
    {
      name: "100 or more Employees",
      value: "100 or more",
    },
  ],
  industrytype: [
    {
      name: "IT Services and IT Consulting",
      value: "IT Services and IT Consulting",
    },
    {
      name: "Hospitals and Health Care",
      value: "Hospitals and Health Care",
    },
    {
      name: "Education Administration Programs",
      value: "Education Administration Programs",
    },
    {
      name: "Government Administration",
      value: "Government Administration",
    },
    {
      name: "Advertising Services",
      value: "Advertising Services",
    },
    {
      name: "Accounting",
      value: "Accounting",
    },
    {
      name: "Oil and Gas",
      value: "Oil and Gas",
    },
    {
      name: "Wellness and Fitness Services",
      value: "Wellness and Fitness Services",
    },
    {
      name: "Food and Beverage Services",
      value: "Food and Beverage Services",
    },
    {
      name: "Technology, Information and Internet",
      value: "Technology, Information and Internet",
    },
    {
      name: "Appliances, Electrical, and Electronics Manufacturing",
      value: "Appliances, Electrical, and Electronics Manufacturing",
    },
    {
      name: "Business Consulting and Services",
      value: "Business Consulting and Services",
    },
    {
      name: "Primary and Secondary Education",
      value: "Primary and Secondary Education",
    },
    {
      name: "Transportation, Logistics, Supply Chain and Storage",
      value: "Transportation, Logistics, Supply Chain and Storage",
    },
    {
      name: "Retail Apparel and Fashion",
      value: "Retail Apparel and Fashion",
    },
    {
      name: "Food and Beverage Manufacturing",
      value: "Food and Beverage Manufacturing",
    },
    {
      name: "Staffing and Recruiting",
      value: "Staffing and Recruiting",
    },
    {
      name: "Architecture and Planning",
      value: "Architecture and Planning",
    },
  ],
  faq: [
    {
      question: "What is VROAR's internship program?",
      answer:
        "VROAR's internship program is designed to provide students who lack support with unparalleled internship opportunities in a professional setting. It offers a wide range of internship opportunities across different industries and allows students to gain real-world experience and develop essential skills.",
    },
    {
      question:
        "Does VROAR offer any business enrichment programs for companies?",
      answer:
        "Yes, VROAR offers business enrichment programs for companies seeking to enhance their overall performance and capabilities. These programs are tailored to address specific needs and challenges faced by the company and involve strategic solutions.",
    },
    {
      question:
        "Can companies choose the duration of the business enrichment programs?",
      answer:
        "Yes, the duration of our business enrichment programs can be customized according to the company's requirements. Whether it's a short-term initiative or a long-term engagement, our team will work closely with the company to design a program that aligns with its goals and objectives.",
    },
    {
      question:
        "How can companies inquire about VROAR's business enrichment programs?",
      answer:
        "Companies can reach out to our team through our website or by contacting our designated business inquiry email or phone number. Our representatives will be happy to provide more information, discuss your specific needs, and guide you through the process of selecting the right program for your company.",
    },
    {
      question:
        "Are the interns provided with mentoring and support during the internship?",
      answer:
        "Absolutely! At VROAR, we highly value the growth and development of our interns. Each intern is assigned a dedicated mentor who will provide guidance, support, and regular feedback throughout the internship period. Additionally, our team is always available to address any concerns or questions that may arise during the internship journey.",
    },
  ],
  testimonial: [
    {
      img: intern1.src,
      heading: "Remarkable Business Enrichment Programs.",
      testimonials:
        " We cannot speak highly enough of VROAR's business enrichment programs. The workshops they offer have allowed our team to acquire new tools and strategies, bringing immediate value to our organization. Their interns have also been an incredible asset, injecting new exuberance and fresh visions into our company. ",
      name: "Emma",
      designation: "Berkshire Hathaway	",
    },
    {
      img: intern2.src,
      heading: "Had an insightful and incredible experience.",
      testimonials:
        "VROAR's business enrichment programs have been instrumental in developing our employee's skills and boosting our company's productivity. The interns they provide are highly motivated and bring fresh perspectives to our organization. We highly recommend VROAR for any company looking to enhance its workforce and drive success.",
      name: "Lilly",
      designation: "	CSV health",
    },
    {
      img: intern3.src,
      heading: "Invaluable experience that boosted my career.",
      testimonials:
        "The interns that we hired from VRAOR not only brought creative stances and valuable insights, but VROAR's business enrichment programs have transformed our team into a highly skilled and motivated workforce. Their expert facilitators deliver engaging workshops that have enhanced our employees' abilities to problem-solve and collaborate effectively, making VROAR an invaluable resource for our company. ",
      name: "Larry",
      designation: "Digitalfox",
    },
    {
      img: intern4.src,
      heading: "Exceptional growth opportunities.",
      testimonials:
        "Thanks to VROAR, our team has access to exceptional business enrichment programs tailored to our industry. The interns they have provided us with have seamlessly integrated into our company, bringing a newfound level of enthusiasm and expertise. VROAR truly understands the needs of businesses and delivers exceptional talent. ",
      name: "Brad",
      designation: "ExxonMobil",
    },
    {
      img: intern5.src,
      heading: "VROAR is a game-changer",
      testimonials:
        " VROAR has been instrumental in our talent acquisition strategy. Their business enrichment programs offer invaluable development opportunities for our employees, ensuring they stay ahead in our fast-paced industry. Moreover, the interns they provide bring a sense of vibrancy and innovation to our workplace, making VROAR an excellent partner for any company seeking skilled interns.",
      name: "James",
      designation: "Acterna Corp",
    },
  ],
  companyHiring: [
    {
      img: "https://newkit.moxcreative.com/decargo/wp-content/uploads/sites/37/2022/10/logoipsum-259.png",
    },
    {
      img: "https://newkit.moxcreative.com/decargo/wp-content/uploads/sites/37/2022/10/logoipsum-259.png",
    },
    {
      img: "https://newkit.moxcreative.com/decargo/wp-content/uploads/sites/37/2022/10/logoipsum-259.png",
    },
    {
      img: "https://newkit.moxcreative.com/decargo/wp-content/uploads/sites/37/2022/10/logoipsum-259.png",
    },
    {
      img: "https://newkit.moxcreative.com/decargo/wp-content/uploads/sites/37/2022/10/logoipsum-259.png",
    },
  ],
  studentCourses: [
    {
      img: ai,
      courses_title: "AI technology",
      courses_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      img: cybersecurity,
      courses_title: "Cyber security",
      courses_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      img: datanalytics,
      courses_title: "data analytics",
      courses_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      img: cloudcomputing,
      courses_title: " cloud computing",
      courses_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      img: machinelearning,
      courses_title: "machine learning",
      courses_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],
  company: [
    {
      title: "LOGO",
    },
    {
      title: "LOGO",
    },
    {
      title: "LOGO",
    },
    {
      title: "LOGO",
    },
    {
      title: "LOGO",
    },
    {
      title: "LOGO",
    },
  ],
  studentJobs: [
    {
      title: "Data Science & Analytics",
      vacancy: "8 openings",
    },
    {
      title: "Engineering - Software & QA",
      vacancy: "10 openings",
    },
    {
      title: "Finance & Accounting",
      vacancy: "20 openings",
    },
    {
      title: "Human Resources",
      vacancy: "11 openings",
    },
    {
      title: "Administration & Facilities",
      vacancy: "15 openings",
    },
    {
      title: "Administration & Facilities",
      vacancy: "15 openings",
    },
    {
      title: "Administration & Facilities",
      vacancy: "15 openings",
    },
    {
      title: "Administration & Facilities",
      vacancy: "15 openings",
    },
  ],
  studentTestimonail: [
    {
      img: `${s3url}/homepage/07.png`,
      name: "Melissa Martin",
      designation: "Frontend Developer",
      testimonial:
        "VROAR's tailored courses and internship were exactly what I needed to bridge the gap between academic knowledge and practical skills. All thanks to VROAR, I had the chance to work alongside industry experts during my internship. The skills and network I gained through this experience have been invaluable in progressing my career.",
    },
    {
      img: `${s3url}/homepage/06.png`,
      name: "Richard Baker",
      designation: "Software Engineer",
      testimonial:
        "I enrolled in VROAR's tailored course to enhance my skills and it exceeded my expectations. The course material was informative, and engaging, and the personalized approach ensured I had knowledge based on my career choices and interest. VROAR's real-world internships opened doors for me that I never thought possible.",
    },
    {
      img: `${s3url}/homepage/07.png`,
      name: "Karen Garcia",
      designation: "React Developer",
      testimonial:
        "VROAR's internships and courses are a perfect blend of theory and practice. The hands-on experience, coupled with the guidance of industry experts, helped me develop a well-rounded skill set and boosted my confidence. The opportunity to work on real projects and receive feedback from professionals in my field was exactly what I needed for my career.",
    },
    {
      img: `${s3url}/homepage/06.png`,
      name: "Matthew Lewis",
      designation: "Flutter Developer",
      testimonial:
        "VROAR provided me with an excellent internship opportunity that allowed me to apply my classroom knowledge to a real-world setting. The experience gave me valuable skills and insight, helping me kickstart my career. I am grateful to VROAR for offering internships that catered to my interests. This experience was a true game-changer for me.",
    },
    {
      img: `${s3url}/homepage/07.png`,
      name: "David Rodriguez",
      designation: "UI Developer",
      testimonial:
        "Thanks to VROAR's tailored courses, I gained industry-specific knowledge and truly felt prepared to enter the workforce. Talking about the internship, I was assigned meaningful tasks and mentored by professionals who genuinely cared about my growth. This internship truly enhanced my resume and professional network.",
    },
    {
      img: `${s3url}/homepage/07.png`,
      name: "Emily dolce",
      designation: "Full Stack Developer",
      testimonial:
        "VROAR's internships are the perfect opportunity to gain practical experience while still in school. The hands-on learning approach ensured I was well-equipped for future job prospects, and the whole experience was incredibly rewarding. I learned so much about my field and built connections that will be invaluable for my future career.",
    },
  ],
  studentAdvantage: [
    {
      img: "https://cdn-icons-png.flaticon.com/128/814/814587.png",
      title: "Real-World Experience",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/8920/8920531.png",
      title: "Tailored Internships",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/6016/6016261.png",
      title: "Growth & Development",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/1239/1239608.png",
      title: "Network with Professionals",
    },
  ],
  studentFaq: [
    {
      question: "What is VROAR's internship program?",
      answer:
        "VROAR's internship program is designed to provide students who lack support with unparalleled internship opportunities in a professional setting. It offers a wide range of internship opportunities across different industries and allows students to gain real-world experience and develop essential skills.",
    },
    {
      question: "How can I apply for an internship at VROAR?",
      answer:
        "To apply for an internship at VROAR, create a profile on VROAR, share your interest and skill set, and you’ll be recommended the internships that will match your profile. Make sure to provide accurate information and highlight the skills and interests that make you a strong candidate for the desired internship position.",
    },
    {
      question: "Are the internships at VROAR paid positions?",
      answer:
        "Yes, all internships at VROAR are paid positions. We believe in providing fair compensation to our interns for their valuable contributions and supporting their financial needs during the internship.",
    },
    {
      question: "How long do the internships at VROAR typically last?",
      answer:
        "The duration of our internships varies depending on the company offering the position. Although, the internships generally range from 3 to 12 months, with most internships lasting around 6 months.",
    },
    {
      question:
        "Are the interns provided with mentoring and support during the internship?",
      answer:
        "Absolutely! At VROAR, we highly value the growth and development of our interns. Each intern is assigned a dedicated mentor who will provide guidance, support, and regular feedback throughout the internship period. Additionally, our team is always available to address any concerns or questions that may arise during the internship journey.",
    },
  ],
  advantageParent: [
    {
      img: realTime,
      title: "Real-Time Progress Tracking",
    },
    {
      img: quality,
      title: "Quality Assurance",
    },
    {
      img: opportunities,
      title: "Global Opportunities",
    },
  ],
  parentTestimonial: [
    {
      img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Sarah J. ",
      testimonial:
        "VROAR's emphasis on skill development and real-world exposure was evident throughout the internship. Our child acquired skills that are invaluable in today's competitive job market. The international internship option broadened their horizons and gave them a global perspective.As parents, we were delighted to be actively engaged in our child's VROAR journey. The platform's transparency and communication channels kept us informed every step of the way. We could see the positive impact VROAR was having on our child's career prospects.VROAR's excellence in the field is well-deserved. We're proud to be associated with a program that not only promises but delivers on its commitment to nurturing young talents. Our child's journey with VROAR has been nothing short of remarkable, and we couldn't be happier with the results.",
    },
    {
      img: "https://images.pexels.com/photos/947639/pexels-photo-947639.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: " David M.",
      testimonial:
        "My experience with VROAR has been nothing short of exceptional. As a parent, I was initially concerned about my child's future, but VROAR has completely eased my worries. The personalized learning approach ensured my child received the right guidance, enhancing their skills for success.The real-world exposure they gained through VROAR's internships was incredible. Not only did they build valuable networks, but they also secured a global perspective on their chosen field. I couldn't be prouder of their accomplishments. What truly impressed me was VROAR's commitment to parental engagement. They kept me informed every step of the way, ensuring my child's journey was on the right track. The recognition and awards VROAR has received reassured me that my child is in the right hands. VROAR is not just an internship platform; it's a pathway to a brighter future. I wholeheartedly recommend it to every parent who wants the best for their child's career.",
    },
    {
      img: "https://images.pexels.com/photos/2340978/pexels-photo-2340978.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Michael S. ",
      testimonial:
        "My son's journey with VROAR has been remarkable. As a parent, I was looking for an opportunity that would help him grow both personally and professionally. VROAR did not disappoint.The platform's user-friendly interface made it easy for my son to navigate and explore various internship opportunities. It was incredible to witness his transformation throughout his internship period. He not only acquired valuable skills but also developed a strong work ethic.What sets VROAR apart is their dedication to providing a safe and supportive environment. As a parent, knowing that my child was in good hands brought me peace of mind. The regular updates on his progress were highly appreciated.VROAR's commitment to excellence shines through its partnerships with reputable companies. My son had the chance to work with industry leaders, which boosted his confidence and opened doors to future career prospects.I wholeheartedly endorse VROAR to fellow parents. It's a platform that fosters growth, learning, and success.",
    },
    {
      img: "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Jennifer P.",
      testimonial:
        "As a mother, I've always wanted the best for my daughter, and VROAR exceeded my expectations in helping her kickstart her career journey.The platform's intuitive design made it easy for my daughter to explore various internship opportunities. What impressed me most was the personalized support she received throughout the process. The VROAR team provided guidance and assistance, ensuring she made informed decisions.VROAR's commitment to safety was evident from the beginning. They prioritize the well-being of students, and that reassurance was invaluable to me as a parent. I felt confident in my daughter's choice to use this platform.One of the standout features of VROAR is the caliber of internship opportunities available. My daughter had the privilege of interning with a renowned company, gaining hands-on experience and valuable industry insights. The mentors she worked with were not only experts in their fields but also incredibly supportive, which contributed to her personal and professional growth.",
    },
  ],
  parentFaq: [
    {
      question: "What is VROAR, and how can it benefit my child?",
      answer:
        "VROAR is a comprehensive career development platform that empowers students with skills, mentorship, and industry exposure. It benefits your child by providing the tools and resources needed to make informed career choices and succeed in their chosen field.",
    },
    {
      question:
        "Is VROAR suitable for students of all ages and career interests?",
      answer:
        "Yes, VROAR caters to students of various age groups and diverse career interests. Whether your child is exploring career options or seeking to enhance existing skills, VROAR offers tailored programs for everyone.",
    },
    {
      question:
        "How can VROAR help my child build a strong professional network?",
      answer:
        "VROAR connects students with industry experts, mentors, and like-minded peers, facilitating the development of a strong professional network. Through webinars, workshops, and interactive sessions, students can establish valuable connections.",
    },
    {
      question: "Can I track my child's progress on VROAR?",
      answer:
        "Yes, parents have the option to monitor their child's progress on VROAR. You can access reports, performance metrics, and feedback to stay informed about your child's development journey.",
    },
    {
      question: "How can I get started with VROAR for my child?",
      answer:
        "Getting started with VROAR is easy. You can create a parent account, explore available programs, and enroll your child in courses that align with their interests and aspirations. Our user-friendly interface makes the onboarding process smooth.",
    },
  ],
  interested: [
    {
      name: "Company",
      Query: [
        {
          companyLogo: `${s3url}/logo/Vroar_Icon.svg`,
          companyName: "Vroar",
          followers: "42,378",
          btn: "Following",
        },
        {
          companyLogo: `${s3url}/logo/Vroar_Icon.svg`,
          companyName: "Vroar",
          followers: "42,378",
          btn: "Following",
        },
      ],
    },
    {
      name: "School",
      Query: [
        {
          companyLogo: `${s3url}/logo/Vroar_Icon.svg`,
          companyName: "Southern Utah university",
          followers: "42,378",
          btn: "Following",
        },
        {
          companyLogo: `${s3url}/logo/Vroar_Icon.svg`,
          companyName: "The Benjamin School",
          followers: "42,378",
          btn: "Following",
        },
      ],
    },
  ],

  talent: [
    {
      name: "Joseph Smith",
      designation: "Networking Intern",
      image: student1,
    },
    {
      name: "olivia howard",
      designation: "data analytics intern",
      image: student2,
    },
    {
      name: "jessica wilson",
      designation: "machine learning intern",
      image: student3,
    },

    {
      name: "dayla murphy",
      designation: "Artificial Intelligence intern",
      image: student5,
    },
    {
      name: "harold",
      designation: "cloud computing intern",
      image: student6,
    },
    {
      name: "miranda webb",
      designation: "social media marketing intern",
      image: student7,
    },
    {
      name: "james williams",
      designation: "web development intern",
      image: student8,
    },
    {
      name: "hazlewood brown",
      designation: "Devops intern",
      image: student9,
    },
    {
      name: "Luis Rodriguez",
      designation: "Content writing intern",
      image: student10,
    },
  ],

  education: [
    {
      schoolName: "Benjamin school",
      img: `${s3url}/logo/Vroar_Icon.svg`,
      course: "Bachelor degree in Computer Science",
    },
    {
      schoolName: "Benjamin school",
      img: `${s3url}/logo/Vroar_Icon.svg`,
      course: "Master degree in Computer Science",
    },
    {
      schoolName: "Benjamin school",
      img: `${s3url}/logo/Vroar_Icon.svg`,
      course: "Master degree in Computer Science",
    },
    {
      schoolName: "Benjamin school",
      img: `${s3url}/logo/Vroar_Icon.svg`,
      course: "Master degree in Computer Science",
    },
    {
      schoolName: "Benjamin school",
      img: `${s3url}/logo/Vroar_Icon.svg`,
      course: "Master degree in Computer Science",
    },
  ],
  skillsOptions: [
    {
      value: "HTML",
      label: "HTML",
    },
    {
      value: "CSS",
      label: "CSS",
    },
    {
      value: "JAVA",
      label: "JAVA",
    },
    {
      value: "JAVASCRIPT",
      label: "JAVASCRIPT",
    },
    {
      value: "NODE JS",
      label: "NODE JS",
    },
    {
      value: "REACT JS",
      label: "REACT JS",
    },
    {
      value: "ANGULAR",
      label: "ANGULAR",
    },
    {
      value: "VUE JS",
      label: "VUE JS",
    },
    {
      value: "GO LANG",
      label: "GO LANG",
    },
    {
      value: "REACT NATIVE",
      label: "REACT NATIVE",
    },
    {
      value: "FLUTTER",
      label: "FLUTTER",
    },
    {
      value: "PHP",
      label: "PHP",
    },
    {
      value: "Software Developer",
      label: "Software Developer",
    },
    {
      value: "Product Manager",
      label: "Product Manager",
    },
    {
      value: "Data Science",
      label: "Data Science",
    },
    {
      value: "Python",
      label: "Python",
    },
    {
      value: "Magento",
      label: "Magento",
    },
    {
      value: "Shopify",
      label: "Shopify",
    },
    {
      value: "Wordpress",
      label: "Wordpress",
    },
    {
      value: "SEO",
      label: "SEO",
    },
    {
      value: "Adobe Photoshop",
      label: "Adobe Photoshop",
    },
    {
      value: "Figma",
      label: "Figma",
    },
    {
      value: "Adobe XD",
      label: "Adobe XD",
    },
    {
      value: "AI",
      label: "AI",
    },
    {
      value: "LLB",
      label: "LLB",
    },
    { value: "Programming Languages", label: "Programming Languages" },
    { value: "Software Development", label: "Software Development" },
    { value: "Web Development", label: "Web Development" },
    { value: "Database Management", label: "Database Management" },
    { value: "Version Control", label: "Version Control" },
    { value: "Problem Solving", label: "Problem Solving" },
    { value: "Teamwork", label: "Teamwork" },
    { value: "Communication", label: "Communication" },
    { value: "Medical Skills", label: "Medical Skills" },
    { value: "Critical Thinking", label: "Critical Thinking" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Data Analysis", label: "Data Analysis" },
    { value: "Mechanical design", label: "Mechanical design" },
    { value: "Thermodynamics", label: "Thermodynamics" },
    { value: "Fluid dynamics", label: "Fluid dynamics" },
    { value: "AutoCAD", label: "AutoCAD" },
    { value: "SolidWorks", label: "SolidWorks" },
    { value: "CATIA", label: "CATIA" },
    { value: "Campaign ideation", label: "Campaign ideation" },
    { value: "Content development", label: "Content development" },
    { value: "Market research", label: "Market research" },
    { value: "Branding", label: "Branding" },
    {
      value: "Electronic health records (EHR)",
      label: "Electronic health records (EHR)",
    },
    { value: "Medical devices", label: "Medical devices" },
    { value: "Compassion", label: "Compassion" },
    { value: "Attention to Detail", label: "Attention to Detail" },
    { value: "Leadership", label: "Leadership" },
    { value: "Negotiation", label: "Negotiation" },
    { value: "Conflict resolution", label: "Conflict resolution" },
    { value: "Project Management", label: "Project Management" },
    { value: "Creative Thinking", label: "Creative Thinking" },
    { value: "Public speaking", label: "Public speaking" },
    { value: "Foreign Languages", label: "Foreign Languages" },
    { value: "Financial Literacy", label: "Financial Literacy" },
    { value: "Resource allocation", label: "Resource allocation" },
    { value: "Design optimization", label: "Design optimization" },
    { value: "Instructional design", label: "Instructional design" },
    { value: "Training development", label: "Training development" },
    { value: "Market research", label: "Market research" },
    { value: "Email marketing", label: "Email marketing" },
    { value: "Data research", label: "Data research" },
    { value: "Information literacy", label: "Information literacy" },
    { value: "Physical fitness", label: "Physical fitness" },
    { value: "Nutrition knowledge", label: "Nutrition knowledge" },
    { value: "Stress management", label: "Stress management" },
    { value: "Adaptability", label: "Adaptability" },
    { value: "Self-awareness", label: "Self-awareness" },
    { value: "Relationship management", label: "Relationship management" },
    {
      value: "Moral and ethical decision-making",
      label: "Moral and ethical decision-making",
    },
    { value: "Product management", label: "Product management" },
    { value: "Market analysis", label: "Market analysis" },
    { value: "Market segmentation", label: "Market segmentation" },
    { value: "Statistical analysis", label: "Statistical analysis" },
    { value: "Database administration", label: "Database administration" },
    { value: "Quality control", label: "Quality control" },
    { value: "Supply chain management", label: "Supply chain management" },
    { value: "Digital design", label: "Digital design" },
    {
      value: "User experience (UX) design",
      label: "User experience (UX) design",
    },
    {
      value: "User interface (UI) design",
      label: "User interface (UI) design",
    },
    {
      value: "Content management systems (CMS)",
      label: "Content management systems (CMS)",
    },
    {
      value: "Search engine optimization (SEO)",
      label: "Search engine optimization (SEO)",
    },
    { value: "Social media management", label: "Social media management" },
    { value: "Data visualization", label: "Data visualization" },
    { value: "Market research analysis", label: "Market research analysis" },
    { value: "Business analysis", label: "Business analysis" },
    { value: "Financial modeling", label: "Financial modeling" },
    { value: "Forecasting", label: "Forecasting" },
    { value: "Product development", label: "Product development" },
    { value: "Market trends analysis", label: "Market trends analysis" },
    {
      value: "Customer relationship management (CRM)",
      label: "Customer relationship management (CRM)",
    },
    { value: "Public relations", label: "Public relations" },
    { value: "Time management", label: "Time management" },
    {
      value: "Information technology (IT) support",
      label: "Information technology (IT) support",
    },
    { value: "Troubleshooting", label: "Troubleshooting" },
    { value: "Network security", label: "Network security" },
    { value: "Data security", label: "Data security" },
    { value: "Cloud computing", label: "Cloud computing" },
    { value: "Machine learning", label: "Machine learning" },
    { value: "Artificial intelligence", label: "Artificial intelligence" },
    { value: "Data science", label: "Data science" },
    { value: "Big data analytics", label: "Big data analytics" },
    {
      value: "Environmental sustainability",
      label: "Environmental sustainability",
    },
    { value: "Data mining", label: "Data mining" },
  ],
  companyJobs: [
    {
      company: {
        companyName: "Digixito Media",
      },
      experience: "0-2 years",
      stipend: {
        amount: "400",
      },
      workMode: "Remote",
      duration: {
        from: "2023-09-25",
        to: "2023-12-25",
      },
      title: "React Developer",
      skills: ["HTML", "CSS", "Javascript", "Flutter"],
      description:
        "Digixito is a dynamic and innovative software development company specializing in creating cutting-edge mobile applications. We are seeking a motivated and talented Flutter Developer Intern to join our team and gain hands-on experience in building high-quality mobile apps.",
      createdAt: "2023-09-20",
    },
    {
      company: {
        companyName: "Digixito Media",
      },
      experience: "0-2 years",
      stipend: {
        amount: "400",
      },
      workMode: "Remote",
      duration: {
        from: "2023-09-25",
        to: "2023-12-25",
      },
      title: "React Developer",
      skills: ["HTML", "CSS", "Javascript", "React Js"],
      description:
        "Hands-on experience with React tools like Webpack,Enzyme,React.js,Flux,and Redux",
      createdAt: "2023-09-20",
    },
    {
      company: {
        companyName: "Digixito Media",
      },
      experience: "0-2 years",
      stipend: {
        amount: "400",
      },
      workMode: "Remote",
      duration: {
        from: "2023-09-25",
        to: "2023-12-25",
      },
      title: "React Developer",
      skills: ["HTML", "CSS", "Javascript", "React Js"],
      description:
        "Hands-on experience with React tools like Webpack,Enzyme,React.js,Flux,and Redux",
      createdAt: "2023-09-20",
    },
  ],
};

export default data;
