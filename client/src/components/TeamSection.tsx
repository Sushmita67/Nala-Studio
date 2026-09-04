import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Shona Bishwakarma',
      role: 'Nails & Lashes Expert',
      image: 'https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      socialLinks: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      }
    },
    {
      id: 2,
      name: 'Ashmita Bishwakarma',
      role: 'Nail Expert',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      socialLinks: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      }
    },
    {
      id: 3,
      name: 'Sushmita Bishkarma',
      role: 'Lashes Expert',
      image: 'https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      socialLinks: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      }
    }
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Our Executive Team</h1>
        <div className="flex justify-center mx-auto mt-6">
                <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
        </div>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
          Our passionate team of beauty experts is dedicated to bringing out your natural beauty. 
          With years of experience and a commitment to excellence, we ensure every client leaves 
          feeling confident and beautiful.
        </p>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center p-8 rounded-xl">
              <img 
                className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300" 
                src={member.image} 
                alt={member.name}
              />

              <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                {member.name}
              </h1>

              <p className="mt-2 text-gray-500 capitalize dark:text-gray-300">
                {member.role}
              </p>

              <div className="flex mt-3 -mx-2">
                <a 
                  href={member.socialLinks.instagram} 
                  className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300" 
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>

                <a 
                  href={member.socialLinks.facebook} 
                  className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300" 
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>

                <a 
                  href={member.socialLinks.twitter} 
                  className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300" 
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 