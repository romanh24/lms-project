// Course interface
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  rating: number;
  students: number;
  duration: string;
  price: number;
  image: string;
  isFeatured: boolean;
  isPopular: boolean;
}

// Mock data for courses
export const mockCourses: Course[] = [
    {
      id: "1",
      title: "Foundations of Speech Pathology",
      description: "Learn the core principles and practices of speech-language pathology for clinical practice.",
      instructor: "Dr. Sarah Johnson",
      level: "Beginner",
      category: "Clinical Foundations",
      rating: 4.8,
      students: 1245,
      duration: "8 weeks",
      price: 49.99,
      image: "https://img.freepik.com/free-photo/mother-kid-home-side-view_23-2150171997.jpg?t=st=1741281343~exp=1741284943~hmac=fa17197df450522948b307520c6c4f779d9a9b0cec20551f63f8df6b791ed106&w=2000",
      isFeatured: true,
      isPopular: true
    },
    {
      id: "2",
      title: "Advanced Articulation Therapy",
      description: "Master advanced techniques for treating complex articulation and phonological disorders.",
      instructor: "Dr. Michael Chen",
      level: "Advanced",
      category: "Articulation & Phonology",
      rating: 4.9,
      students: 842,
      duration: "6 weeks",
      price: 79.99,
      image: "https://media.istockphoto.com/id/1461674253/photo/speech-therapy.jpg?b=1&s=612x612&w=0&k=20&c=tR7t3xt6yADehu22-8O4bTQQ8InuSwI_HLB4qRH8bS8=",
      isFeatured: true,
      isPopular: false
    },
    {
      id: "3",
      title: "Pediatric Language Disorders",
      description: "Comprehensive approach to assessment and intervention for language disorders in children.",
      instructor: "Dr. Emily Rodriguez",
      level: "Beginner",
      category: "Pediatric Therapy",
      rating: 4.7,
      students: 1032,
      duration: "10 weeks",
      price: 59.99,
      image: "https://img.freepik.com/free-photo/friendly-young-female-psychologist-girl-holding-happy-emotion-face-card_23-2148026263.jpg?t=st=1741281678~exp=1741285278~hmac=95c82bfdbbc4e9d6099cf78e5073758a79a4bffd2aacbef5fe56bd39b02092b0&w=2000",
      isFeatured: false,
      isPopular: true
    },
    {
      id: "4",
      title: "Dysphagia Management",
      description: "Evidence-based approaches for assessment and treatment of swallowing disorders across the lifespan.",
      instructor: "Dr. Alex Thompson",
      level: "Intermediate",
      category: "Swallowing Disorders",
      rating: 4.6,
      students: 756,
      duration: "7 weeks",
      price: 69.99,
      image: "https://img.freepik.com/free-photo/senior-woman-nursing-home-with-nurse-getting-speech-therapy_23-2148962902.jpg",
      isFeatured: false,
      isPopular: false
    },
    {
      id: "5",
      title: "Augmentative and Alternative Communication",
      description: "Implementation of AAC systems and strategies for individuals with complex communication needs.",
      instructor: "Dr. David Kim",
      level: "Intermediate",
      category: "AAC",
      rating: 4.8,
      students: 925,
      duration: "9 weeks",
      price: 74.99,
      image: "https://img.freepik.com/free-photo/teacher-helping-disabled-schoolgirl-with-digital-tablet_107420-36122.jpg",
      isFeatured: true,
      isPopular: true
    },
    {
      id: "6",
      title: "Neurogenic Communication Disorders",
      description: "Assessment and intervention approaches for aphasia, apraxia, and other neurogenic disorders.",
      instructor: "Dr. Sophia Martinez",
      level: "Advanced",
      category: "Neurogenic Disorders",
      rating: 4.9,
      students: 1120,
      duration: "12 weeks",
      price: 89.99,
      image: "https://img.freepik.com/free-photo/doctor-examining-senior-patient-with-stethoscope-clinic_107420-84818.jpg",
      isFeatured: true,
      isPopular: true
    },
    {
      id: "7",
      title: "Voice Disorders and Therapy",
      description: "Comprehensive study of voice disorders, assessment techniques, and therapeutic interventions for various populations.",
      instructor: "Dr. Rachel Foster",
      level: "Intermediate",
      category: "Voice Therapy",
      rating: 4.9,
      students: 890,
      duration: "8 weeks",
      price: 69.99,
      image: "https://img.freepik.com/free-photo/woman-sitting-looking-canvas-with-brush-marble-background_114579-25984.jpg?t=st=1741298833~exp=1741302433~hmac=aedc0bd5be863576556c0a42006ce15c3cf0220e41250bba3a664be113b09b8e&w=2000",
      isFeatured: true,
      isPopular: true
    },
    {
      id: "8",
      title: "Clinical Documentation and Report Writing",
      description: "Master the art of professional documentation, report writing, and clinical note-taking in speech-language pathology.",
      instructor: "Dr. James Wilson",
      level: "Advanced",
      category: "Professional Skills",
      rating: 4.7,
      students: 765,
      duration: "6 weeks",
      price: 54.99,
      image: "https://img.freepik.com/free-photo/medical-workers-discussing-diagnosis_23-2148980721.jpg",
      isFeatured: true,
      isPopular: false
    }
];