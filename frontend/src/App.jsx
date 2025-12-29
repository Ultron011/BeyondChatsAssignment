import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import { BookOpen } from 'lucide-react';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-gray-700" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">BeyondChats Articles</h1>
                <p className="text-gray-600 mt-1">
                  Compare original articles with AI-enhanced versions
                </p>
              </div>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
        </main>

        <footer className="border-t bg-white mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
            <p>BeyondChats Articles Platform &copy; 2025</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
