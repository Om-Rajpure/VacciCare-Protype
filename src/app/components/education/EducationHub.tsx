import { useState } from 'react';
import { BookOpen, Stethoscope, Heart, AlertTriangle, Zap } from 'lucide-react';
import { articles, sideEffectGuidance, vaccineComparison, missedVaccineGuidance } from '../../data/educationData';

type TabType = 'articles' | 'sideEffects' | 'painless' | 'missed';

export function EducationHub() {
  const [activeTab, setActiveTab] = useState<TabType>('articles');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const tabs = [
    { id: 'articles' as TabType, label: 'Doctor Articles', icon: Stethoscope },
    { id: 'sideEffects' as TabType, label: 'Side Effect Care', icon: Heart },
    { id: 'painless' as TabType, label: 'Painless Vaccines', icon: Zap },
    { id: 'missed' as TabType, label: 'Missed Vaccines', icon: AlertTriangle }
  ];

  const article = selectedArticle ? articles.find(a => a.id === selectedArticle) : null;

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden pb-24">
      <div className="bg-gradient-to-r from-[#FFD166] to-[#FF6B6B] p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <BookOpen className="w-24 h-24 text-white rotate-12" />
        </div>
        <div className="flex items-center space-x-3 text-white relative z-10">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Health Articles</h2>
            <p className="text-white/90 text-sm">Expert guidance for informed decisions</p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="flex overflow-x-auto scrollbar-hide p-2 space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedArticle(null);
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FFD166] text-white shadow-md transform scale-105'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-bold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'articles' && (
          <div>
            {article ? (
              <div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-blue-600 hover:text-blue-700 mb-4 text-sm"
                >
                  ← Back to articles
                </button>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-4">By {article.author}</p>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">{article.content}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article.id)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <h3 className="font-semibold text-gray-800 mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {article.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{article.author}</span>
                      <span className="text-blue-600 text-sm">Read more →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'sideEffects' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> Most vaccine side effects are mild and temporary. They show your child's immune system is building protection. However, always monitor and consult your doctor if concerned.
              </p>
            </div>

            {sideEffectGuidance.map((guidance) => (
              <div key={guidance.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4">
                  <h3 className="font-semibold text-gray-800">{guidance.symptom}</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Care Instructions:</p>
                    <p className="text-sm text-gray-600">{guidance.care}</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                    <p className="text-sm font-medium text-red-800 mb-1">When to Seek Medical Help:</p>
                    <p className="text-sm text-red-700">{guidance.whenToSeekHelp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'painless' && (
          <div>
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Understanding Your Options</h3>
              <p className="text-sm text-gray-700">
                Both painless and standard vaccines provide excellent protection. The choice depends on your budget and preference for minimizing post-vaccination discomfort.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Aspect</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Painless Vaccine</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Standard Vaccine</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccineComparison.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 border-b">{row.aspect}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b">{row.painless}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b">{row.standard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Bottom Line:</strong> Both vaccine types are safe, effective, and recommended by pediatricians. Painless vaccines offer added comfort but at a higher cost. Consult your doctor to make the best choice for your child.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'missed' && (
          <div>
            <div className="mb-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{missedVaccineGuidance.title}</h3>
              <p className="text-gray-700 mb-4">{missedVaccineGuidance.content}</p>
            </div>

            <div className="space-y-4 mb-6">
              {missedVaccineGuidance.guidelines.map((guideline, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-800 mb-1">{guideline.point}</h4>
                  <p className="text-sm text-gray-600">{guideline.explanation}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-3">Special Situations:</h4>
              <ul className="space-y-2">
                {missedVaccineGuidance.urgentCases.map((urgentCase, index) => (
                  <li key={index} className="text-sm text-red-700 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{urgentCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Remember:</strong> If you've missed vaccines, contact your pediatrician immediately. They will create a safe catch-up schedule tailored to your child's needs. Don't let missed vaccines discourage you—it's never too late to protect your child.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
