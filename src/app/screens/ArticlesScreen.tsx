import { useState } from "react";
import { BottomNav } from "../components/BottomNav";
import { BookOpen, BadgeCheck, Clock, Heart } from "lucide-react";
import { motion } from "motion/react";

interface Article {
  id: number;
  title: string;
  doctor: string;
  category: string;
  readTime: string;
  image: string;
  verified: boolean;
  likes: number;
}

export default function ArticlesScreen() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "nutrition", label: "Nutrition" },
    { id: "aftercare", label: "After-care" },
    { id: "growth", label: "Growth Tips" },
  ];

  const articles: Article[] = [
    {
      id: 1,
      title: "Post-Vaccination Care: Essential Tips for New Parents",
      doctor: "Dr. Anjali Sharma",
      category: "aftercare",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBtZWRpY2FsfGVufDF8fHx8MTc3MTQyNDUzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      verified: true,
      likes: 342,
    },
    {
      id: 2,
      title: "Nutrition Guide for Babies 0-12 Months",
      doctor: "Dr. Rajesh Kumar",
      category: "nutrition",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1714595747121-7067706bc557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtb3RoZXIlMjBiYWJ5JTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NzE0MjQ1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      verified: true,
      likes: 528,
    },
    {
      id: 3,
      title: "Understanding Baby Growth Milestones",
      doctor: "Dr. Priya Deshmukh",
      category: "growth",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1603298624547-e38905ce21d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYmFieSUyMHNtaWxpbmclMjBoYXBweXxlbnwxfHx8fDE3NzE0MjQ1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      verified: true,
      likes: 415,
    },
    {
      id: 4,
      title: "Managing Fever After Vaccination",
      doctor: "Dr. Suresh Patel",
      category: "aftercare",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1579781403337-de692320718a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWNjaW5lJTIwbWVkaWNhbCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzE0MjQ1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      verified: true,
      likes: 289,
    },
    {
      id: 5,
      title: "Healthy Weaning Foods for Indian Babies",
      doctor: "Dr. Meera Nair",
      category: "nutrition",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1714595747121-7067706bc557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtb3RoZXIlMjBiYWJ5JTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NzE0MjQ1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      verified: true,
      likes: 621,
    },
  ];

  const filteredArticles =
    activeFilter === "all"
      ? articles
      : articles.filter((article) => article.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#fafbfd] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#6b9bd1] to-[#5a8bc1] px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <h2 className="text-white mb-2">Doctor Articles</h2>
        <p className="text-white/90 text-sm">Expert-verified content</p>
      </div>

      <div className="px-6 -mt-4">
        {/* Filter Pills */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-lg p-4 mb-6 overflow-x-auto"
        >
          <div className="flex space-x-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeFilter === filter.id
                    ? "bg-[#6b9bd1] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="space-y-6">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-[#a8d8ea] to-[#6b9bd1] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-gray-600" />
                  <span className="text-xs text-gray-700">{article.readTime}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Doctor Info */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#6b9bd1] to-[#5a8bc1] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">
                      {article.doctor.split(" ")[1][0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-[#2d3748] text-sm">{article.doctor}</span>
                      {article.verified && (
                        <BadgeCheck className="w-4 h-4 text-[#6b9bd1]" />
                      )}
                    </div>
                    <p className="text-gray-500 text-xs">Verified Doctor</p>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-[#2d3748] mb-3 leading-snug">
                  {article.title}
                </h4>

                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-[#e8f4f8] text-[#6b9bd1] text-xs rounded-full">
                    {filters.find((f) => f.id === article.category)?.label}
                  </span>

                  {/* Likes */}
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{article.likes}</span>
                  </div>
                </div>

                {/* Read Button */}
                <button className="w-full mt-4 bg-[#6b9bd1] text-white py-3 rounded-xl hover:bg-[#5a8bc1] transition-colors flex items-center justify-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Read Article</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-[#a8d8ea] to-[#6b9bd1] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <BookOpen className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-[#2d3748] mb-2">No Articles Found</h3>
            <p className="text-gray-600 text-sm">
              Try selecting a different category
            </p>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
