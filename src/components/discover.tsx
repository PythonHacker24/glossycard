'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// TypeScript interfaces
interface Skill {
  name: string;
  count: number | null;
}

interface Talent {
  id: number;
  name: string;
  title: string;
  location: string;
  avatar: string;
  profileURL: string;
  skills: Skill[];
}

interface SkillTagProps {
  skill: Skill;
}

interface TalentCardProps {
  talent: Talent;
}

// Sample JSON data structure
const sampleTalentData: Talent[] = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Product Designer",
    location: "San Francisco, CA",
    avatar: "/avatars/sarah-chen.jpg",
    profileURL: "/profile/sarah-chen",
    skills: [
      { name: "UI/UX Design", count: null },
      { name: "Product Strategy", count: null },
      { name: "Design Systems", count: 3 }
    ]
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    title: "Frontend Developer",
    location: "New York, NY",
    avatar: "/avatars/alex-rodriguez.jpg",
    profileURL: "/profile/alex-rodriguez",
    skills: [
      { name: "React", count: null },
      { name: "TypeScript", count: null },
      { name: "Next.js", count: 2 }
    ]
  },
  {
    id: 3,
    name: "Maya Patel",
    title: "Data Scientist",
    location: "Austin, TX",
    avatar: "/avatars/maya-patel.jpg",
    profileURL: "/profile/maya-patel",
    skills: [
      { name: "Python", count: null },
      { name: "Machine Learning", count: null },
      { name: "SQL", count: 2 }
    ]
  },
  {
    id: 4,
    name: "David Kim",
    title: "Product Manager",
    location: "Seattle, WA",
    avatar: "/avatars/david-kim.jpg",
    profileURL: "/profile/david-kim",
    skills: [
      { name: "Product Strategy", count: null },
      { name: "Agile", count: null },
      { name: "Analytics", count: 2 }
    ]
  },
  {
    id: 5,
    name: "Emma Wilson",
    title: "Marketing Director",
    location: "Los Angeles, CA",
    avatar: "/avatars/emma-wilson.jpg",
    profileURL: "/profile/emma-wilson",
    skills: [
      { name: "Digital Marketing", count: null },
      { name: "Brand Strategy", count: null },
      { name: "Content Marketing", count: 2 }
    ]
  },
  {
    id: 6,
    name: "James Thompson",
    title: "DevOps Engineer",
    location: "Denver, CO",
    avatar: "/avatars/james-thompson.jpg",
    profileURL: "/profile/james-thompson",
    skills: [
      { name: "AWS", count: null },
      { name: "Docker", count: null },
      { name: "Kubernetes", count: 3 }
    ]
  }
];

export default function DiscoverTalent() {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [filteredTalents, setFilteredTalents] = useState<Talent[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Simulate loading data from JSON/API
  useEffect(() => {
    const loadTalentData = async () => {
      try {
        // In a real app, this would be:
        // const response = await fetch('/api/talents');
        // const data = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setTalents(sampleTalentData);
        setFilteredTalents(sampleTalentData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading talent data:', error);
        setLoading(false);
      }
    };

    loadTalentData();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTalents(talents);
      return;
    }

    const filtered = talents.filter(talent => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        talent.name.toLowerCase().includes(searchTerm) ||
        talent.title.toLowerCase().includes(searchTerm) ||
        talent.skills.some(skill => skill.name.toLowerCase().includes(searchTerm))
      );
    });

    setFilteredTalents(filtered);
  }, [searchQuery, talents]);

  const handleProfileClick = (profileURL: string) => {
    router.push(profileURL);
  };

  const SkillTag: React.FC<SkillTagProps> = ({ skill }) => (
    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md">
      {skill.name}
      {skill.count && (
        <span className="ml-1 text-gray-500">+{skill.count}</span>
      )}
    </span>
  );

  const TalentCard: React.FC<TalentCardProps> = ({ talent }) => (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => handleProfileClick(talent.profileURL)}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
          <span className="text-2xl text-gray-600">👤</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {talent.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2">
          {talent.title}
        </p>
        
        <p className="text-xs text-gray-500 mb-4 flex items-center">
          <span className="mr-1">📍</span>
          {talent.location}
        </p>
        
        <div className="flex flex-wrap gap-1 justify-center">
          {talent.skills.map((skill, index) => (
            <SkillTag key={index} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading talents...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Discover Talent</h1>
              <p className="text-gray-600">Find the perfect professionals for your team</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View My Profile
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search by name, role, or skills..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              🔽 Filters
            </button>
            
            <div className="flex border border-gray-300 rounded-md">
              <button
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
                onClick={() => setViewMode('grid')}
              >
                ⚏
              </button>
              <button
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
                onClick={() => setViewMode('list')}
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {filteredTalents.length} professionals found
          </p>
        </div>

        {/* Talent Grid */}
        {filteredTalents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTalents.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No professionals found matching your search.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Built with Next.js
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span>Edit with</span>
              <span className="font-bold">❤️ Lovable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}