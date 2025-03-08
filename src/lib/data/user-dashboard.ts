import { Course } from "@/lib/types";

export interface UserDashboardStats {
  enrolledCourses: {
    count: number;
    courses: Course[];
    lastAccessed?: string;
    progress: number;
  }[];
  completedCourses: {
    count: number;
    courses: Course[];
    completedAt: string;
    certificate?: string;
  }[];
  overallProgress: {
    percentage: number;
    totalHoursSpent: number;
    streak: number;
    lastActivity: string;
  };
}

export const mockUserDashboardStats: UserDashboardStats = {
  enrolledCourses: [
    {
      count: 3,
      courses: [
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
          image: "https://img.freepik.com/free-photo/mother-kid-home-side-view_23-2150171997.jpg",
          progress: 45,
          lastAccessed: "2024-02-14"
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
          image: "https://media.istockphoto.com/id/1461674253/photo/speech-therapy.jpg",
          progress: 25,
          lastAccessed: "2024-02-15"
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
          image: "https://img.freepik.com/free-photo/friendly-young-female-psychologist-girl-holding-happy-emotion-face-card_23-2148026263.jpg",
          progress: 15,
          lastAccessed: "2024-02-13"
        }
      ],
      progress: 28
    }
  ],
  completedCourses: [
    {
      count: 2,
      courses: [
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
          completedAt: "2024-01-15",
          certificate: "CERT-2024-001"
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
          completedAt: "2024-02-01",
          certificate: "CERT-2024-002"
        }
      ],
      completedAt: "2024-02-01"
    }
  ],
  overallProgress: {
    percentage: 65,
    totalHoursSpent: 48,
    streak: 5,
    lastActivity: "2024-02-15"
  }
}; 