'use client';

import { useState } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import { saveProfileData, uploadImage, ProfileData } from '@/lib/firebaseService';
import QRCode from 'qrcode';

// TypeScript interfaces
interface Experience {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

interface FormData {
  // Personal Information
  fullName: string;
  profilePhoto: File | null;
  jobTitle: string;
  location: string;
  bio: string;
  yearsExperience: string;
  
  // Contact Information
  email: string;
  phone: string;
  linkedinProfile: string;
  portfolioWebsite: string;
  
  // Skills/Expertise
  skills: string[];
  
  // Experience
  experience: Experience[];
}

interface Errors {
  [key: string]: string;
}

export default function ProfileForm() {
  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    fullName: '',
    profilePhoto: null,
    jobTitle: '',
    location: '',
    bio: '',
    yearsExperience: '',
    
    // Contact Information
    email: '',
    phone: '',
    linkedinProfile: '',
    portfolioWebsite: '',
    
    // Skills/Expertise
    skills: [''],
    
    // Experience
    experience: [
      {
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        isCurrent: false
      }
    ]
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle skills array
  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index: number) => {
    if (formData.skills.length > 1) {
      const newSkills = formData.skills.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        skills: newSkills
      }));
    }
  };

  // Handle experience array
  const handleExperienceChange = (index: number, field: keyof Experience, value: string | boolean) => {
    const newExperience = [...formData.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        isCurrent: false
      }]
    }));
  };

  const removeExperience = (index: number) => {
    if (formData.experience.length > 1) {
      const newExperience = formData.experience.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        experience: newExperience
      }));
    }
  };

  // Convert form data to required format
  const convertToProfileData = async (): Promise<ProfileData> => {
    // Generate QR code for the profile
    const profileUrl = `${window.location.origin}/card/${Date.now()}`; // You can customize this
    const qrCodeDataURL = await QRCode.toDataURL(profileUrl);
    
    // Upload profile photo if exists
    let avatarUrl = "/api/placeholder/120/120"; // Default placeholder
    if (formData.profilePhoto) {
      const fileName = `profiles/${Date.now()}_${formData.profilePhoto.name}`;
      avatarUrl = await uploadImage(formData.profilePhoto, fileName);
    }

    // Convert experience data
    const experience = formData.experience
      .filter(exp => exp.jobTitle && exp.companyName)
      .map(exp => ({
        role: exp.jobTitle,
        company: exp.companyName,
        period: exp.isCurrent 
          ? `${exp.startDate} - Present`
          : `${exp.startDate} - ${exp.endDate}`
      }));

    // Filter out empty skills
    const expertise = formData.skills.filter(skill => skill.trim());

    return {
      name: formData.fullName,
      title: formData.jobTitle,
      location: formData.location,
      avatar: avatarUrl,
      bio: formData.bio,
      qrCode: qrCodeDataURL,
      expertise,
      experience,
      contact: {
        email: formData.email,
        phone: formData.phone
      },
      social: {
        linkedin: formData.linkedinProfile,
        portfolio: formData.portfolioWebsite
      }
    };
  };

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Validate experience
    formData.experience.forEach((exp, index) => {
      if (!exp.jobTitle.trim()) {
        newErrors[`experience_${index}_jobTitle`] = 'Job title is required';
      }
      if (!exp.companyName.trim()) {
        newErrors[`experience_${index}_companyName`] = 'Company name is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Convert form data to required format
      const profileData = await convertToProfileData();
      
      // Save to Firebase
      const docId = await saveProfileData(profileData);
      
      console.log('Profile saved successfully with ID:', docId);
      alert('Profile created successfully!');
      
      // You can redirect to the profile page here
      // router.push(`/card/${docId}`);
      
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Error creating profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900">Create Your Card</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {/* Personal Information */}
          <div className="mb-10">
            <h2 className="text-2xl  text-gray-800 mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-400 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-400 ${
                    errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Senior Product Designer"
                />
                {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-400"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="text"
                  value={formData.yearsExperience}
                  onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-400"
                  placeholder="e.g., 5+ years"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <Upload className="w-4 h-4 text-black" />
                  <span className='text-black'>Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {profilePhotoPreview && (
                  <img 
                    src={profilePhotoPreview} 
                    alt="Preview" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio/Description
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-400"
                placeholder="Passionate about creating intuitive user experiences..."
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-10">
            <h2 className="text-2xl  text-gray-800 mb-6">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-400 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-400"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={formData.linkedinProfile}
                  onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-400"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio Website
                </label>
                <input
                  type="url"
                  value={formData.portfolioWebsite}
                  onChange={(e) => handleInputChange('portfolioWebsite', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-400"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-10">
            <h2 className="text-2xl  text-gray-800 mb-6">Skills & Expertise</h2>
            
            <div className="space-y-3">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-400"
                    placeholder="e.g., UI/UX Design"
                  />
                  {formData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addSkill}
                className="flex items-center gap-2 px-4 py-2  hover:bg-blue-50 rounded-lg"
              >
                <Plus className="w-4 h-4 text-black" />
                <span className='text-black'>Add Skill</span>
              </button>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-10">
            <h2 className="text-2xl  text-gray-800 mb-6">Work Experience</h2>
            
            <div className="space-y-6">
              {formData.experience.map((exp, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-black">Position {index + 1}</h3>
                    {formData.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="text-red-600 hover:bg-red-50 p-1 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        value={exp.jobTitle}
                        onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-400 ${
                          errors[`experience_${index}_jobTitle`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Senior Product Designer"
                      />
                      {errors[`experience_${index}_jobTitle`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`experience_${index}_jobTitle`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={exp.companyName}
                        onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-400 ${
                          errors[`experience_${index}_companyName`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., TechCorp"
                      />
                      {errors[`experience_${index}_companyName`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`experience_${index}_companyName`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        disabled={exp.isCurrent}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 text-gray-400"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={exp.isCurrent}
                        onChange={(e) => handleExperienceChange(index, 'isCurrent', e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">I currently work here</span>
                    </label>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addExperience}
                className="flex items-center gap-2 px-4 py-2  hover:bg-blue-50 rounded-lg"
              >
                <Plus className="w-4 h-4 text-black" />
                <span className='text-black'>Add Experience</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-black text-white py-4 px-6 rounded-lg font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}