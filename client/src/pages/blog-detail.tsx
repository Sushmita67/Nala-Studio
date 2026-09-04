import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/dummyData';

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="pt-24 max-w-3xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">Article not found.</p>
            <Link to="/blog" className="inline-flex items-center text-nala-primary hover:text-nala-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="pt-24">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/blog" className="inline-flex items-center text-nala-primary hover:text-nala-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>

          <article className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <span className="inline-flex items-center"><User className="w-4 h-4 mr-1" /> {post.author}</span>
                <span className="inline-flex items-center"><Calendar className="w-4 h-4 mr-1" /> {new Date(post.date).toLocaleDateString()}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;


