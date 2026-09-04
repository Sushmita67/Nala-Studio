import React, { useState } from 'react';
import { Calendar, User } from 'lucide-react';
import { blogPosts } from '../data/dummyData';
import ns21 from '../assets/images/ns30.jpg';
import ns2 from '../assets/images/ns-21.jpg';
import ns10 from '../assets/images/ns31.jpg';
import ns4 from '../assets/images/ns32.jpg';
import ns23 from '../assets/images/ns33.jpg';
import ns6 from '../assets/images/ns34.jpg';
import ns22 from '../assets/images/ns35.jpg';
import nsHero from '../assets/images/ns-hero1.jpg';

interface BlogProps {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const Blog: React.FC<BlogProps> = ({}) => {
  const idToImage: Record<string, string> = {
    '1': ns6,
    '2': ns2,
    '3': ns22,
    '4': ns21,
    '5': ns10,
    '6': ns23,
    '7': nsHero,
    '8':ns4,
  };

  const [activePostId, setActivePostId] = useState<string>(blogPosts[0]?.id || '1');

  const activePost = blogPosts.find(p => p.id === activePostId) || blogPosts[0];
  const otherPosts = blogPosts.filter(p => p.id !== activePostId);

  const featuredImg = idToImage[activePost.id] || nsHero;
  const avatarImg = ns2;

  return (
    <section className="bg-white dark:bg-gray-900 pt-2 lg:pt-6">
      <div className="container px-6 py-10 mx-auto">
        <div className="lg:flex lg:-mx-6">
          <div className="lg:w-3/4 lg:px-6">
            {/*<img className="object-cover object-center w-full h-full xl:h-[28rem] rounded-xl" src={featuredImg} alt={activePost.title} />*/}
            <div className="w-[90%] mx-auto">
              <img
                  className="object-cover object-center w-full h-[34rem] xl:h-[40rem] rounded-xl"
                  src={featuredImg}
                  alt={activePost.title}
              />
            </div>

            <div>
              <p className="mt-6 text-sm text-blue-500 uppercase">{activePostId === blogPosts[0]?.id ? 'Latest' : 'Article'}</p>
              <h1 className="max-w-lg mt-4 text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
                {activePost.title}
              </h1>

              <div className="flex items-center mt-6">
                <img className="object-cover object-center w-10 h-10 rounded-full" src={avatarImg} alt={activePost.author} />
                <div className="mx-4">
                  <h1 className="text-sm text-gray-700 dark:text-gray-200">{activePost.author}</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="mr-2">Nail & Lash Experts</span>
                    <Calendar className="w-4 h-4" />
                    {new Date(activePost.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl">{activePost.excerpt}</p>
              <div className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">{activePost.content}</div>
            </div>
          </div>

          <div className="mt-8 lg:w-1/4 lg:mt-0 lg:px-6">
            {otherPosts.map((post, idx) => (
              <div key={post.id} className={idx !== 0 ? 'mt-6' : ''}>
                <h3 className="text-blue-500 capitalize">{post.tags[0] || 'Update'}</h3>
                <button onClick={() => setActivePostId(post.id)} className="block mt-2 font-medium text-left text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400 ">
                  {post.title}
                </button>
                {idx < otherPosts.length - 1 && (
                  <hr className="my-6 border-gray-200 dark:border-gray-700" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog; 